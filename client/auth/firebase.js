import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBQYWXRcW7P3OW_ZJqA9MqximaT3hDedFY',
  authDomain: 'dev-uber-dapp.firebaseapp.com',
  projectId: 'dev-uber-dapp',
  storageBucket: 'dev-uber-dapp.appspot.com',
  messagingSenderId: '718820977569',
  appId: '1:718820977569:web:25383c86b1f935455279e0',
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export const auth = app.auth();

export default app;
