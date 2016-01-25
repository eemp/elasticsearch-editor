import React from 'react'

import Paper from 'material-ui/lib/paper'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import FontIcon from 'material-ui/lib/font-icon'
import Popover from 'material-ui/lib/popover/popover'
import TextField from 'material-ui/lib/text-field'
import Autocomplete from 'material-ui/lib/auto-complete'
import Divider from 'material-ui/lib/divider'
import RaisedButton from 'material-ui/lib/raised-button'

import colors from 'material-ui/lib/styles/colors'

import Path from './path'
import SettingsDialog from './settings-dialog'

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            index: '',
            mapping: '',
            id: '',
            mappingOpts: [],
            settings_dialog_open: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.settings_dialog_open !== nextState.settings_dialog_open;
    }

    handleRefresh() {
        this.props.handleFetchClick(this.props.index, this.props.type, this.props.id);
    }

    handleSave() {
        this.props.handleSaveClick(this.props.changed_doc);
    }

    showSettingsDialog() {
        this.setState({settings_dialog_open: true});
    }

    closeSettingsDialog() {
        this.setState({settings_dialog_open: false});
    }

    render() {
        return (
            <Paper zDepth={1} rounded={false} circle={false}>
                <Toolbar style={{backgroundColor: colors.cyan700}}>
                    <ToolbarGroup firstChild={true} float="left">
                        <ToolbarTitle text="{editor}" style={{left: 20, color: colors.white}}/>
                        <Path onComplete={this.props.handleFetchClick}/>
                    </ToolbarGroup>
                    <ToolbarGroup float="right">
                        <FontIcon className="material-icons" onClick={this.handleRefresh.bind(this)}>refresh</FontIcon>
                        <FontIcon className="material-icons" onClick={this.handleSave.bind(this)}>done</FontIcon>
                        <FontIcon className="material-icons" onClick={this.showSettingsDialog.bind(this)}>settings</FontIcon>
                    </ToolbarGroup>
                </Toolbar>
                <SettingsDialog {...this.props} open={this.state.settings_dialog_open} close={this.closeSettingsDialog.bind(this)}/>
            </Paper>
        );
    }
}

module.exports = Header;

