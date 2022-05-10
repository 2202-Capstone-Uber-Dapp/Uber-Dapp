import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const EditSingleRider = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  console.log("Hello");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    //Dispatch here to edit
  }

  return (
    <div className='Editor'>
      <form onSubmit={handleSubmit}>
        <label> Username </label>
        <input name="username" type="text" required />
        <label> Password </label>
        <input name="password" type="password" value={} required />
        <label> Email </label>
        <input name="email" type="email" />
        <button type="submit"> Update </button>
      </form>
    </div>
  )
}
