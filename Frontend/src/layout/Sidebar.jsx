import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useGetSidebarCategoryQuery, useGetSidebarQuery } from "../service/Api";
import NavContext from "../context/NavContext";

const Sidebar = () => {
  const { data } = useGetSidebarQuery();
  const { data: blogs } = useGetSidebarCategoryQuery();
  // const []
  const [sidebar, setSidebar] = useState("");
  const [category, setCategory] = useState();
  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    setSidebar(data);
    setCategory(blogs);
  }, [data, blogs]);

  return (
    <div className="w-[20%] bg-black overflow-y-auto bg-bg bg-opacity-10 border-r px-5 py-2 shadow-xl font-poppins">
      {category?.map((c) => (
        <div key={c.id}>
          <h1 className="text-xl font-semibold">{c.name}</h1>
          {sidebar
            ?.filter((f) => f.sidebarcategoryId === c.id)
            .map((s) => (
              <Link
                key={s.id}
                to={`/${s.pathname}`}
                className={` ${nav === `${s.pathname}` && "bg-skin-fill"
                  } flex items-center  my-1 gap-2 rounded-md  p-2 hover:bg-skin-fill hover:text-white`}
                onClick={() => setNav(`${s.pathname}`)}
              >
                <img
                  src={`http://localhost:8080/uploads/${s.image}`}
                  alt=""
                  className="w-6 h-6"
                />
                <h1 className="text-md ml-3">{s.name}</h1>
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
