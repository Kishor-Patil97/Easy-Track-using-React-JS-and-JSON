import React, { useState, useEffect } from "react";
import "./App.css";
import TransactionTable from "./components/TransactionTable";
import { Routes, Route } from "react-router";
import Form from "./components/Form";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/transactions").then((res) => {
      const jsonData = res.data;
      setTransactions(jsonData);
    });
  }, []);

  const handleAddTransaction = (newTransaction) => {
    axios
      .post("http://localhost:5000/transactions", newTransaction)
      .then((res) => {
        setTransactions((prevTransactions) => [...prevTransactions, res.data]);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/transactions/${id}`).then(() => {
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    });
  };

  const handleUpdate = (updatedTransaction) => {
    axios
      .put(
        `http://localhost:5000/transactions/${updatedTransaction.id}`,
        updatedTransaction
      )
      .then(() => {
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction.id === updatedTransaction.id
              ? updatedTransaction
              : transaction
          )
        );
      });
  };

  return (
    <div className="App">
      <h1>EasyTrack</h1>

      <Routes>
        <Route
          path="/"
          element={<Form handleAddTransaction={handleAddTransaction} />}
        />
        <Route
          path="/TransactionTable"
          element={
            <TransactionTable
              data={transactions}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
