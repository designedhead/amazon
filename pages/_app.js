import "../styles/globals.css";
import "../styles/styles.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store, persistor } from "../src/app/store";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

const progress = new ProgressBar({
  size: 2,
  color: "#F29219",
  className: "loading_bar",
  delay: 10,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
