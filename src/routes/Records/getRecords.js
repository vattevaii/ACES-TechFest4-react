import { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Card, Stack, Form, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Entry() {
   const [radio, cRadioState] = useState();
   const [identifier, cIdentifier] = useState();
   const data = {
      "i": "Immunization",
      "c": "Corona Immunization",
      "f": "Everything Else"
   }
   const navigate = useNavigate();

   const IdentifierChange = (e) => cIdentifier(e.target.value);
   const submitHandler = () => navigate(`/records/${radio}/${identifier}`)

   const checkEnterAndSubmit = (e) => {
      if (e.code === "Enter") {
         e.preventDefault();
         submitHandler();
      }
   }
   // console.log(data)
   const handleRadioChange = (e) => cRadioState(e.target.value);

   return (<Container>
      <Card><Card.Title>What do you want??</Card.Title>
         <Card.Body>
            <Form onSubmit={submitHandler}>
               <Form.Group className="mb-3">
                  {
                     Object.keys(data).map((key, i) => (
                        <Form.Check
                           key={i}
                           inline
                           label={data[key]}
                           name="type"
                           value={key}
                           type="radio"
                           id={`inline-radio-${i}`}
                           onChange={handleRadioChange}
                        />
                     ))
                  }</Form.Group>
               {!!radio && <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{radio == 'i' ? "Birth Certificate" : "Citizenship"} Identifier</Form.Label>
                  <Form.Control type="text" placeholder="Identifier" onChange={IdentifierChange} onKeyPress={checkEnterAndSubmit} />
                  <Form.Text className="text-muted">
                     We'll never share your {radio == 'i' ? "Birth Certificate" : "Citizenship"} Identifier with anyone else.
                  </Form.Text>
               </Form.Group>}
               {!!radio && !!identifier &&
                  <Button type="submit">Submit</Button>
               }
            </Form>
         </Card.Body>
      </Card >
   </Container>);
}


export default Entry;