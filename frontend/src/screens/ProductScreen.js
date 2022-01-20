import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { HandIcon } from '../components/Icons';

function ProductScreen() {
  const urlParam = useParams();

  const [product, setProduct] = useState([]);
  const [mainImagePath, setMainImagePath] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(`/api/products/${urlParam.id}`);
      setProduct(data);
      setMainImagePath(data.images.find((i) => i.isMain).path);
    }
    fetchProduct();
  }, [urlParam]);

  return (
    <Container>
      <Link to='/' className='btn btn-light my-3'>
        <HandIcon />
      </Link>
      <Row>
        <Col md={7} className='text-center'>
          <Image src={mainImagePath} alt={product.name} fluid />
        </Col>
        <Col md={5}>
          <ListGroup variant='flush'>
            <ListGroup.Item style={{ border: 'none' }}>
              <h5 className='text-nowrap' style={{ fontWeight: '300' }}>
                {product.name}
              </h5>
            </ListGroup.Item>
            <ListGroup.Item style={{ border: 'none' }}>
              {product.description}
            </ListGroup.Item>
            <ListGroup.Item style={{ border: 'none' }}>
              <h5>{product.price} €</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className='btn-block w-100'
                type='button'
                variant='dark'
                style={{ fontWeight: '200' }}
              >
                Ajouter au panier
              </Button>
            </ListGroup.Item>
            <ListGroup.Item className='text-center'>
              <ListGroup horizontal className='d-flex justify-content-center'>
                <ListGroup.Item style={{ border: 'none' }}>
                  <Image
                    src={`${process.env.PUBLIC_URL}/icons/pinterest.svg`}
                    style={{
                      height: '1rem',
                      borderRadius: '50%',
                      opacity: '0.3',
                    }}
                  />
                </ListGroup.Item>
                <ListGroup.Item style={{ border: 'none' }}>
                  <Image
                    src={`${process.env.PUBLIC_URL}/icons/facebook.svg`}
                    style={{
                      height: '1rem',
                      borderRadius: '50%',
                      opacity: '0.3',
                    }}
                  />
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductScreen;
