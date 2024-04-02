import React, { useEffect, useState } from "react";
import { useGetPurchasesMutation } from "../../service/Api";
import { icons } from "../../constant";
import { Link } from "react-router-dom";
import PurchaseReportBtn from "../../components/Excel/PurchaseReportBtn";
import { checkDate, getCurrentDate } from "../../util/report";
const PurchaseReport = () => {
  // const { data } = useGetPurchaseQuery();
  const [date, setDate] = useState({ start: "", end: "" });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [purchaseReports, setPurchaseReports] = useState(null);
  const [getPurchase] = useGetPurchasesMutation();

  useEffect(() => {
    const { currentDate } = getCurrentDate();
    setFromDate(
      `${currentDate.start.getFullYear()}-${
        currentDate.start.getMonth() + 1
      }-${currentDate.start.getDate()}`
    );
    setToDate(
      `${currentDate.start.getFullYear()}-${
        currentDate.start.getMonth() + 1
      }-${currentDate.start.getDate()}`
    );
    setDate(currentDate);
  }, []);
  const dateHandler = (input, e) => {
    console.log("dddd");
    if (input === "start") {
      const { currentDate, greaterThan } = checkDate(date, e);
      setDate(currentDate);
      setFromDate(e.target.value);
      if (greaterThan) {
        setToDate(e.target.value);
      }
    } else {
      const endDate = new Date(e.target.value);
      endDate.setHours(23);
      endDate.setMinutes(59);
      endDate.setSeconds(59);

      setDate({ ...date, end: endDate });
      setToDate(e.target.value);
    }
  };
  useEffect(() => {
    if (date.start !== "") {
      console.log("dd", date);
      getPurchase(date)
        .then((res) => {
          setPurchaseReports(res.data);
        })
        .catch((err) => {
          window.alert(err.message);
          console.log(err.message);
        });
    }
  }, [date, getPurchase]);

  // console.log(purchaseReports);

  return (
    <div className="w-full p-7">
      <div className="flex justify-between">
        <h1 className="text-xl text-black font-poppins font-semibold mb-3">
          Purchase Report
        </h1>
        <div className="">
          <label className="font-bold">Start Date : </label>
          <input
            type="date"
            value={fromDate}
            className="border border-skin-fill py-2 px-3 rounded shadow-md mr-2"
            onChange={(e) => dateHandler("start", e)}
          />
          <label className="font-bold">End Date : </label>
          <input
            type="date"
            value={toDate}
            min={fromDate}
            className="border border-skin-fill py-2 px-3 rounded shadow-md mr-2"
            onChange={(e) => dateHandler("end", e)}
          />
        </div>
      </div>
      <PurchaseReportBtn
        purchaseData={purchaseReports}
        filename="Purchase_List"
        fromDate={fromDate}
        toDate={toDate}
      />
      <table className="w-full table-auto text-left mt-3 bg-white p-3 shadow flex flex-col justify-between items-center">
        <thead className="w-full ">
          <tr className="w-full flex px-2 bg-skin-fill">
            <th className="w-3/12 border border-white px-2 py-1">Date</th>
            <th className="w-3/12 border border-white px-2 py-1">Invoice No</th>
            <th className="w-3/12 border border-white px-2 py-1">
              Total Amount
            </th>
            <th className="w-3/12 border border-white px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody className="w-full max-h-[450px] overflow-y-auto">
          {purchaseReports
            ? purchaseReports.length > 0
              ? purchaseReports?.map((d) => (
                  <tr key={d.id} className="w-full flex">
                    <td className="w-3/12 border border-white px-2 py-1">
                      {d.purchaseDate}
                    </td>
                    <td className="w-3/12 border border-white px-2 py-1">
                      {d.invoice_no}
                    </td>
                    <td className="w-3/12 border border-white px-2 py-1">
                      {d.totalAmount}
                    </td>
                    <td className="w-3/12 border border-white px-2 py-1">
                      <Link to={`/purchasereport/${d.id}`}>
                        <img
                          src={icons.visibility}
                          alt=""
                          className="w-6 h-6"
                        />
                      </Link>
                    </td>
                  </tr>
                ))
              : <tr className="w-full flex border-b-2">
              <td className="w-full text-center py-3" colSpan="9">
                No Data
              </td>
            </tr>
            : "Loading"}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseReport;
