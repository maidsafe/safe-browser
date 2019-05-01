import React, { Component } from 'react';
import { Page, H1, PageHeader } from 'nessie-ui';
import { UrlList } from '$Components/UrlList';
import styles from './bookmarks.css';
import { CLASSES } from '$Constants';

interface BookmarksProps {
    isActiveTab?: boolean;
    bookmarks: Array<any>;
    addTab?: ( ...args: Array<any> ) => any;
}
export const Bookmarks = ( props: BookmarksProps = { bookmarks: [] } ) => {
    const { bookmarks, isActiveTab, addTab } = props;
    const bookmarkList = bookmarks.map( ( bookmark ) => bookmark.url );
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
                    <UrlList list={bookmarkList} addTab={addTab} />
                </Page>
            </div>
        </div>
    );
};
