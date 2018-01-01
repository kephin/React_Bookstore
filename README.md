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

## Action

First go through the the overview of Life Cycle of an action and a redux application
### Lift Cycle

1. Event triggered by users
2. All of the events can optionally call an action creator
3. An action creator is just a function returns an object
4. That object then automatically sent to all reducers
5. Reducers can choose to return different piece of state depending on what the action is
6. The new returned piece of state then pipe into the application state
7. Notify containers of the changes to state. On notification, containers will re-render with new props

Step 2~3:
An action creator is just a function that returns an action
An action is just an object that flows though all the reducers

```javascript
// selectBook is an ActionCreator, it needs to return an action, which is an object with a type property
export default function selectBook(book) {
  return {
    type: 'BOOK_SELECTED',
    payload: book,
  };
}
```

Step 4: we need to make sure that the action that gets returned from it ends up running through all of our reducers! Here is how:

```javascript
import { bindActionCreators } from 'redux';
import selectBook from '../actions/index'; // import the action creator

const mapStateToProps = state => ({
  // Whatever is returned will show up as props inside of BookList
  books: state.books,
});

function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result should be passed to all of our reducers
  return bindActionCreators({ selectBook }, dispatch);
}

// Promote BookList from a component to a container - it needs to know about this new dispatch method, selectBook. Make it available as a props
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
```

Step 5~7:

All reducers get 2 arguments, current state and action. The reducers are only ever called when an action occurs. State argument is not application state, only the state this reducer is responsible for

```javascript
// reducers/reducer_active_book.js
export default function(state = null, action) {
  switch(action.type) {
    case 'BOOK_SELECTED':
      return action.payload;
    default:
      return state;
  }
}
```
