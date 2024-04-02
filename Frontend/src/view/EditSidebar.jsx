import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  useGetSingleSidebarQuery,
  useUpdateSidebarMutation,
} from "../service/Api";

const EditSidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleSidebarQuery(id);
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [updateSidebar] = useUpdateSidebarMutation(id);
  // console.log(image);
  useEffect(() => {
    setName(data?.name);
    setImage(data?.image);
  }, [data]);
  const updateHandler = (e) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("id", id);
    newData.append("name", name);
    newData.append("image", image);
    // console.log(newData);
    try {
      updateSidebar(newData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          window.alert(err.message);
        });

      navigate("/sidebar");
      window.location.reload();
    } catch (e) {
      window.alert(e.message);
    }
  };
  return (
    <div className="w-full p-5">
      <h1 className="text-black text-xl font-poppins font-semibold">
        Edit Sidebar Links
      </h1>
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        onSubmit={updateHandler}
      >
        <div>
          <label htmlFor="">Name</label>
          <div>
            <input
              type="text"
              value={name}
              className=" shadow-md rounded-md bg-transparent p-2  border"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="">Image</label>
          <div>
            <input
              type="file"
              className="shadow-md rounded-md bg-transparent p-2 border"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
        <div className="absolute right-7">
          <Link to={"/sidebar"}>
            <button className="border border-black rounded-md px-5 py-2 mr-5">
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            className="border-none rounded-md bg-skin-fill px-5 py-2 "
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSidebar;
