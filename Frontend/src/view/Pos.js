import React, { useContext, useEffect, useState } from "react";
import Nav from "../layout/Nav";
import { icons } from "../constant/index";
import {
  useGetCategoryQuery,
  useGetNonUniqueItemsQuery,
  useGetPosItemMutation,
  useGetUniqueItemsQuery,
} from "../service/Api";
import Checkout from "../components/Checkout/Checkout";
import { checkItem, checkQrItem, controlTotalQuality } from "../util/pos";
import AlertContext from "../context/AlertContext";

const Pos = () => {
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const { showComplete, setShowComplete, completeText, setCompleteText } =
    useContext(AlertContext);

  // sqlite
  const { data: uniqueData } = useGetUniqueItemsQuery();
  const { data: nonuniqueData } = useGetNonUniqueItemsQuery();
  const { data: categoryData } = useGetCategoryQuery();
  const [postData] = useGetPosItemMutation();

  const [category, setCategory] = useState(0);
  const [dataCategory, setDataCategory] = useState(null);
  // console.log(dataCategory);
  const [categoryItems, setCategoryItems] = useState(null);
  // console.log(categoryItems);
  const [tempData, setTempData] = useState([]);

  const [qrReadData, setQrReadData] = useState("");

  // Start useEffect
  useEffect(() => {
    if (qrReadData.length > 0 && !isNaN(Number(qrReadData))) {
      // for input handle
      postData({ qrCode: qrReadData }).then((res) => {
        if (qrReadData.length === 3) {
          setQrReadData("");

          checkQrDatas(res);

          setTempData([]);
        } else {
          if (res.data.length > 0) {
            setTempData(res.data);
          } else {
            setTempData([]);
          }
        }
      });
    } else {
      // for qrScan
      if (qrReadData.length === 7) {
        postData({ qrCode: qrReadData })
          .then((res) => {
            checkQrDatas(res);
          })
          .catch((err) => {
            console.log(err);
          });
        setQrReadData("");
      }
    }
  }, [qrReadData]);

  useEffect(() => {
    setDataCategory(categoryData);
  }, [categoryData]);

  useEffect(() => {
    if (category === 0) {
      setCategoryItems(uniqueData);
    } else {
      setCategoryItems(
        nonuniqueData.filter((item) => item.categoryId === category)
      );
    }
  }, [category, uniqueData, nonuniqueData]);
  // End useEffect

  // Start Function
  function checkQrDatas(res) {
    console.log(res.data);
  
    if (res.data.length > 0) {
  
      if (data.length > 0) {
  
        const { filterData, amount } = checkQrItem(data, res.data[0]);
        console.log(filterData, "f");
  
        setTotalAmount(amount);
  
        const newData = filterData.map(item => {
          const outOfStock = item.quantity === 0;
          if (outOfStock) {
            window.alert("Out of Stock");
          }
          return { ...item, outOfStock };
        });
  
        // Update data only if the quantity is not zero
        if (!newData.some(item => item.outOfStock)) {
          setData(newData);
        }
  
      } else {
        const newItem = { ...res.data[0], qty: 1 };
  
        // Show alert if quantity is zero
        if (newItem.quantity === 0) {
        
          window.alert("Out of Stock");
        } else {
          setData([newItem]);
          setTotalAmount(newItem.sale_price);
        }
      }
    }
  }
  
  const clickQrDataHandle = (clickData) => {
    console.log(clickData,"click");
    if (clickData.quantity > 0) {
      if (data.length > 0) {
        const { filterData, amount } = checkQrItem(data, clickData);

        setTotalAmount(amount);
        setData(filterData);
      } else {
        setData([{ ...clickData, qty: 1 }]);
        setTotalAmount(clickData.sale_price);
      }

      setQrReadData("");
      setTempData([]);
    } else {
      window.alert("Out of stock");
    }
  };

  const qrReadBarCode = (e) => {
    setQrReadData(e.target.value);

    if (e.target.value.length === 0) {
      setTempData([]);
    }
  };

  const controlQty = (action, d) => {
    const { newData, amount } = controlTotalQuality(action, data, d);

    setTotalAmount(Math.abs(amount));
    setData(newData);
  };

  const cancelCheckoutBtn = () => {
    setData([]);
  };

  const checkoutBtn = () => {
    setShowCheckout(true);
  };

  const categoryBtn = (d) => {
    if (data.length > 0) {
      const { amount, filterData } = checkItem(data, d);
      // console.log(amount,"hello1")
      setTotalAmount(amount);
      setData(filterData);
    } else {
      if (d.quantity > 0) {
        console.log(d);
        setData([{ ...d, qty: 1 }]);
        const promotionPrice = d.promotion === null ? d.sale_price :(new Date(d.promotion?.startDate + "T00:00:00Z")<= new Date && 
        new Date()<= new Date(d.promotion?.endDate + "T23:59:59Z"))? (d.sale_price - (d.sale_price * d.promotion?.promotionValue/100)) : 
        d.sale_price ;
        setTotalAmount(promotionPrice);
      } else {
        window.alert("Out of stock");
      }
    }
  };

  const deleteBtn = (d) => {
    const newData = [];
    let amount = 0;

    data.forEach((dd) => {
      if (dd.name !== d.name) {
        newData.push(dd);
        amount += dd.promotion === null? (dd.sale_price* dd.qty) :(new Date(dd.promotion.startDate + "T00:00:00Z")<= new Date && 
        new Date()<= new Date(dd.promotion.endDate + "T23:59:59Z"))? ((dd.sale_price - (dd.sale_price * dd.promotion.promotionValue/100))*dd.qty) : 
        (dd.sale_price * dd.qty) ;
      }
    });

    setData(newData);
    setTotalAmount(amount);
  };

  const completeHandle = () => {
    if (completeText === "Insufficient Balance") {
      setShowComplete(false);
      setCompleteText("");
    } else {
      setShowCheckout(false);
      setShowComplete(false);
      setData([]);
      window.location.reload();
    }
  };

  // End Function
  return (
    <div className="w-full h-screen overflow-hidden bg-bg_two relative">
      <Nav />

      <div className="h-[89vh] grid grid-cols-9 pt-1">
        <div className="col-span-4 bg-bg_one shadow-md p-3">
          <div className="flex gap-3 relative">
            <img
              src={icons.barcode}
              alt=""
              className="w-10 h-10 bg-bg_three border border-skin-fill rounded-md "
            />
            <input
              type="text"
              placeholder="Enter Barcode "
              className="border border-skin-fill w-full p-2 shadow-md rounded-md"
              onChange={qrReadBarCode}
              value={qrReadData}
            />

            <div
              className={`w-[610px] max-h-64 bg-bg py-2 pl-2 absolute top-full left-12 overflow-y-auto ${
                tempData.length > 0 ? "visible" : "hidden"
              }`}
            >
              {tempData.length > 0 &&
                tempData.map((t) => (
                  <div
                    className="border border-transparent px-3 py-1 hover:bg-white hover:border-secondary hover:cursor-pointer"
                    onClick={() => clickQrDataHandle(t)}
                    key={t.id}
                  >
                    <p>
                      [Qty : {t.quantity}] -- {t.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <table className="max-h-96 flex flex-col items-center justify-between overflow-y-auto w-full mt-5 shadow-md">
            <thead className="bg-skin-fill flex w-full">
              <tr className="flex w-full font-poppins">
                <th className="w-1/12 border border-white py-3">No</th>
                <th className="w-4/12 border border-white py-3">
                  Product Name
                </th>
                <th className="w-1/12 border border-white py-3">Stock</th>
                <th className="w-2/12 border border-white py-3">Price</th>
                <th className="w-1/12 border border-white py-3">Promo</th>
                <th className="w-1/12 border border-white py-3">Disc</th>

                <th className="w-3/12 border border-white py-3">Qty</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data.length > 0 &&
                data.map((d, index) => (
                  <tr className="flex w-full" key={index}>
                    <td className="w-1/12 border border-bg_three text-center py-2">
                      {++index}
                    </td>
                    <td className="w-4/12 border border-bg_three pl-2 py-2">
                      {d.name}
                    </td>
                    <td className="w-1/12 border border-bg_three text-center py-2">
                      {d.quantity}
                    </td>
                    <td className="w-2/12 border border-bg_three text-center py-2">
                      {d.promotion === null? (d.sale_price* d.qty).toLocaleString('en-Us') :(new Date(d.promotion?.startDate+ "T00:00:00Z")<= new Date && 
                      new Date()<= new Date(d.promotion?.endDate+ "T23:59:59Z"))? ((d.sale_price - (d.sale_price * d.promotion?.promotionValue/100))*d.qty).toLocaleString('en-Us') : 
                      (d.sale_price * d.qty).toLocaleString('en-Us')} Ks
                    </td>
                    <td className="w-1/12 border border-bg_three text-center py-2">
                    {d.promotion === null ?
                        0 + "%"
                        :
                        (new Date(d.promotion?.startDate+ "T00:00:00Z") <= new Date() && new Date() <= new Date(d.promotion?.endDate+ "T23:59:59Z")) ?
                        d.promotion.promotionValue + "%" : 0
  }
                    </td>
                    <td className="w-1/12 border border-bg_three text-center py-2">
                      {d.discount}
                    </td>
                    <td className="flex justify-around items-center w-3/12 border border-bg_three text-center py-2">
                      {!d.checkUnique ? (
                        <>
                          <button className="w-8 bg-bg_three text-center rounded">
                            <img
                              src={icons.minus}
                              alt="minus"
                              onClick={() => controlQty("minus", d)}
                            />
                          </button>
                          <span className="inline-block h-full pt-1">
                            {d.qty}
                          </span>
                          <button className="w-8 bg-bg_three text-center rounded">
                            <img
                              src={icons.add}
                              alt="plus"
                              onClick={() => controlQty("plus", d)}
                            />
                          </button>
                        </>
                      ) : (
                        <span className="inline-block h-full pt-1">
                          {d.qty}
                        </span>
                      )}

                      <button onClick={() => deleteBtn(d)}>
                        <img src={icons.del} className="w-8" alt="delete" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {data.length > 0 && (
            <div className="py-5">
              <div className="flex justify-end pr-5">
                <p className="text-xl font-medium">
                  Total : {totalAmount.toLocaleString("en-US")}
                </p>
              </div>

              <div className="flex justify-end pr-5 py-5">
                <button
                  className="font-medium border rounded shadow-md hover:bg-secondary hover:bg-opacity-20 hover:text-white px-3 py-2 mr-4"
                  onClick={cancelCheckoutBtn}
                >
                  Cancel
                </button>
                <button
                  className="bg-skin-fill bg-opacity-100 font-medium shadow-md hover:bg-opacity-60 rounded px-3 py-2"
                  onClick={checkoutBtn}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Start Category & filter */}
        <div className="h-full col-span-5 p-3">
          {/* Start Category */}
          <div>
            <p className="text-xl font-bold font-poppins">Categories</p>

            <div className="flex justify-between font-semibold mt-5">
              <div
                className={`w-40 py-5 text-xl border border-transparent text-center rounded shadow-xl  ${
                  category === 0
                    ? "bg-skin-fill hover:bg-opacity-80"
                    : "hover:border-error"
                } cursor-pointer`}
                onClick={() => setCategory(0)}
              >
                <p className="text-lg text-black font-poppins">Art Gallery</p>
              </div>

              {dataCategory ? (
                dataCategory.length > 0 &&
                dataCategory.map((c) => (
                  <div
                    className={`w-40 py-5 text-xl border border-transparent text-center rounded shadow-xl  ${
                      category === c.id
                        ? "bg-skin-fill hover:bg-opacity-80"
                        : "hover:border-error"
                    } cursor-pointer`}
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                  >
                    <p className="text-lg text-black font-poppins">{c.name}</p>
                  </div>
                ))
              ) : (
                <div>
                  <p>Loading...</p>
                </div>
              )}

              {/* {

              } */}
            </div>
          </div>
          {/* End Category */}

          {/* Start Filter */}
          <div className="mt-5">
            <div className="h-[67vh] grid grid-cols-3 gap-4 mt-3 overflow-y-auto pr-1 py-2">
              {categoryItems ? (
                categoryItems.length > 0 ? (
                  categoryItems.map((c) => (
                    <div
                      className="h-60 bg-white overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl mt-2"
                      key={c.id}
                      onClick={() => categoryBtn(c)}
                    >
                      <div className="w-full h-36 overflow-hidden relative">
                        <img
                          className="w-full"
                          src={`http://localhost:8080/uploads/${c.image}`}
                          alt=""
                        />

                        <div className="flex justify-center items-center bg-skin-fill absolute bottom-0 right-0 px-2 py-1">
                          <img src={icons.quantity} className="w-8" alt="" />
                          <p> : {c.quantity}</p>
                        </div>
                      </div>

                      <div className="ml-3 py-2">
                        <h5 className="mb-2 font-bold font-poppins">
                          {c.name}
                        </h5>
                        <p className="mb-3 font-normal text-error">
                        {c.promotion === null ?
                            c.sale_price.toLocaleString("en-Us") :
                            (new Date(c.promotion?.startDate+ "T00:00:00Z") <= new Date() && new Date() <= new Date(c.promotion?.endDate+ "T23:59:59Z")) ?
                                (c.sale_price - (c.sale_price * c.promotion?.promotionValue / 100)).toLocaleString("en-Us")
                                :
                                c.sale_price.toLocaleString("en-Us")
                        } Ks
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No Data</p>
                )
              ) : (
                <h1>Loading</h1>
              )}
            </div>
          </div>
          {/* End Filter */}
        </div>
        {/* End Category & filter */}
      </div>

      {/* Start Checkout Page */}
      {showCheckout && (
        <Checkout
          data={data}
          setShowCheckout={setShowCheckout}
          totalAmount={totalAmount}
          cancelCheckoutBtn={cancelCheckoutBtn}
        />
      )}
      {/* End Checkout Page */}

      {/* Start Complete Alert Modal */}
      {showComplete && (
        <div className="w-full h-full bg-secondary bg-opacity-50 flex justify-center items-center shadow absolute top-0 z-50">
          <div className="bg-white px-16 py-10 text-center rounded-md">
            <p
              className={`text-2xl font-bold ${
                completeText === "Insufficient Balance" && "text-skin-red"
              }`}
            >
              {completeText}
            </p>

            <button
              className="bg-skin-fill text-xl shadow-md rounded mt-6 px-5 py-2 hover:bg-opacity-70"
              onClick={completeHandle}
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* End Complete Alert Modal */}
    </div>
  );
};

export default Pos;