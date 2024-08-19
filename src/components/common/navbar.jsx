import React, { Component } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class BootstrapNavbar extends Component {
  state = {
    expanded: false,
  };
  setExpanded = (expanded) => this.setState({ expanded: expanded });
  handleClose = () => this.setState({ expanded: false });

  render() {
    var expand = "md";
    return (
      <Navbar
        sticky="top"
        key={expand}
        bg="light"
        expand={expand}
        className="mb-3"
        onToggle={this.setExpanded}
        expanded={this.state.expanded}
      >
        <Container fluid>



          <Navbar.Brand as="div" href="#" className="" onClick={this.handleClose}>
            <Link to="/movies/" className="navbar-brand text-truncate">
              imdb (Inge Movie Database)
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Collapse id={`offcanvasNavbar-expand-${expand}`}>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as="div" href="#" onClick={this.handleClose}>
                <Link to="/movies/" className="nav-link">
                  Movies
                </Link>                  
              </Nav.Link>
              <Nav.Link as="div" href="#" onClick={this.handleClose}>
                <Link to="/login" className="nav-link">
                  Log in
                </Link>                  
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default BootstrapNavbar;