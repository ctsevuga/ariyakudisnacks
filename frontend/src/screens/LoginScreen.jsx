import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { GlobalContext } from "../context/GlobalState";

import { useLoginMutation } from "../slices/usersApiSlice";

import { toast } from "react-toastify";

const LoginScreen = () => {
  const { setUser } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))|| null;

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/home";

  useEffect(() => {
    if (userInfo) {
      setUser((userInfo));
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // useEffect(() => {
  //   if (userInfo) {
  //   setUser((userInfo));
  //   navigate("/home");
  //   }
  // }, [ userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      
      setUser(res);
      localStorage.setItem("userInfo", JSON.stringify(res));
      console.log(res.isAdmin);
      // navigate(redirect);
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          Forgot Password?{" "}
          <Link to={redirect ? `/forgot?redirect=${redirect}` : "/forgot"}>
            Reset Password
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
