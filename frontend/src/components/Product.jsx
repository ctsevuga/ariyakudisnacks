import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link> */}

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title fs-5 text-warning'>
         
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h6'>250 Grams: ₹ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
