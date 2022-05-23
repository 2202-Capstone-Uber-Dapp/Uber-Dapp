import { updateProfile } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../auth/firebase';
import { userSignUp } from '../store/auth'
import axios from 'axios';
const AuthContext = React.createContext();

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

  async function signup(email, password, userName, role) {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(email, password);
      await updateProfile(newUser.user, {displayName: userName});
      const token = await newUser.user.getIdToken();
      const data = { token, user: newUser.user, role: role};
      dispatch(userSignUp(data));
      return () => unsubscribe()
    } catch (err) {
      alert(AuthErrorHandler(err));
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


function AuthErrorHandler(error) {
  let status = error;
  switch (error.code) {
    case "auth/email-already-in-use":
      status = "Email is already in use";
      break;
    case "auth/weak-password":
      status = "Password should be at least 6 characters"
    default:
      break;
  }

  return status;
}
