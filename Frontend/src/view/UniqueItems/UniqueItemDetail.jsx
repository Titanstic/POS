import React, {useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useGetSingleUniqueItemQuery } from "../../service/Api";
import { icons } from "../../constant";
import NavContext from "../../context/NavContext";

const UniqueItemDetail = () => {
  const { id } = useParams();
  const { data: blog } = useGetSingleUniqueItemQuery(id);

  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    setNav("unique");
  }, [nav]);
  console.log(blog);
  return (
    <div className="bg-bg w-full p-7">
      <h1 className="text-black text-xl font-poppins font-medium mb-3 ">
        Product Detail
      </h1>
      <h2 className="text-black capitalize font-poppins font-normal ">
        Full details of projects
      </h2>

      <div className="grid grid-cols-2 mt-5">
        <div className="">
          {/* <div className="border-2 inline-block mt-3 p-5">
            <h1 className="">barcode Scanner</h1>
            <img src={icons.barcode} alt="" className="w-6 h-6 " />
          </div> */}
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
              {/* <h1 className="border px-1 py-3 w-48 text-black font-poppins font-semibold">
                Owner
              </h1>
              <h1 className="border px-1 py-3 w-48 text-black font-poppins font-semibold">
                Note
              </h1> */}
            </div>

            <div className="border border-l-0">
              <h1 className="border px-2 py-3 w-72">{blog?.name}</h1>
              <h1 className="border px-2 py-3 w-72">{blog?.sale_price}</h1>
              <h1 className="border px-2 py-3 w-72">{blog?.quantity}</h1>
              {/* <h1 className="border px-2 py-3 w-72">{blog?.owner}</h1>
              <h1 className="border px-2 py-3 w-72">{blog?.note}</h1> */}
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-white shadow-lg w-[300px] mx-auto">
            <img
              src={`http://localhost:8080/uploads/${blog?.image}`}
              alt=""
              className="w-auto h-auto object-cover"
            />
            <h1 className="p-2">{blog?.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueItemDetail;
