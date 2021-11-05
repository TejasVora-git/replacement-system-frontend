import React from "react";

const Loader = () => {
  return (
    // <div class="text-center " style={{ margin: "40vh" }}>
    //   <div class="spinner-grow text-dark" role="status">
    //     <span class="sr-only"></span>
    //   </div>
    // </div>

    <div className="bbody">
      <div class="loader ">
        <div class="face">
          <div class="circle"></div>
        </div>
        <div class="face">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
