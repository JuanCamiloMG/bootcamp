import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
  return (
    <Container>
      <section>
        <Row>
          <Col>
            <div className="d-grid gap-4 col-md-8">
              <Button variant="primary" size="lg" href="/register">
                ¡Registrarme!
              </Button>
              <Button variant="primary" size="lg" href="/login">
                ¡Ingresar!
              </Button>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
}