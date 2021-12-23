import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { getPosts } from '../../apiCalls';
// import { Link, useParams } from 'react-router-dom';
import PostCard from '../../components/Posts/PostCard';
import ProfileCard from '../../components/ProfileCard';
// import Reviews from '../../components/Reviews';
import { useStateValue } from "../../states/userProvider";

function PostListPage() {
   // const [posts, changePosts] = useState([
   //    { _id: 2341, title: "Lower Abdomen Pain", desc: "I've been getting this problem for over a week now.. Whenever I try to lift something heavy, i feel nasty cramps in my stomach. Can someone say what should I do??", upVote: "12", downVote: "5", isApproved: "no" },
   //    { _id: 2213, title: "Fierce Headache", desc: "For sometime now.. my brain becomes a mush and cant think of anything.. What can I do to solve the problem??", upVote: "5", downVote: "8", isApproved: "yes" }
   // ])
   const [posts, changePosts] = useState([])
   const [{ user, jwt }, dispatch] = useStateValue();
   // console.log('post list page', user, jwt)
   console.log(localStorage.getItem('jwt'))
   let token = localStorage.getItem('jwt')
   let getUser = localStorage.getItem('user')

   useEffect(() => {
      if (jwt === "") {
         dispatch({ type: "SET_TOKEN", payload: { token, user: JSON.parse(getUser) } })
      }

   }, [dispatch, jwt, getUser])

   useEffect(() => {
      getPosts().then(({ data }) => {
         changePosts(data);
      }).catch(e => console.log(e))

   }, [])
   return (<div className="about">
      <Container className='my-2'>
         <Row><Col sm={{ span: 7, order: "first" }} xs={{ span: 12, order: "last" }} lg={8}>
            <Row>
               {posts.map((p, index) => <PostCard key={index} post={p} />)}
            </Row>
         </Col><Col sm={5} lg={4} xs={{ order: "first" }} >
               <ProfileCard className="position-sticky top-0"></ProfileCard>
            </Col>
         </Row>
      </Container >
   </div >);
}

export default PostListPage;