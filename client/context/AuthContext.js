import { updateProfile } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { auth } from '../auth/firebase';
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

  useEffect(() => {
    return verifySession();
  }, []);

  function verifySession() {
    axios.post('/auth/session').then(({ data }) => {
      if (data.user) setCurrentUser(data.user);
    });
    setLoading(false);
  }
  async function signup(email, password) {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    return user;
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

  async function setUsername(user, displayname) {
    await updateProfile(user, { displayName: displayname });
  }

  async function logout() {
    await axios.post('/auth/logout');
    setCurrentUser(null);
  }

  const value = { currentUser, signup, login, logout, setUsername };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
