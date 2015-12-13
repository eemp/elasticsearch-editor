import React from 'react'
import { render } from 'react-dom'

const Header = require('./header');
const Document = require('./doc');

class App extends React.Component {
    componentDidMount() {
        $(document).on('scroll', function() {
            let header = $('header');
            let container = $('#app-container');

            console.log(header.offset().top, container.offset().top);
            if(header.offset().top > container.offset().top) header.addClass('shrink');
            else header.removeClass('shrink');
        });
    }

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
    document.getElementById('app-container')
);

