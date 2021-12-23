import { useState } from "react";
import "./Chatbot.scss"
import conversation from "../static/conversation.png"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const MessageBox = ({ closeBox, open }) => {
   const [questionAnswer, addQues] = useState([
      { type: "question", item: "How can i get here?" },
      { type: "answer", item: "You can get here by turning left." }
   ]);
   const [question, setQues] = useState('');
   return (
      <Card className={open ? "show" : "notshow"}>
         <Card.Title className="text-white p-3" onClick={closeBox}>Chat for Information</Card.Title>
         <Card.Body>
            <ListGroup>
               {
                  questionAnswer.map(({ item, type }, key) =>
                     <ListGroupItem key={key} className={type == "question" ? "ms-3 my-1" : "me-3 my-1 bg-secondary rounded"}>{item}</ListGroupItem>)
               }
            </ListGroup>
         </Card.Body>
         <Card.Footer>
            <input
               type="text"
               className="form-control"
               id="data"
               placeholder="Question Me.."
               value={question}
               onChange={(event) => setQues(event.target.value)}
            />
         </Card.Footer>
      </Card>
   )
}

function ChatBot() {
   const [open, shangeState] = useState(false);
   const showMessageBox = () => {
      shangeState(!open);
   }
   const closeMessageBox = () => {
      shangeState(!open);
   }
   return (<div id="Chatbot">
      <div className={open ? "show m-5 btn" : "notshow m-5 btn"} onClick={showMessageBox}>
         <img src={conversation} alt="ChatBot Show" />
      </div>
      <MessageBox closeBox={closeMessageBox} open={open}></MessageBox>
   </div>);
}

export default ChatBot;