import { useState } from "react";
import "./Chatbot.scss"
import conversation from "../static/conversation.png"
import { Card } from "react-bootstrap";

const MessageBox = ({ closeBox, open }) => {
   const [question, setQues] = useState('');
   return (
      <Card className={open ? "show" : "notshow"}>
         <Card.Title className="text-white p-3" onClick={closeBox}>Chat for Information</Card.Title>
         <Card.Body>This is info</Card.Body>
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
      <MessageBox closeBox={closeMessageBox} open={open} />
   </div>);
}

export default ChatBot;