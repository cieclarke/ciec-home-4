import React, { Component } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { Photos } from './components/Photos';
import { Work } from './components/Work';
import { Notes } from './components/Notes';
import { FourZeroFour } from './components/404';

import './css/main.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/Photos' component={Photos} />
        <Route path='/Work' component={Work} />
        <Route path='/Notes' component={Notes} />
        <Route path="*" component={FourZeroFour} />
      </Switch>
    );
  }
}
