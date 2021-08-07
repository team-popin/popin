import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

export default function OrderSuccessful() {
  let history = useHistory()
  // useEffect(() => {
  //    setTimeout(() => {
  //     history.push("/"), 50000;
  //   });

  // })
  let count = 5;
  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/");
    }, 5000);
    const timer2 = setTimeout(() => {
      return count--
    }, 5000);
    return () => clearTimeout(timer, timer2);
  }, []);


  return (
    <div>
      <h1>Order Successful</h1>
      <h2>Thank you for your order!</h2>
      <h2>You will be redirected in {count} seconds.</h2>
    </div>
  );
}
