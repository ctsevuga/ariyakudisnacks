import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';


const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // const [userid, setUserId] = useState();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  
  
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
const userId = userInfo._id;
console.log(userInfo._id)

const navigateHandler = () => {
       
  // navigate('/login?redirect=/shipping/${userId}');
  navigate('/');
};

const checkoutHandler = () => {
       
    // navigate('/login?redirect=/shipping/${userId}');
    navigate(`/shipping/${userId}`);
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>₹{item.price * item.qty}</Col>
                  <Col md={2}>{item.measurement}</Col>
                  {/* <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col> */}
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Row>
        <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={navigateHandler}
              >
                Add another Snack Item
              </Button>
        </Row>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal   </h2>
                ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
