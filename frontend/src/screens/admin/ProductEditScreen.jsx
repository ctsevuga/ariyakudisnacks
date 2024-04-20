import { useEffect, useState,useContext } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
import { GlobalContext } from "../../context/GlobalState";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const { user } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [ingredient3, setIngredient3] = useState('');
  const [ingredient4, setIngredient4] = useState('');
  const [ingredient5, setIngredient5] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/");
    }
  }, [navigate. user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,

        brand,
        category,
        description,
        countInStock,
        ingredient1,
        ingredient2,
        ingredient3,
        ingredient4,
        ingredient5,
      });
      toast.success("product updated successfully");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);

      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setIngredient1(product.ingredient1);
      setIngredient2(product.ingredient2);
      setIngredient3(product.ingredient3);
      setIngredient4(product.ingredient4);
      setIngredient5(product.ingredient5);
    }
  }, [product]);

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
          <Row>
          <Col md={6}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group> */}

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
             
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group controlId='ingredient1'>
              <Form.Label>Ingredient</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter ingredient'
                value={ingredient1}
                onChange={(e) => setIngredient1(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='ingredient2'>
              <Form.Label>Ingredient</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter ingredient'
                value={ingredient2}
                onChange={(e) => setIngredient2(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='ingredient3'>
              <Form.Label>Ingredient</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter ingredient'
                value={ingredient3}
                onChange={(e) => setIngredient3(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='ingredient4'>
              <Form.Label>Ingredient</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter ingredient'
                value={ingredient4}
                onChange={(e) => setIngredient4(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='ingredient5'>
              <Form.Label>Ingredient</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter ingredient'
                value={ingredient5}
                onChange={(e) => setIngredient5(e.target.value)}
              ></Form.Control>
            </Form.Group>
            </Col>
            </Row>
            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
