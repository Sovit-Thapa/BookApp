import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { db } from '../db/firebase';
import { doc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import styles from '../styles/BookDetailStyles';

const BookDetail = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [borrowedBooksCount, setBorrowedBooksCount] = useState(0);

  useEffect(() => {
    const bookDocRef = doc(db, 'books', bookId);
    const unsubscribeBook = onSnapshot(bookDocRef, (bookDoc) => {
      if (bookDoc.exists()) {
        const bookData = { id: bookDoc.id, ...bookDoc.data() };
        setBook(bookData);
      } else {
        console.log('No book found with this ID');
      }
    });

    const borrowedQuery = query(collection(db, 'books'), where('available', '==', false));
    const unsubscribeBorrowedBooks = onSnapshot(borrowedQuery, (querySnapshot) => {
      setBorrowedBooksCount(querySnapshot.size);
    });

    return () => {
      unsubscribeBook();
      unsubscribeBorrowedBooks();
    };
  }, [bookId]);

  const handleBorrow = async () => {
    if (!book) return;

    if (!book.available) {
      Alert.alert('Unavailable', 'This book is currently unavailable for borrowing.');
      return;
    }

    if (borrowedBooksCount >= 3) {
      Alert.alert('Limit reached', 'You cannot borrow more than three books at a time.');
      return;
    }

    try {
      const bookDocRef = doc(db, 'books', book.id);
      await updateDoc(bookDocRef, { available: false });

      setBorrowedBooksCount(borrowedBooksCount + 1);
      Alert.alert('Success', 'Book borrowed successfully!');
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  if (!book) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.bookDetail}>
      <View style={styles.bookCard}>
        <Image source={{ uri: book.coverpage }} style={styles.coverImage} />
        <Text style={styles.bookName}>{book.name}</Text>
        <Text style={styles.author}>by {book.author}</Text>
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