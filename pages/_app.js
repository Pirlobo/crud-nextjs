import { Provider } from "next-auth/client";
import "./styles.css";
import { SWRConfig } from "swr";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <Provider
        options={{
          clientMaxAge: 0,
          keepAlive: 0,
        }}
        session={pageProps.session}
      >
      <SWRConfig value = {{dedupingInterval : 5000}}>
      <div className="center">
        <div className = "component__container">
        <Component {...pageProps} />
        </div>
        </div>
      </SWRConfig>
      </Provider>
    </ReduxProvider>
  );
}
