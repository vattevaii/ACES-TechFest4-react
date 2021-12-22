import { useState } from "react";
import { Container } from "react-bootstrap";
import { MiniCoronaDetail } from "../components/Corona";

function Corona() {
   const [title, changeTitle] = useState("Today");
   const [state, changeState] = useState({ deaths: 555 });
   return (<Container><MiniCoronaDetail name={title} state={state} />
      <select class="form-select w-lg-25" aria-label="Default select example">
         <option selected>Open this select menu</option>
         <option value="1">One</option>
         <option value="2">Two</option>
         <option value="3">Three</option>
      </select></Container>);
}

export default Corona;