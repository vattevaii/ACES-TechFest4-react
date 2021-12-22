import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DashboardMini } from '../components/Corona'
function Home() {
   return (<Container className="Home">
      <div>
         <Link to="/about/345">Doctor 1</Link>
         <Link to="/about/92">Doctor 2</Link>
      </div>
      {/* <Corona></Corona> */}
      <Row><Col><DashboardMini /></Col></Row>

   </Container>);
}

export default Home;