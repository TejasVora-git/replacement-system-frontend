import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SIGNUP } from "../api/apiList";
import { useDispatch } from "react-redux";
import { message } from "../redux/actionFunction";
import { FetchAPI } from "../api";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitData = (data) => {
    FetchAPI("post", SIGNUP, data).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
        history.push("/login");
      } else if (res.status == 400) {
        dispatch(message({ message: res.data, type: "error" }));
      }
    });
  };

  const pass = register("password", { required: true });

  return (
    <>
      <h3 className="mb-3 ">Sign Up</h3>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="create_customer">
          <div>
            <label htmlFor="Name"> Name:</label>
            <input id="Name" {...register("name", { required: true })} />
            <div className="error mt-2">
              {errors.name && <span>This field is required</span>}
            </div>
          </div>

          <div>
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: true,
                pattern:
                  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
              })}
            />

            {errors.email && (
              <div className="error mt-2">
                <>
                  {errors.email.type == "required" && (
                    <span>This field is required</span>
                  )}
                  {errors.email.type == "pattern" && (
                    <span>Enter A valid Email Address</span>
                  )}
                </>
              </div>
            )}
          </div>

          <div className="mt-2">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              {...pass}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="error mt-2">
              {errors.password && <span>This field is required</span>}
            </div>
          </div>
          <div>
            <label htmlFor="conpassword">Confirm Password : </label>
            <input
              type="password"
              id="conpassword"
              {...register("comfirmPassword", {
                required: true,
                validate: (value) => password == value,
              })}
            />
            {errors.comfirmPassword && (
              <div className="error mt-2">
                <>
                  {errors.comfirmPassword.type == "required" && (
                    <span>This field is required</span>
                  )}
                  {errors.comfirmPassword.type == "validate" && (
                    <span>Password And Confirm Password Is Not Same </span>
                  )}
                </>
              </div>
            )}
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default SignUp;
