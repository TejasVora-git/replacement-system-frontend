import React from "react";
import { formateDate } from "./formateDate";

const OutwordPrint = ({ data, productData }) => {
  return (
    <>
      {data.length != 0 && (
        <div id="printableArea">
          <table className="print_table">
            <tr>
              <td colspan="5">
                <h1 className="print_heading">k-NOX INFOTECH</h1>
                <p className="print_address">Randhanpuri Bazar,Bhavnagar.</p>
                <p className="print_details">
                  Mo.8866269311. Email-knoxinfotech@gmail.com
                </p>
              </td>
            </tr>
            <tr>
              <td colspan="6" className="print_debitMemo">
                Replacement Outword Memo
              </td>
            </tr>
            <tr className="print_customerDetails ">
              <td>
                <p className="print_MR print_bold_font">M/S. :</p>
              </td>
              <td colspan="3" className="print_customer_address">
                <div className="print_customer_address_position">
                  <p className="print_bold_font">{data[0].customerName}</p>
                  <p>{data[0].customerAddressLine1} </p>
                  <p>{data[0].customerAddressLine2}</p>

                  <p>
                    {data[0].customerCity} -{data[0].customerPincode}
                  </p>
                  <p>MO.{data[0].customerContectNumber}</p>
                </div>
              </td>
              <td className="print_incoiceDetails">
                <p className=" print_bold_font">
                  Date of Outword:
                  <span className="print_bold_font">
                    {formateDate(productData.replacementReturnDate)}
                  </span>
                </p>

                <p className="print_Given_to_person print_bold_font">
                  Given To Person:
                </p>
              </td>
            </tr>
            <tr className="print_productTitle">
              <td className="print_productTitle_srno">SrNo</td>
              <td className="print_productTitle_productName">Product Name</td>
              <td className="print_productTitle_qty">Qty</td>
              <td className="print_productTitle_amount">old SrNo.</td>
              <td className="print_productTitle_rate"> New SrNo.</td>
            </tr>

            <tr className="print_productDetails" style={{ height: "200px" }}>
              <td className="print_productDetails_srno" valign="top">
                1
              </td>
              <td className="print_productDetails_productName" valign="top">
                {data[0].itemName}
              </td>
              <td className="print_productDetails_qty" valign="top">
                {data[0].quantity}
              </td>
              <td className="print_productDetails_amount" valign="top">
                {data[0].srno == "" ? "-" : data[0].srno}
              </td>
              <td className="print_productDetails_rate" valign="top">
                {productData.newSrno == "" ? "-" : productData.newSrno}
              </td>
            </tr>
          </table>
        </div>
      )}
      <button
        onClick={(e) => window.print()}
        class="btn btn-info"
        id="print_button"
      >
        print
      </button>
      <div id="printableArea">
        ---------------------------------------------------------------------------------------------------------------------------------
      </div>
      {data.length != 0 && (
        <div id="printableArea">
          <table className="print_table">
            <tr>
              <td colspan="5">
                <h1 className="print_heading">k-NOX INFOTECH</h1>
                <p className="print_address">Randhanpuri Bazar,Bhavnagar.</p>
                <p className="print_details">
                  Mo.8866269311. Email-knoxinfotech@gmail.com
                </p>
              </td>
            </tr>
            <tr>
              <td colspan="6" className="print_debitMemo">
                Replacement Outword Memo
              </td>
            </tr>
            <tr className="print_customerDetails ">
              <td>
                <p className="print_MR print_bold_font">M/S. :</p>
              </td>
              <td colspan="3" className="print_customer_address">
                <div className="print_customer_address_position">
                  <p className="print_bold_font">{data[0].customerName}</p>
                  <p>{data[0].customerAddressLine1} </p>
                  <p>{data[0].customerAddressLine2}</p>

                  <p>
                    {data[0].customerCity} -{data[0].customerPincode}
                  </p>
                  <p>MO.{data[0].customerContectNumber}</p>
                </div>
              </td>
              <td className="print_incoiceDetails">
                <p className="print_incoiceDetails_date print_bold_font">
                  Date of Outword:
                  <span className="print_bold_font">
                    {formateDate(productData.replacementReturnDate)}
                  </span>
                </p>

                <p className="print_Given_to_person print_bold_font">
                  Given To Person:
                </p>
              </td>
            </tr>
            <tr className="print_productTitle">
              <td className="print_productTitle_srno">SrNo</td>
              <td className="print_productTitle_productName">Product Name</td>
              <td className="print_productTitle_qty">Qty</td>
              <td className="print_productTitle_amount">old SrNo.</td>
              <td className="print_productTitle_rate"> New SrNo.</td>
            </tr>

            <tr className="print_productDetails" style={{ height: "200px" }}>
              <td className="print_productDetails_srno" valign="top">
                1
              </td>
              <td className="print_productDetails_productName" valign="top">
                {data[0].itemName}
              </td>
              <td className="print_productDetails_qty" valign="top">
                {data[0].quantity}
              </td>
              <td className="print_productDetails_amount" valign="top">
                {data[0].srno == "" ? "-" : data[0].srno}
              </td>
              <td className="print_productDetails_rate" valign="top">
                {productData.newSrno == "" ? "-" : productData.newSrno}
              </td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
};
export default OutwordPrint;
