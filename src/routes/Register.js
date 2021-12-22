import { useState } from "react";
import { Card, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getPerson } from "../apiCalls";

export default function Register() {
  // States for registration
  const navigate = useNavigate();
  const [majorId, setMId] = useState("");

  // States for checking the errors
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [CError, setCError] = useState("");

  const handleValidation = (event) => {
    let formIsValid = true;
    if (!majorId.match(/^[a-zA-Z0-9]{3,22}$/)) {
      formIsValid = false;
      setCError("Valid String not detected..");
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
      try {
        setLoading(true);
        let u = await getPerson({ majorId });
        // console.log(u)
        setUser(u.data);
        setLoading(false);
      } catch (e) {
        // console.log(e.response.data);
        if (e.response.status === 404)
          navigate("/pregister", { state: { majorId } });
      }
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <>{user !== null ? user.firstName + " already registered!!" : ""}</>
      // <></>
    );
  };

  return (
    <Container>
      <Card className="mx-auto my-3 col-md-8 col-lg-6">
        <Card.Title className="fs-2 p-3 bg-dark text-white rounded">
          Person Registration
        </Card.Title>
        {/* Calling to the methods */}
        <div className="messages fs-3">{successMessage()}</div>
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
                onChange={(e) => setMId(e.target.value)}
              />
              <small id="emailHelp" className="text-danger form-text">
                {CError}
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-center">
        <Nav.Link as={Link} to="/login" className="px-2">
          Click here for Login Page
        </Nav.Link>
      </div>
    </Container>
  );
}
