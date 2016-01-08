import React from 'react'
import { render } from 'react-dom'

import Paper from 'material-ui/lib/paper'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'

import ace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/github'

import 'brace/ext/language_tools'
let langTools = ace.acequire('ace/ext/language_tools');

import { INSTRUCTIONS } from '../constants'

import MappingPropsCompleter from '../completers/mapping_props'
let mpc = new MappingPropsCompleter();
let mappingBasedCompleter = mpc.aceCompleter();
langTools.addCompleter(mappingBasedCompleter);

const activeTabStyles = {
    backgroundColor: 'rgb(232,232,232)', 
    color: 'rgba(0, 0, 0, .40)',
}, inactiveTabStyles = {
    backgroundColor: '#fff', 
    color: 'rgba(0, 0, 0, .40)',
};

class Document extends React.Component {
    constructor() {
        super();
        this.state = { tab: 'main' };
    }
    
    componentDidMount() {
        this.refs.main.editor.setOption('enableBasicAutocompletion', true);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let updateFlag = (
            this.props.id !== nextProps.id || 
            this.state.tab !== nextState.tab ||
            nextProps.force
        );
        
        /* add a custom mapping based completer */
        if(updateFlag && nextProps.mapping) {
            mpc.setMapping(nextProps.mapping);
        }

        return updateFlag;
    }

    handleChange(newValue) {
        this.props.handleDocumentChange(newValue);
    }

    renderInfoTab() {
        return (
            <Tab label="info" key="main" value="main" style={this.state.tab === 'main' ? activeTabStyles : inactiveTabStyles}>
                <AceEditor
                    value={INSTRUCTIONS}
                    mode="text"
                    readOnly={true}
                    theme="github"
                    name="info-editor"
                    width="100%"
                    showPrintMargin={false}
                    editorProps={{$blockScrolling: Infinity}}
                    ref="main"
                />
            </Tab>
        );
    }

    renderDocTab() {
        return (
            <Tab label={this.props.id} key="main" value="main" style={this.state.tab === 'main' ? activeTabStyles : inactiveTabStyles}>
                <AceEditor
                    value={this.props.changed_doc || JSON.stringify(this.props.doc, null, 2)}
                    mode="json"
                    readOnly={false}
                    onChange={this.handleChange.bind(this)}
                    theme="github"
                    name="doc-editor"
                    width="100%"
                    showPrintMargin={false}
                    editorProps={{$blockScrolling: Infinity}}
                    ref="main"
                />
            </Tab>
        );
    }

    renderMappingTab() {
        return (
            <Tab label={this.props.type} key="mapping" value="mapping" style={this.state.tab === 'mapping' ? activeTabStyles : inactiveTabStyles}>
                <AceEditor
                    mode="json"
                    theme="github"
                    name="mapping-editor"
                    width="100%"
                    showPrintMargin={false}
                    readOnly={true}
                    editorProps={{$blockScrolling: Infinity}}
                    value={JSON.stringify(this.props.mapping, null, 4)}
                />
            </Tab>
        );
    }

    handleTabChange(val) {
        this.setState({
            tab: val
        });
    }

    render() {
        let self = this;

        let tabs = [];

        if(self.props.doc)
            tabs.push(this.renderDocTab());
        else
            tabs.push(this.renderInfoTab());

        if(self.props.mapping)
            tabs.push(this.renderMappingTab());

        return (
            <Paper zDepth={0} circle={false} rounded={true}>
                <Tabs 
                  value={this.state.tab}
                  onChange={this.handleTabChange.bind(this)}
                  inkBarStyle={{backgroundColor: '#00bcd4'}}
                  contentContainerStyle={{padding: 5, border: '1px solid #ddd', borderRadius: '2px'}}>
                    {tabs}
                </Tabs>
            </Paper>
        );
    }
}

module.exports = Document;

