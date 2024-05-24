"use client"

import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import NavbarComponent from "productWeb/components/shared/navbar/page";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProductsList() {

  const url = 'http://localhost:3001/api/v1/products';
  const [products, setProducts] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    products === null && getAllProducts();
  }, [token]);

  useEffect(() => {
    token === null && getToken();
  }, []);

  /**
   * @method
   * @description load token from sessionStorage
   */
  const getToken = () => {
    const tokenForSession = sessionStorage.getItem('token');
    tokenForSession !== null && token === null && setToken(tokenForSession);
  };

  /**
 * @method
 * @description load user from backend with load token by getToken through to useEffect
 */
  const getAllProducts = () => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        // Check if the request was successful
        if (response) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        // Use the JSON data
        console.log(data);
        products === null && setProducts(data);
      })
      .catch(error => {
        // Handle the error
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  return (
    <Container>
      <Row>
        <NavbarComponent />
      </Row>
      <Row>
        <Col lg={6}>
          <ListGroup>
            {
              products && products.length > 0 && products.map(product => {
                return (<ListGroupItem key={product.id}>{product.name}</ListGroupItem>);
              })
            }
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}