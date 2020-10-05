import React, { useState } from "react";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { withApollo } from "../apollo/apollo";
import { useMutation, gql, useApolloClient } from "@apollo/client";
import { getErrorMessage } from "../libs/error";
import Link from "next/link";

const SignupMutation = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $name: String
    $phone: String
    $address: String
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      phone: $phone
      address: $address
    ) {
      user {
        id
        email
        name
      }
      token
    }
  }
`;

const Signup = () => {
  const client = useApolloClient();
  const router = useRouter();
  const [signup, { loading }] = useMutation(SignupMutation);
  const [email, setEmailValue] = useState(null);
  const [password, setPasswordValue] = useState(null);
  const [name, setNameValue] = useState(null);
  const [phone, setPhoneValue] = useState(null);
  const [address, setAddressValue] = useState(null);
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.resetStore();
      const { data } = await signup({
        variables: { email, password, name, phone, address },
      });
      if (data.signup.token) {
        localStorage.setItem("token", data.signup.token);
        await router.push("/dashboard");
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  };

  return (
    <Container
      fluid
      className="vh-100 vw-100 d-flex justify-content-center align-items-center"
    >
      <Row className="w-75 h-75 border border-light rounded-10 shadow-lg">
        <Col className="d-flex justify-content-center align-items-center">
          <div className="p-3">
            <form onSubmit={handleSubmit}>
              {errorMsg && <p>{errorMsg}</p>}
              <h1>Sign up</h1>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  onChange={(e) => setNameValue(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPhone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPhone"
                  onChange={(e) => setPhoneValue(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputAddress"
                  onChange={(e) => setAddressValue(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-danger rounded">
                {loading ? `Submitting` : `Signup`}
              </button>
            </form>
          </div>
        </Col>
        <Col className="bg-danger d-flex justify-content-center align-items-center">
          <div className="p-3">
            <h1 className="text-white">Hello Friends</h1>
            <p className="text-white">
              Enter your information and start journey with us
            </p>

            <button
              type="button"
              className="btn btn-outline-light rounded text-white"
            >
              <Link href="/signin">Signin</Link>
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withApollo({ ssr: false })(Signup);
