import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Cards from "../component/Cards";
import AddExpenseModal from "../component/Modals/addExpense";
import TransactionTable from "../component/TransactionTable";
import Charts from "../component/Charts";
import NoTransactions from "../component/NoTransactions";
import AddIncomeModal from "../component/Modals/addIncome";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Spin } from "antd";

const Dashboard = () => {
  // State variables
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  // Function to show the expense modal
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  // Function to show the income modal
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  // Function to handle the cancel action for the expense modal
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  // Function to handle the cancel action for the income modal
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  // Function to handle the form submission for adding a new transaction
  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  // Function to add a new transaction to Firestore
  const addTransaction = async (newTransaction, many) => {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        newTransaction
      );
      console.log("Documents written with ID: ", docRef.id);
      if (!many) toast.success("Transaction Added!");
      let newArr = [...transaction, newTransaction];
      setTransaction(newArr);
      calculateBalance();
    } catch (error) {
      console.log("Error adding documents: ", error);
      if (!many) toast.error("Couldn't add Transaction");
    }
  };

  // Function to fetch user transactions from Firestore
  const fetchTransaction = async () => {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionArray = [];
      querySnapshot.forEach((doc) => {
        transactionArray.push(doc.data());
      });
      setTransaction(transactionArray);
      console.log("Transaction array", transactionArray);
      toast.success("Transaction fetched!");
    }
    setLoading(false);
  };

  // Effect to fetch transactions when the user is available
  useEffect(() => {
    fetchTransaction();
  }, [user]);

  // Effect to calculate balance whenever the transaction list changes
  useEffect(() => {
    calculateBalance();
  }, [transaction]);

  // Function to calculate income, expense, and total balance
  const calculateBalance = () => {
    let income = 0;
    let expense = 0;
    transaction.forEach((transaction) => {
      if (transaction.type === "income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });
    setIncome(income);
    setExpense(expense);
    setTotalBalance(income - expense);
  };

  // Sorting transactions based on date
  let sortedTransaction = transaction.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  
  return (
    <>
      <Header />
      {loading ? (
        <Spin spinning={loading} className="spinner" tip="loading" size="large">
          {" "}
        </Spin>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          {transaction && transaction.length !== 0 ? (
            <Charts sortedTransaction={sortedTransaction} />
          ) : (
            <NoTransactions />
          )}

          <TransactionTable
            transaction={transaction}
            addTransaction={addTransaction}
            fetchTransaction={fetchTransaction}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
