import { Row, Col, Card, Button } from 'react-bootstrap'
import img from '../logo.svg'
function ProfileCard() {
   return (
      <Card className="text-center">
         <Row><Col xs={4} sm={12}><Card.Img src={img}></Card.Img></Col>
            <Col xs={8} sm={12}>
               <Card.Header>Ishan Karki</Card.Header>
               <Card.Text>
                  <b>Heart Surgeon</b><br />
                  MBBS, Bangladesh<br />
                  MD, US(New York)
               </Card.Text>
            </Col></Row>
      </Card>
   );
}

export default ProfileCard;