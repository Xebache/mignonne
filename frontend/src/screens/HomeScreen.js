import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Error from '../components/Error';
import Loader from '../components/Loader';
import Product from '../components/Product';


function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading
        ? <Loader />
        : error
          ? <Error variant='danger'>{ error }</Error>
          : <Row>
              {products.map((product) => (
                <Col
                  className='d-flex justify-content-center'
                  key={product.id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Product product={product} />
                </Col>
              ))}
            </Row>
      }
    </div>
  );
}

export default HomeScreen;
