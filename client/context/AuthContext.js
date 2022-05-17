import { updateProfile } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../auth/firebase';
import { userSignUp } from '../store/auth'
import axios from 'axios';
const AuthContext = React.createContext();
const TOKEN = 'token';

// dispatch = useDispatch();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    return verifySession();
  }, []);

  async function signup(email, password, userName) {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(email, password);
      await updateProfile(newUser.user, {displayName: userName});
      const token = await newUser.user.getIdToken();
      const data = { token, user: newUser.user };
      dispatch(userSignUp(data));
      return () => unsubscribe()
    } catch (err) {
      console.log(err);
    }
  }

  function verifySession() {
    axios.post('/auth/session').then(({ data }) => {
      if (data.user) setCurrentUser(data.user);
    });
    setLoading(false);
  }


  async function login(email, password) {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    const token = await user.getIdToken();
    const createSession = await axios.post(
      '/auth/login/',
      {},
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    );
    verifySession();
  }

  async function logout() {
    await axios.post('/auth/logout');
    setCurrentUser(null);
  }

  const value = { currentUser, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
