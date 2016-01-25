import React from 'react'
import { render } from 'react-dom'

import Paper from 'material-ui/lib/paper'

import colors from 'material-ui/lib/styles/colors'

import ace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/json'
import 'brace/mode/yaml'
import 'brace/theme/github'

import 'brace/ext/language_tools'
let langTools = ace.acequire('ace/ext/language_tools');

import yaml from 'js-yaml'

import { INSTRUCTIONS } from '../constants'

import MappingPropsCompleter from '../completers/mapping_props'
let mpc = new MappingPropsCompleter();
let mappingBasedCompleter = mpc.aceCompleter();
langTools.addCompleter(mappingBasedCompleter);

class Document extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        let updateFlag = (
            this.props.id !== nextProps.id || 
            nextProps.force
        );
        
        /* add a custom mapping based completer */
        if(updateFlag && nextProps.mapping) {
            mpc.setMapping(nextProps.mapping);
        }

        return updateFlag;
    }

    componentDidUpdate() {
        this.refs.main.editor.setOption('enableBasicAutocompletion', true);
    }

    handleChange(newValue) {
        this.props.handleDocumentChange(newValue);
    }

    renderInfo() {
        return (
            <Paper zDepth={1} circle={false} rounded={false} key="info" style={{width: '99vw', height: '100%'}}>
                <AceEditor
                    value={INSTRUCTIONS}
                    mode="text"
                    readOnly={true}
                    theme="github"
                    name="info-editor"
                    width="100%"
                    height="100%"
                    showPrintMargin={false}
                    editorProps={{$blockScrolling: Infinity}}
                    ref="main"
                />
            </Paper>
        );
    }

    renderDoc() {
        let val = this.props.changed_doc || (
            this.props.mode === 'yaml' ? 
                yaml.dump(this.props.doc) : 
                JSON.stringify(this.props.doc, null, 2)
        );
        return (
            <Paper zDepth={1} circle={false} rounded={false} key="main" style={{width: '50%', height: '100%', float: 'left', padding: '5px'}}>
                <AceEditor
                    value={val}
                    mode={this.props.mode}
                    readOnly={false}
                    onChange={this.handleChange.bind(this)}
                    theme="github"
                    name="doc-editor"
                    width="100%"
                    height="100%"
                    showPrintMargin={false}
                    editorProps={{$blockScrolling: Infinity}}
                    ref="main"
                />
            </Paper>
        );
    }

    renderMapping() {
        let val = this.props.mode === 'yaml' ? 
                yaml.dump(this.props.mapping) : 
                JSON.stringify(this.props.mapping, null, 2);
        return (
            <Paper zDepth={1} circle={false} rounded={false} key="mapping" style={{width: '50%', height: '100%', float: 'right', padding: '5px'}}>
                <AceEditor
                    mode={this.props.mode}
                    theme="github"
                    name="mapping-editor"
                    width="100%"
                    height="100%"
                    showPrintMargin={false}
                    readOnly={true}
                    editorProps={{$blockScrolling: Infinity}}
                    value={val}
                />
            </Paper>
        );
    }

    render() {
        let docs = this.props.doc && this.props.mapping ?
            [this.renderDoc(), this.renderMapping()] : 
            [this.renderInfo()];

        return (
            <Paper zDepth={0} circle={false} rounded={true} style={{marginTop: '60px', position: 'fixed', left: 0, top: 0, height: '90vh', width: '100vw'}}>
                {docs}
            </Paper>
        );
    }
}

module.exports = Document;

