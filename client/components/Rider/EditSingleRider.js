import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../store/User'

export const EditSingleRider = () => {
  const dispatch = useDispatch();
  const user = useRef();
  const password = useRef();
  const email = useRef();

  const auth =  useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch values
    dispatch(updateUser(auth.id , email.current.value));
  }

  return (
    <div className='Editor'>
      <form onSubmit={handleSubmit}>
        <label> Username </label>
        <input name="username" type="text" ref={user} required />
        <label> Password </label>
        <input name="password" type="password" ref={password} required />
        <label> Email </label>
        <input name="email" type="email" ref={email} />
        <button type="submit"> Update </button>
      </form>
    </div>
  )
}
