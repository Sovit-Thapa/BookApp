import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import { db } from '../db/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import styles from '../styles/BorrowedStyles';

const Borrowed = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const borrowedQuery = query(collection(db, 'books'), where('available', '==', false));
    const unsubscribe = onSnapshot(borrowedQuery, (snapshot) => {
      const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBorrowedBooks(books);
    });

    return () => unsubscribe();
  }, []);

  const handleReturn = async (bookId) => {
    try {
      await updateDoc(doc(db, 'books', bookId), { available: true });
      Alert.alert('Success', 'Book returned successfully!');
    } catch (error) {
      console.error('Error returning book:', error);
      Alert.alert('Error', 'Failed to return the book. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {borrowedBooks.length === 0 ? (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No borrowed books</Text>
        </View>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <View style={styles.bookInfo}>
                <Image source={{ uri: item.coverpage }} style={styles.bookImage} />
                <View style={styles.bookDetails}>
                  <Text style={styles.bookName}>{item.name}</Text>
                  <Text style={styles.author}>by {item.author}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.returnButton} onPress={() => handleReturn(item.id)}>
                <Text style={styles.buttonText}>Return</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Borrowed;
