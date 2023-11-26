import React from "react";
import "./style.css";
import { Card, Row } from "antd";
import Button from "../Button";

// Cards component receives props to display various financial information.
const Cards = ({
  showExpenseModal,
  showIncomeModal,
  income,
  expense,
  totalBalance,
}) => {
  return (
    <div>
      {/* A row of Ant Design cards to display financial information */}
      <Row className="my-row">
        {/* Card showing the current balance */}
        <Card bordered={true} className="my-card" title="Current Balance:">
          <p>₹{totalBalance}</p>
          {/* Button to reset the balance */}
          <Button text="Reset Balance" blue={true} />
        </Card>

        {/* Card showing the total income */}
        <Card bordered={true} className="my-card" title="Total Income:">
          <p>₹{income}</p>
          {/* Button to add income, triggering the showIncomeModal function */}
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>

        {/* Card showing the total expense */}
        <Card bordered={true} className="my-card" title="Total Expense:">
          <p>₹{expense}</p>
          {/* Button to add expense, triggering the showExpenseModal function */}
          <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
