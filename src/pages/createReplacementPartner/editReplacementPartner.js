import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchAPI } from "../../api";
import { EDIT_SPECIFIC_PARTNER } from "../../api/apiList";
import { message } from "../../redux/actionFunction";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../../components/loader";

const EditPartner = () => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const getAllPartner = useSelector(
    (state) => state.replacementSystem.getAllPartner
  );
  const params = useParams();
  useEffect(() => {
    getAllPartner.find((value) => {
      if (value.replacementPartherId == params.id) {
        setLoading(false);
        setValue("name", value.name);
        setValue("addressLine1", value.addressLine1);
        setValue("addressLine2", value.addressLine2);
        setValue("city", value.city);
        setValue("pincode", value.pincode);
        setValue("contactNumber", value.contactNumber);
      }
    });
  }, [getAllPartner]);

  const handleSubmitData = (data) => {
    FetchAPI("PATCH", EDIT_SPECIFIC_PARTNER + params.id, data).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        history.push("/createreplacementpartner");
      }
    });
  };

  return (
    <>
      {!loading ? (
        <>
          <h3 className="mb-3 ">Edit Replacement partner</h3>
          <div className="create_customer">
            <form onSubmit={handleSubmit(handleSubmitData)}>
              <div>
                <label htmlFor="Customer Name">Partner Name:</label>
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

export default EditPartner;
