import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions'

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPost();
  }

  render() {
    return (
      <div>
        Posts Index
      </div>
    );
  }
}

export default connect(null, { fetchPost })(PostsIndex);
