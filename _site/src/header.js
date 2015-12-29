import React from 'react'
import { render } from 'react-dom'

class Header extends React.Component {
    componentDidMount() {
        $(".button-collapse").sideNav();
        $(".dropdown-button").dropdown({
            hover: true,
            constrain_width: false,
            belowOrigin: true,
        });
    }

    handleSearch() {
        this.props.handleFetchClick(this.refs.index.value, this.refs.type.value, this.refs.id.value);
    }

    render() {
        // TODO: removed hardcoded default values for type and id inputs
        return (
            <header>
                <form id="search-dropdown" className="scribe-opts dropdown-content col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="index" type="text" ref="index" defaultValue="test-index" required></input>
                            <label className="active" htmlFor="index">Index</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="type" type="text" ref="type" defaultValue="test-mapping-1" required></input>
                            <label className="active" htmlFor="type">Type</label>
                        </div>
                    </div>
                    <div className="last row">
                        <div className="input-field col s12">
                            <input id="doc-id" type="text" ref="id" defaultValue="2" required></input>
                            <label className="active" htmlFor="doc-id">ID</label>
                        </div>
                    </div>
                    <div className="button row right-align">
                        <a onClick={this.handleSearch.bind(this)} className="waves-effect waves-light btn">Retrieve</a>
                    </div>
                </form>
                <nav className="teal lighten-1">
                    <div className="nav-wrapper">
                        <a className="brand-logo">{"{ Scribe }"}</a>
                        <a href="#" data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#" className="dropdown-button" data-activates="search-dropdown"><i className="material-icons">search</i></a></li>
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

