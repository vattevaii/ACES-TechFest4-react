import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
// import { Link, useParams } from 'react-router-dom';
// import PostCard from '../components/PostCard';
import ProfileCard from '../components/ProfileCard';
import Reviews from '../components/Reviews';
function PostPage() {
   const [post, changePost] = useState({ id: 2341, title: "Lower Abdomen Pain", desc: "I've been getting this problem for over a week now.. Whenever I try to lift something heavy, i feel nasty cramps in my stomach. Can someone say what should I do??", upVotes: "12", downVotes: "5", completed: "no" },)
   const [postComments, changePostComments] = useState([{ id: 23, desc: "I also had this problem over a month ago. Let your body rest for at least a week.. The pain wil go away.", upVotes: "8", downVotes: "2", approved: "yes" },
   { id: 213, desc: "Dont over stress.. It will make you feel better.", upVotes: "4", downVotes: "0", approved: "no" }])
   return (<div className="about m-3">
      <Container>
         <Row><Col sm={5} lg={4} xs={{ order: "last" }}>
            <ProfileCard></ProfileCard>
         </Col><Col sm={{ span: 7, order: "last" }} xs={{ span: 12, order: "first" }} lg={8}>
               <Row>
                  <Card>
                     <Card.Title>{post.title}</Card.Title>
                     <Card.Body>{post.desc}</Card.Body>
                     <Card.Footer><span>Upvote : {post.upVotes}</span> <span>Downvote :{post.downVotes}</span> Comments:{postComments.length}
                     </Card.Footer></Card>
                  {postComments.map(c => <Card className='rounded mt-2 bg-secondary text-white'>
                     <Card.Body>{c.desc}</Card.Body>
                     <Card.Footer><span>Upvote : {c.upVotes}</span> <span>Downvote :{c.downVotes}</span></Card.Footer></Card>)}
               </Row>
               <Row>
                  <Container>
                     <Reviews />
                  </Container>
               </Row>
            </Col>
         </Row>
      </Container >
   </div >);
}

export default PostPage;