import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bookDetail: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    padding: 20,
  },
  bookCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,  
    alignItems: 'center',
  },
  coverImage: {
    width: 200,
    height: 300,
    borderRadius: 8,
    marginBottom: 15,
  },
  bookName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  author: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#777',
    marginBottom: 12,
  },
  summary: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  borrowButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
