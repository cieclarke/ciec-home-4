import React, { Component } from 'react';

import { NavMenu } from './NavMenu';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="relative">
                <div className="container opacity-25 bg-home-page bg-center bg-no-repeat h-screen min-w-full"></div>
                <div className="absolute top-0 left-0 w-full">
                    <div>
                        <NavMenu />
                        <main>
                            <h1 className="cc-home p-2">This is the website of Chris Clarke.</h1>
                            <div>
                                <p className="p-2 text-justify text-rosybrown-100">
                                    The website is using APIs from Flickr and Tumblr to manage the content.
                                    Using third party APIs for website content is a simple way to manage content in a website.
                                    The photos from Flickr are taken by me.
                            </p>
                                <p className="p-2 text-justify text-rosybrown-100">
                                    Developed with ReactJS on ASP.NET Core using TailwindCSS, the website displays the information from the external APIs.
                                    A systemctl service on rasbperry pi server regulary pulls the master branch from a GIT repository and runs this build and deploy.
                            </p>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

