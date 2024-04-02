const checkUniqueInputHandle = (data, error) => {
  let exitError = false,
    errorDetail = { ...error };

  console.log(data);

  if (data.name === " ") {
    errorDetail.name = "Enter Product Name";
    exitError = true;
  }

  if (data.salePrice === " ") {
    errorDetail.salePrice = "Enter sale Price";
    exitError = true;
  }
  if (data.purchasePrice === " ") {
    errorDetail.purchasePrice = "Enter Purchase Price";
    exitError = true;
  }

  // if (data.category === "") {
  //   errorDetail.category = "Enter Category";
  //   exitError = true;
  // }

  // if (data.note === "") {
  //   errorDetail.note = "Enter Note";
  //   exitError = true;
  // }

  // if (data.owner === "") {
  //   errorDetail.owner = "Enter Owner";
  //   exitError = true;
  // }

  if (data.image === null) {
    errorDetail.image = "Please choose Image";
    exitError = true;
  }

  return { exitError, errorDetail };
};

const checkNonUniqueInputHandle = (data, error) => {
  let exitError = false,
    errorDetail = { ...error };

  console.log(data);

  if (data.name === "") {
    errorDetail.name = "Enter Product Name";
    exitError = true;
  }

  if (data.salePrice === "") {
    errorDetail.salePrice = "Enter Price";
    exitError = true;
  }
  if (data.purchasePrice === "") {
    errorDetail.purchasePrice = "Enter Price";
    exitError = true;
  }
  if (data.selectedCategoryId === "") {
    errorDetail.selectedCategoryId = "Please Select Category";
    exitError = true;
  }

  // if (data.note === "") {
  //   errorDetail.note = "Enter Note";
  //   exitError = true;
  // }

  if (data.qty === "") {
    errorDetail.qty = "Enter Quantity";
    exitError = true;
  }
  if (data.minQty === "") {
    errorDetail.minQty = "Enter Minimum Quantity";
    exitError = true;
  }

  if (data.image === null) {
    errorDetail.image = "Please choose Image";
    exitError = true;
  }

  return { exitError, errorDetail };
};
const checkPurchaseInputHandle = (data, error) => {
  console.log(data);
  let exitError = false,
    errorDetail = { ...error };
  if (data.purchaseDate === "") {
    errorDetail.purchaseDate = "Enter Purchase Date";
    exitError = true;
  }
  if (data.payType === "") {
    errorDetail.payType = "Select Payment Type";
    exitError = true;
  }if (data.supplierId === "") {
    errorDetail.supplierId = "Select Supplier ";
    exitError = true;
  }
  return { exitError, errorDetail };
};
const checkExpenseInputHandler = (data, error) => {
  console.log(data, error);
  let exitError = false,
    errorDetail = { ...error };
  if (data.date === "") {
    errorDetail.date = " Enter Expense Date";
    exitError = true;
  }
  if (data.expenseAmount === "") {
    errorDetail.expenseAmount = " Enter Expense Amount";
    exitError = true;
  }
  if (data.expenseFor === "") {
    errorDetail.expenseFor = " Enter Expense For";
    exitError = true;
  }
  return { exitError, errorDetail };
};

const checkRentalInputHandle = (data, error) => {
  let exitError = false,
    errorDetail = { ...error };
  if (data.name === "") {
    errorDetail.name = "Enter Name";
    exitError = true;
  }
  if (data.phone === "") {
    errorDetail.phone = "Enter Number Only";
    exitError = true;
  }
  if (data.startDate === "") {
    errorDetail.startDate = "Enter Start Date";
    exitError = true;
  }
  if (data.endDate === "") {
    errorDetail.endDate = "Enter End Date";
    exitError = true;
  }
  if (data.paidAmount === "") {
    errorDetail.paidAmount = "Enter Paid Amount";
    exitError = true;
  }
  if (data.totalPrice === "") {
    errorDetail.totalPrice = "Enter Total Price";
    exitError = true;
  }
  return { exitError, errorDetail };
};
const checkPromotionInptHandler = ({ data, error }) => {
  let exitError = false,
    errorDetail = { ...error };
  if (data.name === "") {
    errorDetail.name = "Enter Promotion Name";
    exitError = true;
  }
  if (data.selectedCategory === "") {
    errorDetail.selectedCategory = "Select Category";
    exitError = true;
  }
  if (data.promotionValue === "") {
    errorDetail.promotionValue = "Enter Your Promotion Value";
    exitError = true;
  }
  if (data.startDate === "") {
    errorDetail.startDate = "Select Start Date";
    exitError = true;
  }
  if (data.endDate === "") {
    errorDetail.endDate = "Select End Date";
    exitError = true;
  }
  return { exitError, errorDetail };
};


const checkUpdatePromotionInptHandler = (data, error) => {
  let exitError = false,
    errorDetail = { ...error };
    console.log(data);
  if (data.name === "") {
    errorDetail.name = "Enter Promotion Name";
    exitError = true;
  }
  if (data.category === "") {
    errorDetail.category = "Select Category";
    exitError = true;
  }
  if (data.promotionValue === "") {
    errorDetail.promotionValue = "Enter Your Promotion Value";
    exitError = true;
  }
  if (data.startDate === "") {
    errorDetail.startDate = "Select Start Date";
    exitError = true;
  }
  if (data.endDate === "") {
    errorDetail.endDate = "Select End Date";
    exitError = true;
  }
  return { exitError, errorDetail };
};
const checkSupplierInputHandle = (data,error)=>{
  console.log(data)
  console.log(error)
  let exitError = false,
  errorDetail = {...error}
  if(data.name === ""){
    errorDetail.name = "Enter Supplier Name";
    exitError = true;
  }
  if(data.email === ""){
    errorDetail.email = "Enter Supplier Email";
    exitError = true;
  }
  if(data.phone === ""){
    errorDetail.phone = "Enter Supplier Phone Number";
    exitError = true;
  }
  
  
  return {exitError,errorDetail}
}
export {
  checkUniqueInputHandle,
  checkNonUniqueInputHandle,
  checkPurchaseInputHandle,
  checkExpenseInputHandler,
  checkRentalInputHandle,
  checkPromotionInptHandler,
  checkSupplierInputHandle,
  checkUpdatePromotionInptHandler
};
