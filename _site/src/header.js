import React from 'react'
import { render } from 'react-dom'

class Header extends React.Component {
    componentDidMount() {
        $(".button-collapse").sideNav();
    }

    handleSearch() {
        this.props.handleFetchClick(this.refs.type.value, this.refs.id.value);
    }

    render() {
        // TODO: removed hardcoded default values for type and id inputs
        return (
            <header>
                <nav className="teal lighten-1">
                    <div className="nav-wrapper">
                        <a className="brand-logo">{"{ Scribe }"}</a>
                        <a href="#" data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li className="no-bg">
                                <form className="scribe-opts right col s12">
                                    <div className="row">
                                        <div className="input-field col s8">
                                            <input id="type" type="text" ref="type" defaultValue="test-mapping-1" required></input>
                                            <label className="active" htmlFor="type">Type</label>
                                        </div>
                                        <div className="input-field col s4">
                                            <input id="doc-id" type="text" ref="id" defaultValue="2" required></input>
                                            <label className="active" htmlFor="doc-id">ID</label>
                                        </div>
                                    </div>
                                </form>
                            </li>
                            <li><a href="#" onClick={this.handleSearch.bind(this)}><i className="material-icons">search</i></a></li>
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

