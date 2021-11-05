import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAPI } from "../../api";
import { STAGE2, SPECIFIC_REPLACEMENT_DATA } from "../../api/apiList";
import { message } from "../../redux/actionFunction";
import { useParams } from "react-router-dom";
import { formateDate } from "../../components/formateDate";
import Loader from "../../components/loader";

const InwardStage2 = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const params = useParams();

  useEffect(async () => {
    FetchAPI("get", SPECIFIC_REPLACEMENT_DATA + params.id, data).then((res) => {
      if (res.status == 200) {
        setLoading(false);
        setData(res.data);
      }
    });
  }, []);

  const reduxPartnerData = useSelector(
    (state) => state.replacementSystem.getAllPartner
  );
  const [productData, setProductData] = useState({
    replacementPartherId: "",
    replacementSentDate: new Date(),
    purchaseBillDate: "",
  });

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
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">SrNo.</th>

                  <th scope="col">Inward Date</th>
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
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}

          <div>
            <h3 className="text-center">Replacement Sent Details</h3>
          </div>

          <form onSubmit={handleSubmitData}>
            <div className="row">
              <div className="form-group col-md-2">
                <label htmlFor="replacementPartherId">
                  Replacement Partner Name:
                </label>
                <select
                  name="replacementPartherId"
                  id="replacementPartherId"
                  className="form-control"
                  value={productData.replacementPartherId}
                  onChange={(e) => handleInputChange(e)}
                  required
                >
                  <option value="">--Please choose an option--</option>
                  {reduxPartnerData.map(
                    ({ name, replacementPartherId }, key) => (
                      <option value={replacementPartherId} key={key}>
                        {name}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="form-group col-md-2">
                <labe>Replacement Sent Date :</labe>

                <input
                  type="date"
                  name="replacementSentDate"
                  className="form-control"
                  value={formateDate(productData.replacementSentDate, true)}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="form-group col-md-2">
                <labe>Purchase Bill Date :</labe>

                <input
                  type="date"
                  name="purchaseBillDate"
                  className="form-control"
                  value={productData.purchaseBillDate}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default InwardStage2;
