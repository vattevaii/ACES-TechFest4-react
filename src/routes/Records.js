import { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Card, Stack, Form, Container, Button } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getRecords } from '../apiCalls'

export function Entry({ data, onSubmit }) {
   const [radio, cRadioState] = useState();
   const [identifier, cIdentifier] = useState();

   const IdentifierChange = (e) => cIdentifier(e.target.value);
   const submitHandler = () => onSubmit({ radio, identifier })

   const checkEnterAndSubmit = (e) => {
      if (e.code === "Enter") {
         e.preventDefault();
         submitHandler();
      }
   }
   // console.log(data)
   const handleRadioChange = (e) => cRadioState(e.target.value);

   return (<Card><Card.Title>What do you want??</Card.Title>
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
   </Card >);
}

export function Fetched({ type, number }) {
   return (<Card className="text-center">
      <Row><Col><Card.Header>
         Records for {type}
      </Card.Header></Col></Row>
      <Row><Col><ListGroup as="ol" numbered>
         <ListGroup.Item as={Stack} direction="horizontal" gap={3} className="flex-wrap"><span>Immune Name</span><span className='mx-auto'>Immune Date</span><span style={{ color: "grey" }}>Set by: Person</span></ListGroup.Item>
         <ListGroup.Item as={Stack} direction="horizontal" gap={3} className="flex-wrap"><span>Immune Name</span><span className='mx-auto'>Immune Date</span><span style={{ color: "grey" }}>Set by: Person</span></ListGroup.Item>
         <ListGroup.Item as={Stack} direction="horizontal" gap={3} className="flex-wrap"><span>Immune Name</span><span className='mx-auto'>Immune Date</span><span style={{ color: "grey" }}>Set by: Person</span></ListGroup.Item>
      </ListGroup></Col></Row>
   </Card>);
}

export function EntryForm(data) {
   // console.log(data)
   return (<>Entry Form
      <form>
         <label htmlFor="type">Type :</label>
         <input type="text" />
         <label htmlFor="type">Vaccine :</label>
         <input type="text" />
         <label htmlFor="type">Location :</label>
         <input type="text" />
         <label htmlFor="type">Person :</label>
         <input type="text" />
         <label htmlFor="type">Expert :</label>
         <input type="text" />
      </form>
   </>)
}

function Records() {
   const navigate = useNavigate()
   const [loading, setLoadingState] = useState("Entry")
   const loc = useLocation()
   const [type, changeType] = useState();
   const [id, changeId] = useState();
   const [displayData, setData] = useState(null);
   const data = {
      "i": "Immunization",
      "c": "Corona Immunization",
      "f": "Everything Else"
   }
   const changeUrl = ({ radio, identifier }) => {
      navigate(`/records?type=${radio}&id=${identifier}`)
      // <EntryForm data={type, id} />
   }
   const Htmlshow = {
      "Entry": () => <Entry data={data} onSubmit={changeUrl} />,
      "Fetched": () => <Fetched />,
      "Fetching": () => <><Button onClick={() => setLoadingState("Fetched")}>Loading........</Button>
         <Button onClick={() => setLoadingState("Error")} className='btn-danger mx-2'>Error</Button></>,
      "Error": () => <>Hello Guys!!! What data are you sending?? I was shocked out of oblivion.</>
   }
   useEffect(() => {
      try {
         if (!!loc.search) {
            const data = loc.search.slice(1).split('&')
            let type = data.find(s => s.startsWith('type='))
            if (type) type = type.slice(5)
            else throw ("Type not Defined");
            let id = data.find(s => s.startsWith('id='))
            if (id) id = id.slice(3)
            else throw ("Id not defined");
            if (type && id) {
               setLoadingState("Fetching");
               getRecords({ type, id }).then(({ data }) => {
                  setData(data);
                  setLoadingState("Fetched")
               }).catch(e => {
                  if (e.response.status === 404)
                     // navigate('/records/entry')
                     <EntryForm data={type, id} />
                  setLoadingState("Error")
               });
               // axios data fetch here
               // .then((data) => Stateful Data and setLoading = "Fetched")
            } else setLoadingState("Entry")
         } else setLoadingState("Entry")
      }
      catch (err) {
         console.log(err)
         setLoadingState("Entry");
      }
   }, [loc])
   return (<Container style={{ maxWidth: "700px" }} className='my-3'>
      {loading === "Entry" ? <Htmlshow.Entry data={data} onSubmit={changeUrl} /> : (loading === "Fetched" ? <Htmlshow.Fetched /> : (loading === "Error" ? <Htmlshow.Error /> : <Htmlshow.Fetching />))}
      {/* <Htmlshow.Entry></Htmlshow.Entry> */}
   </Container>)
}

export default Records;