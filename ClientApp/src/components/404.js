import React, { Component } from 'react';

import { NavMenu } from './NavMenu';

export class FourZeroFour extends Component {
  static displayName = FourZeroFour.name;

  render () {
    return (

    <div id="home">
        <div></div>
        <div>
        <NavMenu />
            <main>
                <h1>Page Not Found</h1>
                
            </main>
        </div>
    </div>

    );
  }
}
