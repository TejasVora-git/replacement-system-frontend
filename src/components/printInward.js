import React from "react";
import { useSelector } from "react-redux";
import { formateDate } from "./formateDate";

const InwardPrint = ({ data, customerData, inwardDate }) => {
  const reduxItemData = useSelector(
    (state) => state.replacementSystem.getAllItem
  );

  const GetcustomerName = (id) => {
    let itemName = "";
    if (reduxItemData.length != 0) {
      reduxItemData.find((itemData) => {
        if (itemData.itemId == id) {
          itemName = itemData.name;
        }
      });
    }
    return itemName;
  };

  return (
    <>
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
              Replacement Inward Memo
            </td>
          </tr>
          <tr className="print_customerDetails ">
            <td>
              <p className="print_MR print_bold_font">M/S. :</p>
            </td>
            <td colspan="3" className="print_customer_address">
              <div className="print_customer_address_position">
                <p className="print_bold_font">{customerData.name}</p>
                <p>{customerData.addressLine1}</p>
                <p>{customerData.addressLine2}</p>

                <p>
                  {customerData.city} -{customerData.pincode}
                </p>
                <p>MO.{customerData.contactNumber}</p>
              </div>
            </td>
            <td className="print_incoiceDetails">
              <p className="print_incoiceDetails_date print_bold_font">
                Date of Inward:
                <span className="print_bold_font">
                  {data[0].date == ""
                    ? formateDate(inwardDate)
                    : formateDate(data[0].date)}
                </span>
              </p>
            </td>
          </tr>

          <tr className="print_productTitle">
            <td className="print_productTitle_srno">SrNo</td>
            <td className="print_productTitle_productName">Product Name</td>
            <td className="print_productTitle_qty">Qty</td>
            <td className="print_productTitle_amount">Sales Date</td>
            <td className="print_productTitle_rate"> Product SrNo.</td>
          </tr>

          {data.length != 0 &&
            data.map(({ productName, quantity, srNo, salesdate }, index) => (
              <tr className="print_productDetails">
                <td className="print_productDetails_srno">{index + 1}</td>
                <td className="print_productDetails_productName">
                  {GetcustomerName(productName)}
                </td>
                <td className="print_productDetails_qty">{quantity}</td>
                <td className="print_productDetails_amount">
                  {salesdate == "" ? "-" : formateDate(salesdate)}
                </td>
                <td className="print_productDetails_rate">
                  {srNo == "" ? "-" : srNo}
                </td>
              </tr>
            ))}
        </table>
      </div>
      <button
        onClick={(e) => window.print()}
        class="btn btn-info"
        id="print_button"
      >
        print
      </button>
    </>
  );
};
export default InwardPrint;
