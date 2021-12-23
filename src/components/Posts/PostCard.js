import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../states/userProvider";
import { throwUpVote, throwDownVote } from "../../apiCalls"
import './PostCard.css'
function PostCard({ post }) {
   const [{ user }, dispatch] = useStateValue();
   const navigate = useNavigate();
   const upVoteFn = (e) => { e.stopPropagation(); if (user) throwUpVote(post._id) }
   const downVoteFn = (e) => { e.stopPropagation(); if (user) throwUpVote(post._id) }

   return (<Container fluid onClick={() => navigate(`/posts/${post._id}`)}
      style={{ cursor: "pointer" }}>
      <Row className="align-items-center justify-content-between">
         <Card className={post.isApproved === true ? "border-success text-success p-2" : "p-2"}>
            <Card.Title>{post.title}</Card.Title>
            <Card.Body style={{
               height: "5em",
               overflow: "hidden",
               whiteSpace: "wrap",
               textOverflow: "ellipsis"
            }}><span style={{ color: "grey" }}>Click to view all :: </span>{post.desc}</Card.Body>
            <Card.Footer className={post.isApproved === true ? "border-success text-success" : ""}><Link to={'/post/' + post._id}>View</Link></Card.Footer>
            <Card.Footer><Row>
               <Col>
                  <Button className="bg-success m-2" onClick={upVoteFn}>Up : {post.upVote.length}</Button>
                  <Button className="bg-danger m-2" onClick={downVoteFn}>Down : {post.downVote.length}</Button>
               </Col>
            </Row></Card.Footer>
         </Card>
      </Row >
   </Container >);
}

export default PostCard;