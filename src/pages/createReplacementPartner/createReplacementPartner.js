import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FetchAPI } from "../../api";
import {
  CREATE_REPLACEMENT_PARTNER,
  GET_ALL_REPLACEMENT_PARTNER,
  DELETE_SPECIFIC_PARTNER,
} from "../../api/apiList";
import { useDispatch, useStore } from "react-redux";
import { message } from "../../redux/actionFunction";
import { getAllPartner } from "../../redux/actionFunction";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import ReplacementAddressPrint from "../../components/replacementAddressPrint";

const CreateReplacementPartner = () => {
  const [partners, setPartners] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [printData, setPrintData] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getPartnerData();
  }, []);
  const getPartnerData = () => {
    FetchAPI("get", GET_ALL_REPLACEMENT_PARTNER).then((res) => {
      if (res.status == 200) {
        setLoading(false);
        setPartners(res.data);
        setMainData(res.data);
        dispatch(getAllPartner(res.data));
      }
    });
  };

  const deleteItem = (id) => {
    FetchAPI("delete", DELETE_SPECIFIC_PARTNER + id).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        getPartnerData();
      }
    });
  };

  const handleSubmitData = (data) => {
    FetchAPI("post", CREATE_REPLACEMENT_PARTNER, data).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        reset();
        getPartnerData();
      } else if (res.status == 400) {
        dispatch(message({ message: res.data, type: "error" }));
      }
    });
  };

  const searchData = (e) => {
    setSearchValue(e.target.value);
    let filterValue = [];
    mainData.filter((value) => {
      if (value.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        filterValue.push(value);
      }
    });
    setPartners(filterValue);
  };

  return (
    <>
      {!loading ? (
        <>
          <h3 className="mb-3 " id="nonPrintableArea">
            Create Replacement Partner
          </h3>
          {searchValue == "" && (
            <div className="create_customer" id="nonPrintableArea">
              <form onSubmit={handleSubmit(handleSubmitData)}>
                <div>
                  <label className="col-sm-1" htmlFor="Partner Name">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="Partner Name"
                    placeholder="Enter Partner Name"
                    {...register("name", { required: false })}
                  />
                  <div className="error mt-2">
                    {errors.name && <span>This field is required</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="addressLine1">Address : </label>
                  <input
                    type="text"
                    id="addressLine1"
                    {...register("addressLine1", { required: false })}
                  />
                  <div className="error mt-2">
                    {errors.addressLine1 && <span>This field is required</span>}
                  </div>
                  <div>
                    <input
                      type="text"
                      className="create_customer_without_label"
                      {...register("addressLine2", { required: false })}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="create_customer_without_label"
                      {...register("addressLine3", { required: false })}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="city"> </label>

                  <input
                    type="text"
                    id="city"
                    {...register("city", { required: false })}
                  />
                  <div className="error mt-2">
                    {errors.city && <span>This field is required</span>}
                  </div>
                </div>
                <div>
                  <label htmlFor="Pincode">city : </label>

                  <input
                    type="text"
                    id="Pincode"
                    {...register("pincode", { required: false })}
                  />
                  <div className="error mt-2">
                    {errors.pincode && <span>This field is required</span>}
                  </div>
                </div>
                <div>
                  <label htmlFor="Contact Number">Contact Number : </label>

                  <input
                    type="text"
                    id="Contact Number"
                    {...register("contactNumber", { required: false })}
                  />
                  <div className="error mt-2">
                    {errors.contactNumber && (
                      <span>This field is required</span>
                    )}
                  </div>
                </div>
                <div style={{ marginLeft: "20%", marginTop: "20px" }}>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="search mt-2  " id="nonPrintableArea">
            <form class="form-inline">
              <div class="form-group mx-sm-3 mb-2">
                <label for="inputPassword2" class="sr-only">
                  Password
                </label>
                <input
                  className="search_input"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => searchData(e)}
                />
                <button type="submit" class="btn btn-primary mb-2">
                  Search
                </button>
              </div>
            </form>
          </div>

          {partners.length != 0 && (
            <table className="table table-hover " id="nonPrintableArea">
              <thead>
                <tr>
                  <th scope="col">Partner Id</th>
                  <th scope="col">Name</th>
                  {/* <th scope="col">AddressLine1</th>
                  <th scope="col">AddressLine2</th> */}
                  <th scope="col">City</th>
                  {/* <th scope="col">Pincode</th> */}
                  <th scope="col">Contact Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map(
                  (
                    {
                      replacementPartherId,
                      name,
                      addressLine1,
                      addressLine2,
                      addressLine3,
                      city,
                      pincode,
                      contactNumber,
                    },
                    key
                  ) => (
                    <tr key={key}>
                      <th scope="row">{replacementPartherId}</th>
                      <td>{name}</td>
                      {/* <td>{addressLine1}</td>
                      <td>{addressLine2}</td> */}
                      {/* <td>{city}</td> */}
                      <td>{pincode}</td>
                      <td>{contactNumber}</td>
                      <td>
                        <Link
                          to={"/editreplacementpartner/" + replacementPartherId}
                          className="mx-2"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        ||
                        <span
                          onClick={() => deleteItem(replacementPartherId)}
                          className="mx-2 cursor_pointer"
                        >
                          <i
                            className="far fa-trash-alt"
                            style={{ color: "#0D6EFD" }}
                          ></i>
                        </span>
                        ||
                        <span
                          className="mx-2 cursor_pointer"
                          onClick={() => {
                            setPrintData({
                              name: name,
                              addressLine1: addressLine1,
                              addressLine2: addressLine2,
                              addressLine3: addressLine3,
                              city: city,
                              pincode: pincode,
                              contactNumber: contactNumber,
                            });
                          }}
                        >
                          <i
                            className="fas fa-print"
                            style={{ color: "#0D6EFD" }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
          <div style={{ width: "60%", margin: "auto" }}>
            {Object.keys(printData).length != 0 && (
              <ReplacementAddressPrint
                printData={printData}
                setPrintData={setPrintData}
              />
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CreateReplacementPartner;
