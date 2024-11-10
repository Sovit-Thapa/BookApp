// redux/actions.js
export const borrowBook = (book) => ({
  type: 'BORROW_BOOK',
  payload: book
});

export const returnBook = (bookId) => ({
  type: 'RETURN_BOOK',
  payload: bookId,
});