import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FetchAPI } from "../../api";
import {
  ADD_ONE_CUSTOMER,
  GET_ALL_CUSTOMER,
  DELETE_SPECIFIC_CUSTOMER,
} from "../../api/apiList";
import { useDispatch } from "react-redux";
import { message } from "../../redux/actionFunction";
import { getAllCustomer } from "../../redux/actionFunction";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";

const CreateCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSubmitData = (data) => {
    FetchAPI("post", ADD_ONE_CUSTOMER, data).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        reset();
        getCustomerData();
      } else if (res.status == 400) {
        dispatch(message({ message: res.data, type: "error" }));
      }
    });
  };

  useEffect(() => {
    getCustomerData();
  }, []);
  const getCustomerData = () => {
    FetchAPI("get", GET_ALL_CUSTOMER).then((res) => {
      if (res.status == 200) {
        setLoading(false);
        setCustomers(res.data);
        dispatch(getAllCustomer(res.data));
      }
    });
  };

  const deleteItem = (id) => {
    FetchAPI("delete", DELETE_SPECIFIC_CUSTOMER + id).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        getCustomerData();
      }
    });
  };

  return (
    <>
      {!loading ? (
        <>
          <h3 className="mb-3 ">Create New Customer</h3>
          <div className="create_customer">
            <form onSubmit={handleSubmit(handleSubmitData)}>
              <div>
                <label htmlFor="Customer Name">Customer Name:</label>
                <input
                  id="Customer Name"
                  {...register("name", { required: true })}
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
                  {...register("addressLine1", { required: true })}
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
              </div>
              <div>
                <label htmlFor="city">city : </label>

                <input
                  type="text"
                  id="city"
                  {...register("city", { required: true })}
                />
                <div className="error mt-2">
                  {errors.city && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <label htmlFor="Pincode">Pincode : </label>

                <input
                  type="text"
                  id="Pincode"
                  {...register("pincode", { required: true })}
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
                  {...register("contactNumber", { required: true })}
                />
                <div className="error mt-2">
                  {errors.contactNumber && <span>This field is required</span>}
                </div>
              </div>
              <div style={{ marginLeft: "20%", marginTop: "20px" }}>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {customers.length != 0 && (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Customer Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">AddressLine1</th>
                  <th scope="col">AddressLine2</th>
                  <th scope="col">City</th>
                  <th scope="col">Pincode</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(
                  (
                    {
                      customerId,
                      name,
                      addressLine1,
                      addressLine2,
                      city,
                      pincode,
                      contactNumber,
                    },
                    key
                  ) => (
                    <tr key={key}>
                      <th scope="row">{customerId}</th>
                      <td>{name}</td>
                      <td>{addressLine1}</td>
                      <td>{addressLine2}</td>
                      <td>{city}</td>
                      <td>{pincode}</td>
                      <td>{contactNumber}</td>
                      <td>
                        <Link
                          to={"/editcustomer/" + customerId}
                          className="mx-2"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        ||
                        <span
                          onClick={() => deleteItem(customerId)}
                          className="mx-2 cursor_pointer"
                        >
                          <i
                            className="far fa-trash-alt"
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
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CreateCustomer;
