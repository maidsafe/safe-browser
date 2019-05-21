import { createActions } from 'redux-actions';

export const TYPES = {
    ADD_TAB: 'ADD_TAB',
    UPDATE_TAB: 'UPDATE_TAB',
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
    updateTab,
    tabForwards,
    tabBackwards,
    focusWebview,
    blurAddressBar,
    selectAddressBar,
    deselectAddressBar,
    tabsResetStore
} = createActions(
    TYPES.ADD_TAB,
    TYPES.UPDATE_TAB,
    TYPES.TAB_FORWARDS,
    TYPES.TAB_BACKWARDS,
    TYPES.FOCUS_WEBVIEW,
    TYPES.BLUR_ADDRESS_BAR,
    TYPES.SELECT_ADDRESS_BAR,
    TYPES.DESELECT_ADDRESS_BAR,
    TYPES.TABS_RESET_STORE
);
