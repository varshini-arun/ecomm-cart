import React, {useEffect, useState} from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import CartItem from './CartItem'
import Axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { random, commerce } from 'faker'

const url= 'http://myjson.dit.upm.es/api/bins/e98';

function BuyPage({addInCart}) {
    const [product, setProduct] = useState([]);

    const fetchPhotos = async () => {
        const { data } = await Axios.get(url, {});
        const { photos } = data;
        const allProduct = photos.map(photo => ({
          smallImage: photo.src.medium,
          tinyImage: photo.src.tiny,
          productName: random.word(),
          productPrice: commerce.price(),
          id: random.uuid()
        }));
        setProduct(allProduct);
      };


      useEffect(()=>{
        fetchPhotos();
      },[])


    return (
        <Container fuild>
             <Row>
             {product.map((product)=>(
                  <Col md={4} key={product.id}>
                      <CartItem product={product} addInCart={addInCart} />
                  </Col>
                  ))}
             </Row>
        </Container>
    )
}

export default BuyPage
