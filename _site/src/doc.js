import React from 'react'
import { render } from 'react-dom'

import AceEditor from 'react-ace'
import json_mode from 'react-ace/node_modules/brace/mode/json'
import github_theme from 'react-ace/node_modules/brace/theme/github'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

var editor_demo_data = {
    id: 1,
    name: 'Hello, World!',
    description: {
        desc_type : 'greeting',
        usage : 'first ever'
    }
},
editor_demo_mapping = {
    "properties" : {
        "id" : {
            "type" : "string",
            "index" : "not_analyzed"
        },
        "name" : {
            "type" : "string",
            "analyzer" : "snowball"
        },
        "description" : {
            "type" : "object",
            "properties" : {
                "desc_type" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                },
                "usage" : {
                    "type" : "string"
                }
            }
        }
    }
};

for(var k = 0; k < 1000; k++) {
    var key = 'key_' + k;
    editor_demo_data[key] = k;
}

class Document extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doc: this.props.doc || editor_demo_data,
            mapping: editor_demo_mapping,
        };
    }

    componentDidMount() {
        this.setState({
            doc: this.props.doc || editor_demo_data,
            mapping: editor_demo_mapping,
        });
    }

    shouldComponentUpdate(nextProps) {
        return this.props.id !== nextProps.id || nextProps.force;
    }

    handleChange(newValue) {
        this.props.handleDocumentChange(newValue);
    }

    render() {
        let self = this;
        
        return (
            <section id="doc">
                <Tabs selectedIndex={0}>
                    <TabList>
                        <Tab>Document</Tab>
                        <Tab>Mapping</Tab>
                    </TabList>
                    <TabPanel>
                        <AceEditor
                            mode="json"
                            theme="github"
                            name="editor"
                            width="97%"
                            height="79vh"
                            showPrintMargin={false}
                            editorProps={{$blockScrolling: true}}
                            ref="doc"
                            value={JSON.stringify(self.props.doc || self.state.doc, null, 4)}
                            onChange={this.handleChange.bind(this)}
                        />
                    </TabPanel>
                    <TabPanel>
                        <AceEditor
                            mode="json"
                            theme="github"
                            name="editor"
                            width="97%"
                            height="79vh"
                            showPrintMargin={false}
                            readOnly={true}
                            editorProps={{$blockScrolling: true}}
                            value={JSON.stringify(self.state.mapping, null, 4)}
                        />
                    </TabPanel>
                </Tabs>
            </section>
        );
    }
}

module.exports = Document;

