import { useState } from "react";
import axios from "axios";
import './resetPassword.scss'

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  function handleResetPassword() {
    axios.post('http://127.0.0.1:3000/api/v1/users/reset-password', {email})
    .then(res => {console.log("res", res)});
    // .catch(err => console.log("err", err);)
  }
  return (
    <div className='container'>
      <h2>Password Reset</h2>
      <br />
      <p>Enter your email address below. We'll email you a link to a page where you can easily create a new password.</p>
      <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Your Email" />
      <br/> <br />
      <button style={{border: '1px solid black'}} onClick={() => {handleResetPassword()}}>Reset Password</button>
    </div>
  )
}
