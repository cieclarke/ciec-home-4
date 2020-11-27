import React, { Component, useState } from 'react';

import { NavMenu } from './NavMenu';

export class Notes extends Component {
    static displayName = Notes.name;

    constructor(props) {
        super(props);
        this.state = {
            tumblr: { response: { posts: [] } } };
    }

    componentDidMount() {

        this.loadBlogs();

    }

    loadBlogs() {

        fetch('/Tumblr/Links')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({ tumblr: data })
            });
    }

    render() {

        return (

            <div className="relative">
                <div className="container opacity-25 bg-home-page bg-center bg-no-repeat h-screen min-w-full"></div>
                <div className="absolute top-0 left-0 w-full">
                    <div>
                        <NavMenu />
                        <h1 className=" p-2 cc-notes">Collected articles and links</h1>
                        <div className="pb-2 divide-solid divide-y-2 divide-hotpink-700">
                        {this.state.tumblr.response.posts.map((post) => (
                            <div className="p-2 text-rosybrown-100">{post.title}</div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
