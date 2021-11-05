import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FetchAPI } from "../../api";
import {
  ADD_ONE_ITEM,
  GET_ALL_ITEM,
  DELETE_SPECIFIC_ITEM,
} from "../../api/apiList";
import { message } from "../../redux/actionFunction";
import { getAllItem } from "../../redux/actionFunction";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";

const CreateItem = () => {
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getItemData();
  }, []);
  const getItemData = () => {
    FetchAPI("get", GET_ALL_ITEM).then((res) => {
      if (res.status == 200) {
        setLoading(false);
        setItems(res.data);
        dispatch(getAllItem(res.data));
      }
    });
  };

  const deleteItem = (id) => {
    FetchAPI("delete", DELETE_SPECIFIC_ITEM + id).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        getItemData();
      }
    });
  };

  const handleSubmitData = (data) => {
    FetchAPI("post", ADD_ONE_ITEM, data).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        reset();
        getItemData();
      } else if (res.status == 400) {
        dispatch(message({ message: res.data, type: "error" }));
      }
    });
  };
  return (
    <>
      {!loading ? (
        <>
          <h3 className="mb-3 ">Create New Item</h3>
          <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="form-group mb-2 ">
              <label htmlFor="ItemName" className="col-sm-1 ">
                Item Name :
              </label>
              <input
                type="text"
                id="ItemName"
                placeholder="Enter Item Name"
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
          {items.length != 0 && (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Item Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(({ itemId, name }, key) => (
                  <tr key={key}>
                    <th scope="row">{itemId}</th>
                    <td>{name}</td>
                    <td>
                      <Link to={"/edititem/" + itemId} className="mx-2">
                        <i className="fas fa-edit"></i>
                      </Link>
                      ||
                      <span
                        onClick={() => deleteItem(itemId)}
                        className="mx-2 cursor_pointer"
                      >
                        <i
                          className="far fa-trash-alt"
                          style={{ color: "#0D6EFD" }}
                        ></i>
                      </span>
                    </td>
                  </tr>
                ))}
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

export default CreateItem;
