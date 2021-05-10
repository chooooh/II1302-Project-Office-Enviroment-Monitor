import React from "react";                      //import react framework
import { 
        Button, 
        Navbar,
        Nav, 
        Row, 
        Col, 
        Form, 
        Spinner,
        Jumbotron,
        Card,
        ListGroup,
        Container
    } from 'react-bootstrap';                   // import bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'   // import bootstrap css
import {currentDateTime} from '../../utils.js'  //import function which returns current date and time from utils

//Objects defining css styling for the Bootstrap components
const formStyle = {
    padding: '10px'
};
const cardTextStyle = {
    color: 'black',
};
const jumbotronStyle = {
    marginTop: '70px',
    
    color: 'black',
};
const rowStyle = {
    margin: '15px'
};
const fontSize = {
    fontSize: '17px',
    fontWeight: 'bold',
};

/**
 * Functions which dictates the layout of the UI. It uses bootstrap components and styling.
 * Props are given by the presenter. See currentQuality.js
 * The function uses react such as state variables to keep track of the view state.
 * @param {*} param0 
 * @returns 
 */
export const CurrentQualityView = ({data, numberOfPeople, onSubmit}) => {  
    console.log("DATA", data)

    let lastFetch = null;
    if (data != null) lastFetch = currentDateTime(); 

    const textInput = React.createRef(); 
    const [peeps, setPeople] = React.useState(null);

    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark" fixed = "top">
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#history">History</Nav.Link>
                <Nav.Link href="#currentQuality">Current Quality</Nav.Link>
                </Nav>
            </Navbar>
            <Jumbotron style = {jumbotronStyle}>
                <h1>Office Environment Monitor!</h1>
                    <p>
                    On this page you can find all of the current statistics being monitored.<br/>
                        If the number of people displayed on this page is incorrect you can change it to the proper amount below.<br/>
                    </p>
            </Jumbotron>
            <Container fluid data-testid = "air-quality-content">
            {data == null ? <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>
            :<Card className="text-center">
            <Card.Header style = {cardTextStyle}>Current Quality</Card.Header>
            <Card.Body>
                <Card.Title style = {cardTextStyle}>The current measurements are displayed here</Card.Title>
                <Row style = {rowStyle}>
                <Col>
                <Card border = "success">
                    <Card.Body>
                    <Card.Title style = {cardTextStyle}>Humidity</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" data-testid = "date-humidity">{"Measured: " + data.date}</Card.Subtitle>
                        <Card.Text style = {cardTextStyle}>
                            <ListGroup variant="flush">
                                <ListGroup.Item data-testid = "actual-humidity" style = {fontSize}>{data.humidity + " %" } </ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card border = "success">
                    <Card.Body>
                        <Card.Title style = {cardTextStyle}>Air Quality</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" data-testid = "date-air-quality">{"Measured: " + data.date }</Card.Subtitle>
                        <Card.Text style = {cardTextStyle}>
                            <ListGroup variant="flush">
                                <ListGroup.Item data-testid = "actual-carbon" style = {fontSize}>{"Carbon: " + data.data.carbon + " ppm"}  </ListGroup.Item>
                                <ListGroup.Item data-testid = "actual-volatile-gases" style = {fontSize}>{"Volatile gases: " + data.data.volatile + " ppb"}  </ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card border = "success" >
                    <Card.Body>
                    <Card.Title style = {cardTextStyle}>Temperature</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" data-testid = "date-temperature">{"Measured: " + data.date}</Card.Subtitle>
                        <Card.Text style = {cardTextStyle}>
                            <ListGroup variant="flush">
                                <ListGroup.Item data-testid = "actual-temperature" style = {fontSize}>{data.temperature + " C"}</ListGroup.Item>
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
                <Button variant="primary">History</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{"Last fetch: " + lastFetch}</Card.Footer>
            </Card>}
            </Container>
            <Row style = {rowStyle} className = "justify-content-center">
                <Form style = {formStyle} data-testid = "form-component">
                {data == null? <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner> :<Form.Label data-testid = "people">{"Present people: " +  numberOfPeople }</Form.Label>}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Here you can insert the current number of poeple in the room</Form.Label>
                        <Form.Control placeholder="Enter number of people" ref = {textInput}  onChange = {() => { setPeople(textInput.current.value); console.log(textInput.current.value) }} type = "text"/>
                        <Form.Text className="text-muted">
                        Ensure that the number is correct.
                        </Form.Text>
                    </Form.Group>
                    <Button data-testid = "submit-button" variant="primary" type="submit" onClick = {(event) => {onSubmit(peeps); event.preventDefault()}}>
                        Submit
                    </Button>
                </Form>
            </Row>  
        </Container>
  );
};