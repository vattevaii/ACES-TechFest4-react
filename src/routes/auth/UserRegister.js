import { useState } from 'react';
import { Card, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister, getPerson } from '../../apiCalls'
// import useToast from "@chakra-ui/toast"

export default function Register() {
   // States for registration
   const navigate = useNavigate();
   const [majorId, setMId] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   //age,address,fname,lname,majorId
   // const toast = useToast();

   // States for checking the errors
   const [submitted, setSubmitted] = useState(false);
   const [CError, setCError] = useState('');
   const [EError, setEError] = useState('');
   const [PError, setPError] = useState('');

   // Handling the name change
   const handleName = (e) => {
      setMId(e.target.value);
      setSubmitted(false);
   };

   // Handling the email change
   const handleEmail = (e) => {
      setEmail(e.target.value);
      setSubmitted(false);
   };

   // Handling the password change
   const handlePassword = (e) => {
      setPassword(e.target.value);
      setSubmitted(false);
   };


   const handleValidation = (event) => {
      let formIsValid = true;

      if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
         formIsValid = false;
         setEError("Email Not Valid");
         return false;
      } else {
         setEError("");
         formIsValid = true;
      }

      if (!password.match(/^[a-zA-Z0-9]{8,22}$/)) {
         formIsValid = false;
         setPError(
            "Only Letters, numbers and length must best min 8 Chracters and Max 22 Chracters"
         );
         return false;
      } else {
         setPError("");
         formIsValid = true;
      }

      if (!majorId.match(/^[a-zA-Z0-9]{3,22}$/)) {
         formIsValid = false;
         setCError(
            "Valid String not detected.."
         );
         return false;
      } else {
         setCError("");
         formIsValid = true;
      }

      return formIsValid;
   };
   // Handling the form submission
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (handleValidation(e)) {
         // let response;
         try {
            const response = await getPerson({ majorId });
            console.log(response.data)
            const { data: { user, accessToken } } = await userRegister({ majorId, email, password })
            // console.log(user);
            setSubmitted(true);
         }
         catch (e) {
            // console.log(e.response.data);
            if (e.response.status === 404)
               navigate('/pregister', { state: { majorId } })
         }
      };
   }

   // Showing success message
   const successMessage = () => {
      return (
         <>{majorId} successfully registered!!</>
      );
   };

   return (
      <Container>
         <Card className="mx-auto my-3 col-md-8 col-lg-6">
            <Card.Title className="fs-2 p-3 bg-dark text-white rounded">
               User Registration
            </Card.Title>
            {/* Calling to the methods */}
            <div className="messages fs-3">
               {successMessage() && submitted}
            </div>
            <Card.Body>
               <form id="registerform" onSubmit={handleSubmit}>
                  <div className="form-group">
                     <label>Citizenship Id</label>
                     <input
                        type="text"
                        className="form-control"
                        id="CInput"
                        name="CInput"
                        aria-describedby="emailHelp"
                        placeholder="Enter Citizenship Id"
                        value={majorId}
                        onChange={handleName}
                     />
                     <small id="emailHelp" className="text-danger form-text">
                        {CError}
                     </small>
                  </div><div className="form-group">
                     <label>Email</label>
                     <input
                        type="email"
                        className="form-control"
                        id="EInput"
                        name="EInput"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmail}
                     />
                     <small id="emailHelp" className="text-danger form-text">
                        {EError}
                     </small>
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        onChange={handlePassword}
                     />
                     <small id="passworderror" className="text-danger form-text">
                        {PError}
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
         <div className="d-flex justify-content-center"><Nav.Link as={Link} to='/login' className='px-2'>Click here for Login Page</Nav.Link></div>
      </Container>
   );
}