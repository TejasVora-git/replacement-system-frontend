import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FetchAPI } from "../../api";
import { STAGE2, SPECIFIC_REPLACEMENT_DATA } from "../../api/apiList";
import { message } from "../../redux/actionFunction";
import { useParams } from "react-router-dom";
import { formateDate } from "../../components/formateDate";
import Loader from "../../components/loader";
import OutwordPrint from "../../components/printOutward";

const InwardStage3 = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const [productData, setProductData] = useState({
    replacementReturnDate: new Date(),
    newSrno: "",
    additionalDesc: "",
    outwardDate: "",
    givenToPerson: "",
  });
  const [data, setData] = useState([]);

  useEffect(async () => {
    FetchAPI("get", SPECIFIC_REPLACEMENT_DATA + params.id, data).then((res) => {
      if (res.status == 200) {
        setLoading(false);
        setData(res.data);
      }
    });
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    let data = productData;
    FetchAPI("PATCH", STAGE2 + params.id, data).then((res) => {
      if (res.status == 200) {
        dispatch(message({ message: res.data, type: "success" }));
      }
    });
  };

  return (
    <>
      {!loading ? (
        <>
          {data.length != 0 && (
            <table className="table" id="nonPrintableArea">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">SrNo.</th>
                  <th scope="col">Inward Date</th>
                  <th scope="col">Replacement Parther Name</th>
                  <th scope="col">Replacement Sent Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map(
                  (
                    {
                      replacementId,
                      srno,
                      quantity,
                      inwardDate,
                      customerName,
                      itemName,
                      replacementPartherName,
                      replacementSentDate,
                    },
                    key
                  ) => (
                    <tr key={key}>
                      <th scope="row">{replacementId}</th>
                      <td>{customerName}</td>
                      <td>{itemName}</td>
                      <td>{quantity}</td>
                      <td>{srno}</td>
                      <td>{formateDate(inwardDate)}</td>
                      <td>{replacementPartherName}</td>
                      <td>{formateDate(replacementSentDate)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}

          <div id="nonPrintableArea">
            <h3 className="text-center">Replacement Resive Date</h3>
          </div>

          <form onSubmit={handleSubmitData}>
            <div className="row" id="nonPrintableArea">
              <div className="form-group col-md-2">
                <labe>Replacement Return Date :</labe>
                <input
                  type="date"
                  name="replacementReturnDate"
                  className="form-control"
                  value={formateDate(productData.replacementReturnDate, true)}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="form-group col-md-2">
                <labe>New Srno :</labe>

                <input
                  type="text"
                  name="newSrno"
                  className="form-control"
                  value={productData.newSrno}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group col-md-2">
                <labe>Additional Desc :</labe>

                <input
                  type="text"
                  name="additionalDesc"
                  className="form-control"
                  value={productData.additionalDesc}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group col-md-2">
                <labe>Outward Date :</labe>

                <input
                  type="date"
                  name="outwardDate"
                  className="form-control"
                  value={productData.outwardDate}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group col-md-2">
                <labe>Given To Person :</labe>

                <input
                  type="text"
                  name="givenToPerson"
                  className="form-control"
                  value={productData.givenToPerson}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                id="nonPrintableArea"
              >
                Submit
              </button>
            </div>
          </form>
          <OutwordPrint data={data} productData={productData} />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default InwardStage3;
