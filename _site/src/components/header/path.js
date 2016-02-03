import React from 'react'

import FontIcon from 'material-ui/lib/font-icon'
import CustomTextField from './custom-textfield'

class Path extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    
    componentDidUpdate() {
        if(this.state.index && this.state.type && !this.state.id) {
            this.refs.id.focus();
        }
        else if(this.state.index && !this.state.type) {
            this.refs.type.focus();
        }
        else if(!this.state.index) {
            this.refs.index.focus();
        }
    }

    setIndex(idx) {
        this.setState({index: idx});
    }

    setType(type) {
        this.setState({type: type});
    }

    setID(id) {
        this.setState({id: id});
    }

    autocompleteIndex(input, cb) {
        let opts = Object.keys(aliases).concat(indices).sort();
        for(let k = 0; k < opts.length; k++) {
            if(opts[k].indexOf(input) === 0) return cb(null, opts[k]);
        }
        return cb(null, '');
    }
    
    autocompleteMapping(input, cb) {
        let index = aliases[this.state.index] || this.state.index;
        let opts = Object.keys(mappings[index].mappings).sort();
        for(let k = 0; k < opts.length; k++) {
            if(opts[k].indexOf(input) === 0) return cb(null, opts[k]);
        }
        return cb(null, '');
    }

    editPath(idx) {
        if(idx === 0) // modify from index onwards
            this.setState({index: null, prev_index : this.state.index, type: null, id: null});
        else if(idx === 1)
            this.setState({type: null, prev_type: this.state.type, id: null});
        else
            this.setState({id: null, prev_id: this.state.id});
    }

    renderPrefix(prefix) {
        let self = this;
        let prefixSpans = [];
        for(let k = 0; k < prefix.length; k++) {
            let piece = prefix[k];
            let path = piece === self.state.id ? piece : piece + '/';
            prefixSpans.push(
                <span key={'path-' + k} onClick={self.editPath.bind(self, k)}>{path}</span>
            );
        };
        return prefixSpans;
    }

    render() {
        let self = this;
        let prefix = [];
        let inputField = (
            <CustomTextField 
                hintText="index"
                value={this.state.prev_index}
                autocompleteHandler={this.autocompleteIndex.bind(this)}
                onComplete={this.setIndex.bind(this)}
                ref="index"
                key="index"
                style={{marginLeft: '5px'}} inputStyle={{color: '#eff'}} hintStyle={{color: '#ccc'}} underlineFocusStyle={{borderColor: '#fff'}}/>
        );

        if(this.state.index) {
            prefix.push(this.state.index);
            inputField = (
                <CustomTextField 
                    hintText="mapping"
                    value={this.state.prev_type}
                    autocompleteHandler={this.autocompleteMapping.bind(this)}
                    onComplete={this.setType.bind(this)}
                    ref="type"
                    key="type"
                    style={{marginLeft: '5px'}} inputStyle={{color: '#eff'}} hintStyle={{color: '#ccc'}} underlineFocusStyle={{borderColor: '#fff'}}/>
            );
        }
        if(this.state.type) {
            prefix.push(this.state.type);
            inputField = (
                <CustomTextField 
                    hintText="ID"
                    value={this.state.prev_id}
                    onComplete={this.setID.bind(this)}
                    ref="id"
                    key="id"
                    style={{marginLeft: '5px'}} inputStyle={{color: '#eff'}} hintStyle={{color: '#ccc'}} underlineFocusStyle={{borderColor: '#fff'}}/>
            );
        }

        if(this.state.id) {
            prefix.push(this.state.id);
            inputField = null;

            if(this.props.onComplete) {
                this.props.onComplete(this.state.index, this.state.type, this.state.id);
            }
        }

        // prefix = prefix.join('/') + (this.state.id ? '' : '/');

        return (
            <div style={{display: 'inline', marginLeft: '20px', lineHeight: '56px'}}>
                {this.renderPrefix(prefix)}
                {inputField}
            </div>
        );
    }
}

export default Path;

