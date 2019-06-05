import React, { Component } from 'react';
import { remote } from 'electron';
import { CLASSES } from '$Constants';
import { I18n } from 'react-redux-i18n';
// import { logger } from '$Logger';
import { extendComponent } from '$Utils/extendComponent';
import { wrapAddressBarInput } from '$Extensions/components';
import { Input } from 'antd';
import 'antd/lib/input/style';

interface AddressBarInputProps {
    address?: string;
    isSelected?: boolean;
    windowId: number;
    tabId?: string;
    onBlur: ( ...args: Array<any> ) => any;
    onSelect: ( ...args: Array<any> ) => any;
    onFocus: ( ...args: Array<any> ) => any;
    updateTabUrl: ( ...args: Array<any> ) => any;
}
interface AddressBarInputState {
    address: any;
    editingUrl: boolean;
}
interface AddressBarInputState {
    address: any;
    editingUrl: boolean;
}
/**
 * Left hand side buttons for the Address Bar
 * @extends Component
 */
class AddressBarInput extends Component<
AddressBarInputProps,
AddressBarInputState
> {
    static defaultProps = {
        address: '',
        isSelected: false,
        editingUrl: false
    };

    constructor( props ) {
        super( props );
        this.handleChange = this.handleChange.bind( this );
        this.handleKeyPress = this.handleKeyPress.bind( this );
        this.state = {
            address: props.address
        };
    }

    componentWillReceiveProps( nextProps ) {
        if (
            nextProps.address !== this.props.address &&
      nextProps.address !== this.state.address
        ) {
            this.setState( { address: nextProps.address, editingUrl: false } );
        }
        if (
            nextProps.isSelected &&
      !this.props.isSelected &&
      !this.state.editingUrl &&
      this.addressInput
        ) {
            this.addressInput.select();
        }
    }

    isInFocussedWindow = () => {
        const { BrowserWindow } = remote;
        const focusedWindow = BrowserWindow.getFocusedWindow();
        if ( !focusedWindow ) {
            return false;
        }
        const focussedWindowId = BrowserWindow.getFocusedWindow().id;
        const currentWindowId = remote.getCurrentWindow().id;
        return focussedWindowId === currentWindowId;
    };

    handleChange( event ) {
        const { onSelect, tabId } = this.props;
        this.setState( { editingUrl: true, address: event.target.value } );
        if ( onSelect ) {
            onSelect( { tabId } );
        }
    }

    handleFocus = ( event ) => {
        const { onFocus, tabId } = this.props;
        onFocus( { tabId } );
        event.target.select();
    };

    handleBlur = () => {
        const { onBlur, tabId } = this.props;
        onBlur( { tabId } );
    };

    handleKeyPress( event ) {
        const { tabId } = this.props;
        if ( event.key !== 'Enter' ) {
            return;
        }
        const input = event.target.value;
        const timeStamp = new Date().getTime();
        this.props.updateTabUrl( { tabId, url: input, timeStamp } );
    }

    handleClick = () => {
        const { onSelect, isSelected, tabId } = this.props;
        if ( isSelected ) {
            this.setState( { editingUrl: true } );
            onSelect();
        }
    };

    render() {
        const { isSelected, addonBefore, addonAfter } = this.props;
        const { address } = this.state;
        return (
            <Input
                className={CLASSES.ADDRESS_INPUT}
                aria-label={I18n.t( 'aria.address_bar' )}
                addonBefore={
                    addonBefore && addonBefore.length !== 0 ? addonBefore : undefined
                }
                addonAfter={
                    addonAfter && addonAfter.length !== 0 ? addonAfter : undefined
                }
                size="large"
                value={address}
                type="text"
                ref={( input ) => {
                    this.addressInput = input;
                    if (
                        isSelected &&
            !this.state.editingUrl &&
            this.isInFocussedWindow() &&
            input
                    ) {
                        input.select();
                    }
                }}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
            />
        );
    }
}
export const ExtendedInput = extendComponent(
    AddressBarInput,
    wrapAddressBarInput
);
