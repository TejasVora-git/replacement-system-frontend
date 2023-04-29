import React from "react";
import { useForm } from "react-hook-form";
import { LOGIN } from "../api/apiList";
import { useDispatch } from "react-redux";
import { message } from "../redux/actionFunction";
import { FetchAPI } from "../api";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitData = (data) => {
    console.log(data);
    if (
      data.email === "knoxinfotech@gmail.com" &&
      data.password === "jinesh123"
    ) {
      const token = jwt.sign(
        {
          email: data.email,
          role: "user",
        },
        "w*HOgdzC^b3Soq0NHLhiy30ZUOY*R#"
      );
      localStorage.setItem("token", token);
      history.push("/createreplacementpartner#/createreplacementpartner");
    } else {
      dispatch(
        message({ message: "Enter a valid Email And Password", type: "error" })
      );
    }
    // FetchAPI("post", LOGIN, data).then((res) => {
    //   if (res.status == 200) {
    //     dispatch(message({ message: res.data, type: "success" }));
    //     localStorage.setItem("token", res.data.token);
    //     history.push("/");
    //   } else if (res.status == 500) {
    //     dispatch(message({ message: res.data, type: "error" }));
    //   }
    // });
  };

  return (
    <>
      <div>
        <h3 className="mb-3 ">Sign Up</h3>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <div className="create_customer">
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
                id="password"
                {...register("password", {
                  required: true,
                })}
              />

              <div className="error mt-2">
                {errors.password && <span>This field is required</span>}
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
