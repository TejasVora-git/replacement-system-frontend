import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAPI } from "../api";
import {
  ITEM_FILTER,
  CUSTOMER_FILTER,
  PURCHASE_PARTNER_FILTER,
  HOME,
  DELETE_SPECIFIC_REPLACEMENT_DATA,
} from "../api/apiList";
import { formateDate } from "../components/formateDate";
import { Link } from "react-router-dom";
import { message } from "../redux/actionFunction";
import Loader from "./loader";

const FilterData = () => {
  const dispatch = useDispatch();
  const FilterOptionValue = localStorage.getItem("filterOption");
  const [loading, setLoading] = useState(
    FilterOptionValue == "Total Records" ? true : false
  );
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [allItemData, setAllItemData] = useState([]);
  const [allPartnerData, setAllPartnerData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const reduxCustomerData = useSelector(
    (state) => state.replacementSystem.getAllCustomer
  );
  const reduxItemData = useSelector(
    (state) => state.replacementSystem.getAllItem
  );

  const reduxPartnerData = useSelector(
    (state) => state.replacementSystem.getAllPartner
  );

  useEffect(() => {
    getTotalRecords();
    setFilterData([]);
    if (FilterOptionValue == "Total Records") {
      setLoading(true);
    }
  }, [FilterOptionValue]);

  const getTotalRecords = () => {
    if (FilterOptionValue == "Total Records") {
      FetchAPI("get", HOME).then((res) => {
        if (res.status == 200) {
          setLoading(false);
          setFilterData(res.data);
          setMainData(res.data);
        }
      });
    }
  };

  useMemo(() => {
    setAllCustomerData(reduxCustomerData);
    setAllItemData(reduxItemData);
  }, [reduxCustomerData, reduxItemData]);
  useMemo(() => {
    setAllItemData(reduxItemData);
  }, [reduxItemData]);
  useMemo(() => {
    setAllPartnerData(reduxPartnerData);
  }, [reduxPartnerData]);

  const handleInputChange = (value, filterOption) => {
    setLoading(true);
    if (value != "" && filterOption == "Item Wise") {
      let data = { itemId: parseInt(value) };
      FetchAPI("post", ITEM_FILTER, data).then((res) => {
        if (res.status == 200) {
          setLoading(false);
          setFilterData(res.data);
        }
      });
    } else if (value != "" && filterOption == "Sales Party Wise") {
      let data = { customerId: parseInt(value) };
      FetchAPI("post", CUSTOMER_FILTER, data).then((res) => {
        if (res.status == 200) {
          setFilterData(res.data);
          setLoading(false);
        }
      });
    } else if (value != "" && filterOption == "Purchase Party Wise") {
      let data = { replacementPartherId: parseInt(value) };
      FetchAPI("post", PURCHASE_PARTNER_FILTER, data).then((res) => {
        if (res.status == 200) {
          setFilterData(res.data);
          setLoading(false);
        }
      });
    } else {
      setFilterData([]);
    }
  };
  const deleteSpecificRecord = (id) => {
    FetchAPI("delete", DELETE_SPECIFIC_REPLACEMENT_DATA + id).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        getTotalRecords();
      }
    });
  };

  const searchValue = (e) => {
    let filterValue = [];
    mainData.filter((value) => {
      if (
        value.srno.toLowerCase().includes(e.target.value.toLowerCase()) ||
        value.newSrno.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        filterValue.push(value);
      }
    });
    setFilterData(filterValue);
  };

  return (
    <>
      <div>
        {/* -------------------Item Wise------------------------ */}
        {FilterOptionValue == "Item Wise" &&
          (!loading ? (
            <>
              <div className="col-3 ">
                <label htmlFor="productName">Product Name:</label>
                <select
                  name="productName"
                  id="productName"
                  className="form-control"
                  // value={x.productName}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "Item Wise")
                  }
                  required
                >
                  <option value="">--Please choose an option--</option>
                  {allItemData.map(({ name, itemId }, key) => (
                    <option value={itemId} key={key}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              {filterData.length != 0 ? (
                <table className="table table-hover table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">Item Name</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Inward Date</th>
                      <th scope="col">Replacement Parther Name</th>
                      <th scope="col">Replacement Sent Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData.map(
                      (
                        {
                          itemName,
                          customerName,
                          quantity,
                          inwardDate,
                          replacementPartherName,
                          replacementSentDate,
                        },
                        key
                      ) => (
                        <tr key={key}>
                          <td scope="row">{itemName}</td>
                          <td>{customerName}</td>
                          <td>{quantity}</td>
                          <td>{formateDate(inwardDate)}</td>
                          <td>{replacementPartherName}</td>
                          <td>{formateDate(replacementSentDate)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                <h4>No Data Found</h4>
              )}
            </>
          ) : (
            <Loader />
          ))}
        {/* -------------------Sales Party Wise------------------------ */}

        {FilterOptionValue == "Sales Party Wise" &&
          (!loading ? (
            <>
              <div className="col-3 ">
                <label htmlFor="productName">Customer Name:</label>
                <select
                  name="productName"
                  id="productName"
                  className="form-control"
                  // value={x.productName}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "Sales Party Wise")
                  }
                  required
                >
                  <option value="">--Please choose an option--</option>
                  {allCustomerData.map(({ name, customerId }, key) => (
                    <option value={customerId} key={key}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              {filterData.length != 0 ? (
                <table className="table table-hover table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Inward Date</th>
                      <th scope="col">Replacement Parther Name</th>
                      <th scope="col">Replacement Sent Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData.map(
                      (
                        {
                          itemName,
                          customerName,
                          quantity,
                          inwardDate,
                          replacementPartherName,
                          replacementSentDate,
                        },
                        key
                      ) => (
                        <tr key={key}>
                          <td scope="row">{customerName}</td>
                          <td>{itemName}</td>
                          <td>{quantity}</td>
                          <td>{formateDate(inwardDate)}</td>
                          <td>{replacementPartherName}</td>
                          <td>{formateDate(replacementSentDate)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                <h4>No Data Found</h4>
              )}
            </>
          ) : (
            <Loader />
          ))}
        {/* -------------------Purchase Party Wise------------------------ */}
        {FilterOptionValue == "Purchase Party Wise" &&
          (!loading ? (
            <>
              <div className="col-3 ">
                <label htmlFor="productName">Purchase party Name:</label>
                <select
                  name="productName"
                  id="productName"
                  className="form-control"
                  // value={x.productName}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "Purchase Party Wise")
                  }
                  required
                >
                  <option value="">--Please choose an option--</option>
                  {allPartnerData.map(({ name, replacementPartherId }, key) => (
                    <option value={replacementPartherId} key={key}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              {filterData.length != 0 ? (
                <table className="table table-hover table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">Replacement Parther Name</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Inward Date</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Replacement Sent Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData.map(
                      (
                        {
                          itemName,
                          customerName,
                          quantity,
                          inwardDate,
                          replacementPartherName,
                          replacementSentDate,
                        },
                        key
                      ) => (
                        <tr key={key}>
                          <td scope="row">{replacementPartherName}</td>
                          <td>{itemName}</td>
                          <td>{quantity}</td>
                          <td>{formateDate(inwardDate)}</td>
                          <td>{customerName}</td>
                          <td>{formateDate(replacementSentDate)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              ) : (
                <h4>No Data Found</h4>
              )}
            </>
          ) : (
            <Loader />
          ))}
        {/* -------------------Total Records------------------------ */}
        <div className="show-image">
          {FilterOptionValue == "Total Records" &&
            (!loading ? (
              <>
                <div style={{ margin: "15px 0" }}>
                  <input
                    type="text"
                    placeholder="Search By SrNo."
                    onChange={(e) => searchValue(e)}
                  />
                </div>
                {filterData.length != 0 ? (
                  <table className="table table-bordered table-responsive">
                    <thead>
                      <tr>
                        {/* <th scope="col">Id</th> */}
                        <th scope="col">Customer Name</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">SrNo.</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Description</th>
                        <th scope="col">Inward Date</th>
                        <th scope="col">Sales Date</th>
                        <th scope="col">Replacement Parther Name</th>
                        <th scope="col">Replacement Sent Date</th>
                        <th scope="col">Purchase Bill Date</th>
                        <th scope="col"> Replacement Return Date</th>
                        <th scope="col">New Srno</th>
                        <th scope="col">Additional Desc</th>
                        <th scope="col">Given To Person</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData.map(
                        (
                          {
                            replacementId,
                            srno,
                            quantity,
                            additionalDescription,
                            inwardDate,
                            salesDate,
                            stage,
                            replacementPartherId,
                            replacementSentDate,
                            purchaseBillDate,
                            customerName,
                            itemName,
                            replacementPartherName,
                            replacementReturnDate,
                            newSrno,
                            additionalDesc,
                            givenToPerson,
                          },
                          key
                        ) => (
                          <tr key={key} className="test">
                            <td scope="row">{customerName}</td>
                            <td>{itemName}</td>
                            <td>{srno}</td>
                            <td>{quantity}</td>
                            <td>{additionalDescription}</td>
                            <td>{formateDate(inwardDate)} </td>
                            <td>{formateDate(salesDate)}</td>
                            <td>{replacementPartherName}</td>
                            <td>{formateDate(replacementSentDate)}</td>
                            <td>{formateDate(purchaseBillDate)}</td>
                            <td>{formateDate(replacementReturnDate)}</td>
                            <td>{newSrno}</td>
                            <td>{additionalDesc}</td>
                            <td>{givenToPerson}</td>

                            <td className="disable_button">
                              <Link to={`editreplacementdata/${replacementId}`}>
                                <button className="spacing">Edit</button>
                              </Link>

                              <button
                                className="spacing"
                                onClick={() =>
                                  deleteSpecificRecord(replacementId)
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <h3>No Data</h3>
                )}
              </>
            ) : (
              <Loader />
            ))}
        </div>
      </div>
    </>
  );
};

export default FilterData;
