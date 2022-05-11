import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from '../../store/User'

export const EditSingleRider = () => {
  const dispatch = useDispatch();
  const user = useRef();
  const password = useRef();
  const email = useRef();
  console.log("Hello");

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch values
    dispatch(updateUser(1, email.current.value));
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
