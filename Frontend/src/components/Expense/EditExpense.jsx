import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkExpenseInputHandler } from "../../util/item";
import {
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
} from "../../service/Api";

const EditExpense = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleExpenseQuery(id);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseFor, setExpenseFor] = useState("");
  const [error, setError] = useState({});
  const [updateExpense] = useUpdateExpenseMutation(id);

  useEffect(() => {
    if (data) {
      setExpenseAmount(data.expenseAmount);
      setExpenseFor(data.expenseFor);
    }
  }, [data]);
  const expenseHandler = (e) => {
    e.preventDefault();
    const data = { id, expenseAmount, expenseFor };
    const { exitError, errorDetail } = checkExpenseInputHandler(data, error);
    setError(errorDetail);
    if (!exitError) {
      try {
        updateExpense(data);
        console.log(data);
        navigate("/expense");
      } catch (e) {
        console.log(e.message);
      }
    }
    console.log(data);
  };
  const inputHandler = (e, input) => {
    switch (input) {
      case "expenseAmount":
        if (!isNaN(Number(e))) {
          setExpenseAmount(e);
          delete error["expenseAmount"];
        } else {
          setError({ ...error, price: "Enter Number  Only" });
        }
        break;
      case "expenseFor":
        setExpenseFor(e);
        delete error["expenseFor"];
        break;
      default:
        break;
    }
  };
  return (
    <div className="w-full p-5">
      <h1 className="text-xl font-poppins capitalize font-semibold mb-3">
        Edit Expense Item
      </h1>

      <form action="" onSubmit={expenseHandler}>
        <div className="grid grid-cols-2 gap-4 items-center my-5">
          <div className="flex flex-col">
            <label htmlFor="">Expense Amount</label>
            <div className="relative">
              {" "}
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
          <div className="flex flex-col">
            <label htmlFor="">Expense For</label>
            <div className="relative ">
              <input
                type="text"
                className="outline-none border p-2 rounded shadow-md mt-3 w-full"
                value={expenseFor}
                onChange={(e) => inputHandler(e.target.value, "expenseFor")}
              />
              {error.expenseFor && (
                <p className="text-skin-red text-sm absolute bottom-100 font-poppins right-0">
                  {error.expenseFor}
                </p>
              )}
            </div>
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

export default EditExpense;
