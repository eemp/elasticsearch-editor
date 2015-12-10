import React from 'react'
import { render } from 'react-dom'

class Document extends React.Component {
    constructor(props) {
        super(props);
        this.state = {msg: 'Loading...'};
    }

    componentDidMount() {
        this.setState({
            msg : 'Hello, World!',
        });
    }

    render() {
        return (
            <section id="doc">
                <p>{this.state.msg}</p>
            </section>
        );
    }
}

module.exports = Document;

