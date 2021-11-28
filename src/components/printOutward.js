import React from "react";
import { formateDate } from "./formateDate";

const OutwordPrint = ({ data, productData }) => {
  console.log(data, productData);
  return (
    <>
      {data.length != 0 && (
        <div id="printableArea">
          <div className="heading">
            <div className="icon">
              <img
                src={process.env.PUBLIC_URL + "/image.jpg"}
                width="80px"
                height="80px"
                alt="image"
              />
            </div>
            <div>
              <div className="memo_part">
                <span>SERVICE MEMO/</span>
                <span>ORIGINAL MEMO</span>
              </div>

              <div className="address_title">
                K- NOX INFOTECH (REPLACEMENT/SERVICE memo)
              </div>
              <div className="address_area">RANDHANPURI BAZAR, BHAVNAGAR</div>
            </div>
            {/* <div className="time">
                TIME : 10:30AM TO 2:00PM & 3:30AM TO 6:00PM
              </div> */}
          </div>

          <div class="grid-container">
            <div className="parentFor_item2">
              <div class="item2">
                <div className="address"> To: </div>
                <div className="address_content">
                  <div>
                    <p className="print_bold_font">{data[0].customerName}</p>
                  </div>
                  <div>
                    <p>{data[0].customerAddressLine1}</p>
                  </div>
                  <div>
                    <p>{data[0].customerAddressLine2}</p>
                  </div>
                  <div>
                    <p>
                      {data[0].customerCity} -{data[0].customerPincode}
                    </p>
                  </div>
                  <div>
                    <p>MO.{data[0].customerContectNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="parentFor_item5">
              <div className="parentFor_item3">
                <div class="item3">
                  Memo No:<span>{data[0].replacementId}</span>
                </div>
                <div class="item4">
                  Date:
                  <div className="bold">{formateDate(new Date())}</div>
                </div>
              </div>
              <div class="item5">
                <p>
                  Resived On:
                  <span>{formateDate(data[0].inwardDate)}</span>
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
                <p>{data[0].itemName} </p>
                <div>
                  <p className="remove_p_sapce">
                    OLD SR NO :
                    <span> {data[0].srno == "" ? "-" : data[0].srno}</span>
                  </p>
                </div>
                <div>
                  <p>
                    NEW SR NO:{" "}
                    <span>
                      {" "}
                      {productData.newSrno == "" ? "-" : productData.newSrno}
                    </span>
                  </p>
                </div>
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
      )}
      {data.length != 0 && (
        <div id="printableArea">
          -------------------------------------------------------------------------------------------------------------------------------------
          <div class="grid-container">
            <div className="parentFor_item2">
              <div class="item2">
                <div className="address"> To: </div>
                <div className="address_content">
                  <div>
                    <p className="print_bold_font">{data[0].customerName}</p>
                  </div>
                  <div>
                    <p>{data[0].customerAddressLine1}</p>
                  </div>
                  <div>
                    <p>{data[0].customerAddressLine2}</p>
                  </div>
                  <div>
                    <p>
                      {data[0].customerCity} -{data[0].customerPincode}
                    </p>
                  </div>
                  <div>
                    <p>MO.{data[0].customerContectNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="parentFor_item5">
              <div className="parentFor_item3">
                <div class="item3">
                  Memo No:<span>{data[0].replacementId}</span>
                </div>
                <div class="item4">
                  Date:
                  <div className="bold">{formateDate(new Date())}</div>
                </div>
              </div>
              <div class="item5">
                <p>
                  Resived On: <span>{formateDate(data[0].inwardDate)}</span>
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
                <p>{data[0].itemName} </p>
                <div>
                  <p className="remove_p_sapce">
                    OLD SR NO :
                    <span> {data[0].srno == "" ? "-" : data[0].srno}</span>
                  </p>
                </div>
                <div>
                  <p>
                    NEW SR NO:{" "}
                    <span>
                      {" "}
                      {productData.newSrno == "" ? "-" : productData.newSrno}
                    </span>
                  </p>
                </div>
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
        </div>
      )}

      <button
        onClick={(e) => window.print()}
        class="btn btn-info"
        id="print_button_outword"
      >
        print
      </button>
    </>
  );
};
export default OutwordPrint;
