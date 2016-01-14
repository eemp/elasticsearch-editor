import React from 'react'
import { render } from 'react-dom'

import Paper from 'material-ui/lib/paper'

import colors from 'material-ui/lib/styles/colors'

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
        console.info('Enabling basic autocompletion...');

        this.refs.main.editor.setOption('enableBasicAutocompletion', true);
    }

    handleChange(newValue) {
        this.props.handleDocumentChange(newValue);
    }

    renderInfo() {
        return (
            <Paper zDepth={1} circle={false} rounded={false} key="info" style={{width: '99vw'}}>
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
            </Paper>
        );
    }

    renderDoc() {
        return (
            <Paper zDepth={1} circle={false} rounded={false} key="main" style={{width: '50%', float: 'left', padding: '5px'}}>
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
            </Paper>
        );
    }

    renderMapping() {
        return (
            <Paper zDepth={1} circle={false} rounded={false} key="mapping" style={{width: '50%', float: 'right', padding: '5px'}}>
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
            </Paper>
        );
    }

    handleTabChange(val) {
        this.setState({
            tab: val
        });
    }

    render() {
        let docs = this.props.doc && this.props.mapping ?
            [this.renderDoc(), this.renderMapping()] : 
            [this.renderInfo()];

        return (
            <Paper zDepth={0} circle={false} rounded={true} style={{marginTop: '10px'}}>
                {docs}
            </Paper>
        );
    }
}

module.exports = Document;

