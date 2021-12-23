import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getRecords } from '../../apiCalls'
import { Card, Col, Container, ListGroup, Row, Stack } from 'react-bootstrap';
import ProfileCard from '../../components/ProfileCard';

function Display() {
   const navigate = useNavigate();
   const [displayData, setData] = useState(null);
   const [displayMSG, setMSG] = useState("Loading");
   const [person, setPerson] = useState(null);
   const { type, id } = useParams();
   useEffect(() => {
      getRecords({ type, id }).then(({ data }) => {
         setPerson(data.person);
         setData(data.record)
         // console.log(data)
      }).catch(e => {
         if (e.response.status === 404) { setMSG(<>Records for id not present..<span className='btn btn-secondary' onClick={() => navigate('/records')}>Search for more data</span></>); console.log(e) }
         // navigate('/records')
         // navigate('/records/entry')
         // <EntryForm data={type, id} />
      });
   }, [])
   return <Container>{(!!displayData ? <><Card className="text-center">
      <Row><Col><Card.Header className='fs-3'>
         Records for - {person.firstName + " " + person.lastName}
      </Card.Header></Col></Row>
      <Row><Col><ListGroup as="ol" numbered>
         {displayData.map(({ r, per }) =>
            <ListGroup.Item as={Stack}
               key={r._id}
               direction="horizontal"
               gap={3} className="flex-wrap">
               <span>{r.vaccine}</span>
               <span className='mx-auto'>Immune Date:{r.updatedAt.split("T")[0]}</span>
               <span style={{ color: "grey" }}>Set by: {per.firstName + per.lastName}</span></ListGroup.Item>
         )}
      </ListGroup></Col></Row>
   </Card><ProfileCard pern={person} /></> : displayMSG)}</Container>;
}

export default Display;
