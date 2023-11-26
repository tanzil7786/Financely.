import React from "react";
import "./style.css";
import { Line, Pie } from "@ant-design/charts";

const Charts = ({ sortedTransaction }) => {
  const data = sortedTransaction.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));
  const spendingData = sortedTransaction.filter((transaction) => {
    if (transaction.type === "expense") {
      return {
        tag: transaction.tag,
        amount: transaction.amount,
      };
    }
  });
  let finalSpending = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {});
  let newSpending = [
    {
      tag: "food",
      amount: 0,
    },
    {
      tag: "education",
      amount: 0,
    },
    {
      tag: "office",
      amount: 0,
    },
    {
      tag: "undefined",
      amount: 0,
    },
  ];
  spendingData.forEach((item) => {
    if (item.tag === "food") {
      newSpending[0] += item.amount;
    } else if (item.tag === "education") {
      newSpending[1] += item.amount;
    } else if (item.tag === "office") {
      newSpending[2] += item.amount;
    } else if (item.tag === "entertaiment") {
      newSpending[3] += item.amount;
    } else {
      newSpending[4] += item.amount;
    }
  });
  // Configuration for Line Chart
  const config = {
    data: data,
    width: 500,
    xField: "date",
    yField: "amount",
    line: {
      style: {
        lineWidth: 2,
        stroke: "#1890ff",
      },
    },
  };

  // Configuration for Pie Chart
  const spendingConfig = {
    data: Object.values(finalSpending),
    width: 500,
    angleField: "amount",
    colorField: "tag",
  };

  return (
    <>
      {/* Container for the charts */}
      <div className="charts-wrapper">
        {/* Section for the Balance Analytics Line chart */}
        <div>
          <h2>Financial Statistics</h2>
          <Line {...config} />
        </div>
        {/* Section for the Spending Analytics Pie chart */}
        <div>
          <h2>Total Spendings</h2>
          <Pie {...spendingConfig} />
        </div>
      </div>
    </>
  );
};

export default Charts;
