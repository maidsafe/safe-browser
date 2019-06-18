import { createActions } from 'redux-actions';

export const TYPES = {
    ADD_TAB: 'ADD_TAB',
    UPDATE_TAB_URL: 'UPDATE_TAB_URL',
    UPDATE_TAB_WEB_ID: 'UPDATE_TAB_WEB_ID',
    TOGGLE_DEV_TOOLS: 'TOGGLE_DEV_TOOLS',
    TAB_SHOULD_RELOAD: 'TAB_SHOULD_RELOAD',
    UPDATE_TAB_TITLE: 'UPDATE_TAB_TITLE',
    UPDATE_TAB_FAVICON: 'UPDATE_TAB_FAVICON',
    TAB_LOAD: 'TAB_LOAD',
    TAB_FORWARDS: 'TAB_FORWARDS',
    TAB_BACKWARDS: 'TAB_BACKWARDS',
    FOCUS_WEBVIEW: 'FOCUS_WEBVIEW',
    BLUR_ADDRESS_BAR: 'BLUR_ADDRESS_BAR',
    SELECT_ADDRESS_BAR: 'SELECT_ADDRESS_BAR',
    DESELECT_ADDRESS_BAR: 'DESELECT_ADDRESS_BAR',
    TABS_RESET_STORE: 'TABS_RESET_STORE'
};

export const {
    addTab,
    updateTabUrl,
    updateTabWebId,
    toggleDevTools,
    tabShouldReload,
    updateTabTitle,
    updateTabFavicon,
    tabLoad,
    tabForwards,
    tabBackwards,
    focusWebview,
    blurAddressBar,
    selectAddressBar,
    deselectAddressBar,
    tabsResetStore
} = createActions(
    TYPES.ADD_TAB,
    TYPES.UPDATE_TAB_URL,
    TYPES.UPDATE_TAB_WEB_ID,
    TYPES.TOGGLE_DEV_TOOLS,
    TYPES.TAB_SHOULD_RELOAD,
    TYPES.UPDATE_TAB_TITLE,
    TYPES.UPDATE_TAB_FAVICON,
    TYPES.TAB_LOAD,
    TYPES.TAB_FORWARDS,
    TYPES.TAB_BACKWARDS,
    TYPES.FOCUS_WEBVIEW,
    TYPES.BLUR_ADDRESS_BAR,
    TYPES.SELECT_ADDRESS_BAR,
    TYPES.DESELECT_ADDRESS_BAR,
    TYPES.TABS_RESET_STORE
);
