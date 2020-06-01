import React from "react";
import axios from "axios";

const index = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
};

index.getInitialProps = async () => {
  //if we are on the server
  if (typeof window === "undefined") {
    // route the req to nginx
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          Host: "ticketing.dev",
        },
      }
    );

    return data;
  } else {
    // we are on the browser
    const { data } = await axios.get("/api/users/currentuser");

    return data;
  }
};

export default index;
