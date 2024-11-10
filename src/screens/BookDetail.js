import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, Alert, ScrollView, TouchableOpacity } from 'react-native'; 
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../db/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { borrowBook } from '../redux/actions';
import styles from '../styles/BookDetailStyles'; 

const BookDetail = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const borrowedBooks = useSelector(state => state.borrowedBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookDocRef = doc(db, 'books', bookId);
        const bookDoc = await getDoc(bookDocRef);
        if (bookDoc.exists()) {
          const bookData = { id: bookDoc.id, ...bookDoc.data() };
          setBook(bookData); 
        } else {
          console.log('No book found with this ID');
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleBorrow = () => {
    const isAlreadyBorrowed = borrowedBooks.some(borrowedBook => borrowedBook.id === book.id);

    if (isAlreadyBorrowed) {
      Alert.alert('Book already borrowed', 'You cannot borrow the same book again.');
    } else if (borrowedBooks.length < 3) {
      dispatch(borrowBook(book)); 
    } else {
      alert('You cannot borrow more than three books at a time.');
    }
  };

  if (!book) return <Text>Loading...</Text>; 

  return (
    <ScrollView style={styles.bookDetail}>
      <View style={styles.bookCard}>
        <Image source={{ uri: book.coverpage }} style={styles.coverImage} />
        <Text style={styles.bookName}>{book.name}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.rating}>Rating: {book.rating}</Text>
        <Text style={styles.summary}>{book.summary}</Text>

        <TouchableOpacity
          style={styles.borrowButton}
          onPress={handleBorrow}
        >
          <Text style={styles.buttonText}>Borrow</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookDetail;
