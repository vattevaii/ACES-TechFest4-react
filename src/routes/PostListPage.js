import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
// import { Link, useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import ProfileCard from '../components/ProfileCard';
import Reviews from '../components/Reviews';
function PostListPage() {
   const [posts, changePosts] = useState([
      { id: 2341, title: "Lower Abdomen Pain", desc: "I've been getting this problem for over a week now.. Whenever I try to lift something heavy, i feel nasty cramps in my stomach. Can someone say what should I do??", upVotes: "12", downVotes: "5", completed: "no" },
      { id: 2213, title: "Fierce Headache", desc: "For sometime now.. my brain becomes a mush and cant think of anything.. What can I do to solve the problem??", upVotes: "5", downVotes: "8", completed: "yes" }
   ])
   return (<div className="about">
      <Container>
         <Row><Col sm={{ span: 7, order: "first" }} xs={{ span: 12, order: "last" }} lg={8}>
            <Row>
               {posts.map((p, index) => <PostCard key={index} post={p} />)}
            </Row>
            <Row>
               <Container>
                  <Reviews />
               </Container>
            </Row>
         </Col><Col sm={5} lg={4} xs={{ order: "first" }}>
               <ProfileCard></ProfileCard>
            </Col>
         </Row>
      </Container >
   </div >);
}

export default PostListPage;