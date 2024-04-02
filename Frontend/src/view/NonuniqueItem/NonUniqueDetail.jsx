import React, { useRef, useState } from "react";
import { useGetSingleNonUniqueItemQuery } from "../../service/Api";
import { useParams } from "react-router-dom";
// import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import PrintComponent from "./PrintBarCodeComponent";
// import { icons } from "../../constant";
// import BarcodeGenerator from "../BarcodeGenerator";
const NonUniqueDetail = () => {
  const { id } = useParams();

  console.log(typeof id);
  const [qty, setQty] = useState(1);
  const { data: blog } = useGetSingleNonUniqueItemQuery(id);
  console.log(blog);
  const printRef = useRef();
  // console.log(ref);
  const addQty = () => {
    setQty(qty + 1);
  };

  // const barcodeData = `MULA${blog?.id}${qty > 0 ? qty : ""}`;
  const pageStyle = `
  @page{
    size :30mm 20mm
  }
  @media all{
    .pageBreak{
      display :none;
    }
  }
  @media print{
    .pageBreak{
      page-break-before :always;
    }
  }
  `;
  return (
    <div className="bg-bg bg-opacity-20 w-full p-7">
      <h1 className="text-black text-xl font-poppins font-medium mb-3 ">
        Product Detail
      </h1>
      <h2 className="text-black capitalize font-poppins font-normal ">
        Full details of projects
      </h2>

      <div className="grid grid-cols-2 mt-5">
        <div className="">
          <div className="flex mt-3 p-5 items-center">
            <PrintComponent ref={printRef} qty={qty} blog={blog} />

            <div>
              <h1 onClick={addQty}>+</h1>
            </div>
            <button onClick={() => window.print()}>Print</button>
            <ReactToPrint
              trigger={() => <button></button>}
              content={() => printRef.current}
              pageStyle={pageStyle}
            />
          </div>
          <div className="flex mt-5">
            <div className="border border-r-0">
              <h1 className="border px-1 py-3 w-48 text-black font-poppins font-semibold">
                Name
              </h1>
              <h1 className="border px-1 py-3 w-48 text-black font-poppins font-semibold">
                Price
              </h1>
              <h1 className="border px-1 py-3 w-48 text-black font-poppins font-semibold">
                Quantity
              </h1>

              <h1 className="border px-1 py-3 w-48 text-black font-poppins font-semibold">
                Note
              </h1>
            </div>

            <div className="border border-l-0">
              <h1 className="border px-2 py-3 w-72">{blog?.name}</h1>
              <h1 className="border px-2 py-3 w-72">{blog?.sale_price}</h1>
              <h1 className="border px-2 py-3 w-72">{blog?.quantity}</h1>
              <h1 className="border px-2 py-3 w-72">{blog?.note}</h1>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-white shadow-lg w-[300px] mx-auto">
            <img
              src={`http://localhost:8080/uploads/${blog?.image}`}
              className=" rounded object-fill"
              alt="img"
            />
            <h1 className="p-2">{blog?.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonUniqueDetail;
