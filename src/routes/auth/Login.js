import React, { useState, useContext } from "react";
import { Card, Nav } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../apiCalls";
import { useStateValue } from "../../states/userProvider";

function Login() {
   const navigate = useNavigate()
   const [state, dispatch] = useStateValue()
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const [passwordError, setpasswordError] = useState("");
   const [emailError, setemailError] = useState("");

   const handleValidation = (event) => {
      let formIsValid = true;

      if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
         formIsValid = false;
         setemailError("Email Not Valid");
         return false;
      } else {
         setemailError("");
         formIsValid = true;
      }

      if (!password.match(/^[a-zA-Z0-9]{8,22}$/)) {
         formIsValid = false;
         setpasswordError(
            "Only Letters and number and must be min 8 Chracters and Max 22 Chracters"
         );
         return false;
      } else {
         setpasswordError("");
         formIsValid = true;
      }

      return formIsValid;
   };

   const loginSubmit = (e) => {
      e.preventDefault();
      handleValidation();
      try {
         login({ email, password }, dispatch);
         navigate('/')
      }
      catch (err) { console.log(err) }
   };
   // console.log(state.user)

   return (
      <div className="container">
         <Card className="mx-auto my-3 col-md-8 col-lg-6">
            <Card.Title className="fs-2 p-3 bg-dark text-white rounded">Login</Card.Title>
            <Card.Body>
               <form id="loginform" onSubmit={loginSubmit}>
                  <div className="form-group">
                     <label>Email address</label>
                     <input
                        type="email"
                        className="form-control"
                        id="EmailInput"
                        name="EmailInput"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        onChange={(event) => setEmail(event.target.value)}
                     />
                     <small id="emailHelp" className="text-danger form-text">
                        {emailError}
                     </small>
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                     />
                     <small id="passworderror" className="text-danger form-text">
                        {passwordError}
                     </small>
                  </div>
                  <div className="form-group form-check">
                     <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                     />
                     <label className="form-check-label">Check me out</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                     Submit
                  </button>
               </form>
            </Card.Body>
         </Card>
         <div className="d-flex justify-content-center"><Nav.Link as={Link} to='/register' className='px-2'>Click here for Register Page</Nav.Link></div>
      </div>
   );
}
export default Login;
