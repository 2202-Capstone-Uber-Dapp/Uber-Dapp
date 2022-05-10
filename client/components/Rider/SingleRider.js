import React from "react";
import { useSelector } from "react-redux";

//Find a dispatch when logged in?

export const SingleRider = () => {
  const user = useSelector((state) => state.auth);
  console.log(user);
  return (
    <>
    <h1> {user.username} </h1>
    <div> dispatch this {user.id} </div>
    </>
  )
}
