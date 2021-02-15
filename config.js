import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyBsErYV1Jac1qHFsBrRGdOOnaqAb7Z57-I',
  authDomain: 'wireless-library-3a664.firebaseapp.com',
  databaseURL: 'wireless-library-3a664.firebaseio.com',
  projectId: 'wireless-library-3a664',
  storageBucket: 'wireless-library-3a664.appspot.com',
  messagingSenderId: '611231295088',
  appId: '1:611231295088:web:9547f94b40569e3ec436b5',
};

firebase.initializeApp(firebaseConfig)

export default firebase.firestore();