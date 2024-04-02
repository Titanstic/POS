import React, { useEffect, useState } from "react";
import { checkDate, getCurrentDate } from "../../util/report";
import { useGetItemMutation } from "../../service/Api";
import ItemReportBtn from "../../components/Excel/ItemReportBtn";

const ItemReport = () => {
  const [date, setDate] = useState({ start: "", end: "" });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [item, setItem] = useState();
  const [filterItem, setFilterItem] = useState();
  const [getItems] = useGetItemMutation();
  useEffect(() => {
    const { currentDate } = getCurrentDate();
    setFromDate(
      `${currentDate.start.getFullYear()}-${
        currentDate.start.getMonth() + 1
      }-${currentDate.start.getDate()}`
    );
    setToDate(
      `${currentDate.end.getFullYear()}-${
        currentDate.end.getMonth() + 1
      }-${currentDate.end.getDate()}`
    );
    setDate(currentDate);
  }, []);
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
      endDate.setHours(59);
      setDate({ ...date, end: endDate });
      setToDate(e.target.value);
    }
  };
  useEffect(() => {
    if (date.start !== "") {
      try {
        getItems(date).then((res) => setItem(res.data));
      } catch (e) {
        window.alert(e.message);
      }
    }
  }, [date, getItems]);
  useEffect(() => {
    const filterData = item?.reduce((result, product) => {
      const existingData = result?.find(
        (r) => r.product_name === product.product_name
      );
      if (existingData) {
        existingData.quantity += product.quantity;
      } else {
        result.push({ ...product });
      }
      return result;
    }, []);
    setFilterItem(filterData);
  }, [item]);

  console.log(item);
  return (
    <div className="w-full p-7">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-semibold font-poppins mb-3 capitalize">
          Item Reports List
        </h1>
        <div>
          <label htmlFor="" className="font-bold font-poppins">
            Start :
          </label>
          <input
            type="date"
            value={fromDate}
            className="outline-none p-2 shadow-md rounded uppercase ml-3 border"
            onChange={(e) => dateHandler("start", e)}
          />
          <label htmlFor="" className="font-bold  font-poppins mx-3">
            End :
          </label>
          <input
            type="date"
            value={toDate}
            min={fromDate}
            className="outline-none p-2 rounded shadow-md uppercase border"
            onChange={(e) => dateHandler("end", e)}
          />
        </div>
      </div>
      <ItemReportBtn filterItems={filterItem} fileName="item_report" fromDate={fromDate} toDate={toDate} />
      <table className="w-full flex flex-col justify-center items-center table-auto bg-white p-3 shadow  ">
        <thead className="w-full">
          <tr className="w-full flex px-2 bg-skin-fill">
            <th className="w-3/12 border border-white px-2 py-1">#</th>
            <th className="w-3/12 border border-white px-2 py-1">Date</th>
            <th className="w-4/12 border border-white px-2 py-1">
              Product Name
            </th>
            <th className="w-4/12 border border-white px-2 py-1">Quantity</th>
            <th className="w-4/12 border border-white px-2 py-1">Price</th>
          </tr>
        </thead>
        <tbody className="w-full max-h-[400px] overflow-y-auto ">
          {item?.length > 0
            ? filterItem?.map((i) => (
                <tr className="flex px-2" key={i.id}>
                  <td className="w-3/12 border border-white px-2 py-1">
                    {i.id}
                  </td>
                  <td className="w-3/12 border border-white px-2 py-1">
                    {new Date(i.createdAt).toLocaleString("en-US", {
                      timeZone: "Asia/Yangon",
                    })}
                  </td>
                  <td className="w-4/12 border border-white px-2 py-1">
                    {i.product_name}
                  </td>
                  <td className="w-4/12 border border-white px-2 py-1">
                    {i.quantity}
                  </td>
                  <td className="w-4/12 border border-white px-2 py-1">
                    {i.price}
                  </td>
                </tr>
              ))
            : <tr className="w-full flex border-b-2">
            <td className="w-full text-center py-3" colSpan="9">
              No Data
            </td>
          </tr>}
        </tbody>
      </table>
    </div>
  );
};

export default ItemReport;
