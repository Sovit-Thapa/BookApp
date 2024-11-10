import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { returnBook } from '../redux/actions';
import styles from '../styles/BorrowedStyles';

const Borrowed = () => {
  const borrowedBooks = useSelector(state => state.borrowedBooks);
  const dispatch = useDispatch();

  const handleReturn = (bookId) => {
    if (bookId) {
      dispatch(returnBook(bookId));
    } else {
      console.log("Book ID is undefined, cannot return.");
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
          keyExtractor={(item) => item.id ? item.id.toString() : `book-${item.name}`}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <View style={styles.bookInfo}>
                <Image source={{ uri: item.coverpage }} style={styles.bookImage} />
                <View style={styles.bookDetails}>
                  <Text style={styles.bookName}>{item.name}</Text>
                  <Text style={styles.author}>by {item.author}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.returnButton}
                onPress={() => handleReturn(item.id)}
              >
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