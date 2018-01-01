import React, { Component } from 'react';
import BookList from '../containers/book-list';
import BookDeatil from '../containers/book-detail';

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
        <BookDeatil />
      </div>
    );
  }
}
