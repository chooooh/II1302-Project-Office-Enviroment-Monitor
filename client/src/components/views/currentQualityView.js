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
        ListGroup,
        Container
    } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css' // import bootstrap css


const formStyle = {
    padding: '10px'
};

const cardTextStyle = {
    color: 'black',
}

const jumbotronStyle = {
    marginTop: '20px',
    color: 'black',
    
}

const rowStyle = {
    margin: '15px'
}

const fontSize = {
    fontSize: '12px',
}

/**
 * A simple function that returns the current date and time
 * @returns Date and time with custom formatting
 */
 const currentDateTime = () => {
    const now = new Date();

    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;

    let date = now.getFullYear() + "/" + month + "/" + day;
    let time = hour + ":" + minute + ":" + second;
    return date + " " + time;
}

export const CurrentQualityView = ({data, carbon, people, soundLevel, temperature, humidity, date, callback}) => {  
    
    let lastFetch = null;
    if (data != null) {
            lastFetch = currentDateTime();
      }

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
            <p>
                <Button variant="primary">Learn more</Button>
            </p>
        </Jumbotron>
        <Container fluid data-testid = "air-quality-content">
        {data == null ? <Spinner data-testid = "Spinner" animation="border" role="status"></Spinner>
         :<Card className="text-center">
        <Card.Header style = {cardTextStyle}><h1>Current Quality</h1></Card.Header>
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
                            <ListGroup.Item data-testid = "actual-humidity"><h2>{data.carbon + " %" }</h2> </ListGroup.Item>
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
                            <ListGroup.Item data-testid = "actual-carbon"><h5>{"Carbon: " + data.carbon + " ppm"} </h5> </ListGroup.Item>
                            <ListGroup.Item data-testid = "actual-volatile-gases"><h5>{"Volatile gases: " + data.carbon + " unit"} </h5> </ListGroup.Item>
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
                            <ListGroup.Item data-testid = "actual-temperature"><h2>{data.carbon + " C"} </h2></ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
            <Button variant="primary">History</Button>
        </Card.Body>
        <Card.Footer className="text-muted">{"Last fetch: " + lastFetch}</Card.Footer>
        </Card>
        }
        </Container>
        <Row style = {rowStyle} className = "justify-content-center">
             <Form style = {formStyle}>
             <h4 data-testid = "people">{"Present people: " +  people }</h4>
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
         
        </Container>
  );

};