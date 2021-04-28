import React from "react";
import { Button, Navbar,Nav, Container, Row, Col, Form, Tab, Tabs, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css' // import bootstrap css

const colStyle = {
    paddingTop: '75px',
    marginBottom: '15px',
};

const rowStyle = {
    paddingTop: '40px',
};

const pushRowToTheLeft = {
    paddingLeft: '15px',
}

export const CurrentQualityView = ({carbon, people, soundLevel, temperature, humidity, date, callback}) => {  
    /*  
    window.addEventListener('load', function () {
      // Your document is loaded.
      var fetchInterval = 5000; // 5 seconds.
      // Invoke the request every 5 seconds.
      setInterval(callback, fetchInterval);
    });
*/
  return (
  <Container className =  "justify-content-left">
          <Navbar bg="dark" variant="dark" fixed = "top">
              <Navbar.Brand href="#currentQuality">Current Quality</Navbar.Brand>
              <Nav className="mr-auto">
              <Nav.Link href="#history">History</Nav.Link>
              <Nav.Link href="#home">Home</Nav.Link>
              </Nav>
          </Navbar>
          <Row>
               <Col date-testid = "page-info" className = "text-left"  lg = {9} style = {colStyle}>
                  On this page you can find all of the current statistics being monitored.<br/>
                  If the number of poeple displayed on this page is incorrect you can change it to the proper amount.<br/>
             </Col>
         </Row>
         <Row style = {pushRowToTheLeft}>
                  <Tabs defaultActiveKey="airQuality" id="uncontrolled-tab-example">
                      <Tab eventKey="airQuality" title="Air Quality">
                          <Table striped bordered hover variant="dark">
                          <thead>
                              <tr>
                              <th data-testid = "date1">Date</th>
                              <th data-testid = "carbon-header">Carbon dioxide</th>
                              <th data-testid = "people1">#people in room</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                              <td data-testid = "actual-date1">{date}</td>
                              <td>{carbon}</td>
                              <td>{people}</td>
                              </tr>
                          </tbody>
                          </Table>
                      </Tab>
                      <Tab eventKey="sound" title="Sound Level">
                          <Table striped bordered hover variant="dark">
                              <thead>
                                  <tr>
                                  <th data-testid = "date2">Date</th>
                                  <th data-testid = "sound-lvl">Sound level (dBa)</th>
                                  <th data-testid = "people2">#people in room</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                  <td data-testid = "actual-date2">{date}</td>
                                  <td>{soundLevel}</td>
                                  <td>{people}</td>
                                  </tr>
                              </tbody>
                          </Table>    
                      </Tab>
                      <Tab eventKey="temperature" title="Temperature">
                          <Table striped bordered hover variant="dark">
                              <thead>
                                  <tr>
                                  <th data-testid = "date3">Date</th>
                                  <th data-testid = "temp">temperature</th>
                                  <th data-testid = "people3">#people in room</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                  <td data-testid = "actual-date3">{date}</td>
                                  <td>{temperature}</td>
                                  <td>{people}</td>
                                  </tr>
                              </tbody>
                          </Table>    
                      </Tab>
                      <Tab eventKey="humidity" title="Humidity">
                          <Table striped bordered hover variant="dark">
                              <thead>
                                  <tr>
                                  <th data-testid = "date4">Date</th>
                                  <th data-testid = "humidity">Humidity</th>
                                  <th data-testid = "people4">#people in room</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                  <td data-testid = "actual-date4">{date}</td>
                                  <td>{humidity}</td>
                                  <td>{people}</td>
                                  </tr>
                              </tbody>
                          </Table>    
                      </Tab>
                  </Tabs>
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
                  <Button data-testid = "submit-button" variant="primary" type="submit">
                      Submit
                  </Button>
              </Form>
             </Col>
         </Row>
         </Container>

  );

};