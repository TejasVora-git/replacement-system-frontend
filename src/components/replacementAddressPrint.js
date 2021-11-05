import React from "react";

const ReplacementAddressPrint = ({ printData, setPrintData }) => {
  setTimeout(() => {
    window.print();
    setPrintData({});
  }, 500);
  return (
    <>
      <div
        id="printableArea"
        style={{
          width: "350px",
          border: "0 solid black",
        }}
      >
        <div
          style={{
            textAlign: "left",
            marginLeft: "30px",
            marginTop: "5px",
            fontFamily: "Verdana",
            fontSize: 16,
            fontWeight: 900,
          }}
        >
          <div>
            <span style={{ marginLeft: "-10px" }}>TO,</span>
            <span
              style={{
                textAlign: "right",
                marginLeft: "150px",
                float: "right",
              }}
              // className="print_bold_font"
            >
              MO.{printData.contactNumber}
            </span>
          </div>
          <div
          // className="print_bold_font"
          >
            {printData.name}
          </div>
          <div style={{ wordWrap: "break-word" }}>
            {printData.addressLine1},
          </div>
          {printData.addressLine2 != "" && (
            <div style={{ wordWrap: "break-word" }}>
              {printData.addressLine2},
            </div>
          )}
          {printData.addressLine3 != "" && (
            <div style={{ wordWrap: "break-word" }}>
              {printData.addressLine3},
            </div>
          )}
          <div>
            {printData.city} -{printData.pincode}.
          </div>
        </div>

        <div
          style={{
            width: "350px",
            border: "1px solid black",
            margin: "10px 0",
          }}
        ></div>

        <div
          style={{
            textAlign: "left",
            marginLeft: "30px",
            marginBottom: "5px",
            fontFamily: "Calibri",
            fontSize: 11,
          }}
        >
          <div>
            <span style={{ marginLeft: "-10px" }}>From,</span>
            {/* <span
              style={{ textAlign: "right", marginLeft: "150px" }}
              className="print_bold_font"
            >
              MO.8866269311
            </span> */}
          </div>
          <div>K-NOX INFOTECH</div>
          <div>Randhanpuri Bazar,</div>
          <div>Bhavnagar -364001.</div>
          <div>MO.8866269311</div>
        </div>
      </div>
    </>
  );
};

export default ReplacementAddressPrint;
