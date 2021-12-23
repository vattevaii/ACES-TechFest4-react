import { useState } from 'react';
import { Card, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toDbRecords } from '../../apiCalls'


export default function CreateRecord() {
   const [majorId, setMajId] = useState('');
   const [vType, setvType] = useState('i');
   const [vName, setvName] = useState('');
   const [submitted, setSubmitted] = useState(false);
   const [location, setLocation] = useState('')

   const handleValidation = (event) => {
      let formIsValid = true;
      return formIsValid;
   };
   // Handling the form submission
   const navigate = useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (handleValidation(e)) {
         setSubmitted(false);
         try {
            const response = await toDbRecords({ majorId, vaccine: vName, type: vType, location })
            // navigate("/register")
            setSubmitted(true);
            setMajId(''); setvName(''); setvType(''); setLocation('');
         }
         catch (e) {
            console.log(e.response.status)
            if (e.response.status === 404) navigate("/pregister", { state: { majorId } })
         }
      }
   };

   // Showing success message
   const successMessage = () => {
      return (
         submitted ? <>Vaccination successfully registered!!</> : <>Enter Data and Submit</>
      );
   };

   return (
      <Container>
         <Card className="mx-auto my-3 col-md-8 col-lg-6">
            <Card.Title className="fs-2 p-3 bg-dark text-white rounded">
               Vaccine Registration
            </Card.Title>
            <Card.Subtitle>{successMessage()}</Card.Subtitle>
            {/* Calling to the methods */}
            <div className="messages fs-3">
               {successMessage() && submitted}
            </div>
            <Card.Body>
               <form id="registerform" onSubmit={handleSubmit}>
                  <div className="form-group">
                     <label>{vType === "i" ? "Birth Certificate" : "Citizenship"} Id</label>
                     <input
                        type="text"
                        className="form-control"
                        name="fName"
                        aria-describedby="maj_id"
                        placeholder={vType === "i" ? "Birth Certificate" : "Citizenship"}
                        value={majorId}
                        onChange={(e) => setMajId(e.target.value)}
                     />
                  </div><div className="form-group">
                     <label>Vaccine Type</label>
                     <select
                        type="text"
                        className="form-control"
                        name="vType"
                        aria-describedby="vaccine_type"
                        placeholder="Vaccine Type"
                        value={vType}
                        onChange={(e) => setvType(e.target.value)}
                     >
                        <option value="i">Immune</option>
                        <option value="c">Covid</option>
                     </select>
                  </div><div className="form-group">
                     <label>Vaccine Name</label>
                     <input
                        type="text"
                        className="form-control"
                        name="vName"
                        aria-describedby="vaccine_name"
                        placeholder="Vaccine Name"
                        value={vName}
                        onChange={(e) => setvName(e.target.value)}
                     />
                  </div>
                  <div className="form-group">
                     <label>Address of Vaccination</label>
                     <input
                        type="text"
                        className="form-control"
                        name="address"
                        aria-describedby="address"
                        placeholder="Address"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                     />
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