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