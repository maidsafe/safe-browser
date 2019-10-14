import open from 'open';
import { Store } from 'redux';
import { remote } from 'electron';
import { parse as parseURL } from 'url';
import path from 'path';
import { CONFIG, isRunningTestCafeProcess, allowedHttp } from '$Constants';
import { logger } from '$Logger';
import { urlIsValid } from '$Extensions';

export const blockNonSAFERequests = ( store: Store ) => {
    const filter = {
        urls: ['*://*/*']
    };

    const httpRegExp = new RegExp( '^http' );

    const safeSession = remote.session.fromPartition( CONFIG.SAFE_PARTITION );

    safeSession.webRequest.onBeforeRequest( filter, ( details, callback ): void => {
    //  testcafe needs access to inject code
        if ( isRunningTestCafeProcess ) {
            callback( {} );
            return;
        }
        const userAgent = details.headers['User-Agent'];

        const targetWebContentsId = userAgent
            ? parseInt( userAgent.split( 'webContentsId:' )[1], 10 )
            : undefined;

        logger.info(
            'checking url webcontent id ================>>>',
            details.url,
            targetWebContentsId
        );

        // HACK, w/ ?v=x query params we need another way to get the current
        // content version. So we use webContentsIds to do this.
        const state = store.getState();
        const { tabs } = state;

        const tabsArray = Object.values( tabs );

        let targetUrl = details.url;

        const parseQuery = true;
        const parsedUrl = parseURL( targetUrl, parseQuery );

        if ( tabsArray.length > 0 ) {
            const targetTab = tabsArray.find(
                ( tab: { webContentsId: number; url: string } ) =>
                    tab.webContentsId === targetWebContentsId
            );

            if ( targetTab ) {
                logger.info(
                    'targetTabbbb actual url issssss === ????  >>>',
                    targetTab.url,
                    targetTab.webContentsId
                );
                const targetVersion = targetTab.url;

                const parsedTabUrl = parseURL( targetTab.url, parseQuery );

                // we need to check if the req comes from the same site...
                const requestedSite = parseURL( parsedUrl.path.substring( 1 ) ); // remove localhost:port
                const siteVersion = parsedTabUrl.query.v;

                if ( requestedSite.host === parsedTabUrl.host && !parsedUrl.query.v ) {
                    logger.verbose(
                        'On a versioned site, updated resource req, to: ',
                        `${targetUrl}?v=${siteVersion}`
                    );
                    targetUrl = `${targetUrl}?v=${siteVersion}`;
                }
            }
        }

        // MacOS, devmode. Attempts are made to load from
        // /Users... electron...map.js
        let appLocation = remote.app.getPath( 'exe' );

        if ( process.platform === 'darwin' ) {
            const theSplit = appLocation.split( '.app' );
            appLocation = `${theSplit[0]}.app`;
        }

        if ( parsedUrl.path && parsedUrl.path.includes( appLocation ) ) {
            const fileLocation = targetUrl.split( appLocation )[1];
            const redirectURL = `file://${appLocation}.app/${fileLocation}`;
            logger.verbose( 'Permitting app dep url', redirectURL );
            callback( { redirectURL } );

            return;
        }

        if ( urlIsValid( targetUrl ) ) {
            logger.info( `Allowing url ${targetUrl}` );

            if ( details.url === targetUrl ) {
                callback( {} );
                return;
            }

            callback( { redirectURL: targetUrl } );

            return;
        }

        if ( httpRegExp.test( targetUrl ) ) {
            if ( allowedHttp.includes( targetUrl ) ) {
                try {
                    open( targetUrl );
                    callback( { redirectURL: 'about:blank' } );
                    return;
                } catch ( error ) {
                    logger.error( error );
                }
            }
        }

        logger.warn( 'Blocked URL:', targetUrl );
        callback( { cancel: true } );
    } );
};
