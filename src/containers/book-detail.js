import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {
  render() {
    if (!this.props.activeBook) return <p>Select a book to get started!</p>

    return (
      <div>
        <h3>Book Details:</h3>
        <p>Title: {this.props.activeBook.title}</p>
        <p>Pages: {this.props.activeBook.page}</p>
      </div>
    );
  }
}

// state is action.payload
const mapStateToProps = state => ({
  activeBook: state.activeBook,
});

export default connect(mapStateToProps)(BookDetail);
