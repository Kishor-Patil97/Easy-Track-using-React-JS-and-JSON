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
  },[])

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);

  axios.post("http://localhost:5000/transactions", newTransaction);
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
          element={<TransactionTable data={transactions} />}
        />
      </Routes>
    </div>
  );
}

export default App;
