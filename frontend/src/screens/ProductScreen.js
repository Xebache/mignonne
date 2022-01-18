import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import products from '../products'
import { HandIcon } from "../components/Icons";

function ProductScreen() {
    let urlParam = useParams();
    const product = products.find(p => p._id === urlParam.id)

    return (
        <Container>
            <Link to='/' className="btn btn-light my-3"><HandIcon/></Link>
            <Row>
                <Col md={7} className="text-center">
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={5}>
                    <ListGroup variant="flush">
                        <ListGroup.Item style={{border:"none"}}>
                            <h5 className="text-nowrap" style={{fontWeight:"300"}}>{product.name}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item style={{border:"none"}}>
                            {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item style={{border:"none"}}>
                            <h5>{product.price} €</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="btn-block w-100" type="button" variant="dark" style={{fontWeight:"200"}}>Ajouter au panier</Button>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-center">
                            <ListGroup horizontal className="d-flex justify-content-center">
                                <ListGroup.Item style={{border:"none"}}>
                                    <Image src={`${process.env.PUBLIC_URL}/icons/pinterest.png`} style={{height:"1rem", borderRadius:"50%", opacity:"0.3"}}/>
                                </ListGroup.Item>
                                <ListGroup.Item style={{border:"none"}}>
                                    <Image src={`${process.env.PUBLIC_URL}/icons/facebook.png`} style={{height:"1rem", borderRadius:"50%", opacity:"0.3"}}/>
                                </ListGroup.Item>
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductScreen
