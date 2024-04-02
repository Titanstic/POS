import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["api","category"],
  endpoints: (builder) => ({
    // pos
    getPosItem: builder.mutation({
      query: (qrCode) => ({
        url: "/pos",
        method: "POST",
        body: qrCode,
      }),
      providesTags: ["api"],
    }),

    getOrders: builder.mutation({
      query: (date) => ({
        url: "/order/getOrders",
        
        method: "POST",
        body: date,
      }),
      invalidatesTags: ["Order"],
    }),
    orders: builder.mutation({
      query: (order) => ({
        url: "/order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
    getItem: builder.mutation({
      query: (date) => ({
        url: "/orderhistory/getItems",
        method: "POST",
        body: date,
      }),
      invalidatesTags: ["api"],
    }),
    //Unique Items
    getUniqueItems: builder.query({
      query: () => "/uniqueitems",
      providesTags: ["Unique"],
    }),
    getSingleUniqueItem: builder.query({
      query: (id) => `/uniqueitems/${id}`,
      providesTags: ["Unique"],
    }),
    addUniqueItem: builder.mutation({
      query: (uniqueitem) => ({
        url: "/uniqueitems",
        method: "POST",
        body: uniqueitem,
      }),
      invalidatesTags: ["Unique"],
    }),
    deleteUniqueItem: builder.mutation({
      query: (id) => ({
        url: `/uniqueitems/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Unique"],
    }),
    updateUniqueItem: builder.mutation({
      query: (newData) => ({
        url: `/uniqueitems/${newData.id}`,
        method: "PUT",
        body: newData,
      }),
      invalidatesTags: ["Unique"],
    }),
    // Non Unique Item
    getNonUniqueItems: builder.query({
      query: () => "/nonuniqueitems",
      providesTags: ["NonUnique"],
    }),
    getSingleNonUniqueItem: builder.query({
      query: (id) => `/nonuniqueitems/${id}`,
      providesTags: ["NonUnique"],
    }),
    addNonUniqueItem: builder.mutation({
      query: (nonuniqueitem) => ({
        url: "/nonuniqueitems",
        method: "POST",
        body: nonuniqueitem,
      }),
      invalidatesTags: ["NonUnique"],
    }),
    deleteNonUniqueItem: builder.mutation({
      query: (id) => ({
        url: `/nonuniqueitems/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["NonUnique"],
    }),
    updateNonUniqueItem: builder.mutation({
      query: (newData) => ({
        url: `/nonuniqueitems/${newData.id}`,
        method: "PUT",
        body: newData,
      }),
      invalidatesTags: ["NonUnique"],
    }),
    //Category
    getCategory: builder.query({
      query: () => ({
        url: "/category",
        providesTags: ["category"],
      }),
    }),
    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        providesTags: ["category"],
      }),
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: (category) => ({
        url: `/category/${category.id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
    getSidebar: builder.query({
      query: () => ({
        url: "/sidebar",
        providesTags: ["Category"],
      }),
    }),
    getSingleSidebar: builder.query({
      query: (id) => ({
        url: `/sidebar/${id}`,
        providesTags: ["Category"],
      }),
    }),
    getSidebarCategory: builder.query({
      query: () => ({
        url: "/sidebarcategory",
        providesTags: ["Category"],
      }),
    }),
    updateSidebar: builder.mutation({
      query: (sidebar) => ({
        url: `/sidebar/${sidebar.id}`,
        method: "PUT",
        body: sidebar,
      }),
      invalidatesTags: ["Category"],
    }),
    getPurchase: builder.query({
      query: () => ({
        url: "/purchase",
        providesTags: ["Category"],
      }),
    }),
    getSinglePurchase: builder.query({
      query: (id) => ({
        url: `/purchase/${id}`,
        providesTags: ["Category"],
      }),
    }),
    postPurchase: builder.mutation({
      query: (data) => ({
        url: "/purchase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["api"],
    }),
    getPurchases: builder.mutation({
      query: (date) => ({
        url: "/purchase/getPurchase",
        method: "POST",
        body: date,
      }),
      invalidatesTags: ["api"],
    }),
    getExpenseData: builder.mutation({
      query: (date) => ({
        url: "/expense/getExpense",
        method: "POST",
        body: date,
      }),
    }),
    getExpense: builder.query({
      query: () => ({
        url: "/expense",
        providesTags: ["api"],
      }),
    }),
    getSingleExpense: builder.query({
      query: (id) => ({
        url: `/expense/${id}`,
        providesTags: ["api"],
      }),
    }),
    postExpense: builder.mutation({
      query: (data) => ({
        url: "/expense",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["api"],
    }),
    updateExpense: builder.mutation({
      query: (data) => ({
        url: `/expense/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["api"],
    }),
    getRentalData: builder.mutation({
      query: (date) => ({
        url: "/rental/getRental",
        method: "POST",
        body: date,
      }),
    }),
    getRental: builder.query({
      query: () => ({
        url: "/rental",
        providesTags: ["api"],
      }),
    }),
    getSingleRental: builder.query({
      query: (id) => ({
        url: `/rental/${id}`,
        providesTags: ["api"],
      }),
    }),
    postRental: builder.mutation({
      query: (data) => ({
        url: "/rental",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["api"],
    }),
    updateRental: builder.mutation({
      query: (data) => ({
        url: `/rental/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["api"],
    }),
    getSupplier: builder.query({
      query: () => ({
        url: "/supplier",
        providesTags: ["api"],
      }),
    }),
    getSingleSupplier: builder.query({
      query: (id) => ({
        url: `/supplier/${id}`,
        providesTags: ["api"],
      }),
    }),
    postSupplier: builder.mutation({
      query: (data) => ({
        url: "/supplier",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["api"],
    }),
    updateSupplier: builder.mutation({
      query: (data) => ({
        url: `/supplier/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["api"],
    }),
    getPromotion: builder.query({
      query: () => ({
        url: "/promotion",
        providesTags: ["api"],
      }),
    }),
    getSinglePromotion : builder.query({
      query : (id)=>({
        url : `/promotion/${id}`,
        providesTags : ["api"]
      }),
    })
    ,
    postPromotion: builder.mutation({
      query: (data) => ({
        url: "/promotion",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["api"],
    }),
    updatePromotion: builder.mutation({
      query: (data) => ({
        url: `/promotion/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["api"],
    }),
    deletePromotion: builder.mutation({
      query: (id) => ({
        url: `/promotion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["api"]
    })
  }),
});
export const {
  useGetPosItemMutation,
  useGetUniqueItemsQuery,
  useGetSingleUniqueItemQuery,
  useAddUniqueItemMutation,
  useDeleteUniqueItemMutation,
  useUpdateUniqueItemMutation,
  useGetNonUniqueItemsQuery,
  useGetSingleNonUniqueItemQuery,
  useAddNonUniqueItemMutation,
  useDeleteNonUniqueItemMutation,
  useUpdateNonUniqueItemMutation,
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useOrdersMutation,
  useGetOrdersQuery,
  // useAddPrintMutation,
  useGetOrdersMutation,
  useGetSidebarQuery,
  useGetSingleSidebarQuery,
  useUpdateSidebarMutation,
  useGetSidebarCategoryQuery,
  useGetPurchaseQuery,
  useGetItemMutation,
  useGetSinglePurchaseQuery,
  usePostPurchaseMutation,
  useGetPurchasesMutation,
  useGetExpenseQuery,
  usePostExpenseMutation,
  useGetExpenseDataMutation,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
  useGetRentalQuery,
  useGetSingleRentalQuery,
  usePostRentalMutation,
  useUpdateRentalMutation,
  useGetRentalDataMutation,
  useGetSingleSupplierQuery,
  useGetSupplierQuery,
  usePostSupplierMutation,
  useUpdateSupplierMutation,
  useGetPromotionQuery,
  usePostPromotionMutation,
  useGetSinglePromotionQuery,
  useUpdatePromotionMutation,
  useDeletePromotionMutation
} = Api;
