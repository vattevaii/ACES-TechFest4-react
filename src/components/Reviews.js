import { Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
function Reviews() {
   return (<Card className="my-2 p-0">
      <Card.Header className="fs-1">Reviews</Card.Header>
      <ListGroup variant="flush">
         <ListGroup.Item><strong>@username(::patient):  </strong>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </ListGroup.Item>
         <ListGroup.Item><strong>@username(::patient):  </strong>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </ListGroup.Item>
         <ListGroup.Item><strong>@username(::patient):  </strong>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </ListGroup.Item>
      </ListGroup>
      <Card.Footer><Link to="/">View All</Link></Card.Footer>
   </Card >);
}

export default Reviews;