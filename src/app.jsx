import React from 'react'
import { render } from 'react-dom'

var Document = require('./doc.jsx');

class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Document/>
            </div>
        );
    }
}

render(
    <App/>,
    document.getElementById('react-container')
);

