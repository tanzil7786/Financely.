import { Radio, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import { parse, unparse } from "papaparse";
import React, { useState } from "react";
import { toast } from "react-toastify";
import searchIcon from "../../assets/search.svg";

const TransactionTable = ({
  transaction,
  addTransaction,
  fetchTransaction,
}) => {
  // State variables for search, type filter, and sort key

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  // Table columns definition

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      editable: true,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      editable: true,
    },
  ];
  // Filtering and sorting transactions based on search, type, and sort key

  let filteredTransaction = transaction.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );
  let sortedTransaction = filteredTransaction.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
  // Function to export transactions to CSV

  const exportCSV = () => {
    let csv = unparse({
      fields: ["name", "amount", "tag", "type", "date"],
      data: transaction,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Function to import transactions from CSV

  const importFromCSV = (event) => {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            console.log("Transaction", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });

      toast.success("All Transaction added");
      fetchTransaction();
      event.target.value = null;
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div style={{ width: "100%", padding: "0rem 2rem" }}>
        {/* Search and filter section */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div className="input-flex">
            <img src={searchIcon} width="16" alt="Search Icon" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Name"
            />
          </div>

          <Select
            className="select-input"
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter"
            allowClear
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>
        {/* Transaction table section */}

        <div className="my-table">
          {/* Table header with sorting options and CSV import/export */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <h2>My Transaction</h2>
            <Radio.Group
              className="input-radio"
              onChange={(e) => setSortKey(e.target.value)}
              value={sortKey}
            >
              <Radio.Button value="">No Sort</Radio.Button>
              <Radio.Button value="date">Sort by Date</Radio.Button>
              <Radio.Button value="amount">Sort by Amount</Radio.Button>
            </Radio.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                width: "400px",
              }}
            >
              <button className="btn" onClick={exportCSV}>
                Export to CSV
              </button>
              <label htmlFor="file-csv" className="btn btn-blue">
                Import from CSV
              </label>
              <input
                id="file-csv"
                type="file"
                accept=".csv"
                required
                onChange={importFromCSV}
                style={{ display: "none" }}
              />
            </div>
          </div>
          {/* Ant Design Table component */}

          <Table
            dataSource={sortedTransaction}
            columns={columns}
            transaction={transaction}
          />
        </div>
      </div>
    </>
  );
};

export default TransactionTable;
