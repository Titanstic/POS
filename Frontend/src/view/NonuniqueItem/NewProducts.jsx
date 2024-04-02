import React, { useState } from "react";
import { icons } from "../../constant";

const NewProducts = () => {
  const data = [
    { name: "mgmg", age: 12, class: "a" },
    { name: "mgsoe", age: 12, class: "b" },
    { name: "mgtoe", age: 12, class: "a" },
    { name: "mgnyi", age: 12, class: "b" },
    { name: "mgaye", age: 12, class: "a" },
  ];

  const [show, setShow] = useState(true);

  console.log(data);
  return (
    <div>
      <h1>New Products</h1>
      <div className="flex">
        <img src={icons.product} className="w-5 h-5" alt="" />
        <input type="text" className="border border-skin-fill" />
      </div>
      {show ? (
        <div>
          <select name="" id="">
            <option value="">Select Class</option>
            {data?.map((d) => (
              <option key={d.id} value={d.class}>
                {d.class}
              </option>
            ))}
          </select>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewProducts;
