import { useEffect, useState } from 'react';
import { Card, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userRegister, personRegister } from '../apiCalls'
import { useLocation } from "react-router-dom"
export default function Register() {
   const { state: { majorId, email, password } } = useLocation()
   console.log(majorId, email, password)
   // States for registration
   const [majId, setMajId] = useState(majorId ? majorId : "");
   const [fname, setFname] = useState('');
   const [lname, setLname] = useState('');
   const [age, setAge] = useState('');
   const [address, setAddress] = useState('');
   //age,address,fname,lname,majorId
   // States for checking the errors
   const [submitted, setSubmitted] = useState(false);
   const [NError, setNError] = useState('');
   const [AError, setAError] = useState('');
   const [AdError, setAdError] = useState('');

   const handleFName = (e) => {
      setFname(e.target.value);
      setSubmitted(false);
   };
   const handleLName = (e) => {
      setLname(e.target.value);
      setSubmitted(false);
   };
   // Handling the email change
   const handleAge = (e) => {
      setAge(e.target.value);
      setSubmitted(false);
   };
   // Handling the password change
   const handleAddress = (e) => {
      setAddress(e.target.value);
      setSubmitted(false);
   };
   const handleValidation = (event) => {
      let formIsValid = true;
      if (address.length < 5) {
         formIsValid = false;
         setAdError("Address Not Valid");
         return false;
      } else {
         setAdError("");
         formIsValid = true;
      }
      if (!age.match(/^[0-9]$/)) {
         formIsValid = false;
         setAError("Age Not Valid. Must be number.(0-9)");
         return false;
      } else {
         if (age < 10 && age > 99) {
            setAError("Age out of range"); return false
         }
         setAError("");
         formIsValid = true;
      }

      if (!fname.match(/^[a-zA-Z]{3,15}$/) && !lname.match(/^[a-zA-Z]{3,15}$/)) {
         formIsValid = false;
         setNError(
            "Only Letters can be used for name and from 3 to 15 Chracters"
         );
         return false;
      } else {
         setNError("");
         formIsValid = true;
      }

      return formIsValid;
   };
   // Handling the form submission
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (handleValidation(e)) {
         setSubmitted(true);
         if (majorId) {
            try {
               const response = await userRegister({ majorId, email, password })
               setSubmitted(true);
            }
            catch (e) {
               console.log(e.response.data);
            }
         } else {
            try {
               const response2 = await personRegister({ majId, fname, lname, age, address })
               setSubmitted(true);
            }
            catch (e) {
               console.log(e.response.data + " in file RegisterPerson");
            }
         }
      }
   };

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
               Person Registration
            </Card.Title>{majorId ?
               <Card.Subtitle>Looks like your data is not in the system.. Enter your data and then we Proceed.</Card.Subtitle> : false}
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
                        name="fName"
                        aria-describedby="maj_id"
                        placeholder="Citizenship Id"
                        value={majId}
                        onChange={(e) => setMajId(e.target.value)}
                        disabled={majorId ? true : false}
                     />
                  </div><div className="form-group">
                     <label>First Name</label>
                     <input
                        type="text"
                        className="form-control"
                        name="fName"
                        aria-describedby="first_name"
                        placeholder="First Name"
                        value={fname}
                        onChange={handleFName}
                     />
                  </div><div className="form-group">
                     <label>Last Name</label>
                     <input
                        type="text"
                        className="form-control"
                        name="lName"
                        aria-describedby="last_name"
                        placeholder="Last Name"
                        value={lname}
                        onChange={handleLName}
                     />
                     <small id="emailHelp" className="text-danger form-text">
                        {NError}
                     </small>
                  </div>
                  <div className="form-group">
                     <label>Age</label>
                     <input
                        type="number"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Age"
                        value={age}
                        onChange={handleAge}
                     />
                     <small id="ageerror" className="text-danger form-text">
                        {AError}
                     </small>
                  </div><div className="form-group">
                     <label>Address</label>
                     <input
                        type="text"
                        className="form-control"
                        name="address"
                        aria-describedby="address"
                        placeholder="Last Name"
                        value={address}
                        onChange={handleAddress}
                     />
                     <small id="emailHelp" className="text-danger form-text">
                        {AdError}
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