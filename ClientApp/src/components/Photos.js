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
            isAlbumsLoading: true
        };
    }

    componentDidMount() {

        this.loadRecentPhotos(3);
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

    loadPhotos(album) {
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

    loadRecentPhotos(count) {
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

    renderLoader() {
        return <div>
            Loading
        </div>
    }

    renderContent() {
        return <div>
            <div className={this.state.selectedAlbum.id === 0 ? "cc-photos-selected" : "cc-photos"} >
                <button onClick={() => { this.loadRecentPhotos(3) }}>Recent</button>
            </div>
            {this.state.albums.map((album) => (
                <div className={this.state.selectedAlbum.id === album.id ? "cc-photos-selected" : "cc-photos"} >
                    <button onClick={() => { this.loadPhotos(album) }}>{album.title}</button>
                </div>
            ))}

            {this.state.photos.map((photo) => (
                <div>
                    <div className="bg-blue-3">{photo.Title}</div>
                    <img alt={photo.Title} src={photo.SizeURLs.MEDIUM} />
                </div>
            ))}

        </div>
    }

    render() {

        return (

            <div className="relative">
                <div className="container opacity-25 bg-home-page bg-center bg-no-repeat h-screen min-w-full"></div>
                <div className="absolute top-0 left-0 w-full">
                    <div>
                        <NavMenu />
                    {this.state.isAlbumsLoading && this.state.isPhotosLoading ? this.renderLoader() : this.renderContent()}
                    </div>
                </div>
            </div>

        );
    }
}
