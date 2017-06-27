import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import _ from 'lodash';

class PostIndex extends Component {
    //lifecycle method- is a function on a react class component that is automatically called by react
    //called one time
    componentDidMount() {
        this.props.fetchPosts();
    }
    renderPosts() {
      return _.map(this.props.posts, posts => {
          return (
              <li className="list-group-item" key={posts.id}>
                  <Link to={`/posts/${posts.id}`}>{posts.title}</Link>
              </li>
          )
        })
}

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link></div>
                <h3>Posts</h3>
                    <ul className="list-group">
                        {this.renderPosts()}
                    </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { posts: state.posts }
}


//connect is taking care of mapDispatchToProps for us. This is a shortcut.
export default connect(mapStateToProps, { fetchPosts: fetchPosts })(PostIndex);