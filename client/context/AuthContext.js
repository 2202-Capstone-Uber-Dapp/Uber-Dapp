import { updateProfile } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../auth/firebase';
const AuthContext = React.createContext();
const TOKEN = 'token';

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  async function login(email, password) {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    const token = await user.getIdToken();
    dispatch(login('Bearer ' + token));
  }

  async function setUsername(user, displayname) {
    await updateProfile(user, {displayName: displayname});
  }

  function logout() {
    return auth.signOut();
  }

  const value = { currentUser, signup, login, logout , setUsername};
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
