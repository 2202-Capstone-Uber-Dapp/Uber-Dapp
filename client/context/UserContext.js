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
  useEffect(() => {
    dispatch(fetchUserInfo());
    setLoading(false);
  }, []);

  const value = { username: user.username, role: user.role };
  return (
    <UserInfoContext.Provider value={value}>
      {!loading && children}
    </UserInfoContext.Provider>
  );
}
