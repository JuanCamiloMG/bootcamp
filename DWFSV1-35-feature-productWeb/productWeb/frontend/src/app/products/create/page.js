"use client";

import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FloatingLabel, FormCheck, FormControl, FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/navigation";
import NavbarComponent from "productWeb/components/shared/navbar/page";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function CreateProduct() {
  /**
   * Set the state for Register Page
   */
  let [name, setName] = useState();
  let [productType, setProductType] = useState();
  let [quantity, setQuantity] = useState();
  let [price, setPrice] = useState();
  let [latitude, setLatitude] = useState();
  let [longitude, setLongitude] = useState();
  let [product, setProduct] = useState(null);

  const router = useRouter();

  useEffect(() => {
    product && createProducts();
  }, [product]);

  /**
   *
   * @param event
   * @param setValue
   * @param callback
   */
  const onChange = (event, setValue, callback) => {
    if (callback !== null) {
      setValue(callback(event.target.value));
    } else {
      setValue(event.target.value);
    }
  };

  /**
   * @method
   * @description this method use for send to server and save on sessionStorage API
   */
  const createProducts = () => {
    // URL of the JSON data
    const url = 'http://localhost:3001/api/v1/products/create';

    // Use fetch() to get the data
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
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
        localStorage.setItem('product', JSON.stringify(data));
        router.push("/products");
      })
      .catch(error => {
        // Handle the error
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  /**
   * @method
   * @param data
   * @description this method use for build data for send to server
   */
  const buildData = data => {
    let buildData = null;

    if (data !== null && data !== undefined) {
      buildData = {
        name: name,
        product_type: productType,
        quantity: quantity,
        price: price,
        latitude: latitude,
        longitude: longitude

      }
    }
    return buildData;
  };

  /**
   * @method
   * @description this method use for get data from the HTML inputs,
   * also through convert to JSON object for next time send to any server
   */
  const getFormData = () => {
    setProduct(buildData({ name: name, productType: productType, quantity: quantity, price: price, latitude: latitude, longitude: longitude }));
  };

  return (
    <Container>
      <Row>
        <NavbarComponent />
      </Row>
      <Row>
        <Col lg={6}>
          <Form>
            <FormGroup className="mb-3" controlId="nameId">
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre del producto"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Ingrese el nombre de producto"
                  onChange={event => { onChange(event, setName, null) }}
                />
              </FloatingLabel>
            </FormGroup>

            <FormGroup className="mb-3" controlId="productTypeId">
              <FloatingLabel
                controlId="productTypeId"
                label="Tipo de producto"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Ingrese el tipo de producto"
                  onChange={event => { onChange(event, setProductType, null) }}
                />
              </FloatingLabel>
            </FormGroup>

            <FormGroup className="mb-3" controlId="quantityId">
              <FloatingLabel
                controlId="quantityId"
                label="Cantidad"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Ingrese la cantidad"
                  onChange={event => { onChange(event, setQuantity, null) }}
                />
              </FloatingLabel>
            </FormGroup>

            <FormGroup className="mb-3" controlId="priceId">
              <FloatingLabel
                controlId="priceId"
                label="Precio"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Ingrese el precio"
                  onChange={event => { onChange(event, setPrice, null) }}
                />
              </FloatingLabel>
            </FormGroup>

            <FormGroup className="mb-3" controlId="latitudeId">
              <FloatingLabel
                controlId="latitudeId"
                label="latitud"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Ingrese una latitud"
                  onChange={(event) => onChange(event, setLatitude, null)}
                />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="mb-3" controlId="longitudeId">
              <FloatingLabel
                controlId="longitudeId"
                label="longitud"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Ingrese una longitud"
                  onChange={(event) => onChange(event, setLongitude, null)}
                />
              </FloatingLabel>
            </FormGroup>
            <Button variant="primary" type="button" onClick={getFormData}>
              Ingresar producto
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}