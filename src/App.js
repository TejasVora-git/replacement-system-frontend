import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./router";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes />

        <ToastContainer pauseOnFocusLoss={false} autoClose={3000} />
      </div>
    </Provider>
  );
}

export default App;
