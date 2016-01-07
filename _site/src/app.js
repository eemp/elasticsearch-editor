import React from 'react';

import { connect } from 'react-redux'

import Header from './components/header';
import Document from './components/doc';

import { getDocument, getMapping, saveDocument, handleDocumentChange } from './actions';

// following 2 lines necessary to make tabs work
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// set up some basic Elasticsearch information
import './globals';

class App extends React.Component {
    componentDidMount() {
        $(document).on('scroll', function() {
            let header = $('header');
            let container = $('#app-container');

            if(header.offset().top > container.offset().top) header.addClass('shrink');
            else header.removeClass('shrink');
        });
    }

    render() {
        let dispatch = this.props.dispatch;
        
        return (
            <div id="app" >
                <Header {...this.props} handleSaveClick={(data) => {
                        dispatch(saveDocument(this.props.index, this.props.type, this.props.id, data))
                        dispatch(getMapping(index, type));
                    }
                } handleFetchClick={(index, type, id) => {
                        dispatch(getDocument(index, type, id));
                        dispatch(getMapping(index, type));
                    }
                } />
                <Document {...this.props} handleDocumentChange={text =>
                    dispatch(handleDocumentChange(text))
                }/>
            </div>
        );
    }
}

function select(state) {
    var data = state.scribe || {};
    return {
        index: data.index,
        type: data.type,
        id: data.id,
        doc: data.doc,
        mapping: data.mapping,
        changed_doc: data.changed_doc,
        force: data.force,
    };
}

export default connect(select)(App);
