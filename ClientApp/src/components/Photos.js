import React, { Component, useState } from 'react';
import Flickr from '../lib/flickr';
import { NavMenu } from './NavMenu';

export class Photos extends Component {
  static displayName = Photos.name;
  

  constructor(props) {
    super(props);
    this.state = { photos: [], tags: [], selectedTag: "", loading: true }
    //const [photos, updatePhotos] = useState([]);
  }

  componentDidMount() {
    this.getData();
  }
  
  async getData() {
    let { tag } = this.props.match.params;
    tag = tag === undefined ? "all" : tag;
    const allPhotos = await Flickr("61777036f4ecf11adb192f7156c6e92e", "https://api.flickr.com/services/rest", "67828456@N07");
    
    const tags = allPhotos.map((photo) => { return photo.tags; })
    .flat()
    .filter((word) => { return word.length > 0; })
    .filter((tag, i, arr) => { return arr.indexOf(tag) === i; });

    const taggedPhotos = allPhotos.filter(
      (photo) => { return photo.tags.indexOf(tag) >= 0; }
    );

    const photos = tags.indexOf(tag) >= 0 ? taggedPhotos : allPhotos;

    this.setState({ photos, tags, selectedTag: tag, loading: false });
    
  }

  static imageClick = (src, event) => {
    window.location.href = src;
  }

  static renderData (photos, tags, selectedTag) {
    console.log(tags);
    console.log(selectedTag);
    return (
      <main>
        { tags.length > 0 ?
          <div id="tags">
            { selectedTag === "all" ? 
              <div id="selected"><a href="/Photos">all</a></div> :
              <div><a href="/Photos">all</a></div>
            }
            { tags.map(tag =>
                tag.toUpperCase() === selectedTag.toUpperCase() ?
                <div id="selected">
                  
                  <a href={`/Photos/${tag}`}>{tag}</a></div> :
                <div><a href={`/Photos/${tag}`}>{tag}</a></div>

            )}
          </div>
          :
          <h1>All photos from albums</h1>

        }
         <div id="images">
            {photos.map(photo => {
                  const style = {
                      "background-image": "url(' " + photo.sizes['Medium'].source + "')"
                  };
                  return (
                  <div class="photoDisplay" style={style} onClick={(e) => this.imageClick(photo.sizes['Large'].source, e)} >
                      <h3>{photo.title}</h3>
                      <a href={ photo.sizes['Large'].source }>
                          <img alt={photo.title} src={ photo.sizes['Medium'].source } />
                      </a>
                      <dl>
                          <dt>Focal Length</dt>
                          <dd>{ photo.exif.FocalLength }</dd>
                          <dt>ISO</dt>
                          <dd>{ photo.exif.ISO }</dd>
                          <dt>Exposure Time</dt>
                          <dd>{ photo.exif.ExposureTime }</dd>
                          <dt>F</dt>
                          <dd>{ photo.exif.FNumber }</dd>
                          <dt>Lens Model</dt>
                          <dd>{ photo.exif.LensModel }</dd>
                      </dl>
                  </div>
                  )}
              )}
          </div>
      </main>

    );
  }

  static renderLoading () {
    return (
      <p><em>Loading...</em></p>
    )
  }

  render () {

    let contents = this.state.loading
    ? Photos.renderLoading()
    : Photos.renderData(this.state.photos, this.state.tags, this.state.selectedTag);

    return (
      <div id="photos">
        <div></div>
        <div>
          <NavMenu />
          {contents}
        </div>
      </div>

    );
  }

}
