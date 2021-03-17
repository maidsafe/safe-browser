import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';
import { Row, Col, Icon, Button } from 'antd';

import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/button/style';
import 'antd/lib/icon/style';
import { extendComponent } from '$Utils/extendComponent';
import { wrapAddressBarButtonsRHS } from '$Extensions/components';
import { CustomMenu } from '$Components/CustomMenu';
import { CLASSES } from '$Constants';

interface ButtonsRHSProperties {
    address?: string;
    addTabEnd: ( ...arguments_: Array<any> ) => any;
    isBookmarked: boolean;
    addBookmark: ( ...arguments_: Array<any> ) => any;
    removeBookmark: ( ...arguments_: Array<any> ) => any;
    menuItems: Array<React.ReactNode>;
    showSettingsMenu: ( ...arguments_: Array<any> ) => any;
    settingsMenuIsVisible: boolean;
    hideSettingsMenu: ( ...arguments_: Array<any> ) => any;
    focusWebview: ( ...arguments_: Array<any> ) => any;
    windowId: number;
    setActiveTab: ( ...arguments_: Array<any> ) => any;
    tabId: string;
}
/**
 * Left hand side buttons for the Address Bar
 * @extends Component
 */
class ButtonsRHS extends Component<
ButtonsRHSProperties,
Record<string, unknown>
> {
    static defaultProps = {
        address: '',
        isSelected: false,
        editingUrl: false,
    };

    handleBookmarking = () => {
        const { address, addBookmark, removeBookmark, isBookmarked } = this.props;
        if ( isBookmarked ) {
            removeBookmark( { url: address } );
        } else {
            addBookmark( { url: address } );
        }
    };

    render() {
        const {
            isBookmarked,
            settingsMenuIsVisible,
            showSettingsMenu,
            hideSettingsMenu,
            menuItems,
            focusWebview,
            windowId,
            tabId,
        } = this.props;
        return (
            <Row
                type="flex"
                justify="end"
                align="middle"
                gutter={{ xs: 2, sm: 4, md: 6 }}
            >
                <Col>
                    <Button
                        className={`${CLASSES.BOOKMARK_PAGE}`}
                        shape="circle"
                        onClick={this.handleBookmarking}
                        tabIndex="0"
                        aria-label={
                            isBookmarked
                                ? I18n.t( 'aria.is_bookmarked' )
                                : I18n.t( 'aria.not_bookmarked' )
                        }
                        onKeyDown={( event ) => {
                            if ( event.keyCode === 13 ) {
                                this.handleBookmarking();
                            }
                        }}
                    >
                        <Icon type="star" theme={isBookmarked ? 'filled' : 'outlined'} />
                    </Button>
                </Col>
                <Col>
                    <CustomMenu
                        isVisible={settingsMenuIsVisible}
                        menuItems={menuItems}
                        showMenu={showSettingsMenu}
                        hideMenu={hideSettingsMenu}
                        tabIndex="0"
                        windowId={windowId}
                        aria-label={I18n.t( 'aria.settings_menu' )}
                        onBlur={() => focusWebview( { tabId, shouldFocus: true } )}
                    />
                </Col>
            </Row>
        );
    }
}
export const ExtendedButtonsRHS = extendComponent(
    ButtonsRHS,
    wrapAddressBarButtonsRHS
);
