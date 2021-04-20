import React from "react";
import { Button, Navbar,Nav, Container, Row, Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css' // import bootstrap css


export const CurrentQualityPage = () => (
    React.createElement(CurrentQualityView, 
        {
            airQuality: 10,
            soundLevel: 50, 
            people: 10
        }) 
);


const colStyle = {
    paddingTop: '75px',
    marginBottom: '15px',
};

const rowStyle = {
    paddingTop: '40px',
};

const colColor = {
    backgroundColor: '#434348',
};

export const CurrentQualityView = ({airQuality, people, soundLevel}) => (
    <Container className =  "justify-content-left">
     
            <Navbar bg="dark" variant="dark" fixed = "top">
                <Navbar.Brand href="#currentQuality">Current Quality</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#history">History</Nav.Link>
                <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
               
            </Navbar>
            <Row>
               <Col className = "text-left"  lg = {9} style = {colStyle}>
                    On this page you can find all of the current statistics being monitored.<br/>
                    If the number of poeple displayed on this page is incorrect you can change it to the proper amount.<br/>
                    You may want to refresh the page if you suspect that the values are outdated.
               </Col>
           </Row>
           <Row>
               <Col style = {colColor}>
                    <Row>
                        <Col className = "text-left"  >Current air quality: </Col>
                        <Col>{airQuality}</Col>
                    </Row>
                    <Row>
                        <Col className = "text-left" >Current sound level (dBA): </Col>
                        <Col>{soundLevel}</Col>
                    </Row>
                    <Row>
                        <Col className = "text-left" >#People in the room: </Col>
                        <Col>{people}</Col>
                    </Row>
                </Col>
           </Row>
           <Row className = "text-left" style = {rowStyle}>
               <Col>
               <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Here you can insert the current number of poeple in the room</Form.Label>
                        <Form.Control type="people" placeholder="Enter number of people" />
                        <Form.Text className="text-muted">
                        Ensure that the number is correct.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
               </Col>
           </Row>
           </Container>

      
  
);

