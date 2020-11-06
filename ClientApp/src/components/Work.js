import React, { Component } from 'react';

import { NavMenu } from './NavMenu';

export class Work extends Component {
  static displayName = Work.name;

  render () {
    return (

    <div id="work">
        <div></div>
        <div>
        <NavMenu />
            <main>
              <h1>Projects & Work</h1>
              <div>
                  <a href="https://github.com/cieclarke/ciec-home-3">Website Source Code</a>
              </div>
              <div>
                  <span>Libert&egrave; d'Expression</span>
                  <p>A PHP project implementing the Yii MVC framework via Composer as dependency manager.</p>
                  <p>Worked on with a previous colleague <a href="https://www.nickbergquist.uk/">Nick Bergquist</a></p>
                  <p>
                      Avaiable to see here: <a href="http://www.libertedexpression.co.uk/">Libert&egrave; d'Expression</a>
                  </p>
              </div>
            </main>
        </div>
    </div>

    );
  }
}
