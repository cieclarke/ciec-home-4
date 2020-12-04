import React, { Component, useState } from 'react';

import { NavMenu } from './NavMenu';

export class Photos extends Component {
    static displayName = Photos.name;

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            albums: [],
            selectedAlbum: { id: 0 },
            isPhotosLoading: true,
            isAlbumsLoading: true,
            isTouchMoved: false
        };
    }

    componentDidMount() {

        this.loadRecentPhotos(new Event("init"), 3);
        this.loadAlbums();

    }

    loadAlbums() {

        fetch('/Flickr/Albums')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({ albums: data });
                this.setState({ isAlbumsLoading: false });
            });

    }

    loadPhotos(e, album) {
        e.preventDefault();
        fetch('/Flickr/Photos/' + album.id)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({ photos: data });
                this.setState({ isPhotosLoading: false });
            })
        this.setState({ selectedAlbum: album })

    }

    loadRecentPhotos(e, count) {
        e.preventDefault();
        fetch('/Flickr/RecentPhotos/' + count)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({ photos: data });
                this.setState({ isPhotosLoading: false });
            });
        this.setState({ selectedAlbum: { id: 0 } })
    }

    goEvent(e, href) {
        if (!this.state.isTouchMoved) {
            window.location.href = href;
        }
    }

    moveEvent(e) {
        this.state.isTouchMoved = true;
    }

    startEvent(event) {
        this.state.isTouchMoved = false;
    }

    renderLoader() {
        return <div>
            Loading
        </div>
    }

    renderContent() {
        return (
            <div>
                <div className="flex flex-row w-full">
                    <div className={this.state.selectedAlbum.id === 0 ? "cc-photos-selected flex-1" : "cc-photos flex-1"} >
                        <a className="block h-full" href="#" onClick={(e) => { this.loadRecentPhotos(e, 3) }}>Recent</a>
                    </div>
                    {this.state.albums.map((album) => (
                        <div className={this.state.selectedAlbum.id === album.id ? "cc-photos-selected flex-1" : "cc-photos flex-1"} >
                            <a className="block h-full" href="#" onClick={(e) => { this.loadPhotos(e, album) }}>{album.title}</a>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col flex-wrap">
                    {this.state.photos.map((photo) => (
                        
                        <div className="flex-grow flex-1">
                            <div
                                onClick={(e) => { this.goEvent(e, photo.SizeURLs.MEDIUM) }}
                                onTouchend={(e) => { this.goEvent(e, photo.SizeURLs.MEDIUM) }}
                                onTouchstart={(e) => { this.startEvent(e) }}
                                onTouchmove={(e) => { this.moveEvent(e) }}
                                style={{ backgroundImage: "url('" + photo.SizeURLs.MEDIUM + "')" }}
                                className="bg-left-top bg-no-repeat bg-cover h-40 ">
                                <div className="bg-black bg-opacity-30">
                                    <p>{photo.Title}</p>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    render() {

        return (
            <div id="content" className="md:w-9/12 lg:w-10/12 mx-auto">
                <div></div>
                <div>
                    <div>
                        <NavMenu />
                        {this.state.isAlbumsLoading && this.state.isPhotosLoading ? this.renderLoader() : this.renderContent()}
                    </div>
                </div>
            </div>

        );
    }
}
