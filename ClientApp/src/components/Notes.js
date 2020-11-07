import React, { Component } from 'react';
import Tumblr from '../lib/tumblr';
import { NavMenu } from './NavMenu';

export class Notes extends Component {
  static displayName = Notes.name;

  constructor(props) {
    super(props);
    this.state = { posts: [], loading: true };
  }

  componentDidMount() {
    this.getData();
  }

  static renderLoading () {
    return (
      <div><em>Loading...</em></div>
    )
  }
  async getData() {

    const posts = await Tumblr(process.env.REACT_APP_TUMBLR_API);
    console.log(posts);
    this.setState({ posts: posts.response.posts, loading: false });
    
  }

  static renderData(posts) {
    return (
      <div>
        {
          posts.map(post => 
           <div>
            <a href={post.url}>
                {post.title}    
            </a>
          </div>)
        }
      </div>
    );
  }

  render () {
      
    let contents = this.state.loading
    ? Notes.renderLoading()
    : Notes.renderData(this.state.posts);

  return (
    <div id="notes">
        <div></div>
        <div>
        <NavMenu />
            <main>
              <h1>Collected articles and links</h1>
              {contents}
            </main>
        </div>
    </div>

    );
  }
}
