import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/_index.css';
import registerServiceWorker from './registerServiceWorker';
import AppWrapper from './redux/AppWrapper'; 

ReactDOM.render((
    <AppWrapper />
), document.getElementById('root')); 

registerServiceWorker();
