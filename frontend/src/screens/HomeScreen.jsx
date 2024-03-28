import { Row, Col, Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import SnackCardComponent from "../components/SnackCardComponent";
import Meta from "../components/Meta";
import "../components/UI/Card.css";

const HomeScreen = () => {

  const snacks = [
    "Athirasam",
    "Kaimurukku",
    "Manoholam",
    "Murukku",
    "Seeppu Seedai",
    "Sinna Seedai",
 
  ];
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      <Row className="justify-content-md-center mt-2">
        <Col md={6}>
          <h2>Welcome to Ariyakudi Snacks</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-2">
        <Col md={6}>
          <Card
            className=".card"
            style={{ marginTop: "30px", marginBottom: "50px" }}
          >
            <h3>Order Online</h3>
            <h4>Deliver at your Door Step in 2 Hours. Payment on Delivery</h4>
            <hr></hr>
            <h5>
              Service is available only in{" "}
              <span className="font-weight-bold display-7 text-dark bg-light">
                *** Karaikudi ***
              </span>{" "}
            </h5>
            <hr></hr>
            <br></br>
          </Card>
        </Col>
        <Col md={6}>
          <Card
            className=".card"
            style={{ marginTop: "30px", marginBottom: "50px" }}
          >
            <h5>Delivery in Karaikudi</h5>
            <hr></hr>
            <p> order value below ₹ 200 - Delivery Charge: ₹50</p>
            <p> order value between ₹ 200 & ₹ 500 - Delivery Charge: ₹30</p>
            <p> order value between ₹ 500 & ₹ 1000 - Delivery Charge: ₹20</p>
            <p> order value above ₹ 1000 - No Delivery Charge</p>
          </Card>
        </Col>
      </Row>
 

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Click and Order</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
           <Container>
        <Row xs={2} md={3}  className="g-4 mt-3">
          {snacks.map((snack, idx) => (
            <SnackCardComponent key={idx} snack={snack} idx={idx} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
