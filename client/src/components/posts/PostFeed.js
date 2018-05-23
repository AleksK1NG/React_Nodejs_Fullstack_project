import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';

class PostFeed extends Component {


  render() {
    const { posts } = this.props;
    const {} = this.props;

    return (
      posts.map(post => <PostItem key={post._id} post={post} />)
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed);