import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AllUniqueItems from "./UniqueItems/AllUniqueItems";
import CreateUnique from "../components/UniqueItems/CreateUnique";
import Sidebar from "../layout/Sidebar";
import EditUnique from "../components/UniqueItems/EditUnique";
import Nav from "../layout/Nav";
import UniqueItemDetail from "./UniqueItems/UniqueItemDetail";
import Category from "../components/Category/Category";
import EditCategory from "../components/Category/EditCategory";
import CreateCategory from "../components/Category/CreateCategory";
import NonUnique from "./NonuniqueItem/NonUnique";
import CreateNonUnique from "../components/Nonunique/CreateNonUnique";
import InvoiceReportView from "./report/InvoiceReportView";
import NonUniqueDetail from "./NonuniqueItem/NonUniqueDetail";
import AlertContext from "../context/AlertContext";
import {
  useDeleteCategoryMutation,
  useDeleteNonUniqueItemMutation,
  useDeletePromotionMutation,
  useDeleteUniqueItemMutation,
} from "../service/Api";
import EditNonUnique from "../components/Nonunique/EditNonUnique";
import Sidebars from "../view/Sidebar";
import EditSidebar from "./EditSidebar";
import Purchase from "./Purchase/Purchase";
import PurchaseReport from "./Purchase/PurchaseReport";
import PurchaseDetail from "./Purchase/PurchaseDetail";
import AddExpense from "../components/Expense/CreateExpense";
import ProfitNLoss from "./report/ProfitNLoss";
import Expense from "../view/Expense/Expense";
import CreatePurchase from "../components/Purchase/CreatePurchase";
import ItemReport from "./report/ItemReport";
import EditExpense from "../components/Expense/EditExpense";
import Rent from "./Renting/Rental";
import CreateRental from "../components/Renting/CreateRental";
import EditRental from "../components/Renting/EditRental";
import DetailRental from "../components/Renting/DetailRental";
import DetailPurchase from "../components/Purchase/DetailPurchase";
import Supplier from "./Suppliers/Supplier";
import CreateSupplier from "../components/Supplier/CreateSupplier";
import Promotion from "./Promotion/Promotion";
import CreatePromotion from "../components/Promotion/CreatePromotion";
import Dashboard from "./Dashboard/Dashboard";
import EditPromotion from "../components/Promotion/EditPromotion";
// import NewProducts from "./NonuniqueItem/NewProducts";

const Home = () => {
  const [toggle] = useState(true);
  const {
    showDelete,
    loading,
    setLoading,
    setShowDelete,
    itemId,
    setItemId,
    unique,
    setUnique,
  } = useContext(AlertContext);

  const [deleteUniqueItem] = useDeleteUniqueItemMutation();
  const [deleteNonUniqueItem] = useDeleteNonUniqueItemMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deletePromotion] = useDeletePromotionMutation();

  // Start Function
  const confirmDelete = async () => {
    setLoading(true);

    try{
      if (unique === "unique") {
        await deleteUniqueItem(itemId);
      } else if (unique === "nonunique") {
        await deleteNonUniqueItem(itemId);
        console.log(itemId);
      }else if(unique === "promotion") {
        console.log(itemId);
        await deletePromotion(itemId);
        window.location.reload();
      }
       else {
        console.log(unique);
        await deleteCategory(itemId);
        window.location.reload();
      }  
    }catch(e) {
      console.log(e.message);
    }finally{
      setUnique(null);
      setShowDelete(!showDelete);
      setLoading(false);
    }
    
  };

  const deleteItemBtn = (id) => {
    setShowDelete(!showDelete);
    setItemId(id);
  };
  // End Function

  return (
    <div className="w-full h-screen overflow-hidden">
     {toggle && <Nav />}
      <div className="h-[89vh] flex ">
        {toggle && <Sidebar />}
        <Routes>
          <Route path="unique" element={<AllUniqueItems />} />
          <Route path="unique/add" element={<CreateUnique />} />
          <Route path="unique/edit/:id" element={<EditUnique />} />
          <Route path="uniqueitem/:id" element={<UniqueItemDetail />} />
          <Route path="nonunique" element={<NonUnique />} />
          <Route path="nonunique/:id" element={<NonUniqueDetail />} />
          <Route path="nonunique/edit/:id" element={<EditNonUnique />} />
          <Route path="nonunique/add" element={<CreateNonUnique />} />

          <Route path="category" element={<Category />} />
          <Route path="category/edit/:id" element={<EditCategory />} />
          <Route path="category/add" element={<CreateCategory />} />

          {/* Report */}
          <Route path="salereport" element={<InvoiceReportView />} />
          <Route path="itemreport" element={<ItemReport />} />
          {/* test */}
          <Route path="/sidebar" element={<Sidebars />} />
          <Route path="/sidebar/edit/:id" element={<EditSidebar />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchase/:id" element={<DetailPurchase />} />
          <Route path="/purchase/add" element={<CreatePurchase />} />
          <Route path="/purchasereport" element={<PurchaseReport />} />
          <Route path="/purchasereport/:id" element={<PurchaseDetail />} />
          <Route path="expense/add" element={<AddExpense />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/expense/edit/:id" element={<EditExpense />} />
          <Route path="/profit" element={<ProfitNLoss />} />
          <Route path="/rental" element={<Rent />} />
          <Route path="rental/add" element={<CreateRental />} />
          <Route path="rental/edit/:id" element={<EditRental />} />
          <Route path="rental/:id" element={<DetailRental />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="supplier/add" element={<CreateSupplier />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="promotion/add" element={<CreatePromotion />} />
          <Route path="promotion/edit/:id" element={<EditPromotion/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>

        {/* Start Delete Alert Modal */}
        {showDelete && (
          <div className="w-full h-full bg-secondary bg-opacity-50 flex justify-center items-center shadow absolute top-0">
            <div className="bg-white shadow-xl border  px-24 py-10 text-center rounded-md">
              {loading ? (
                <p className="text-lg font-bold">Loading ...</p>
              ) : (
                <>
                  <p className="text-2xl  font-bold">Are you Sure?</p>
                  <p className="text-lg mt-2">
                    You won't be able to revert this!
                  </p>

                  <div className="text-lg mt-5 flex justify-between">
                    <button
                      className="bg-skin-fill rounded shadow hover:bg-opacity-70 hover:shadow-md px-4 py-3"
                      onClick={confirmDelete}
                    >
                      Yes, delete it
                    </button>
                    <button
                      className="bg-red-500 text-white rounded shadow hover:bg-opacity-70 hover:shadow-md px-4 py-3"
                      onClick={() => deleteItemBtn(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {/* End Delete Alert Modal */}

        
      </div>
    </div>
  );
};

export default Home;
