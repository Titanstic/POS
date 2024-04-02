import { useContext, useEffect, useState } from "react";
import { useGetOrdersMutation } from "../../service/Api";
// import { icons } from "../../constant";
import InvoiceReport from "../../components/report/InvoiceReport";
import InvoiceDetailReports from "../../components/report/InvoiceDetailReport";
import NavContext from "../../context/NavContext";
import { checkDate, getCurrentDate } from "../../util/report";

const InvoiceReportView = () => {
  // useState
  const [date, setDate] = useState({ start: "", end: "" });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [orderItems, setOrderItems] = useState(null);
  const [orderDetailItems, setOrderDetailItems] = useState(null);
  const [showDetail, showDetailOrder] = useState(false);
  // useContext
  const { nav, setNav } = useContext(NavContext);
  // sqlite database
  // const { data: orders } = useGetOrdersQuery();
  const [getOrders] = useGetOrdersMutation();

  // Start useEffect
  useEffect(() => {
    // setOrderItems(orders);
    setNav("invoicereport");

    const { currentDate } = getCurrentDate();
    // for Input
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
  }, [nav, setNav]);
  // console.log(date.start, "date start");

  useEffect(() => {
    if (date.start !== "") {
      // console.log(date);
      getOrders(date)
        .then((res) => {
          setOrderItems(res.data);
        })
        .catch((err) => {
          window.alert(err.message);
          console.log(err.message);
        });
    }
  }, [date, getOrders]);
  // End useEffect

  // Start Function
  const dateHandler = (input, e) => {
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
    // setDate(date[inp])
  };

  const detailInvoiceBtn = (data) => {
    showDetailOrder(!showDetail);
    if (data) {
      // console.log(data);
      setOrderDetailItems(data.order_histories);
    }
  };
  // End Function

  return (
    <div className="w-full bg-bg bg-opacity-20 p-7">
      <div className="flex justify-between mb-3">
        <p className="text-xl font-bold mb-5">Invoice List</p>

        {fromDate && (
          <div>
            <label className="font-bold">Start Date : </label>
            <input
              type="date"
              className="border border-skin-fill py-2 px-3 rounded shadow-md mr-2"
              value={fromDate}
              onChange={(e) => dateHandler("start", e)}
            />

            <label className="font-bold">End Date : </label>
            <input
              type="date"
              className="border border-primary py-2 px-3 rounded shadow-md"
              value={toDate}
              min={fromDate}
              onChange={(e) => dateHandler("end", e)}
            />
          </div>
        )}
      </div>

      {showDetail ? (
        <InvoiceDetailReports
          orderDetailItems={orderDetailItems}
          detailInvoiceBtn={detailInvoiceBtn}
        />
      ) : (
        <InvoiceReport
          fromDate={fromDate}
          toDate={toDate}
          orderItems={orderItems}
          detailInvoiceBtn={detailInvoiceBtn}
        />
      )}
    </div>
  );
};

export default InvoiceReportView;
