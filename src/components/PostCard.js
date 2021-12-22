import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './PostCard.css'
function PostCard({ post }) {
   const navigate = useNavigate();
   return (<Container fluid onClick={() => navigate(`/posts/${post.id}`)}
      style={{ cursor: "pointer" }}>
      <Row className="align-items-center justify-content-between">
         <Col xs={3}>
            {/* Upvote DownVote show */}
            <Button className="bg-success m-2">Upvote : {post.upVotes}</Button>
            <Button className="bg-danger m-2">Downvote : {post.downVotes}</Button>
         </Col>
         <Col xs={9}>
            <Card className={post.completed === "yes" ? "border-success text-success p-2" : "p-2"}>
               <Card.Title>{post.title}</Card.Title>
               <Card.Body style={{
                  height: "5em",
                  overflow: "hidden",
                  whiteSpace: "wrap",
                  textOverflow: "ellipsis"
               }}><span style={{ color: "grey" }}>Click to view all :: </span>{post.desc}</Card.Body>
               <Card.Footer className={post.completed === "yes" ? "border-success text-success" : ""}><Link to={'/post/' + post.id}>View</Link></Card.Footer>
            </Card>
         </Col>
      </Row >
   </Container >);
}

export default PostCard;