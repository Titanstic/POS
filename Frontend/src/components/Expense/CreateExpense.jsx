import React, {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePostExpenseMutation } from "../../service/Api";
import { checkExpenseInputHandler } from "../../util/item";
import NavContext from "../../context/NavContext";

const Expense = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseFor, setExpenseFor] = useState("");
  const [otherExpense, setOtherExpense] = useState("");

  const [expense] = usePostExpenseMutation();
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);
  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    setNav("expense");
  }, [nav, setNav]);

  const expenseHandler = (e) => {
    e.preventDefault();
    const data = {
      date,
      expenseAmount,
      expenseFor: expenseFor === "Other" ? otherExpense : expenseFor,
    };
    const { exitError, errorDetail } = checkExpenseInputHandler(data, error);
    setError(errorDetail);
    if (!exitError) {
      try {
        expense(data);
        navigate("/expense");
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  const inputHandler = (e, input) => {
    switch (input) {
      case "date":
        setDate(e);
        delete error["date"];
        break;

      case "expenseAmount":
        if (!isNaN(Number(e))) {
          setExpenseAmount(e);
          delete error["expenseAmount"];
        } else {
          setError({ ...error, price: "Enter Number  Only" });
        }
        break;
      // case "expenseFor":
      //   setExpenseFor(e);
      //   delete error["expenseFor"];
      // break;
      default:
        break;
    }
  };
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setExpenseFor(selectedValue);
  };

  const handleOtherInputChange = (e) => {
    const inputExpense = e.target.value;
    setOtherExpense(inputExpense);
  };
  console.log(expenseFor);
  return (
    <div className="w-full relative p-5">
      <h1 className="text-xl font-poppins capitalize font-semibold mb-3">
        Expense Item Add
      </h1>
      <h2 className="font-poppins capitalize font-normal">
        Create a new expense item
      </h2>
      <form action="" onSubmit={expenseHandler}>
        <div className="grid grid-cols-2 gap-4 items-center my-5">
          <div className="flex flex-col ">
            <label htmlFor="">Choose Date</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                className="border shadow-md outline-none p-2 mt-2 rounded uppercase w-full"
                onChange={(e) => inputHandler(e.target.value, "date")}
              />
              {error.date && (
                <p className="text-skin-red text-sm absolute font-poppins bottom-100 right-0">
                  {error.date}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Expense Amount</label>
            <div className="relative">
              <input
                type="text"
                className="focus:outline-none border shadow p-2 mt-2 rounded w-full"
                value={expenseAmount}
                onChange={(e) => inputHandler(e.target.value, "expenseAmount")}
              />{" "}
              {error.expenseAmount && (
                <p className="text-skin-red text-sm absolute font-poppins bottom-100 right-0">
                  {error.expenseAmount}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Expense For</label>
          <div className="">
            <select
              value={expenseFor}
              onChange={handleSelectChange}
              className="p-2 outline-none border  w-full shadow-md rounded"
            >
              <option value="">Select ExpenseFor</option>
              <option value="Taxes">Taxes</option>
              <option value="Transportation">Transportation</option>
              <option value="Packing">Packing</option>
              <option value="Wages">Wages</option>
              <option value="Salaries">Salaries</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Other">Other</option>
            </select>

            {show
              ? ""
              : expenseFor === "Other" && (
                  <div className="absolute top-68 mt-2 left-10 border shadow-md rounded font-poppins w-62 h-40 p-2">
                    <label htmlFor="">Expense For</label>
                    <div className="my-3">
                      <input
                        type="text"
                        value={otherExpense}
                        onChange={handleOtherInputChange}
                        placeholder="Enter other expense"
                        className="outline-none border p-2 "
                      />
                    </div>
                    <div className="ml-3">
                      <button
                        className="border px-4 py-2 rounded"
                        onClick={() => setShow(true)}
                      >
                        Cancel
                      </button>
                      <button
                        className="border bg-green-400 px-4 py-2 rounded ml-2"
                        onClick={() => setShow(true)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
          </div>
        </div>
        <div className="absolute right-5 mt-5">
          <Link to={"/expense"}>
            <button className="border px-4 py-2 rounded">Cancel</button>
          </Link>
          <button className="bg-green-400 px-4 py-2 rounded ml-2" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Expense;
