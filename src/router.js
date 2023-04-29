import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./components/header";
import CreateCustomer from "./pages/customer/createCustomer";
import CreateItem from "./pages/createItem/createItem";
import TableHover from "./pages/TableHover";
import { useSelector } from "react-redux";
import CreateReplacementPartner from "./pages/createReplacementPartner/createReplacementPartner";
import InwardStage1 from "./pages/stage1";
import EditItem from "./pages/createItem/editItem";
import EditPartner from "./pages/createReplacementPartner/editReplacementPartner";
import EditCustomer from "./pages/customer/editCustomer";
import InwardStage2 from "./pages/stage2";
import InwardStage3 from "./pages/stage3";
import FilterData from "./components/filter";
import EditReplacementData from "./pages/editReplacementData";
import SignUp from "./pages/signUp";
import PageNOtFound from "./pages/404";
import Login from "./pages/login";
import ProtectedRoute from "./pages/protectedRoute";

const Routes = () => {
  const GlobalMessage = useSelector((state) => state.replacementSystem.message);
  useEffect(() => {
    if (GlobalMessage != undefined && GlobalMessage != "") {
      if (GlobalMessage.type == "success") {
        toast.success(GlobalMessage.message.message);
      } else if (GlobalMessage.type == "warning") {
        toast.warning(GlobalMessage.message.message);
      } else if (GlobalMessage.type == "error") {
        toast.error(GlobalMessage.message);
      }
    }
  }, [GlobalMessage]);

  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={TableHover} />
          <ProtectedRoute path="/createitem" component={CreateItem} />
          <ProtectedRoute path="/createcustomer" component={CreateCustomer} />
          <ProtectedRoute path="/editcustomer/:id" component={EditCustomer} />
          <ProtectedRoute path="/inwardstage1" component={InwardStage1} />
          <ProtectedRoute path="/inwardstage2/:id" component={InwardStage2} />
          <ProtectedRoute path="/inwardstage3/:id" component={InwardStage3} />
          <ProtectedRoute path="/edititem/:id" component={EditItem} />
          <ProtectedRoute path="/filter" component={FilterData} />
          <ProtectedRoute
            path="/editreplacementdata/:id"
            component={EditReplacementData}
          />
          <ProtectedRoute
            path="/createreplacementpartner"
            component={CreateReplacementPartner}
          />
          <ProtectedRoute
            path="/editreplacementpartner/:id"
            component={EditPartner}
          />
          <Route component={PageNOtFound} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
