const checkItem = (data, d) => {
  console.log(d);
  console.log(data);
  let amount = 0;
  let filterData = [];
  let exitItem = data.find((dd) => dd.id === d.id && dd.name === d.name);

  if (exitItem) {
    data.forEach((c, index) => {
      if (
        c.id === d.id &&
        c.name === d.name &&
        !c.unique &&
        c.quantity > c.qty
      ) {
        filterData[index] = { ...c, qty: ++c.qty };
      } else {
        filterData.push(c);
      }
    });
  } else {
    if (d.quantity > 0) {
      filterData = [...data, { ...d, qty: 1 }];
    } else {
      filterData = [...data];
      window.alert("Out of Stock");
    }
  }

  filterData.forEach((f) => {
    amount += f.promotion === null? (f.sale_price* f.qty) :(new Date(f.promotion?.startDate+ "T00:00:00Z")<= new Date && 
    new Date()<= new Date(f.promotion?.endDate+ "T23:59:59Z"))? ((f.sale_price - (f.sale_price * f.promotion?.promotionValue/100))*f.qty) : 
    (f.sale_price * f.qty) ;
  });

  return { amount, filterData };
};

const checkQrItem = (data, qrData) => {
  let filterData = [];
  let amount = 0;
  console.log(qrData);

  const exitItem = data.find((d) => d.id === qrData.id);

  if (exitItem) {
    data.forEach((c, index) => {
      if (c.id === qrData.id && c.quantity > c.qty) {
        filterData[index] = { ...c, qty: ++c.qty };
      } else {
        filterData.push(c);
      }
    });
  } else {
    
    filterData = [...data, { ...qrData, qty: 1 }];
  }

  filterData.forEach((f) => {
    amount += f.sale_price * f.qty;
  });

  return { filterData, amount };
};

const controlTotalQuality = (action, data, d) => {
  console.log(data)
  const newData = [];
  let amount = 0;

  if (action === "minus") {
    data.forEach((da) => {
      if (da.no === d.no && da.name === d.name && da.qty > 1) {
        newData.push({ ...d, qty: --d.qty });
      } else {
        newData.push(da);
      }

      amount -= da.promotion === null? (da.sale_price* da.qty) :(new Date(da.promotion?.startDate+ "T00:00:00Z")<= new Date && 
    new Date()<= new Date(da.promotion?.endDate+ "T23:59:59Z"))? ((da.sale_price - (da.sale_price * da.promotion?.promotionValue/100))*da.qty) : 
    (da.sale_price * da.qty);
    });
  } else {
    data.forEach((da) => {
      if (da.no === d.no && da.name === d.name && da.qty < d.quantity) {
        amount += d.promotion === null? (d.sale_price* d.qty) :(new Date(d.promotion?.startDate+ "T00:00:00Z")<= new Date && 
        new Date()<= new Date(d.promotion?.endDate+ "T23:59:59Z"))? ((d.sale_price - (d.sale_price * d.promotion?.promotionValue/100))*d.qty) : 
        (d.sale_price * d.qty);
        newData.push({ ...d, qty: ++d.qty });
      } else {
        amount = da.sale_price * da.qty;
        newData.push(da);
      }
    });
  }

  return { newData, amount };
};

export { checkItem, checkQrItem, controlTotalQuality };