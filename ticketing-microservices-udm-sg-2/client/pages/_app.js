import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <div>
      <header>Header</header>
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async ({ ctx }) => {
  const client = buildClient(ctx);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default AppComponent;
