import React from "react";
import transactionSvg from "../../assets/transactions.svg";

// NoTransactions component displays a message and image when there are no transactions
const NoTransactions = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
      }}
    >
      {/* Image for no transactions */}
      <img
        src={transactionSvg}
        style={{
          width: "400px",
          margin: "auto",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
        alt="No Transactions"
      />
      {/* Message indicating no transactions */}
      <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
        You have no transactions currently.
      </p>
    </div>
  );
};

export default NoTransactions;
