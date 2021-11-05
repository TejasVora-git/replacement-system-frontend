import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchAPI } from "../../api";
import { EDIT_SPECIFIC_ITEM } from "../../api/apiList";
import { message } from "../../redux/actionFunction";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../../components/loader";

const EditItem = () => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const getAllItems = useSelector(
    (state) => state.replacementSystem.getAllItem
  );
  const params = useParams();
  useEffect(() => {
    getAllItems.find((value) => {
      if (value.itemId == params.id) {
        setLoading(false);
        setValue("name", value.name);
      }
    });
  }, [getAllItems]);

  const handleSubmitData = async (data) => {
    FetchAPI("PATCH", EDIT_SPECIFIC_ITEM + params.id, data).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        history.push("/createitem");
      }
    });
  };

  return (
    <>
      {!loading ? (
        <>
          <h3 className="mb-3 ">Edit Item</h3>

          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="form-group mb-2 ">
              <label htmlFor="ItemName" className="col-sm-1 ">
                Item Name :
              </label>
              <input
                type="text"
                id="ItemName"
                {...register("name", { required: true })}
              />
              <div className="error mt-2">
                {errors.name && <span>This field is required</span>}
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EditItem;
