import React from "react";
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
        ListGroup
    } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css' // import bootstrap css


const formStyle = {
    width: '300px'
};

const cardTextStyle = {
    color: 'black',
}

const jumbotronStyle = {
    marginTop: '10px',
    color: 'black'
}

const rowStyle = {
    marginTop: '15px'
}

export const CurrentQualityView = ({data, carbon, people, soundLevel, temperature, humidity, date, callback}) => {  
 
   console.log("JSON", data)
  return (
      <div>
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
            <p>
                <Button variant="primary">Learn more</Button>
            </p>
        </Jumbotron>
        <Form>
            <Form.Row>
                <Col>
                    <h4>Number of people in the room: 10 </h4>
                </Col>
                <Col>
                    <Form.Control placeholder="Insert the current number of people here.." />
                </Col>
                <Col>
                    <Button data-testid = "submit-button" variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Form.Row>
        </Form>
        <Row>
            <Col>
            <Card border = "success">
                <Card.Body>
                <Card.Title style = {cardTextStyle}>Humidity</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{data ? "Last update: " + data.date : <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>}</Card.Subtitle>
                    <Card.Text style = {cardTextStyle}>
                        <ListGroup variant="flush">
                            <ListGroup.Item data-testid = "actual-humidity"><h2>{data ? data.data + " %" : <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>}</h2> </ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                    <Card.Link href="#">History</Card.Link>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card border = "success">
                <Card.Body>
                    <Card.Title style = {cardTextStyle}>Air Quality</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{data ? "Last update: " + data.date : <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>}</Card.Subtitle>
                    <Card.Text style = {cardTextStyle}>
                        <ListGroup variant="flush">
                            <ListGroup.Item data-testid = "actual-carbon"><h5>{data ? "Carbon: " + data.data + " unit": <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>} </h5> </ListGroup.Item>
                            <ListGroup.Item data-testid = "actual-carbon"><h5>{data ? "Volatile gases: " + data.data + " unit": <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>} </h5> </ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                    <Card.Link href="#">History</Card.Link>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card border = "success" >
                <Card.Body>
                <Card.Title style = {cardTextStyle}>Temperature</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{data ? "Last update: " + data.date : <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>}</Card.Subtitle>
                    <Card.Text style = {cardTextStyle}>
                        <ListGroup variant="flush">
                            <ListGroup.Item data-testid = "actual-temperature"><h2>{data ? data.data + " C": <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>} </h2></ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                    <Card.Link href="#">History</Card.Link>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        <Row style = {rowStyle} className = "justify-content-center">
             <Form style = {formStyle}>
                  <Form.Group controlId="formBasicEmail">
                      <Form.Label>Here you can insert the current number of poeple in the room</Form.Label>
                      <Form.Control type="people" placeholder="Enter number of people" />
                      <Form.Text className="text-muted">
                      Ensure that the number is correct.
                      </Form.Text>
                  </Form.Group>
                  <Button data-testid = "submit-button" variant="primary" type="submit">
                      Submit
                  </Button>
              </Form>
         </Row>   
        </div>
  );

};