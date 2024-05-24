import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Nav, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function NavbarComponent() {
  let [email, setEmail] = useState(null);
  let [name, setName] = useState(null);

  useEffect(() => {
    if (email === null) {
      const userBySession = JSON.parse(localStorage.getItem("user"));
      userBySession !== null && setEmail(userBySession.email);
    }
  }, []);

  useEffect(() => {
    if (name === null) {
      const productBySession = JSON.parse(localStorage.getItem("product"));
      productBySession !== null && setName(productBySession.name);
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Row>
          <Navbar.Brand href="#welcome">Bienvenido</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/users">Lista de usuarios</Nav.Link>
              <Nav.Link href={`/users/${email}`}>Perfil del usuario</Nav.Link>
              <Nav.Link href="/products/create">Crear producto</Nav.Link>
              <Nav.Link href={`/products/${name}`}>Actualizar producto</Nav.Link>
              <Nav.Link href="/products">Lista de productos</Nav.Link>
              <Nav.Link href="/users/logout">
                <strong>Cerrar Sesión</strong>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar >
  );
}