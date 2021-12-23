import { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Card, Stack, Form, Container, Button } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getRecords } from '../apiCalls'

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
      {loading === "Entry" ? <Htmlshow.Entry /> : (loading === "Fetched" ? <Htmlshow.Fetched /> : (loading === "Error" ? <Htmlshow.Error /> : <Htmlshow.Fetching />))}
      {/* <Htmlshow.Entry></Htmlshow.Entry> */}
   </Container>)
}