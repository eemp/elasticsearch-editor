import React from 'react'
import { render } from 'react-dom'

class Header extends React.Component {
    componentDidMount() {
        $(".button-collapse").sideNav();
    }

    render() {
        return (
            <header>
                <nav className="teal lighten-1">
                    <div className="nav-wrapper">
                        <a className="brand-logo">{"{ Scribe }"}</a>
                        <a href="#" data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a><i className="material-icons">search</i></a></li>
                            <li><a><i className="material-icons">refresh</i></a></li>
                            <li><a><i className="material-icons">done</i></a></li>
                            <li><a><i className="material-icons">more_vert</i></a></li>
                        </ul>
                        <ul className="side-nav" id="mobile-nav">
                            <li><a>Search</a></li>
                            <li><a>Refresh</a></li>
                            <li><a>Save</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

module.exports = Header;

