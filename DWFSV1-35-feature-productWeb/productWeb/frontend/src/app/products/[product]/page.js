"use client";

import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FloatingLabel, FormControl, FormGroup, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/navigation";
import NavbarComponent from "productWeb/components/shared/navbar/page";

export default function ProductProfile(props) {
  const { product } = props.params || null;
  const router = useRouter();

  /**
   * Set the state for Register Page
   */
  let [productType, setProductType] = useState();
  let [quantity, setQuantity] = useState();
  let [price, setPrice] = useState();
  let [latitude, setLatitude] = useState();
  let [longitude, setLongitude] = useState()
  let [productUpdate, setProductUpdate] = useState(undefined);
  let [editProductFlag, setEditProductFlag] = useState(true);
  let [show, setShow] = useState(false);

  useEffect(() => {
    productUpdate && editProductFlag !== true && update();
  }, [productUpdate]);

  useEffect(() => {

    productUpdate === undefined && detail();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  const detail = () => {
    // URL of the JSON data
    const url = `http://localhost:3001/api/v1/products/${product}/detail`;

    // Use fetch() to get the data
    fetch(url)
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
        if (data) {
          setProductUpdate(data);
          setEditProductFlag(true);
          setProductType(data.product_type);
          setQuantity(data.quantity);
          setPrice(data.price);
          setLatitude(data.latitude);
          setLongitude(data.longitude);
        }
      })
      .catch(error => {
        // Handle the error
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  /**
   * @method
   * @description this method use for send to server and update and localStorage
   */
  const update = () => {
    const token = sessionStorage.getItem('token') || null;
    // URL of the JSON data
    const url = `http://localhost:3001/api/v1/products/${product}/update`;

    if (productUpdate && product) {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify(productUpdate)
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
          console.log(data)
          // Use the JSON data
          setEditProductFlag(true);
        })
        .catch(error => {
          // Handle the error
          console.error('There has been a problem with your fetch operation:', error);
        });
    } else {
      setEditProductFlag(true);
    }
  };

  /**
   * @method
   * @description this method use for delete user on server and remove localStorage and sessionStorage
   */
  const deleteProduct = () => {
    const token = sessionStorage.getItem('token') || null;
    // URL of the JSON data
    const url = `http://localhost:3001/api/v1/products/${product}/delete`;

    if (productUpdate && product) {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(data => {
          // Use the JSON data
          setEditProductFlag(true);
          setShow(false);
          router.push('/');
        })
        .catch(error => {
          // Handle the error
          console.error('There has been a problem with your fetch operation:', error);
        });
    } else {
      setEditProductFlag(true);
    }
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
        name: product,
        product_type: productType,
        quantity: quantity,
        price: price,
        latitude: latitude,
        longitude: longitude,
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
    productUpdate && console.log(productUpdate)
    setProductUpdate(buildData({
      name: product, productType: productType, quantity: quantity, price: price, latitude: latitude, longitude: longitude
    }));
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
                  value={product && productUpdate && productUpdate.name}
                  disabled={true}
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
                  value={productType}
                  disabled={editProductFlag}
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
                  value={quantity}
                  disabled={editProductFlag}
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
                  value={price}
                  disabled={editProductFlag}
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
                  value={latitude}
                  disabled={editProductFlag}
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
                  value={longitude}
                  disabled={editProductFlag}
                />
              </FloatingLabel>
            </FormGroup>
            {
              product && productUpdate && editProductFlag ?
                <Button
                  variant="info"
                  type="button"
                  onClick={event => setEditProductFlag(false)}>
                  Editar producto
                </Button> :
                <div>
                  <Button variant="primary" type="button" onClick={getFormData}>
                    Actualizar producto
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={event => setEditProductFlag(true)}>
                    Cancelar
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={event => setShow(true)}>
                    Eliminar
                  </Button>
                </div>
            }
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Atencion</Modal.Title>
              </Modal.Header>
              <Modal.Body>esta seguro de eliminar el
                producto <strong>{productUpdate && productUpdate.name}</strong></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="danger" onClick={deleteProduct}>
                  Aceptar
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}