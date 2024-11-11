import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import { db } from '../db/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/BooksListStyles';

const BooksList = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'books'), (snapshot) => {
      const booksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksData);

      if (booksData.length === 0) {
        console.log('No books found');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading books...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {books.length === 0 ? (
        <Text style={styles.emptyMessage}>No books available</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookItem}
              onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
            >
              <View style={styles.bookInfo}>
                <Text style={styles.bookName}>{item.name}</Text>
                <Text style={styles.bookAuthor}>by {item.author}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = item.rating;
                    if (index < Math.floor(ratingValue)) {
                      return <Icon key={index} name="star" size={18} color="#FFD700" />;
                    } else if (index === Math.floor(ratingValue) && ratingValue % 1 >= 0.5) {
                      return <Icon key={index} name="star-half-o" size={18} color="#FFD700" />;
                    }
                    return <Icon key={index} name="star-o" size={18} color="#FFD700" />;
                  })}
                  <Text style={styles.ratingText}> ({item.rating.toFixed(1)})</Text>
                </View>
              </View>
              <Image source={{ uri: item.coverpage }} style={styles.coverImage} />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default BooksList;
