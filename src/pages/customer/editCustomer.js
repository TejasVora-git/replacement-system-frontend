import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchAPI } from "../../api";
import { EDIT_SPECIFIC_CUSTOMER } from "../../api/apiList";
import { message } from "../../redux/actionFunction";
import { useHistory } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import Loader from "../../components/loader";

const EditCustomer = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const getAllCustomers = useSelector(
    (state) => state.replacementSystem.getAllCustomer
  );
  const params = useParams();
  useEffect(() => {
    getAllCustomers.find((value) => {
      if (value.customerId == params.id) {
        setLoading(false);
        setValue("name", value.name);
        setValue("addressLine1", value.addressLine1);
        setValue("addressLine2", value.addressLine2);
        setValue("city", value.city);
        setValue("pincode", value.pincode);
        setValue("contactNumber", value.contactNumber);
      }
    });
  }, [getAllCustomers]);

  const handleSubmitData = (data) => {
    FetchAPI("PATCH", EDIT_SPECIFIC_CUSTOMER + params.id, data).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        history.push("/createcustomer");
      }
    });
  };
  return (
    <>
      {!loading ? (
        <>
          <h3 className="mb-3 ">Edit Customer</h3>
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
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EditCustomer;
