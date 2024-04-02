// import React from "react";
// import { useGetCategoryQuery, useGetNonUniqueItemsQuery } from "../service/Api";

// const Sidebar = () => {
//   const { data } = useGetNonUniqueItemsQuery();
//   const { data: category } = useGetCategoryQuery();
//   console.log(data);
//   //   const filterData = data?.filter((d) => d.id === d.category.id);
//   //   console.log(filterData);

//   return (
//     <div className="p-5">
//       {category?.map((d) => (
//         <div>
//           <h1>{d.name}</h1>
//           <ul>
//             {data
//               ?.filter((c) => c.category.name === d.name)
//               .map((e) => (
//                 <li>{e.name}</li>
//               ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;

import React, { useContext, useEffect } from "react";
import { useGetSidebarQuery } from "../service/Api";
import { icons } from "../constant";
import { Link } from "react-router-dom";
import NavContext from "../context/NavContext";

const Sidebar = () => {
  const { data } = useGetSidebarQuery();
  const { nav, setNav } = useContext(NavContext);
  useEffect(() => {
    setNav("sidebar");
  }, [nav]);

  // console.log(data);
  return (
    <div className="w-full p-3">
      <table className=" text-left table-auto">
        <thead>
          <tr className="font-poppins font-semibold">
            <th className="p-3">Name</th>
            <th className="p-3">Icons</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr key={d.id}>
              <td className="p-3 text-black font-poppins capitalize">
                {d.name}
              </td>
              <td className="p-3">
                <img
                  src={`http://localhost:8080/uploads/${d.image}`}
                  alt=""
                  className="w-10 h-10 "
                />
              </td>
              <td className="p-3">
                <Link to={`/sidebar/edit/${d.id}`}>
                  <img src={icons.edit} alt="" className="w-10 h-10" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
