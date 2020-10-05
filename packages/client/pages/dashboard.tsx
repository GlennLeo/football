import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { withApollo } from "../apollo/apollo";

const QUERY = gql`
  query GetUser {
    users {
      id
      name
      email
      phone
    }
  }
`;

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      if (!localStorage.getItem("token")) {
        await router.push("/signin");
      }
    };
    checkAuth();
  });
  const { data, loading, error, refetch } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  return (
    <Layout>
      <h1>This should be rendered on client side</h1>
      {data.users.map((user: any) => {
        return (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        );
      })}
      <button onClick={() => refetch()}>Refetch</button>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Dashboard);
