import React, { Component } from 'react';

import { NavMenu } from './NavMenu';

export class Photos extends Component {
    static displayName = Photos.name;

    constructor(props) {
        super(props);
        this.state = { photos: [] };    
    }

    componentDidMount() {
        fetch('/Flickr/RecentPhotos/4')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({ photos: data })
            })
    }

    render() {
        return (

            <div id="home">
                <div></div>
                <div>
                    <NavMenu />
                    {this.state.photos.map((photo) => (
                        <div>
                            <p>{photo.Title}</p>
                            <img src={photo.SizeURLs.MEDIUM} />
                        </div>
                    ))}
                    
                </div>
            </div>

        );
    }
}
