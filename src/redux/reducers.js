const initialState = {
  borrowedBooks: []  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BORROW_BOOK':
      return {
        ...state,
        borrowedBooks: [...state.borrowedBooks, action.payload], 
      };
    case 'RETURN_BOOK':
      return {

        ...state,
        borrowedBooks: state.borrowedBooks.filter(book => book.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
