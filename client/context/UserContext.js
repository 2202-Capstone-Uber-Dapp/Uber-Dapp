//new
import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './AuthContext';
import { fetchUserInfo } from '../store/auth';
import { TransactionsProvider } from '../src/ether/TransactionContext';
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
  const value = { user };
  return (
    <UserInfoContext.Provider value={value}>
      {!loading && children}
    </UserInfoContext.Provider>
  );
}
