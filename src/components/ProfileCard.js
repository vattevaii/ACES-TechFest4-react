import { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap'
import { getPersonbyId } from '../apiCalls';
import img from '../logo.svg'
import { useStateValue } from '../states/userProvider';

function ProfileCard({ className, pern }) {
   const [{ user }, dispatch] = useStateValue()
   const [person, setPerson] = useState(null);
   useEffect(() => {
      if (person) setPerson(pern);
      else if (user) getPersonbyId({ id: user.person }).then(({ data }) => {
         setPerson(data.person)
      }).catch((e) => console.log(e))
   }
      , []);
   return (
      person === null ? <Card className={"text-center"}><Card.Img className="mx-auto" src={img}></Card.Img><Card.Title>Log in first</Card.Title><Card.Subtitle>to see all your</Card.Subtitle><Card.Body>DATAAA</Card.Body></Card> :
         <Card className={"text-center " + className}>
            <Row><Col xs={4} sm={12}><Card.Img src={img}></Card.Img></Col>
               <Col xs={8} sm={12}>
                  <Card.Header>{person.firstName + person.lastName}</Card.Header>
                  <Card.Text>
                     <b>{person.address}</b><br />
                     I'm {person.age} years old.<br />
                     I'm {person.isVaccinated ? " vaccinated" : " not vaccinated"}
                  </Card.Text>
               </Col></Row>
         </Card>
   );
}

export default ProfileCard;