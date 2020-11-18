import React, { Component } from 'react';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  render () {
    return (
      <nav>
          <div className="bg-blue-300">
              <div>
                  <a href="/">Home</a>
              </div>
              <div>
                  <a href="/Photos">Photos</a>
              </div>
              <div>
                  <a href="/Work">Work</a>
              </div>
              <div>
                  <a href="/Notes">Notes</a>
              </div>
          </div>
      </nav>
    );
  }
}
