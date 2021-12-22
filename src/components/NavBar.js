import { useState } from 'react';
import { Navbar, Nav, Container, Dropdown, Form, FormControl, Offcanvas } from 'react-bootstrap'
// import { BreadCrumb } from '.';
import { Link } from "react-router-dom";
import { useStateValue } from '../states/userProvider'

const SearchBar = () => {
   return (<Form className="d-flex">
      <FormControl
         type="search"
         placeholder="Search"
         className="me-2"
         aria-label="Search"
      /></Form>)
}

const ChildNav = ({ className }) => {
   return (<Nav className={className}>
      <Nav.Link as={Link} to='/' className='px-2'>Home</Nav.Link>
      <Nav.Link as={Link} to="/about" className='px-2'>Link</Nav.Link>
   </Nav>)
}

const OffCanvas = () => {
   return (<Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="start"
      className="bg-dark navbar-dark text-white"
   // style={{ background: "black", color: "white" }}
   >
      <Offcanvas.Header closeButton>
         <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
         <div className='d-flex d-lg-none w-100 flex-column'>
            <ChildNav />
            <SearchBar />
         </div>
         <hr></hr>
         <Nav>
            <Nav.Link as={Link} to='/' className='px-2'>Profile</Nav.Link>
            <Nav.Link as={Link} to="/about" className='px-2'>Settings</Nav.Link>
            <Nav.Link as={Link} to="/records" className='px-2'>Records</Nav.Link>
            <Nav.Link as={Link} to="/posts" className='px-2'>Posts</Nav.Link>
            <Nav.Link as={Link} to="/newregister" className='px-2'>New Person Register</Nav.Link>
         </Nav>
      </Offcanvas.Body>
   </Navbar.Offcanvas >)
}
function NavBar() {
   const { user } = useStateValue()[0];
   return (
      <Navbar bg="dark" variant="dark" expand={false} className='flex-nowrap'>
         <Container>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <OffCanvas />
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <div className="d-none d-lg-flex w-100 justify-content-between">
               <ChildNav className="flex-row" />
               <SearchBar />
            </div>
            {user ? (<Dropdown>
               <Dropdown.Toggle variant="success" id="basic-nav-dropdown">
                  Dropdown Button
               </Dropdown.Toggle>
               <Dropdown.Menu style={{ right: "0", left: "auto", marginTop: "5px" }}>
                  <Dropdown.Item href="#action/3.1">Action</Dropdown.Item>
                  <Dropdown.Item href="#action/3.2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#action/3.3">Something</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Others</Dropdown.Header>
                  <Dropdown.Item href="#action/3.4">Separated link</Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>) : (<Nav.Link as={Link} to='/login' className='px-2'>Login/Register</Nav.Link>)
            }
         </Container>
      </Navbar >

   );
}

export default NavBar;
