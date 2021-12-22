import { Container, Row, Col, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import Reviews from '../components/Reviews';
import ScheduleList from '../components/ScheduleList';
function About() {
   const { docId } = useParams();
   return (<div className="about">
      <Container>
         Doctor :  {docId}
         <Row><Col sm={{ span: 7, order: "first" }} xs={{ span: 12, order: "last" }} lg={8}>
            <Row>
               <ScheduleList />
            </Row>
            <Row>
               <Container>
                  <Reviews />
               </Container>
            </Row>
         </Col><Col sm={5} lg={4} xs={{ order: "first" }}>
               <ProfileCard></ProfileCard>
            </Col>
         </Row>
      </Container >
   </div >);
}

export default About;