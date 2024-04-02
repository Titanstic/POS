import { useContext, useEffect, useState } from "react";
import { useOrdersMutation } from "../../service/Api";
import AlertContext from "../../context/AlertContext";

const Checkout = ({
  data,
  setShowCheckout,
  totalAmount,
  cancelCheckoutBtn,
}) => {
  const [total, setTotal] = useState(totalAmount);
  const [subAmount, setSubAmount] = useState(null);
  const [payAmount, setPayAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cashBack, setCashBack] = useState(0);
  const [error, setError] = useState({});

  // useContext
  const { setShowComplete, setCompleteText } = useContext(AlertContext);
  

  const [orderItems] = useOrdersMutation();

  // Start useEffect
  useEffect(() => {
    setSubAmount(totalAmount);
  }, [totalAmount]);
  // End useEffect

  // Start Function
  const changePayAmount = (e) => {
    if (!isNaN(Number(e.target.value))) {
      setPayAmount(Number(e.target.value));
      setCashBack(Number(e.target.value) - total);

      delete error["payAmount"];
      setError({ ...error });
    } else {
      setError({ ...error, payAmount: "Please Enter Number Only" });
    }
  };

  const changeDiscount = (e) => {
    if (!isNaN(Number(e.target.value))) {
      if (totalAmount > Number(e.target.value)) {
        setDiscount(Number(e.target.value));
        const amount = totalAmount - Number(e.target.value);

        setTotal(amount);
        setCashBack(payAmount - amount);
      }

      delete error["discount"];
      setError({ ...error });
    } else {
      setError({ ...error, discount: "Please Enter Number Only" });
    }
  };

  const saveBtn = async () => {
    setShowComplete(true);

    if (payAmount < total) {
      setCompleteText("Insufficient Balance");
    } else {
      try {
        const addOrderItems = {
          payamount: payAmount,
          grandtotal: total,
          payback: cashBack,
          discount,
          data,
        };
        console.log(addOrderItems)
        await orderItems(addOrderItems);
      } catch (e) {
        window.alert("Error");
      }

      setCompleteText("Purchase Successfully");
    }
  };
  // End Function

  return (
    <div className="absolute w-full h-full bg-secondary bg-opacity-30 top-0 z-20">
      <div className="h-full flex justify-center items-center">
        {subAmount ? (
          <div className="w-3/4 bg-slate-100 rounded shadow-md p-7 grid grid-cols-2 gap-4">
            {/* Start Customer pay amount */}
            <div>
              <div className="h-32 bg-skin-fill p-4 mb-2">
                <p className="text-lg font-bold mb-3">Pay Amount</p>

                <input
                  type="text"
                  className={`w-full rounded border border-transparent ${
                    error.payAmount && "border-skin-red"
                  } p-2 outline-0`}
                  value={payAmount > 0 ? payAmount : ""}
                  onChange={changePayAmount}
                  placeholder="Enter pay amount"
                />
                <p className="text-xs text-error text-end mt-2">
                  {error.payAmount}
                </p>
              </div>

              <div className="h-32 bg-skin-fill p-4">
                <p className="text-lg font-bold mb-3">Disocunt</p>

                <input
                  type="text"
                  className={`w-full rounded border border-transparent ${
                    error.discount && "border-error"
                  } p-2 outline-0`}
                  value={discount > 0 ? discount : ""}
                  onChange={changeDiscount}
                  placeholder="Enter Discount"
                />
                <p className="text-xs text-skin-red text-end mt-2">
                  {error.discount}
                </p>
              </div>
            </div>
            {/* End Customer pay amount */}

            {/* Start Buy Amount */}
            <div>
              <div className="bg-skin-fill font-bold grid grid-cols-2 gap-5 p-4 mb-1">
                <p>Total Items :</p>
                <p className="text-end">{data.length}</p>
                <p>Sub Total :</p>
                <p className="text-end">{subAmount.toLocaleString("en-US")}</p>
                <p>Discount :</p>
                <p className="text-end">{discount}</p>
                <p>Tax :</p>
                <p className="text-end">0</p>
              </div>

              <div className="bg-skin-red font-bold text-black grid grid-cols-2 gap-2 p-4 mb-1">
                <p>Total :</p>
                <p className="text-end">{total.toLocaleString("en-US")}</p>
              </div>

              <div className="bg-skin-fill font-bold grid grid-cols-2 gap-2 p-4 mb-1">
                <p>Pay Amount :</p>
                <p className="text-end">
                  {payAmount && payAmount.toLocaleString("en-US")}
                </p>
              </div>

              <div className="bg-skin-red font-bold text-black grid grid-cols-2 gap-2 p-4 mb-1">
                <p>Change :</p>
                <p className="text-end">
                   {payAmount > 0 || discount > 0
                    ? cashBack.toLocaleString("en-US")
                    : 0}
                </p>
              </div>
            </div>
            {/* End Buy Amount */}

            {/* Start Button */}
            <div className="col-span-2 text-end mt-4">
              <button
                type="button"
                className="hover:bg-secondary hover:bg-opacity-20 rounded border px-4 py-2"
                onClick={() => setShowCheckout(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-skin-fill rounded hover:bg-opacity-80 hover:text-white px-6 py-2 ml-4"
                onClick={saveBtn}
              >
                Save
              </button>
              {/* <button type="button" className="bg-error text-white rounded px-5 py-2">Save & Print</button> */}
            </div>
            {/* End Button */}
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
      {/* End Button */}
    </div>
  );
};

export default Checkout;
