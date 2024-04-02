import React, { useState, useEffect } from 'react'
import { icons } from '../../constant'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend, ReferenceLine, CartesianGrid } from 'recharts';

import {
  useGetExpenseDataMutation,
  useGetItemMutation,
  useGetOrdersMutation,
  useGetPurchasesMutation,
  useGetRentalDataMutation,
} from "../../service/Api";




// Add a new function to group by year and calculate
function groupByYearAndCalculate(expense, rental, sale) {
  // Create an object to store the results
  const resultObject = {};

  // Sum sale and rental totals for the same year
  for (const saleItem of sale) {
    const year = saleItem.year;

    if (resultObject[year]) {
      resultObject[year].value += saleItem.value;
    } else {
      resultObject[year] = {
        name: year,
        value: saleItem.value,
      };
    }
  }

  for (const rentalItem of rental) {
    const year = rentalItem.year;

    if (resultObject[year]) {
      resultObject[year].value += rentalItem.value;
    } else {
      resultObject[year] = {
        name: year,
        value: rentalItem.value,
      };
    }
  }

  // Reduce expense total from result's total for the same year
  for (const expenseItem of expense) {
    const year = expenseItem.year;

    if (resultObject[year]) {
      resultObject[year].value -= expenseItem.value;
    } else {
      resultObject[year] = {
        name: year,
        value: -expenseItem.value, // negate expense total
      };
    }
  }

  // Convert the resultObject values to an array
  const resultArray = Object.values(resultObject);

  return resultArray;
}



