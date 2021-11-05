import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FetchAPI } from "../api";
import {
  GET_ALL_CUSTOMER,
  GET_ALL_ITEM,
  GET_ALL_REPLACEMENT_PARTNER,
} from "../api/apiList";
import { useDispatch } from "react-redux";
import {
  getAllCustomer,
  getAllItem,
  getAllPartner,
} from "../redux/actionFunction";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  useEffect(async () => {
    await FetchAPI("get", GET_ALL_CUSTOMER).then((res) =>
      dispatch(getAllCustomer(res.data))
    );
    await FetchAPI("get", GET_ALL_ITEM).then((res) =>
      dispatch(getAllItem(res.data))
    );
    await FetchAPI("get", GET_ALL_REPLACEMENT_PARTNER).then((res) =>
      dispatch(getAllPartner(res.data))
    );
  }, []);
  const dispatch = useDispatch();

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("filterOption");
    history.push("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ marginLeft: "35px" }}
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/">
                <p className="nav-link">Home</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/createitem">
                <p className="nav-link">Create Item</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/createcustomer">
                <p className="nav-link">Create Customer</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/createcustomer">
                <Link to="/createreplacementpartner">
                  <p className="nav-link">Create Replacement Partner</p>
                </Link>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/inwardstage1">
                <p className="nav-link">stage1</p>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle">Dropdown</p>
              <div className="dropdown-menu inner-menu">
                <p
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.setItem("filterOption", "Purchase Party Wise");
                    history.push("/filter");
                  }}
                >
                  Purchase Party Wise
                </p>
                <p
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.setItem("filterOption", "Sales Party Wise");
                    history.push("/filter");
                  }}
                >
                  Sales Party Wise
                </p>
                <p
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.setItem("filterOption", "Total Records");
                    history.push("/filter");
                  }}
                >
                  Total Records
                </p>

                <p
                  className="dropdown-item"
                  onClick={() => {
                    localStorage.setItem("filterOption", "Item Wise");
                    history.push("/filter");
                  }}
                >
                  Item Wise
                </p>
              </div>
            </li>
          </ul>
          <div
            style={{ marginLeft: "auto", marginRight: "35px" }}
            className="cursor_pointer"
          >
            <p onClick={() => Logout()}>LogOut</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
