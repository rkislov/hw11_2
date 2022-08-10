import React, {Fragment} from 'react';
import ServiceEdit from './components/ServiceEdit';
import ServiceList from './components/ServiceList';
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/">
            <Redirect to="/services" />
          </Route>
          <Route path="/services" exact component={ServiceList} />
          <Route path="/services/:id" component={ServiceEdit} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
