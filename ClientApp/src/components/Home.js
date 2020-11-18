import React, { Component } from 'react';

import { NavMenu } from './NavMenu';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (

    <div id="home">
        <div></div>
        <div>
        <NavMenu />
            <main>
                <h1>This is the website of Chris Clarke.</h1>
                <div>
                        <p>
                        The website is using APIs from Flickr and Tumblr to manage the content.
                        Using third party APIs for website content is a simple way to manage content in a website.
                        The photos from Flickr are taken by me.
                        </p>
                        <p>
                        Developed with ReactJS on ASP.NET Core using TailwindCSS, the website displays the information from the external APIs.
                        A systemctl service on rasbperry pi server regulary pulls the master branch from a GIT repository and runs this build and deploy.
                        </p>
                    </div>
            </main>
        </div>
    </div>

    );
  }
}