function groupByYearAndSumExpenses(expenses) {
  if (!expenses) {
    return []; // or handle the case differently based on your needs
  }
  const groupedExpenses = expenses.reduce((accumulator, expense) => {
    const createdAtDate = new Date(expense.createdAt);
    const year = createdAtDate.getFullYear();

    if (accumulator[year]) {
      accumulator[year].value += expense.expenseAmount;
    } else {
      accumulator[year] = {
        value: expense.expenseAmount,
        year: year,
      };
    }

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedExpenses);

  return resultArray;
}

function groupByYearAndSumRental(rentals) {
  const groupedRentals = rentals?.reduce((accumulator, rental) => {
    const createdAtDate = new Date(rental.createdAt);
    const year = createdAtDate.getFullYear();

    if (accumulator[year]) {
      accumulator[year].value += rental.paidAmount;
    } else {
      accumulator[year] = {
        value: rental.paidAmount,
        year: year,
      };
    }

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedRentals);


  return resultArray;
}
function groupByYearAndSumSale(sales) {
  const groupedSales = sales?.reduce((accumulator, sale) => {
    const createdAtDate = new Date(sale.createdAt);
    const year = createdAtDate.getFullYear();

    // Initialize total if not present for the year
    if (!accumulator[year]) {
      accumulator[year] = {
        value: 0,
        year: year,
      };
    }

    // Calculate and add the sum of (price - purchase) from order histories
    sale.order_histories.forEach(history => {
      const profit = history.price - history.Purchase;
      accumulator[year].value += profit;
    });

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedSales);

  return resultArray;
}
function groupByYearAndSumPurchase(purchases) {
  const groupedPurchases = purchases?.reduce((accumulator, purchase) => {
    const createdAtDate = new Date(purchase.createdAt);
    const year = createdAtDate.getFullYear();

    if (accumulator[year]) {
      accumulator[year].value += purchase.totalAmount;
    } else {
      accumulator[year] = {
        value: purchase.totalAmount,
        year: year,
      };
    }

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedPurchases);

  return resultArray;
}

// Caculate Monthly Data
function groupByMonthAndCaculate(expenseData, rentalData, saleData) {


  // Create an object to store the results
  let result = {};

  // Function to update the result object
  const updateResult = (data, isRental) => {
    data.forEach(item => {
      if (result[item.month]) {
        result[item.month].value += item.value;
      } else {
        result[item.month] = {
          value: item.value,
          name: item.month
        };
      }
    });
  };

  // Update result for rentalData and saleData
  updateResult(rentalData, true);
  updateResult(saleData, false);

  // Reduce values for expenseData
  expenseData.forEach(expense => {
    if (result[expense.month]) {
      result[expense.month].value -= expense.value;
    } else {
      result[expense.month] = {
        value: -expense.value,
        name: expense.month
      };
    }
  });

  // Convert the result object to an array
  const finalResult = Object.values(result);
  const sortedResult = finalResult.sort((a, b) => {
    const monthsOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthsOrder.indexOf(a.name) - monthsOrder.indexOf(b.name);
  });

  // console.log(sortedResult);

  return sortedResult;


}

function groupByMonthAndSumExpenses(expenses) {
  if (!expenses) {
    return []; // or handle the case differently based on your needs
  }
  const groupedExpenses = expenses?.reduce((accumulator, expense) => {
    const createdAtDate = new Date(expense.createdAt);
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(createdAtDate);

    if (accumulator[monthName]) {
      accumulator[monthName].value += expense.expenseAmount;
    } else {
      accumulator[monthName] = {
        value: expense.expenseAmount,
        month: monthName,
      };
    }

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedExpenses);

  return resultArray;
}

function groupByMonthAndSumRental(rentals) {
  const groupedRentals = rentals?.reduce((accumulator, rental) => {
    const createdAtDate = new Date(rental.createdAt);
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(createdAtDate);

    if (accumulator[monthName]) {
      accumulator[monthName].value += rental.paidAmount;
    } else {
      accumulator[monthName] = {
        value: rental.paidAmount,
        month: monthName,
      };
    }

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedRentals);

  return resultArray;
}
function groupByMonthAndSumSale(sales) {
  const groupedSales = sales?.reduce((accumulator, sale) => {
    const createdAtDate = new Date(sale.createdAt);
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(createdAtDate);

    if (!accumulator[monthName]) {
      accumulator[monthName] = {
        value: 0,
        month: monthName,
      };
    }

    // Summing the difference between "price" and "purchase" from order histories
    sale.order_histories.forEach((history) => {
      accumulator[monthName].value += (history.price - history.Purchase) * history.quantity;
    });

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedSales);
  resultArray.sort((a, b) => {
    const monthOrder = {
      January: 1,
      February: 2,
      // Add more months as needed
    };
    return monthOrder[a.month] - monthOrder[b.month];
  });


  return resultArray;
}
function groupByMonthAndSumPurchase(purchases) {
  const groupedPurchases = purchases?.reduce((accumulator, purchase) => {
    const createdAtDate = new Date(purchase.createdAt);
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(createdAtDate);

    if (accumulator[monthName]) {
      accumulator[monthName].value += purchase.totalAmount;
    } else {
      accumulator[monthName] = {
        value: purchase.totalAmount,
        month: monthName,
      };
    }

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedPurchases);

  return resultArray;
}
//Weekly Data Caculation
function groupByWeekAndCalculate(expenses, rentals, sales) {
  // Create an array to store the results
  const resultArray = [];

  // Group expenses and rentals by week
  const groupedExpenses = groupByWeek(expenses);
  const groupedRentals = groupByWeek(rentals);
  const groupedSales = groupByWeek(sales);

  // Combine weeks from all datasets
  const allWeeks = Array.from(
    new Set([...Object.keys(groupedExpenses), ...Object.keys(groupedRentals), ...Object.keys(groupedSales)])
  ).sort((a, b) => a - b);

  allWeeks.forEach((week) => {
    const expenseTotal = (groupedExpenses[week] || []).reduce((sum, item) => sum + item.value, 0);
    const saleTotal = (groupedSales[week] || []).reduce((sum, item) => sum + item.value, 0);
    const rentalTotal = (groupedRentals[week] || []).reduce((sum, item) => sum + item.value, 0);

    // Calculate the difference and push the result to the resultArray
    resultArray.push({
      name: `Week ${week}`,
      value: (saleTotal + rentalTotal) - expenseTotal,
    });
  });

  // Return the resultArray
  return resultArray;
}


//  function to group data by week based on the day of the month
function groupByWeek(data) {
  return data.reduce((accumulator, item) => {
    const dayOfMonth = parseInt(item.month.split('/')[1], 10);
    const weekNumber = Math.ceil(dayOfMonth / 7);

    if (!accumulator[weekNumber]) {
      accumulator[weekNumber] = [];
    }

    accumulator[weekNumber].push(item);
    return accumulator;
  }, {});
}


function groupByWeekAndSumExpenses(expenses) {
  if (!expenses) {
    return []; // or handle the case differently based on your needs
  }
  const groupedExpenses = expenses.reduce((accumulator, expense) => {
    const createdAtDate = new Date(expense.createdAt);
    const monthName = new Intl.DateTimeFormat('en-US', { week: 'long' }).format(createdAtDate);

    if (accumulator[monthName]) {
      accumulator[monthName].value += expense.expenseAmount;
    } else {
      accumulator[monthName] = {
        value: expense.expenseAmount,
        month: monthName,
      };
    }

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedExpenses);

  return resultArray;
}

function groupByWeekAndSumRental(rentals) {
  const groupedRentals = rentals?.reduce((accumulator, rental) => {
    const createdAtDate = new Date(rental.createdAt);
    const monthName = new Intl.DateTimeFormat('en-US', { week: 'long' }).format(createdAtDate);

    if (accumulator[monthName]) {
      accumulator[monthName].value += rental.paidAmount;
    } else {
      accumulator[monthName] = {
        value: rental.paidAmount,
        month: monthName,
      };
    }

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedRentals);

  return resultArray;
}
function groupByWeekAndSumSale(sales) {
  const groupedSales = sales?.reduce((accumulator, sale) => {
    const createdAtDate = new Date(sale.createdAt);
    const monthName = new Intl.DateTimeFormat('en-US', { week: 'long' }).format(createdAtDate);

    if (!accumulator[monthName]) {
      accumulator[monthName] = {
        value: 0,
        month: monthName,
      };
    }

    // Summing the difference between "price" and "purchase" from order histories
    sale.order_histories.forEach((history) => {
      accumulator[monthName].value += (history.price - history.Purchase) * history.quantity;
    });

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedSales);

  resultArray.sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);

    return dateA - dateB;
  });


  return resultArray;
}
function groupByWeekAndSumPurchase(puchases) {
  const groupedPuchases = puchases?.reduce((accumulator, purchase) => {
    const createdAtDate = new Date(purchase.createdAt);
    const monthName = new Intl.DateTimeFormat('en-US', { week: 'long' }).format(createdAtDate);

    if (accumulator[monthName]) {
      accumulator[monthName].value += purchase.totalAmount;
    } else {
      accumulator[monthName] = {
        value: purchase.totalAmount,
        month: monthName,
      };
    }

    return accumulator;
  }, {});

  const resultArray = Object.values(groupedPuchases);

  return resultArray;
}

const Dashboard = () => {

  const [view, setView] = useState('weekly');

  const [purchase, setPurchase] = useState();
  const [rental, setRental] = useState([]);
  const [expense, setExpense] = useState();
  const [sale, setSale] = useState()
  const [item, setItem] = useState()
  const [filterItem, setFilterItem] = useState()
  const [getPurchase] = useGetPurchasesMutation();
  const [getExpense] = useGetExpenseDataMutation();
  const [getRental] = useGetRentalDataMutation();
  const [getSale] = useGetOrdersMutation();
  const [getItem] = useGetItemMutation()
  console.log(item, " item")
  useEffect(() => {
    fetchData();
  }, [view]);

  useEffect(() => {
    const filterData = item?.reduce((result, product) => {
      const existingData = result?.find(r => r.product_name === product.product_name);
      if (existingData) {
        existingData.quantity += product.quantity
      } else {
        result.push({ ...product })
      }
      return result;

    }, []);
    setFilterItem(filterData)

  }, [item])
  //  console.log(filterItem)
  const sortedProducts = filterItem?.sort((a, b) => b.quantity - a.quantity);

  // Get the top ten products
  const topTenProducts = sortedProducts?.slice(0, 10);

  const fetchData = async () => {
    const currentDate = new Date();
    let startDate, endDate;

    if (view === 'weekly') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    } else if (view === 'monthly') {
      startDate = new Date(currentDate.getFullYear(), 0, 1);
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    } else if (view === 'yearly') {
      startDate = new Date();
    }

    try {
      const purchaseData = await getPurchase({ start: startDate, end: endDate });
      const expenseData = await getExpense({ start: startDate, end: endDate });
      const rentalData = await getRental({ start: startDate, end: endDate });
      const saleData = await getSale({ start: startDate, end: endDate });
      const itemData = await getItem({ start: startDate, end: endDate });

      setPurchase(purchaseData.data);
      setExpense(expenseData.data);
      setRental(rentalData.data);
      setSale(saleData.data);
      setItem(itemData.data)
    } catch (error) {
      console.error(error);
    }
  };
  console.log(rental)

  let totalExpense = [];
  let totalRental = [];
  let totalSale = [];
  let totalPurchase = [];

  if (view === 'weekly') {
    totalExpense = expense ? groupByWeekAndSumExpenses(expense) : [];
    totalRental = rental ? groupByWeekAndSumRental(rental) : [];
    totalSale = sale ? groupByWeekAndSumSale(sale) : [];
    totalPurchase = purchase ? groupByWeekAndSumPurchase(purchase) : [];
  } else if (view === 'monthly') {
    totalExpense = expense ? groupByMonthAndSumExpenses(expense) : [];
    totalRental = rental ? groupByMonthAndSumRental(rental) : [];
    totalSale = sale ? groupByMonthAndSumSale(sale) : [];
    totalPurchase = purchase ? groupByMonthAndSumPurchase(purchase) : [];
  } else if (view === 'yearly') {
    totalExpense = expense ? groupByYearAndSumExpenses(expense) : [];
    totalRental = rental ? groupByYearAndSumRental(rental) : [];
    totalSale = sale ? groupByYearAndSumSale(sale) : [];
    totalPurchase = purchase ? groupByYearAndSumPurchase(purchase) : [];
  }



  const data =
    view === 'weekly'
      ? groupByWeekAndCalculate(totalExpense, totalRental, totalSale)
      : view === 'monthly'
        ? groupByMonthAndCaculate(totalExpense, totalRental, totalSale)
        : groupByYearAndCalculate(totalExpense, totalRental, totalSale);


  console.log(totalExpense, 'expense')
  console.log(totalPurchase, 'purchase ')
  console.log(totalSale, 'sale')
  console.log(totalRental, 'rental')
  console.log(data)

  return (
    <div className='w-full p-7'>

      <div className="grid grid-cols-4">
        <div className="bg-orange-400 w-[265px] h-[165px] rounded p-5">
          <div className="flex items-center justify-between ">
            <img src={icons.product} alt="" className='w-7 h-7 rounded-full' />
            <div className="">

              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className="outline-none rounded  p-2 uppercase"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <h1 className='text-md text-white font-medium font-poppins my-5'>Sales</h1>
          <h2 className='text-xl font-bold font-poppins'>{totalSale[totalSale.length - 1]?.value.toLocaleString("en-US")}Ks</h2>
        </div>
        <div className="bg-green-400 w-[265px] h-[165px] rounded p-5">
          <div className="">
            <div className="flex items-center justify-between">
              <img src={icons.product} alt="" className='w-7 h-7 rounded-full bg-white' />
              <div className="">

                <select
                  value={view}
                  onChange={(e) => setView(e.target.value)}
                  className="outline-none rounded  p-2 uppercase"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>
          <h1 className='text-md text-white font-medium font-poppins my-5'>Rent</h1>
          <h2 className='text-xl font-bold font-poppins'>{totalRental[totalRental.length - 1]?.value.toLocaleString("en-US")}Ks</h2>
        </div>
        <div className="bg-red-400 w-[265px] h-[165px] rounded p-5">
          <div className="">
            <div className="flex items-center justify-between">
              <img src={icons.product} alt="" className='w-7 h-7 rounded-full bg-white' />
              <div className="">

                <select
                  value={view}
                  onChange={(e) => setView(e.target.value)}
                  className="outline-none rounded  p-2 uppercase"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

          </div>
          <h1 className='text-md text-white font-medium font-poppins my-5'>Expense</h1>
          <h2 className='text-xl font-bold font-poppins'>{totalExpense[totalExpense.length - 1]?.value.toLocaleString("en-US")}Ks</h2>
        </div>
        <div className="bg-cyan-400 w-[265px] h-[165px] rounded p-5">
          <div className="">
            <div className="flex items-center justify-between">
              <img src={icons.product} alt="" className='w-7 h-7 rounded-full bg-white' />
              <div className="">

                <select
                  value={view}
                  onChange={(e) => setView(e.target.value)}
                  className="outline-none rounded  p-2 uppercase"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>
          <h1 className='text-md text-white font-medium font-poppins my-5'>Purchase</h1>
          <h2 className='text-xl font-bold font-poppins'>  {totalPurchase[totalPurchase.length - 1]?.value.toLocaleString("en-US")}Ks</h2>
        </div>
      </div>
      <div className="flex mt-8">
        <div className="w-[324px]  mr-5">
          <h1 className='text-md font-bold font-poppins capitalize'>Top Product Lists</h1>
          <div className="max-h-[400px] overflow-y-auto w-full ">
            {topTenProducts?.map(fItem => <div key={fItem.id} className='flex p-2 bg-white border shadow-md rounded justify-between my-2'>
              <p>{fItem.product_name}</p>
              <p>{fItem.quantity}</p>
            </div>)}
          </div>
        </div>
        <div className="">
          <h1 className='text-md font-bold font-poppins capitalize'>Profit And Loss</h1>
          <div className='bg-white shadow-md rounded border p-4 mt-3'>

            <div className="flex justify-between">

              <div className="flex my-3">
                <div className='flex items-center'>
                  <p>Profit</p>
                  <p className='w-5 h-5 rounded-full bg-green-400 ml-2'></p>
                </div>
                <div className='flex items-center ml-5'>
                  <p>Loss</p>
                  <p className='w-5 h-5 rounded-full bg-red-400 ml-2'></p>
                </div>
              </div>
              <div className="my-5 flex justify-between">
                <div className="">

                  <select
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                    className="outline-none  p-2 uppercase"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
            </div>

            <BarChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis domain={[0, 'auto']} />
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <ReferenceLine y={0} stroke="black" />
              <Tooltip

              />
              {/* <Legend /> */}
              {/* Customize the fill based on the value */}
              <Bar dataKey="value" barSize={30}>
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.value < 0 ? 'red' : 'green'}
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard




