import React, {useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useGetSinglePurchaseQuery } from "../../service/Api";
import { Link } from "react-router-dom";
import NavContext from "../../context/NavContext";

const PurchaseDetail = () => {
  const { id } = useParams();
  const { data } = useGetSinglePurchaseQuery(id);
  console.log(data);


  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    setNav("purchasereport");
  }, [nav, setNav]);


  return (
    <div className="w-full p-5">
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-xl font-poppins font-medium">
            Purchase Item List
          </h1>
          <h2 className="text-md font-poppins font-medium">
            Manage Your Purchase Items.
          </h2>
        </div>
        <button className="bg-skin-fill text-xl text-black p-4  rounded-md">
          <Link to={"/purchase"}>Add Purchase</Link>
        </button>
      </div>
      <button className="bg-skin-fill text-md text-white px-4 py-2  rounded-md my-3">
        <Link to={"/purchasereport"}>Back</Link>
      </button>
      <table className="w-full flex flex-col justify-between items-center mt-5">
        <thead className="w-full">
          <tr className="w-full flex px-2 bg-skin-fill">
            <th className="w-3/12 border border-white px-2 py-1">Date</th>
            <th className="w-2/12 border border-white px-2 py-1">Invoice No</th>
            <th className="w-3/12 border border-white px-2 py-1">
              Product Name
            </th>
            <th className="w-2/12 border border-white px-2 py-1">Qty</th>
            <th className="w-2/12 border border-white px-2 py-1">
              Total Amount
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {data?.productData ? (
            JSON.parse(data?.productData).map((product) => (
              <tr key={product.id} className="w-full flex">
                <td className="w-3/12 border border-white px-2 py-1">
                  {data?.purchaseDate}
                </td>
                <td className="w-2/12 border border-white px-2 py-1">
                  {data?.invoice_no}
                </td>
                <td className="w-3/12 border border-white px-2 py-1">
                  {product.name}
                </td>
                <td className="w-2/12 border border-white px-2 py-1">
                  {product.quantity}
                </td>
                <td className="w-2/12 border border-white px-2 py-1">
                  {product.purchase_price * product.quantity}
                </td>
              </tr>
            ))
          ) : (
            <td colSpan="5">No products available</td>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseDetail;
