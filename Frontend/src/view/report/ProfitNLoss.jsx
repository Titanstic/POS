import React, { useEffect, useState } from "react";
import { checkDate, getCurrentDate } from "../../util/report";
import {
  useGetExpenseDataMutation,
  useGetOrdersMutation,
  useGetPurchasesMutation,
  useGetRentalDataMutation,
} from "../../service/Api";
import ProfitReportBtn from "../../components/Excel/ProfitReportBtn";

const ProfitNLoss = () => {
  const [date, setDate] = useState({ start: "", end: "" });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [getPurchase] = useGetPurchasesMutation();
  const [purchase, setPurchase] = useState();
  // const [itemInvoice, setItemInvoice] = useState();
  const [sale, setSale] = useState([]);
  const [expense, setExpense] = useState();
  const [filterItem, setFilterItem] = useState();
  const [rental, setRental] = useState();
  const [getExpense] = useGetExpenseDataMutation();
  const [getOrder] = useGetOrdersMutation();
  const [getRental] = useGetRentalDataMutation();

  console.log(sale)
  const totalPurchase = purchase?.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );
  const totalRental = rental?.reduce((sum, item) => sum + item.paidAmount, 0);
  const totalSale = sale?.reduce((sum, item) => sum + item.grandtotal, 0);
  const totalPurcasePrice = sale?.reduce((totalSum, item) => {
    const orderHistorySum = item.order_histories.reduce((orderSum, history) => {
      return orderSum + Number(history.Purchase * history.quantity);
    }, 0);

    return totalSum + orderHistorySum;
  }, 0);
  const totalExpense = expense?.reduce(
    (sum, item) => sum + item.expenseAmount,
    0
  );
  const grandTotal = totalSale - totalPurcasePrice;
  const total = grandTotal + totalRental;

  const netProfit = total - totalExpense;
  useEffect(() => {
    const { currentDate } = getCurrentDate();

    setFromDate(
      `${currentDate.start.getFullYear()}-${currentDate.start.getMonth() + 1
      }-${currentDate.start.getDate()}`
    );
    setToDate(
      `${currentDate.end.getFullYear()}-${currentDate.end.getMonth() + 1
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
      endDate.setSeconds(59);
      setDate({ ...date, end: endDate });
      setToDate(e.target.value);
    }
  };
  useEffect(() => {
    if (date.start !== "") {
      try {
        getPurchase(date).then((res) => setPurchase(res.data));
        getOrder(date).then((res) => setSale(res.data));
        getExpense(date).then((res) => setExpense(res.data));
        getRental(date).then((res) => setRental(res.data));
      } catch (e) {
        window.alert(e.message);
      }
    }
  }, [date, getPurchase, getOrder, getExpense, getRental]);
  console.log(rental);

  const data = [
    {
      totalPurchase,
      totalSale,
      totalPurcasePrice,
      totalRental,
      totalExpense,
      fromDate,
      toDate,
    },
  ];
  useEffect(() => {
    const filterData = sale?.reduce((result, order) => {
      order.order_histories.forEach((history) => {
        const existingData = result.find(
          (r) => r.product_name === history.product_name
        );

        if (existingData) {
          existingData.quantity += history.quantity;
          existingData.price = history.price;
          existingData.id = history.id;

          existingData.Purchase = history.Purchase;
        } else {
          result.push({
            id: history.id,
            product_name: history.product_name,
            quantity: history.quantity,
            price: history.price,
            Purchase: history.Purchase,
          });
        }
      });

      return result;
    }, []);

    setFilterItem(filterData);
  }, [sale]);

  // console.log(sale);

  return (
    <div className="w-full h-[700px]  overflow-y-scroll p-7 ">
      <h1 className="text-xl font-semibold font-poppins capitalize mb-3">
        Profit and loss
      </h1>
      <h2 className="text-md font-medium font-poppins capitalize">
        Manage your profit and loss report
      </h2>
      <div className="my-5 flex justify-between">
        <div className="">
          <label htmlFor="" className="font-poppins font-semibold mr-3">
            Start Date :
          </label>
          <input
            type="date"
            value={fromDate}
            className="outline-none border shadow-md p-2 uppercase"
            onChange={(e) => dateHandler("start", e)}
          />
          <label htmlFor="" className="font-poppins font-semibold mx-3">
            End Date :
          </label>
          <input
            type="date"
            value={toDate}
            min={fromDate}
            className="outline-none border shadow-md p-2 uppercase"
            onChange={(e) => dateHandler("end", e)}
          />
        </div>
        <ProfitReportBtn profitData={data} fileName="Profit_Report" fromDate={fromDate} toDate={toDate} />
      </div>

      <div className="flex gap-5">
        <div className="shadow-2xl border font-poppins p-6 rounded w-full h-40">
          <h1 className="text-md font-semibold mb-3">Total Amount</h1>
          <div className="flex justify-between">
            <h1>Sale Amount</h1>
            <p className="font-semibold">
              {totalSale?.toLocaleString("en-US")} KS
            </p>
          </div>
          <div className="flex justify-between">
            <h1>Purchase Amount</h1>
            <p className="font-semibold">
              {totalPurchase?.toLocaleString("en-US")} KS
            </p>
          </div>
          <div className="flex justify-between">
            <h1>Rental</h1>
            <p className="font-semibold">
              {totalRental?.toLocaleString("en-US")} KS
            </p>
          </div>
        </div>
        <div className="shadow-2xl border p-6 font-poppins rounded w-full">
          <h1 className="font-md font-semibold mb-3">Profit & Loss</h1>
          <div className="flex justify-between mb-3">
            <h1>Total Sale Price</h1>
            <p className="font-semibold">
              {totalSale?.toLocaleString("en-Us")} KS
            </p>
          </div>
          <div className="flex  pb-3 justify-between border-b-2">
            <h1>Total Purchase Price</h1>
            <p className="font-semibold">
              {totalPurcasePrice?.toLocaleString("en-US")} KS
            </p>
          </div>
          <div className="py-3 border-b-2">
            <div className="flex justify-between mb-3">
              <h1 className=" text-md">Total</h1>
              <p className="font-semibold">
                {grandTotal.toLocaleString("en-US")} KS
              </p>
            </div>
            <div className="flex justify-between mb-3 border-b-2">
              <h1 className=" text-md"> Total Renting</h1>
              <p className="font-semibold">
                {totalRental?.toLocaleString("en-US")} KS
              </p>
            </div>
            <div className="flex justify-between mb-3">
              <h1 className=" text-md"> Grand Total</h1>
              <p className="font-semibold">
                {total.toLocaleString("en-US")} KS
              </p>
            </div>
            <div className="flex justify-between">
              <h1>Total Expense</h1>
              <p className="font-semibold">
                {totalExpense?.toLocaleString("en-US")} KS
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <h1 className="semibold ">Net Profit</h1>
            <p className="font-semibold">
              {netProfit.toLocaleString("en-US")} KS
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h1 className="text-xl mb-3 font-poppins font-bold ">Item Profit</h1>
        <table className="table-auto text-left w-full flex flex-col justify-between">
          <thead className="w-full">
            <tr className="w-full bg-skin-fill flex px-2">
              <th className="w-3/12 border border-white px-2 py-1">#</th>
              <th className="w-6/12 border border-white px-2 py-1">
                Item Name
              </th>
              <th className="w-3/12 border border-white px-2 py-1">Quantity</th>

              <th className="w-3/12 border border-white px-2 py-1">
                Sale Price
              </th>
              <th className="w-3/12 border border-white px-2 py-1">
                Purchase Price
              </th>
              <th className="w-3/12 border border-white px-2 py-1">
                Gross Profit
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {filterItem?.map((history) => (
              <tr key={history.id} className="w-full flex  border-b-2">
                <td className="w-3/12 px-2 py-1">{history.id}</td>
                <td className="w-6/12 px-2 py-1">{history.product_name}</td>
                <td className="w-3/12 px-2 py-1">{history.quantity}</td>
                <td className="w-3/12 px-2 py-1">{history.price}</td>
                <td className="w-3/12 px-2 py-1">{history.Purchase}</td>
                <td className="w-3/12 px-2 py-1">
                  {(history.price - history.Purchase) * history.quantity}
                </td>
              </tr>
            ))}
          </tbody>
          {filterItem?.length > 0 ? (
            <tfoot>
              <tr className="w-full flex border px-2">
                <td className="w-3/12 border border-white px-2 py-1 font-bold"></td>
                <td className="w-6/12 border border-white px-2 py-1 font-bold">
                  Total
                </td>
                <td className="w-3/12 border border-white px-2 py-1 font-semibold">
                  {/* Total sum of quantity */}
                  {filterItem?.reduce(
                    (sum, history) => sum + history.quantity,
                    0
                  )}
                </td>
                <td className="w-3/12 border border-white px-2 py-1 font-semibold">
                  {/* Total sum of sale price */}
                  {filterItem?.reduce((sum, history) => sum + history.price, 0)}
                </td>
                <td className="w-3/12 border border-white px-2 py-1 font-semibold">
                  {/* Total sum of purchase price */}
                  {filterItem?.reduce(
                    (sum, history) => sum + history.Purchase,
                    0
                  )}
                </td>
                <td className="w-3/12 border border-white px-2 py-1 font-semibold">
                  {/* Total sum of gross profit */}
                  {filterItem?.reduce(
                    (sum, history) =>
                      sum +
                      (history.price - history.Purchase) * history.quantity,
                    0
                  )}
                </td>
              </tr>
            </tfoot>
          ) : (
            ""
          )}
        </table>
      </div>
      <div className="mt-2  ">
        <h1 className="text-xl font-poppins font-bold mb-1">Invoice Profit</h1>
        <table className="table-auto text-left w-full flex flex-col justify-between">
          <thead className="w-full">
            <tr className="w-full bg-skin-fill flex px-2">
              <th className="w-3/12 border border-white px-2 py-1">#</th>
              <th className="w-3/12 border border-white px-2 py-1">
                Invoice No.
              </th>
              <th className="w-5/12 border border-white px-2 py-1">
                Sale Date
              </th>

              <th className="w-3/12 border border-white px-2 py-1">
                Sale Price
              </th>
              <th className="w-3/12 border border-white px-2 py-1">
                Purchase Price
              </th>
              <th className="w-3/12 border border-white px-2 py-1">
                Invoice Discount
              </th>

              <th className="w-3/12 border border-white px-2 py-1">
                Gross Profit
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {sale?.map((item) => (
              <tr className="w-full flex" key={item.id}>
                <td className="w-3/12 px-2   ">{item.id}</td>
                <td className="w-3/12 px-2   ">{item.invoice_no}</td>
                <td className="w-5/12 px-2   ">
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    timeZone: "Asia/Yangon",
                  })}
                </td>
                <td className="w-3/12 px-2 ">
                  {item.order_histories.reduce(
                    (sum, history) => (sum + history.price * history.quantity),
                    0
                  )}
                </td>
                <td className="w-3/12 px-2 ">
                  {item.order_histories.reduce(
                    (sum, history) =>
                      (sum + history.Purchase * history.quantity),
                    0
                  )}
                </td>
                <td className="w-3/12 px-2   ">{item.discount}</td>
                <td className="w-3/12 px-2   ">
                  {item.order_histories.reduce(
                    (historySum, history) =>
                    (historySum +
                      (history.price - history.Purchase) * history.quantity),
                    0
                  ) - item.discount}
                </td>
              </tr>
            ))}
          </tbody>
          {sale?.length > 0 ? (
            <tfoot className="w-full bg-red-400">
              <tr className="w-full flex border px-2">
                <td className="w-3/12 border border-white px-2 py-1"></td>
                <td className="w-3/12 border border-white px-2 py-1 font-semibold">Total</td>
                <td className="w-5/12 border border-white px-2 py-1"></td>
                {/* Total sum of sale price */}
                <td className="w-3/12 border border-white px-2 py-1 font-semibold">
                  {sale?.reduce(
                    (sum, item) =>
                      sum +
                      item.order_histories.reduce(
                        (historySum, history) =>
                          historySum + (history.price * history.quantity),
                        0
                      ),
                    0
                  )}
                </td>
                {/* Total sum of purchase price */}
                <td className="w-3/12 border border-white px-2 py-1 font-semibold">
                  {sale?.reduce(
                    (sum, item) =>
                      sum +
                      item.order_histories.reduce(
                        (historySum, history) =>
                          historySum + (history.Purchase * history.quantity),
                        0
                      ),
                    0
                  )}
                </td>
                <td className="w-3/12 border border-white px-2 py-1 font-semibold">
                  {sale?.reduce((sum, item) => sum + item.discount, 0)}
                </td>
                <td className="w-3/12 border border-white px-2 py-1 font-semibold">
                  {sale?.reduce(
                    (sum, item) =>
                      sum +
                      item.order_histories.reduce(
                        (historySum, history) =>
                          historySum +
                          (history.price - history.Purchase) * history.quantity,
                        0
                      ) - item.discount,
                    0
                  )}
                </td>

              </tr>
            </tfoot>
          ) : (
            ""
          )}
        </table>
      </div>
    </div>
  );
};

export default ProfitNLoss;
