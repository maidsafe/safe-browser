/* eslint-disable */
import React, { Component } from 'react';
// import { Link } from 'react-router';
import { ipcRenderer, remote } from 'electron';
import { Page, H1, PageHeader } from 'nessie-ui';
import UrlList from '$Components/UrlList';
import styles from './bookmarks.css';
import { CLASSES } from '$Constants';

const log = require( 'electron-log' );

interface BookmarksProps {
    bookmarks: Array<any>;
    isActiveTab: boolean;
    addTabEnd: ( ...args: Array<any> ) => any;
    windowId: number;
}
export default class Bookmarks extends Component<BookmarksProps, {}> {
    static defaultProps = {
        bookmarks: []
    };

    render() {
        const { bookmarks , isActiveTab, windowId, addTabEnd } = this.props;
        const bookmarkList = bookmarks.map( bookmark => bookmark.url );
        let moddedClass = styles.tab;
        if ( isActiveTab ) {
            moddedClass = styles.activeTab;
        }
        return (
            <div className={moddedClass}>
                <div className={`${styles.container}`}>
                    <Page
                        className={`${CLASSES.SAFE_BROWSER_PAGE} ${styles.page}`}
                        overflow="auto"
                    >
                        <PageHeader>
                            <H1 title="Bookmarks" />
                        </PageHeader>
                        <UrlList list={bookmarkList} addTabEnd = {addTabEnd} windowId= {windowId} />
                    </Page>
                </div>
            </div>
        );
    }
}
