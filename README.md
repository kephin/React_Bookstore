# Redux

## Reducer

:star: A reducer is a function that returns a piece of the application state.

To create a reducer, it's actually a two step process.
1. Create the reducer, which is just a function

```javascript
// inside reducer/reducer_books.js
export default function () {
  return [
    { title: "The good part of JavaScript", page: 100 },
    { title: "Performance in Action", page: 99 },
    { title: "You Don't Know JS", page: 98 },
    { title: "Introduction to Algorithms", page: 1500 },
  ];
}
```

2. Wire into our application

```javascript
// inside reducer/index.js
import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';

const rootReducer = combineReducers({
  books: BooksReducer,
});

export default rootReducer;
```

## Container

A container is just a component that has direct access to the state that is produced by redux. We can call container as the *smart component* and the normal component as *domb component*.

Which component do we want to promote to a container? It varies. In general we want the *most parent component* that cares about a particular piece of state to be a container.

How to promote a domb component to a smart component? Two steps.

1. Take our application state as an argument and whatever gets returned from here will show up as props inside of BookList

```javascript
function mapStateToProps(state) {
  return {
    books: state.books,
  };
}
```

2. Export the container

```javascript
import { connect } from 'react-redux';

export default connect(mapStateToProps)(BookList);
```

If our state ever changes, our container will instantly re-render with the new list of books.
