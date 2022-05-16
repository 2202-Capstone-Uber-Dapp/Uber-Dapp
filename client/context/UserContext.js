import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './AuthContext';
import { fetchUserInfo } from '../store/auth';
const UserInfoContext = React.createContext();

export function userContext() {
  return useContext(UserInfoContext);
}

export function UserProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const token = await currentUser.getIdToken();
      window.localStorage.setItem('token', token);
      dispatch(fetchUserInfo());
    }

    fetchData();
    setLoading(false);
    return function cleanup() {
      window.localStorage.removeItem('token');
    };
  }, []);
  const value = { ...user };
  return (
    <UserInfoContext.Provider value={value}>
      {!loading && children}
    </UserInfoContext.Provider>
  );
}
