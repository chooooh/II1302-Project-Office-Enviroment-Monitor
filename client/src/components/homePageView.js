import React from "react";
import { Button, Row, Col, Navbar,Nav, Form, FormControl, Container, Card, Jumbotron} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css' // import bootstrap css



export const HomePage = () => (
    React.createElement(HomePageView, 
        {
            airQuality: 10, 
            people: 10
        }) 
);

export const HomePageView = ({airQuality, people}) => (
    <Container>
     
            <Navbar bg="dark" variant="dark" fixed = "top">
                <Navbar.Brand href="#home">OEM</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#currentStats">Current Statistics</Nav.Link>
                <Nav.Link href="#history">History</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>

            <Jumbotron>
  <h1>Hello, world!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
</Jumbotron>
      
    </Container>
)

/*
<Card className =  "mb-3" style = {{color: "#000"}}>
            <Card.Img src = "https://entwickler.de/wp-content/uploads/2018/10/stdlib-statistics-node-js-900x450.jpg"/>
            <Card.Body>
                <Card.Title>
                    Office Environtment monitor
                </Card.Title>
                <Card.Text>
                    Click on get started to view some sick stats!
                </Card.Text>
                <Button>Get Started!</Button>
            </Card.Body>
        </Card>
*/
