import React from 'react'
import { render } from 'react-dom'

import ace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/theme/github'

import 'brace/ext/language_tools'
let langTools = ace.acequire('ace/ext/language_tools');

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { INSTRUCTIONS } from '../constants'

import MappingPropsCompleter from '../completers/mapping_props'
let mpc = new MappingPropsCompleter();
let mappingBasedCompleter = mpc.aceCompleter();
langTools.addCompleter(mappingBasedCompleter);

class Document extends React.Component {
    componentDidMount() {
        this.refs.doc.editor.setOption('enableBasicAutocompletion', true);
    }

    shouldComponentUpdate(nextProps) {
        let updateFlag = (this.props.id !== nextProps.id || nextProps.force);
        
        /* add a custom mapping based completer */
        if(updateFlag && nextProps.mapping) {
            mpc.setMapping(nextProps.mapping);
        }

        return updateFlag;
    }

    componentDidUpdate() {
        $('ul.tabs').tabs();
    }

    handleChange(newValue) {
        this.props.handleDocumentChange(newValue);
    }

    renderDocTab(name, props) {
        let tab = (
            <li className="tab col s3" key="doc">
                <a className="teal-text text-lighten-1" href="#doc">{name}</a>
            </li>
        );
        let content = (
            <div id="doc" className="col s12" key="doc">
                <AceEditor
                    {...props}
                    theme="github"
                    name="doc-editor"
                    width="97%"
                    height="79vh"
                    showPrintMargin={false}
                    editorProps={{$blockScrolling: Infinity}}
                    ref="doc"
                />
            </div>
        );

        return {
            tab_li: tab,
            tab_content: content,
        };
    }

    renderMappingTab(name) {
        let tab = (
            <li className="tab col s3" key="mapping">
                <a href="#mapping" className="teal-text text-lighten-1">{name}</a>
            </li>
        );
        let content = (
            <div id="mapping" className="col s12" key="mapping">
                <AceEditor
                    mode="json"
                    theme="github"
                    name="mapping-editor"
                    width="97%"
                    height="79vh"
                    showPrintMargin={false}
                    readOnly={true}
                    editorProps={{$blockScrolling: Infinity}}
                    value={JSON.stringify(this.props.mapping, null, 2)}
                />
            </div>
        );
        
        return {
            tab_li: tab,
            tab_content: content,
        };
    }

    render() {
        let self = this;
        
        let tabs = [], panels = [], tabInfo;
        
        let mainTabProps; // first/main tab info
        if(self.props.doc) {
            mainTabProps = {
                value: JSON.stringify(self.props.doc, null, 2),
                mode: 'json',
                readOnly: false,
                onChange: self.handleChange.bind(self),
            };
        }
        else {
            mainTabProps = {
                value: INSTRUCTIONS,
                mode: 'text',
                readOnly: true,
            }
        }
        tabInfo = self.renderDocTab(self.props.id || 'INFO', mainTabProps);
        tabs.push(tabInfo.tab_li);
        panels.push(tabInfo.tab_content);

        if(self.props.mapping) {
            tabInfo = self.renderMappingTab(self.props.type);
            tabs.push(tabInfo.tab_li);
            panels.push(tabInfo.tab_content);
        }

        tabs.push(
            <div key="indicator" className="indicator teal lighten-1" style={{"zIndex": 1}}>
            </div>
        );

        return (
            <div id="doc-tabs" className="row">
                <div className="col s12">
                    <ul className="tabs">
                        {tabs}
                    </ul>
                    {panels}
                </div>
            </div>
        );
    }
}

module.exports = Document;

