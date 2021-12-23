import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import { getPostById, getCommentsByPostId } from '../../apiCalls'
import { useParams } from 'react-router-dom';
import { useStateValue } from "../../states/userProvider";


// import { Link, useParams } from 'react-router-dom';
// import PostCard from '../components/PostCard';
import ProfileCard from '../../components/ProfileCard';
import Reviews from '../../components/Reviews';
function PostPage() {
   const [{ user, accessToken }, dispatch] = useStateValue();
   // console.log('user', user, accessToken)

   const { id } = useParams()
   // const [post, changePost] = useState({ id: 2341, title: "Lower Abdomen Pain", desc: "I've been getting this problem for over a week now.. Whenever I try to lift something heavy, i feel nasty cramps in my stomach. Can someone say what should I do??", upVotes: "12", downVotes: "5", completed: "no" },)
   const [post, changePost] = useState({})
   const [loading, setLoading] = useState(true)
   // const [postComments, changePostComments] = useState([{ id: 23, desc: "I also had this problem over a month ago. Let your body rest for at least a week.. The pain wil go away.", upVotes: "8", downVotes: "2", approved: "yes" },
   const [postComments, changePostComments] = useState([])

   useEffect(() => {
      getPostById(id).then(({ data }) => {
         changePost(data.question);
         // console.log('post', post)
         setLoading(false);
      }).catch(e => console.log(e))

      getCommentsByPostId(id).then(({ data }) => {
         changePostComments(data)
      }).catch(e => console.log(e))
   }, [])
   return (loading ? <>Loading..</> : <div className="about m-3">
      <Container>
         <Row><Col sm={5} lg={4} xs={{ order: "last" }}>
            <ProfileCard></ProfileCard>
         </Col><Col sm={{ span: 7, order: "last" }} xs={{ span: 12, order: "first" }} lg={8}>
               <Row>
                  <Card>
                     <Card.Title>{post.title}</Card.Title>
                     <Card.Body>{post.desc}</Card.Body>
                     <Card.Footer><span>Upvote : {post.upVote.length} </span> <span>Downvote : {post.downVote.length}</span> Comments:{postComments.length}
                     </Card.Footer></Card>
                  {postComments.map((c, i) => <Card key={i} className='rounded mt-2 bg-secondary text-white'>
                     <Card.Body>{c.desc}</Card.Body>
                     <Card.Footer><span className="btn btn-success">Upvote : {c.upVotes ? c.upVotes.length : "0"}</span> <span className="btn btn-danger">Downvote :{c.downVotes ? c.downVotes.length : "0"}</span></Card.Footer></Card>)}
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