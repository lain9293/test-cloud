import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const style = {
  marginTop: '15px',
  marginBottom: '15px',
};

export default function Layout({ children }) {
  return (
    <Container style={style}>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
