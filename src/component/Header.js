import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../asset/img/logo192.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { remove } from 'lodash';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
const Header = () => {
    const navigate = useNavigate();
    const { logout, user } = useContext(UserContext)

    const handleLogout = () => {
        logout();
        navigate('/')
        toast.success('Logout success')

    }

    return (

        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">

                        <img
                            src={logoApp}
                            width="35"
                            height="35"
                            className='d-inline-block align-top mx-2'
                            alt="Manager Logo"
                        />
                        <span>Manager App</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === '/') &&
                            <>
                                <Nav className="me-auto" >
                                    <NavLink to="/" className=' nav-link'>Home</NavLink>
                                    <NavLink to="/users" className=' nav-link'>Manager Users</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.email && <span className="nav-link">welcome to {user.email}</span>}
                                    <NavDropdown title="Setting" id="basic-nav-dropdown" >
                                        {user && user.auth === true
                                            ? <NavDropdown.Item onClick={() => handleLogout()}> Logout</NavDropdown.Item>
                                            : <NavLink to="/Login" className=' dropdown-item '>Login</NavLink>
                                        }
                                    </NavDropdown>
                                </Nav>
                            </>
                        }

                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>
    )
}
export default Header;