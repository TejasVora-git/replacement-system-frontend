import React, { Fragment, useEffect, useState } from "react";
import { FetchAPI } from "../api";
import { HOME } from "../api/apiList";
import { useHistory } from "react-router-dom";
import { formateDate } from "../components/formateDate";
import Loader from "../components/loader";

const TableHover = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  var today = new Date();
  today.setDate(today.getDate() - 12);

  useEffect(() => {
    FetchAPI("get", HOME).then((res) => {
      setLoading(false);
      setData(res.data);
    });
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="row">
            <div className="form-group col-md-12 my-2">
              <h3>Pending Replacement Date</h3>
            </div>
          </div>
          <div className="show-image">
            {data.length != 0 ? (
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">SrNo.</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Description</th>
                    <th scope="col">Inward Date</th>
                    <th scope="col">Sales Date</th>
                    <th scope="col">Replacement Parther Name</th>
                    <th scope="col">Replacement Sent Date</th>
                    <th scope="col">Purchase Bill Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(
                    (
                      {
                        replacementId,
                        customerId,
                        itemId,
                        srno,
                        quantity,
                        additionalDescription,
                        inwardDate,
                        salesDate,
                        stage,
                        replacementPartherId,
                        replacementSentDate,
                        purchaseBillDate,
                        customerName,
                        itemName,
                        replacementPartherName,
                      },
                      key
                    ) => (
                      <Fragment key={key}>
                        {stage != 3 && (
                          <tr
                            className={`test ${
                              today > new Date(inwardDate) ? `error` : ""
                            }`}
                          >
                            <th scope="row">{replacementId}</th>
                            <td>{customerName}</td>
                            <td>{itemName}</td>
                            <td>{srno}</td>
                            <td>{quantity}</td>
                            <td>{additionalDescription}</td>
                            <td>{formateDate(inwardDate)} </td>
                            <td>{formateDate(salesDate)}</td>
                            <td>{replacementPartherName}</td>
                            <td>{formateDate(replacementSentDate)}</td>
                            <td>{formateDate(purchaseBillDate)}</td>

                            <td className="disable_button">
                              {replacementPartherName.length == 0 && (
                                <button
                                  className="spacing"
                                  onClick={() =>
                                    history.push(
                                      "/inwardstage2/" + replacementId
                                    )
                                  }
                                >
                                  Stage2
                                </button>
                              )}
                              {replacementPartherName.length != 0 && (
                                <button
                                  className="spacing"
                                  onClick={() =>
                                    history.push(
                                      "inwardstage3/" + replacementId
                                    )
                                  }
                                >
                                  Stage3
                                </button>
                              )}
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <h3>No Data</h3>
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TableHover;
