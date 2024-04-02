import React, { useState } from "react";
import {
  useGetNonUniqueItemsQuery,
  useGetSupplierQuery,
  usePostPurchaseMutation,
} from "../../service/Api";
import { useNavigate, Link } from "react-router-dom";
import { checkPurchaseInputHandle } from "../../util/item";

const CreatePurchase = () => {
  const { data } = useGetNonUniqueItemsQuery();
  const [error, setError] = useState({});
  const [productData, setProductData] = useState("");
  const [clickedData, setClickedData] = useState([]);
  const [date, setDate] = useState("");
  const [payType, setPayType] = useState("");
  const [postData] = usePostPurchaseMutation();
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const { data: supplier } = useGetSupplierQuery();
  console.log(error);
  const navigate = useNavigate();
  const totalAmount = clickedData.reduce(
    (sum, item) => sum + item.purchase_price * item.quantity,
    0
  );
  const totalQty = clickedData.reduce((sum, item) => sum + item.quantity, 0);

  // console.log(clickedData);
  let filterData = data?.filter((d) => d.id.toString().includes(productData));
  // console.log(filterData);
  const productHandler = (e) => {
    setProductData(e.target.value);
  };
console.log(error)
  const clickData = (d, e) => {
    // e.preventDefault();
    // Check if the clicked item is already in the list
    const existingItem = clickedData.find((item) => item.id === d.id);

    if (existingItem) {
      const updateClickedData = clickedData.map((item) =>
        item.id === d.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setClickedData(updateClickedData);
    } else {
      setClickedData((prevClickedData) => [
        ...prevClickedData,
        { ...d, quantity: 1 },
      ]);
    }

    setProductData("");
  };

  const updateQuantity = (itemId, newQuantity) => {
    setClickedData((prevClickedData) =>
      prevClickedData.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const updatePrice = (itemId, newPrice) => {
    setClickedData((prevClickedData) =>
      prevClickedData.map((item) =>
        item.id === itemId ? { ...item, purchase_price: newPrice } : item
      )
    );
  };
  const increaseQuantity = (itemId) => {
    updateQuantity(
      itemId,
      clickedData.find((item) => item.id === itemId).quantity + 1
    );
  };

  const decreaseQuantity = (itemId) => {
    const currentQuantity = clickedData.find(
      (item) => item.id === itemId
    ).quantity;
    updateQuantity(itemId, currentQuantity > 1 ? currentQuantity - 1 : 1);
  };

  const sendtoBackend = async () => {
    const data = {
      purchaseDate: date,
      totalAmount: totalAmount,
      supplierId: selectedSupplierId,
      payType : payType,

      product: clickedData.map(
        ({ name, purchase_price, quantity, id }) => ({
          name,
          purchase_price,
          quantity,
          id,
          
        })
      ),
    };
    const { exitError, errorDetail } = checkPurchaseInputHandle(data, error);
    setError(errorDetail);
    console.log(data);
    if (!exitError) {
      try {
        // console.log(data);
        await postData(data);
        navigate("/purchase");
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
    // console.log(data);
  };
  const deleteData = (d) => {
    console.log(d);
    const deleteData = clickedData.filter((c) => c.id !== d);
    setClickedData(deleteData);
  };
  // };
  const inputHandle = (e, input) => {
    switch (input) {
      case "date":
        setDate(e.target.value);
        delete error["date"];
        break;

      case "payment" :
        setPayType(e.target.value);
        delete error["payment"]
        break;
        // case "payment" :
        // setPayType(e.target.value);
        // delete error["payment"]
        // break;
      default:
        break;
    }
  };
  const handleKeyPress = (e) => {
    if ((e.key === "Enter") & (filterData.length > 0)) {
      const selectedData = filterData.find(
        (item) => item.id.toString() === productData
      );
      if (selectedData) {
        clickData(selectedData, e);
      }
    }
  };
  return (
    <div className="w-full p-5  relative max-h-[670px] overflow-y-auto ">
      <h1 className="text-xl text-black font-poppins font-semibold capitalize mb-1">
        Purchase item add
      </h1>
      <h2 className="text-md font-poppins capitalize font-medium mb-2">
        Create New Purchase items
      </h2>
      <div className="grid grid-cols-2 gap-5">
        <div className="">
          <label htmlFor="" className="text-black font-normal">
            Supplier
          </label>
          <div className="relative">
            <select
              value={selectedSupplierId}
              onChange={(e) => setSelectedSupplierId(e.target.value)}
              className={
                "w-full border  shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3"
              }
            >
              <option>Select Supplier</option>

              {supplier?.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            {error.supplierId && (<div className="text-red-400 absolute right-5">
              {error.supplierId}
              </div>)}
          </div>
        </div>
        <div className="mb-2">
          <h1 className="text-md text-black font-poppins font-medium mb-2">
            Purchase Date
          </h1>

          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => inputHandle(e, "date")}
              className={`w-full border ${
                error.purchaseDate ? "border-skin-red" : "border-skin-fill"
              } outline-none shadow-md rounded-md bg-transparent p-2`}
            
            />
            {error.purchaseDate && (
              <p className="text-skin-red text-sm absolute bottom-100 left-72">
                {error.purchaseDate}
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-md text-black font-poppins font-medium mb-1">
          Product Code
        </h1>
        <input
          type="text"
          className="border w-1/3 shadow-md p-2 rounded-md outline-none"
          value={productData}
          onKeyPress={handleKeyPress}
          onChange={productHandler}
          placeholder="Search Your Product"
        />
        <div
          className={`absolute z-10 bg-white w-1/3 p-3 mt-1 rounded-md ${
            productData?.length > 0 ? "visible" : "hidden"
          }`}
        >
          {filterData?.map((d) => (
            <div key={d.id} onClick={() => clickData(d)}>
              {d.name}
            </div>
          ))}
        </div>
      </div>

      <table className=" flex flex-col items-center justify-between text-left  w-full mt-3 shadow-md ">
        <thead className="bg-skin-fill w-full ">
          <tr className="flex w-full font-poppins px-2">
            <th className="w-10/12 border border-white py-1 px-2">
              Product Name
            </th>
            <th className="w-8/12 border border-white py-1 px-2">Qty</th>
            <th className="w-10/12 border border-white py-1 px-2">
              Unit Price
            </th>
            <th className="w-9/12 border border-white py-1 px-2">
              Total Amount
            </th>
            <th className="w-4/12 border border-white py-1 px-2">Action</th>
          </tr>
        </thead>
        <tbody className="   w-full ">
          {clickedData?.map((d) => (
            <tr key={d.id} className="flex w-full font-poppins px-2">
              <td className="w-10/12 border border-white py-1">{d?.name}</td>
              <td className="w-8/12 border border-white py-1 flex items-center">
                <p
                  onClick={() => decreaseQuantity(d.id)}
                  className="bg-skin-fill"
                >
                  -
                </p>
                <input
                  type="number"
                  value={d.quantity}
                  onChange={(e) =>
                    updateQuantity(d.id, parseInt(e.target.value, 10))
                  }
                  className="w-4/12 appearance-none focus:outline-none focus:shadow-outline border px-3 no-spinners"
                />
                <p
                  onClick={() => increaseQuantity(d.id)}
                  className="bg-skin-fill"
                >
                  +
                </p>
              </td>
              <td className="w-10/12 border border-white py-1">
                <input
                  type="number"
                  value={d.purchase_price}
                  onChange={(e) =>
                    updatePrice(d.id, parseInt(e.target.value, 10))
                  }
                  className=" appearance-none focus:outline-none focus:shadow-outline border px-3 no-spinners"
                />
              </td>
              <td className="w-9/12 border border-white py-1">
                {d?.quantity * d?.purchase_price}
              </td>
              <td
                className="w-4/12 border border-white py-1"
                onClick={() => deleteData(d.id)}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="absolute text-right right-10 z-10">
        <p>
          Total Quantities : <span>{totalQty}</span>
        </p>
        <p>Sub Total : {totalAmount}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-10">
        <div className="w-full">
          <h1 className="text-black text-md font-poppins font-medium ">
            Total Pay Amount
          </h1>
          {/* <input
            type="text"
            className="border w-full shadow-md p-2 rounded-md"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
          /> */}
          <div className="relative">
            <input type="text" value={totalAmount} className="border shadow-md rounded outline-none p-2" />
          </div>
        </div>
        <div>
          <h1 className="text-black text-md font-poppins font-medium ">
            Payment Type
          </h1>
        <div className="relative">
        <select
            className="border w-full shadow-md p-2 rounded-md outline-none"
            value={payType}
            onChange={(e) => inputHandle(e,"payment")}
          >
            <option value="">Choose Payment</option>
            <option value="Cash">Cash</option>
            <option value="Kpay">Kpay</option>
            <option value="Card">Card</option>
          </select>
          {error.payType && <div className="absolute right-5 text-red-400 font-poppins "> {error.payType}</div>}
        </div>
        </div>
      </div>
      <div className="w-52 absolute right-10 text-right font-poppins  mt-4 ">
        <div className="flex justify-between items-center">
          <h1>Total Pay Amount </h1>
          <p>{totalAmount}</p>
        </div>
        <div className="flex justify-between items-center">
          <h1>Payment Type</h1>
          <p>{payType}</p>
        </div>
        <div className="flex justify-between items-center">
          <h1>Grand Total</h1>
          <p>{totalAmount}</p>
        </div>
        <div className="m-2">
          <Link to={"/purchase"}>
            <button className="border mr-3 border-skin-fill px-4 py-2">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            onClick={sendtoBackend}
            className="bg-skin-fill text-white px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchase;
