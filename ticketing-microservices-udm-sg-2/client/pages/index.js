import React from "react";
import buildClient from "../api/build-client";

const index = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
};

index.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default index;
