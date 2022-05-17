import { updateProfile } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../auth/firebase';
import { userSignUp } from '../store/auth'
const AuthContext = React.createContext();
const TOKEN = 'token';

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
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

  async function login(email, password) {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    const token = await user.getIdToken();
    dispatch(login('Bearer ' + token));
  }

  function logout() {
    return auth.signOut();
  }

  const value = { currentUser, signup, login, logout };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
