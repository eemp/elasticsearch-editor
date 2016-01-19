import React from 'react'

import TextField from 'material-ui/lib/text-field'

/*
 * expect following props:
 * autocompleteHandler
 * source
 */

class CustomTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hintText : this.props.hintText,
            source: this.props.source && Array.isArray(this.props.source) ? this.props.source : null,
        };
    }

    handleEnterKeyPress(e) {
        let val = this.state.hintText || this.refs.t.getValue();
        this.setState({value : val});
        if(this.props.onComplete) this.props.onComplete(val);
    }

    handleChange() {
        let self = this;
        let currentInput = this.refs.t.getValue();
        let source = this.state.source,
            autocompleteHandler = this.props.autocompleteHandler;

        if(currentInput) {
            if(source) {
                let foundAutocompleteOptions = false;
                for(let k = 0; k < source.length; k++) {
                    if(source[k].indexOf(currentInput) === 0) {
                        this.setState({hintText: source[k], value: currentInput});
                        foundAutocompleteOptions = true;
                        break;
                    }
                }

                if(!foundAutocompleteOptions) this.setState({hintText: '', value: currentInput});
            }
            else if(autocompleteHandler) {
                autocompleteHandler(currentInput, function(err, res) {
                    self.setState({hintText: res, value: currentInput});
                });
            }
            else {
                this.setState({hintText: '', value: currentInput});
            }
        }
        else {
            this.setState({hintText: this.props.hintText, value: currentInput});
        }
    }

    focus() {
        this.refs.t.focus();
    }

    render() {
        return (
            <TextField {...this.props} ref="t" onEnterKeyDown={this.handleEnterKeyPress.bind(this)} onChange={this.handleChange.bind(this)} value={this.state.value || this.props.value || ''} hintText={this.state.hintText} hintStyle={{opacity: 1}}/>
        );
    }
}

export default CustomTextField;
