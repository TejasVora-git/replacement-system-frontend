import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchAPI } from "../api";
import {
  EDIT_SPECIFIC_REPLACEMENT_DATA,
  GET_SPECIFIC_REPLACEMENT_DATA,
} from "../api/apiList";
import { message } from "../redux/actionFunction";
import { useHistory } from "react-router-dom";
import { formateDate } from "../components/formateDate";

const EditReplacementData = () => {
  const dispatch = useDispatch();
  //   const history = useHistory();
  const params = useParams();
  const [data, setData] = useState({});
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [allItemData, setAllItemData] = useState([]);
  const [allPartnerData, setAllPartnerData] = useState([]);
  const reduxCustomerData = useSelector(
    (state) => state.replacementSystem.getAllCustomer
  );
  const reduxItemData = useSelector(
    (state) => state.replacementSystem.getAllItem
  );
  const reduxPartnerData = useSelector(
    (state) => state.replacementSystem.getAllPartner
  );
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

  useEffect(() => {
    FetchAPI("get", GET_SPECIFIC_REPLACEMENT_DATA + params.id).then((res) => {
      if (res.status == 200) {
        setData(res.data[0]);
      }
    });
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    setData({ ...data, [evt.target.name]: value });
  }

  const handleSubmitData = (e) => {
    e.preventDefault();

    FetchAPI("PUT", EDIT_SPECIFIC_REPLACEMENT_DATA + params.id, data).then(
      (res) => {
        if (res.status == 200) {
          dispatch(message({ message: res.data, type: "success" }));
          // history.push("/createitem");
        }
      }
    );
  };
  return (
    <>
      {data.length != 0 && (
        <form onSubmit={handleSubmitData}>
          <div className="row">
            <div className="col">
              <label htmlFor="productName">Product Name:</label>
              <select
                name="itemId"
                id="productName"
                className="form-control"
                onChange={(e) => handleChange(e)}
              >
                {allItemData.map(({ name, itemId }, key) => (
                  <option
                    value={itemId}
                    key={key}
                    selected={data.itemId == itemId}
                  >
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label htmlFor="inputCity">Quantity :</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                placeholder="Enter Product Quantity"
                value={data.quantity}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="col">
              <label for="inputState">SrNo.</label>
              <input
                type="text"
                value={data.srno}
                name="srno"
                className="form-control"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col">
              <labe>Description:</labe>

              <input
                type="text"
                name="additionaldescription"
                className="form-control"
                value={data.additionaldescription}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col">
              <labe>Date of Inward:</labe>

              <input
                type="date"
                name="inwardDate"
                className="form-control"
                value={formateDate(data.inwardDate, true)}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col">
              <labe>Sales Date :</labe>

              <input
                type="date"
                name="salesDate"
                className="form-control"
                value={formateDate(data.salesDate, true)}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="productName">Customer Name:</label>
              <select
                name="customerId"
                id="productName"
                className="form-control"
                onChange={(e) => handleChange(e)}
              >
                {allCustomerData.length != 0 &&
                  allCustomerData.map(({ name, customerId }, key) => (
                    <option
                      value={customerId}
                      key={key}
                      selected={data.customerId == customerId}
                    >
                      {name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col">
              <label htmlFor="productName">Replacement Partner Name:</label>
              <select
                name="replacementPartherId"
                id="productName"
                className="form-control"
                onChange={(e) => handleChange(e)}
              >
                {allPartnerData.length != 0 &&
                  allPartnerData.map(({ name, replacementPartherId }, key) => (
                    <option
                      value={replacementPartherId}
                      key={key}
                      selected={
                        data.replacementPartherId == replacementPartherId
                      }
                    >
                      {name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col">
              <labe>Replacement Sent Date :</labe>

              <input
                type="date"
                name="replacementSentDate"
                className="form-control"
                value={formateDate(data.replacementSentDate, true)}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="col">
              <labe>Purchase Bill Date :</labe>

              <input
                type="date"
                name="purchaseBillDate"
                className="form-control"
                value={formateDate(data.purchaseBillDate, true)}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <labe>Replacement Return Date :</labe>
              <input
                type="date"
                name="replacementReturnDate"
                className="form-control"
                value={formateDate(data.replacementReturnDate, true)}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col">
              <labe>New Srno :</labe>

              <input
                type="text"
                name="newSrno"
                className="form-control"
                value={data.newSrno}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col">
              <labe>Additional Desc :</labe>

              <input
                type="text"
                name="additionalDesc"
                className="form-control"
                value={data.additionalDesc}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col">
              <labe>Outward Date :</labe>

              <input
                type="date"
                name="outwardDate"
                className="form-control"
                value={formateDate(data.outwardDate, true)}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col">
              <labe>Given To Person :</labe>

              <input
                type="text"
                name="givenToPerson"
                className="form-control"
                value={data.givenToPerson}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditReplacementData;
