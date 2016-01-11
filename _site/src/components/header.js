import React from 'react'
import { render } from 'react-dom'

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

    /*
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.id !== nextProps.id ||
            this.state.searchPopover !== nextState.searchPopover;
    }
    */

    showSearchOptions(e) {
        this.setState({
            searchPopover: e.currentTarget,
        });
    }

    hideSearchOptions(e) {
        this.setState({
            searchPopover: null,
        });
    }

    handleSearch() {
        this.props.handleFetchClick(this.refs.index.getValue(), this.refs.type.getValue(), this.refs.id.getValue());
        this.setState({
            searchPopover: null
        });
    }

    handleRefresh() {
        this.props.handleFetchClick(this.props.index, this.props.type, this.props.id);
    }

    handleSave() {
        this.props.handleSaveClick(this.props.changed_doc);
    }

    getMappingOpts(index) {
        index = aliases[index] ? aliases[index] : index;
        return mappings[index] && mappings[index].mappings ? Object.keys(mappings[index].mappings) : [];
    }

    updateState(key, t) {
        var stateUpdate = {};
        stateUpdate[key] = t;

        switch(key) {
            case 'index' :
                stateUpdate.mappingOpts = this.getMappingOpts(t).sort();
                break;
            case 'mapping' :
                // figure out id autocompletes?  but, too many
                break;
        }

        this.setState(stateUpdate);
    }

    render() {
        let indexUpdate = this.updateState.bind(this, 'index');
        let typeUpdate = this.updateState.bind(this, 'type');

        return (
            <Paper zDepth={1} rounded={false} circle={false}>
                <Toolbar style={{backgroundColor: colors.cyan700}}>
                    <ToolbarGroup firstChild={true} float="left">
                        <ToolbarTitle text="{editor}" style={{left: 20, color: colors.white}}/>
                    </ToolbarGroup>
                    <ToolbarGroup float="right">
                        <FontIcon className="material-icons" onClick={this.showSearchOptions.bind(this)}>search</FontIcon>
                        <FontIcon className="material-icons" onClick={this.handleRefresh.bind(this)}>refresh</FontIcon>
                        <FontIcon className="material-icons" onClick={this.handleSave.bind(this)}>done</FontIcon>
                    </ToolbarGroup>
                </Toolbar>
                <Popover open={this.state.searchPopover ? true : false}
                    anchorEl={this.state.searchPopover}
                    onRequestClose={this.hideSearchOptions.bind(this)}>
                    <Paper style={{padding:20}} zDepth={1}>
                        <Autocomplete hintText="index" onNewRequest={indexUpdate} dataSource={indices.concat(Object.keys(aliases)).sort()} ref="index" fullWidth={true} underlineStyle={{display: 'none'}}/>
                        <Divider/>
                        <Autocomplete hintText="type" onNewRequest={typeUpdate} dataSource={this.state.mappingOpts} ref="type" fullWidth={true} underlineStyle={{display: 'none'}}/>
                        <Divider/>
                        <TextField hintText="id" ref="id" fullWidth={true}  underlineStyle={{display: 'none'}}/>
                        <Divider style={{marginBottom: 10}}/>
                        <RaisedButton onClick={this.handleSearch.bind(this)} secondary={true} label="Retrieve"/>
                    </Paper>
                </Popover>
            </Paper>
        );
    }
}

module.exports = Header;

