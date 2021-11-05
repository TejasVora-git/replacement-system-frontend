import React, { useState, useEffect } from "react";
import InwardPrint from "../../components/printInward";
import { useDispatch, useSelector } from "react-redux";
import { FetchAPI } from "../../api";
import { STAGE1 } from "../../api/apiList";
import { message } from "../../redux/actionFunction";

const InwardStage1 = () => {
  const dispatch = useDispatch();

  const reduxCustomerData = useSelector(
    (state) => state.replacementSystem.getAllCustomer
  );
  const reduxItemData = useSelector(
    (state) => state.replacementSystem.getAllItem
  );
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [allItemData, setAllItemData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedCustomerData, setSelecctedCustomerData] = useState([]);
  const [inputList, setInputList] = useState([
    {
      productName: "",
      srNo: "",
      date: "",
      quantity: 1,
      additionaldescription: "",
      salesdate: "",
    },
  ]);
  useEffect(() => {
    setAllCustomerData(reduxCustomerData);
    setAllItemData(reduxItemData);
  }, [reduxCustomerData, reduxItemData]);

  const [inwardDate, setInwardDate] = useState("");
  var today = "";
  useEffect(() => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    today = year + "-" + month + "-" + day;

    setInwardDate(today);
  }, []);

  useEffect(() => {
    allCustomerData.find((value) => {
      if (value.name == selectedCustomer) {
        setSelecctedCustomerData(value);
      }
    });
  }, [selectedCustomer]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        productName: "",
        srNo: "",
        date: "",
        quantity: 1,
        additionaldescription: "",
        salesdate: "",
      },
    ]);
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    if (inputList.length == 1) {
      let data = {
        customerId: selectedCustomerData.customerId,
        itemId: parseInt(inputList[0].productName),
        srno: inputList[0].srNo,
        additionalDescription: inputList[0].additionaldescription,
        quantity: inputList[0].quantity,
        inwardDate: inputList[0].date == "" ? inwardDate : inputList[0].date,
        salesDate: inputList[0].salesdate,
      };
      FetchAPI("post", STAGE1, data).then((res) => {
        if (res.status == 200) {
          dispatch(message({ message: res.data, type: "success" }));
        }
      });
    }
    if (inputList.length > 1) {
      inputList.map((value) => {
        let data = {};
        data = {
          customerId: selectedCustomerData.customerId,
          itemId: parseInt(value.productName),
          srno: value.srNo,
          additionalDescription: value.additionaldescription,
          quantity: value.quantity,
          inwardDate: value.date == "" ? inwardDate : value[0].date,
          salesDate: value.salesdate,
        };
        FetchAPI("post", STAGE1, data).then((res) => {
          if (res.status == 200) {
            dispatch(message({ message: res.data, type: "success" }));
          }
        });
      });
    }
  };

  return (
    <>
      <div id="nonPrintableArea">
        <h3 className="text-center">CUSSTOMER DETAILS</h3>
        <div className="row">
          <div className="col col-md-6">
            <labe>Customer Name :</labe>
            <input
              list="partyName"
              name="customerName"
              className="form-control"
              placeholder="Enter Customer Name"
              onChange={(e) => setSelectedCustomer(e.target.value)}
              required
            />
            <datalist id="partyName">
              {allCustomerData.map(({ name }, key) => (
                <option value={name} key={key} />
              ))}
            </datalist>
          </div>
        </div>
        {selectedCustomerData.length != 0 && (
          <>
            <div className="form-group mt-2">
              <label htmlFor="inputAddress">Address :</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address Line 1"
                defaultValue={selectedCustomerData.addressLine1}
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Address Line 2"
                defaultValue={selectedCustomerData.addressLine2}
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                defaultValue={selectedCustomerData.city}
                disabled
              />
            </div>
            <div className="row my-2">
              <div className="col">
                <labe>Postal Code :</labe>
                <input
                  type="text"
                  name="Postal Code"
                  className="form-control"
                  placeholder="Postal Code"
                  defaultValue={selectedCustomerData.pincode}
                  disabled
                />
              </div>
              <div className="col">
                <labe>Mobile Number:</labe>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile Number"
                  defaultValue={selectedCustomerData.contactNumber}
                  disabled
                />
              </div>
            </div>
          </>
        )}

        <form onSubmit={handleSubmitData} className="mt-3">
          {inputList.map((x, i) => {
            return (
              <div className="row" key={i}>
                <div className="form-group col-md-2">
                  <label htmlFor="productName">Product Name:</label>
                  <select
                    name="productName"
                    id="productName"
                    className="form-control"
                    value={x.productName}
                    onChange={(e) => handleInputChange(e, i)}
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
                <div className="form-group col-md-1">
                  <label htmlFor="inputCity">Quantity :</label>
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    placeholder="Enter Product Quantity"
                    value={x.quantity}
                    onChange={(e) => handleInputChange(e, i)}
                    required
                  />
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="inputState">SR NO. :</label>
                  <input
                    type="text"
                    name="srNo"
                    className="form-control "
                    placeholder="SR NO. :"
                    value={x.srNo}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
                <div className="form-group col-md-2">
                  <labe>Description:</labe>

                  <input
                    type="text"
                    name="additionaldescription"
                    className="form-control"
                    placeholder="Enter product Description"
                    value={x.additionaldescription}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <div className="row">
                    <div className=" col-md-6">
                      <labe>Date of Inward:</labe>

                      <input
                        type="date"
                        name="date"
                        className="form-control date_width"
                        value={x.date == "" ? inwardDate : x.date}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </div>
                    <div className=" col-md-6">
                      <labe>Sales Date :</labe>

                      <input
                        type="date"
                        name="salesdate"
                        className="form-control date_width "
                        value={x.salesdate}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group col-md-2 mt-4">
                  {inputList.length != 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}
                  {inputList.length - 1 == i && (
                    <button
                      onClick={handleAddClick}
                      className="btn btn-success"
                      type="button"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <div className="mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      <InwardPrint
        data={inputList}
        customerData={selectedCustomerData}
        inwardDate={inwardDate}
      />
    </>
  );
};

export default InwardStage1;
