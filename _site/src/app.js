import React from 'react';

import { connect } from 'react-redux'

import Header from './header';
import Document from './doc';

import { getDocument, saveDocument, handleChange } from './actions';

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
                <Header id={this.props.id} type={this.props.type} handleSaveClick={data => 
                    dispatch(saveDocument(this.props.type, this.props.id, data))
                } handleFetchClick={(type, id) => 
                    dispatch(getDocument(type, id))
                } />
                <Document data={this.props.data} onChange={text =>
                    dispatch(handleChange(this.props.text))
                }/>
            </div>
        );
    }
}

function select(state) {
    return {
        id: state.scribe.id,
        type: state.scribe.type,
        // cleandata: state.cleandata,
        data: state.scribe.data,
    };
}

export default connect(select)(App);
