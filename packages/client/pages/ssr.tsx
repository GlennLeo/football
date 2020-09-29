import React from "react";
import { useQuery, gql } from "@apollo/client";
import Layout from "../components/Layout";
import { withApollo } from "../apollo/apollo";

const QUERY = gql`
  query GetUsers {
    users {
      id
      name
      email
      password
      phone
    }
  }
`;

const SSR = () => {
  const { data, loading, error, refetch } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  return (
    <Layout>
      <h1>This should be rendered on server side</h1>
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

export default withApollo({ ssr: true })(SSR);
