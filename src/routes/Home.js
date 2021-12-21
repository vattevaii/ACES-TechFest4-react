import { Link } from "react-router-dom";

function Home() {
   return (<div className="Home">
      <Link to="/about/345">Doctor 1</Link>
      <Link to="/about/92">Doctor 2</Link>
   </div>);
}

export default Home;