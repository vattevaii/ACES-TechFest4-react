import { useEffect, useState } from "react";
import { Card, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { } from "react-bootstrap";
import { coronaInfo } from "../apiCalls"
import img from '../logo.svg'
import './Corona.scss'
// const baseURL = "https://corona.askbhunte.com/api/v1/data/nepal";
function MiniCoronaDetail({ name, state }) {
   return <><Card.Subtitle className="mx-3 fs-4">{name}</Card.Subtitle>
      <Card.Body>
         <Stack direction="horizontal" className="flex-wrap" gap={3}>
            <Card className="p-3" style={{ minWidth: "200px" }}><Stack direction="horizontal"><Card.Img src={img}></Card.Img><div><Card.Subtitle className="mx-auto">Deaths</Card.Subtitle><Card.Body className="mx-auto p-0">{state.deaths}</Card.Body></div></Stack></Card>
            <Card className="m-auto p-3" style={{ minWidth: "200px" }}><Stack direction="horizontal"><Card.Img src={img}></Card.Img><div><Card.Subtitle className="mx-auto">Checked</Card.Subtitle><Card.Body className="mx-auto p-0">50</Card.Body></div></Stack></Card>
            <Card className="p-3" style={{ minWidth: "200px" }}><Stack direction="horizontal"><Card.Img src={img}></Card.Img><div><Card.Subtitle className="mx-auto">Recovered</Card.Subtitle><Card.Body className="mx-auto p-0">50</Card.Body></div></Stack></Card>
         </Stack>
      </Card.Body></>
}
function DashboardMini() {
   const [state, changeState] = useState()
   const [loading, setLoading] = useState("Loading");
   const data = {
      Loading: "Loading",
      Loaded: "Data Fetched",
      Error: "Error Detected"
   }
   useEffect(() => {
      coronaInfo().then((response) => {
         changeState(response.data);
         console.log(response.data)
         setLoading("Loaded")
      }).catch((e) => setLoading("Error"));
      // coronaInfo()
      // console.log(state);
   }, [])
   return (<div className="mx-auto">
      {data[loading] === "Loading" ? "Loading" :
         <Card>
            <Card.Header className="justify-content-between d-flex fs-3">CoVID-19 Status in Nepal<Link to="/corona" className="fs-6">View All</Link></Card.Header>
            <Row><Col lg={6}>
               <MiniCoronaDetail name="Today" state={state} />
            </Col>
               <Col lg={6} className="ms-auto">
                  <MiniCoronaDetail name="All Time" state={state} />
               </Col>
            </Row>
         </Card>}
   </div >);
}

export { DashboardMini, MiniCoronaDetail };