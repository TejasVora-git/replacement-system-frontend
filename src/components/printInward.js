import React from "react";
import { useSelector } from "react-redux";
import { formateDate } from "./formateDate";
// import logo from "./knox.jpeg";

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
      {/* <div  id="printableArea">
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
      </div> */}
      <div id="printableArea">
        <div className="heading">
          <div className="memo_part">
            <div>SERVICE MEMO</div>
            <div>ORIGINAL MEMO</div>
          </div>
          <div className="address">
            <div className="icon">
              <img src={process.env.PUBLIC_URL + "/image.jpg"} alt="image" />
            </div>
            <div className="address_part">
              <div className="address_title">
                K- NOX INFOTECH (REPLACEMENT/SERVICE memo)
              </div>
              <div className="address_area">RANDHANPURI BAZAR, BHAVNAGAR</div>
              <div className="time">
                TIME : 10:30AM TO 2:00PM & 3:30AM TO 6:00PM
              </div>
            </div>
          </div>
        </div>

        <div class="grid-container">
          <div className="parentFor_item2">
            <div class="item2">
              <div className="address"> To: </div>
              <div className="address_content">
                <div>
                  <p className="print_bold_font">{customerData.name}</p>
                </div>
                <div>
                  <p>{customerData.addressLine1}</p>
                </div>
                <div>
                  <p>{customerData.addressLine2}</p>
                </div>
                <div>
                  <p>
                    {customerData.city} -{customerData.pincode}
                  </p>
                </div>
                <div>
                  <p>MO.{customerData.contactNumber}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="parentFor_item5">
            <div className="parentFor_item3">
              <div class="item3">
                Memo No:<span>1</span>
              </div>
              <div class="item4">
                Date:
                <div className="bold">
                  {data[0].date == ""
                    ? formateDate(inwardDate)
                    : formateDate(data[0].date)}
                </div>
              </div>
            </div>
            <div class="item5">
              <p>
                Resived On:<span>swew</span>
              </p>
            </div>
          </div>
        </div>
        <div className="product_info_container">
          <div className="product_info_header">
            <div className="srno bold">Sr No. </div>
            <div className="disc bold">Description Of Goods </div>
            <div className="qty bold">Qty. </div>
            <div className="units bold">Unit. </div>
            <div className="decleration "></div>
          </div>
          <div className="product_info_body">
            <div className="srno_body">
              <p>1 </p>
            </div>
            <div className="disc_body">
              <p>{GetcustomerName(data[0].productName)}</p>
              <div>
                <p className="remove_p_sapce">
                  OLD SR NO :{" "}
                  <span> {data[0].srNo == "" ? "-" : data[0].srNo}</span>
                </p>
              </div>
              {/* <div>
                <p>
                  NEW SR NO: <span>3245</span>
                </p>
              </div> */}
            </div>
            <div className="qty_body">
              <p>1</p>
            </div>
            <div className="units_body">
              <p>pcs</p>
            </div>
            <div className="decleration_body bold">
              <div>
                <p className="remove_p_sapce">DECLARATION:</p>
              </div>
              <p>PRODUCT DELIVERED IN GOOD CONDITION</p>
              <div>
                <p>TO :</p>
                <p>DATE :</p>
                <p>SIGN :</p>
              </div>
            </div>
          </div>
          <div className="product_info_footer">
            <div className="srno_footer"></div>
            <div className="disc_footer">Total</div>
            <div className="qty_footer">1</div>
            <div className="units_footer"></div>
            <div className="decleration_footer"></div>
          </div>
        </div>
        <div className="signatory "> Authorized Signatory </div>
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
