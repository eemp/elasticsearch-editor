import React from 'react'
import { render } from 'react-dom'

class Header extends React.Component {
    render() {
        return (
            <header>
                <h1>Scribe</h1>
                <ul>
                    <li>Refresh</li>
                    <li>Save</li>
                </ul>
            </header>
        );
    }
}

module.exports = Header;

