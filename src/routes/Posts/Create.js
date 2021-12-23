import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import img from "../../static/image.png"
import { createPost, imgUpload } from "../../apiCalls"

function PostCreate() {
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   const [selFile, setFile] = useState({ file: null })
   const [file, setFileup] = useState('');
   const postSubmit = (e) => {
      e.preventDefault()
      createPost({ title, desc })
         .then((response) => {
            console.log(response.data._id);
            if (!!file)
               imgUpload({ type: "question" }, file).then(r => console.log(r.data))
         })
         .catch(e => console.log(e))
   }
   const uploadSingleFile = (e) => {
      setFile({
         file: URL.createObjectURL(e.target.files[0])
      })
      setFileup(e.target.files[0])
   }
   const imgPreview = selFile.file !== null ? <img src={selFile.file} alt='' /> : "";

   return (<Container>
      <Card className="mx-auto my-3 col-md-8 col-lg-6">
         <Card.Title className="fs-2 p-3 bg-dark text-white rounded">Create Post</Card.Title>
         <Card.Body>
            <form id="createPost" onSubmit={postSubmit} encType="multipart/form-data">
               <div className="form-group mb-2">
                  <label>Post</label>
                  <input
                     type="text"
                     className="form-control"
                     id="title"
                     name="title"
                     aria-describedby="post_title"
                     placeholder="Title of the Post"
                     value={title}
                     onChange={(event) => setTitle(event.target.value)}
                  />
               </div>
               <div className="form-group">
                  <textarea
                     type="text"
                     className="form-control "
                     id="description"
                     name="desc"
                     aria-describedby="post_description"
                     placeholder="Describe Your Problem Here.."
                     value={desc}
                     onChange={(event) => setDesc(event.target.value)}
                  />
               </div>
               {/* <div className="form-group">
                  <label>Password</label>
                  <input
                     type="password"
                     className="form-control"
                     id="exampleInputPassword1"
                     placeholder="Password"
                     onChange={(event) => setPassword(event.target.value)}
                  />
                  <small id="passworderror" className="text-danger form-text">
                     {passwordError}
                  </small>
               </div> */}
               Image
               <div className="form-group preview">
                  {imgPreview}
               </div>

               <div className="form-group">
                  <input type="file" name="file" className="form-control" onChange={uploadSingleFile} disabled />
               </div>
               <button type="submit" className="btn btn-primary">
                  Submit
               </button>
            </form>
         </Card.Body>
      </Card>
   </Container>);
}

export default PostCreate;