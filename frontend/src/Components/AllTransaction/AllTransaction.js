import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Table, Button } from "react-bootstrap";
import moment from "moment";
import './AllTransaction.css'; // Import CSS file

const AllTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [balance, setBalance] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/allTransactions', { withCredentials: true });
        const { transactions, totalCredit, totalDebit, balance } = response.data;
        setTransactions(transactions);
        setTotalCredit(totalCredit);
        setTotalDebit(totalDebit);
        setBalance(balance);
      } catch (error) {
        setError('Error fetching transactions');
      }
    };

    fetchTransactions();
  }, []);

  // Handle date filter
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/filterTransactions', { startDate, endDate }, { withCredentials: true });
      const { transactions, totalCredit, totalDebit, balance } = response.data;
      setTransactions(transactions);
      setTotalCredit(totalCredit);
      setTotalDebit(totalDebit);
      setBalance(balance);
    } catch (error) {
      setError('Error filtering transactions');
    }
  };

  // Handle data export
  const handleExport = async () => {
    try {
      const response = await axios.get('/exportdata', { withCredentials: true });
      // handle file download or other export logic
    } catch (error) {
      setError('Error exporting data');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Your All Transactions</h1>

      {/* <div className="filter-form mb-4">
        <Form onSubmit={handleFilterSubmit}>
          <Form.Group controlId="startDate">
            <Form.Label>From:</Form.Label>
            <Form.Control 
              type="date" 
              name="startDate" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </Form.Group>

          <Form.Group controlId="endDate">
            <Form.Label>To:</Form.Label>
            <Form.Control 
              type="date" 
              name="endDate" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Filter
          </Button>
        </Form>
      </div>

      <div className="Export-data mb-4 text-center">
        <Button onClick={handleExport} variant="success">
          Export All Data
        </Button>
      </div>

      <Table striped bordered hover className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{moment(transaction.date).format('YYYY-MM-DD')}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>
                  <Button 
                    onClick={() => handleDelete(transaction._id)} 
                    variant="danger"
                  >
                    ❌
                  </Button>
                </td>
                <td>
                  <Button 
                    onClick={() => handleUpdate(transaction._id)} 
                    variant="warning"
                  >
                    ✏️
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <h1 className="summary text-center my-4">Summary</h1>
      <Table striped bordered hover className="total-table">
        <thead>
          <tr>
            <th>Total Credit</th>
            <th>Total Debit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+{totalCredit}</td>
            <td>-{totalDebit}</td>
            <td>{balance}</td>
          </tr>
        </tbody>
      </Table> */}
    </div>
  );
};

export default AllTransaction;
