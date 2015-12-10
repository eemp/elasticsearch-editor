import React from 'react'
import { render } from 'react-dom'

var Header = require('./header');
var Document = require('./doc');

class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Header/>
                <Document/>
            </div>
        );
    }
}

render(
    <App/>,
    document.getElementById('react-container')
);

