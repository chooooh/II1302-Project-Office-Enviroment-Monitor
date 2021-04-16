import React from "react";
import { Button, Container, Row, Col} from 'react-bootstrap';


export const HomePageView = ({airQuality, people}) => (
    <Container>
        <Row>
            <Col><h1>Office Environment Monitor</h1> {people}</Col>
        </Row>
        <Row>
            <Col><Button type="button" className="btn btn-primary">Click me!</Button></Col>
            <Col><p>Resize this responsive page to see the effect!</p></Col>
        </Row>
    </Container>
)
