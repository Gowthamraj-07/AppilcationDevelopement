import { useState, useContext, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import { MyContext } from '../../MyContext';
import { Link } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbartop() {
  const { usercomponent, setUsercompoent } = useContext(MyContext);
  const { sharedState, setSharedState } = useContext(MyContext);
  const { selectedLocation, setSelectedLocation } = useContext(MyContext);
  const { closelogin, setCloseLogin } = useContext(MyContext);
  const { userdetails, setUserdetails } = useContext(MyContext);
  const {searchResult,setSearchResult}=useContext(MyContext)

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const navigate=useNavigate();
  const handleSelect = (eventKey) => {
    setSelectedLocation(eventKey);
    setSharedState(eventKey);
  };

  const handleLogin = () => {
    setCloseLogin(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      console.log("helloew")
      const response = await axios.get(`http://localhost:7777/search/${searchQuery}`);
      console.log(response.data)
      setSearchResult(response.data)
      navigate("/resultpage")
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  function handleClose()
  {
    setIsSearching(false)
    setSearchQuery('')
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Browser does not support Speech Recognition');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ height: 'auto' }} sticky='top'>
      <Container fluid>
        <Navbar.Brand style={{ paddingLeft: '50px', fontSize: '30px' }}>
          <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>EatEase</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavDropdown title={selectedLocation} id="navbarScrollingDropdown" onSelect={handleSelect}>
              <NavDropdown.Item href="#action3" eventKey="Coimbatore">Coimbatore</NavDropdown.Item>
              <NavDropdown.Item href="#action4" eventKey="Chennai">Chennai</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5" disabled>
                Available in your city soon!
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav style={{ marginRight: '50px' }}>
            {!isSearching ? (
              <Nav.Link href="#deets" style={{ paddingRight: "30px" }} onClick={() => setIsSearching(true)}>
                <SearchIcon style={{ fontSize: "25px" }} /> Search
              </Nav.Link>
            ) : (
              <div className="search-container" ref={searchInputRef}>
                <Form.Control
                  type="text"
                  placeholder="Search Food or Restaurant"
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleKeyDown}
                  style={{ width: '250px' }}
                />
                <CloseIcon className="close-icon" onClick={handleClose} />
                <MicIcon className="mic-icon" onClick={handleMicClick} />
              </div>
            )}
            <Nav.Link eventKey={2} style={{ paddingRight: "30px" }}>
            <Link to="/chatbox" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <GroupsIcon style={{ fontSize: "25px" }} /> Group
                </Link>
            </Nav.Link>
            {usercomponent ? (
              <Nav.Link eventKey={2} style={{ paddingRight: "30px" }} onClick={handleLogin}>
                <PersonIcon style={{ fontSize: "25px" }} /> Login
              </Nav.Link>
            ) : (
              <Nav.Link style={{ paddingRight: "30px" }}>
                <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <PersonIcon style={{ fontSize: "25px" }} /> {userdetails.userName}
                </Link>
              </Nav.Link>
            )}
            {!usercomponent && (
              <Nav.Link eventKey={2} style={{ paddingRight: "30px" }}>
                <ShoppingCartIcon style={{ fontSize: "25px" }} />
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/cart">Cart</Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbartop;
