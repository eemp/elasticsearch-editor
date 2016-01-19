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

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            index: '',
            mapping: '',
            id: '',
            mappingOpts: [],
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    handleRefresh() {
        this.props.handleFetchClick(this.props.index, this.props.type, this.props.id);
    }

    handleSave() {
        this.props.handleSaveClick(this.props.changed_doc);
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
                    </ToolbarGroup>
                </Toolbar>
            </Paper>
        );
    }
}

module.exports = Header;

