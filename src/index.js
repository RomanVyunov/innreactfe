import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

//const Router = ReactRouterDOM.BrowserRouter;
//const Route = ReactRouterDOM.Route;
//const Switch = ReactRouterDOM.Switch;
//ReactDOM.render(<App name="HEEEEEY" />, document.getElementById('root'));
 /*ReactDOM.render(<Router>
                    <Switch>
                        <Route exact path="/" component={<App name="HEEEEEY" />} />
                        <Route path="/about" component={About} />
                    </Switch>
                 </Router>, document.getElementById('root'));*/

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
