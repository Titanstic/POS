import React, {useContext, useEffect, useState} from "react";
import { checkDate, getCurrentDate } from "../../util/report";
import { Link } from "react-router-dom";
import { icons } from "../../constant";
import { useGetExpenseDataMutation } from "../../service/Api";
import ExpenseExcelBtn from "../../components/Excel/ExpenseExcelBtn";
import NavContext from "../../context/NavContext";

const Expense = () => {
  const [date, setDate] = useState({ start: "", end: "" });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [expense, setExpense] = useState([]);
  const [getExpense] = useGetExpenseDataMutation();
  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    setNav("expense");
  }, [nav, setNav]);

  // console.log(expense);
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
      endDate.setSeconds(59);

      setDate({ ...date, end: endDate });
      setToDate(e.target.value);
    }
  };
  console.log(date.start);
  useEffect(() => {
    if (date.start !== "") {
      try {
        getExpense(date).then((res) => {
          setExpense(res.data);
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  }, [date, getExpense]);
  return (
    <div className="w-full p-7">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-xl font-poppins font-bold mb-3">
            Expense List
          </h1>
          <h2 className="font-md font-medium font-poppins">
            Manage your expense items
          </h2>
        </div>
        <Link to={"/expense/add"}>
          <button className="bg-skin-fill p-4 text-xl rounded-md shadow-md">
            Add Expense
          </button>
        </Link>
      </div>
      <div className="flex justify-between  gap-2">
        <div className="">
          <label htmlFor="" className="font-bold font-poppins">
            Start Date :
          </label>
          <input
            type="date"
            value={fromDate}
            className="outline-none border shadow-md rounded p-2 uppercase mx-2 "
            onChange={(e) => dateHandler("start", e)}
          />
          <label htmlFor="" className="font-bold font-poppins">
            End Date :
          </label>
          <input
            type="date"
            value={toDate}
            min={fromDate}
            className="outline-none border shadow-md rounded p-2 uppercase mx-2"
            onChange={(e) => dateHandler("end", e)}
          />
        </div>
        <ExpenseExcelBtn expenseData={expense} fileName="Expense" />
      </div>
      <table className="flex flex-col table-auto text-left w-full justify-between items-center mt-5 ">
        <thead className="w-full">
          <tr className="w-full flex px-2 bg-skin-fill">
            <th className="w-3/12 p-1  border border-white">Date</th>
            <th className="w-4/12 p-1 border border-white">Expense For</th>
            <th className="w-4/12 p-1 border border-white">Total Amount</th>
            <th className="w-4/12 p-1 border border-white">Action</th>
          </tr>
        </thead>
        <tbody className="w-full max-h-[400px] overflow-y-scroll">
          {expense
            ? expense.length > 0
              ? expense.map((e) => (
                  <tr key={e.id} className="w-full flex px-2">
                    <td className="w-3/12 p-1 border border-white">{e.date}</td>
                    <td className="w-4/12 p-1 border border-white">
                      {e.expenseFor}
                    </td>
                    <td className="w-4/12 p-1 border border-white">
                      {e.expenseAmount}
                    </td>
                    <td className="w-4/12 p-1 border border-white">
                      <Link to={`/expense/edit/${e.id}`}>
                        <button>
                          <img src={icons.edit} alt="" className="w-6 h-6" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              : "No Data"
            : "Loading"}
        </tbody>
      </table>
    </div>
  );
};

export default Expense;
