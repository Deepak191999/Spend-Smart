import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import moment from "moment";
import './AllTransaction.css'; // Import CSS file
import MyNavbar from "../MyNavbar/MyNavbar";
import { useNavigate } from "react-router-dom";


const AllTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [balance, setBalance] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [editTransactionId, setEditTransactionId] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({
    type: '',
    category: '',
    description: '',
    amount: 0
  });
const navigate = useNavigate();

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:4444/allTransaction', { withCredentials: true });
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

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4444/allTransaction', { startDate, endDate }, { withCredentials: true });
      const { transactions, totalCredit, totalDebit, balance } = response.data;
      setTransactions(transactions);
      setTotalCredit(totalCredit);
      setTotalDebit(totalDebit);
      setBalance(balance);
    } catch (error) {
      setError('Error filtering transactions');
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:4444/exportdata', { withCredentials: true, responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'user_transactions.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError('Error exporting data');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4444/deletetransaction/${id}`, { withCredentials: true });
      const { transactions, totalCredit, totalDebit, balance } = response.data;
      setTransactions(transactions);
      setTotalCredit(totalCredit);
      setTotalDebit(totalDebit);
      setBalance(balance);
    } catch (error) {
      setError('Error deleting transaction');
    }
  };

  // const handleEdit = (transaction) => {
  //   setEditTransactionId(transaction._id);
  //   setEditedTransaction({
  //     type: transaction.type,
  //     category: transaction.category,
  //     description: transaction.description,
  //     amount: transaction.amount
  //   });
  // };

  const handleEdit = (transactionId) => {
    navigate(`/updatetransaction/${transactionId}`);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4444/updatetransaction/${editTransactionId}`, editedTransaction, { withCredentials: true });
      const { transactions, totalCredit, totalDebit, balance } = response.data;
      setTransactions(transactions);
      setTotalCredit(totalCredit);
      setTotalDebit(totalDebit);
      setBalance(balance);
      setEditTransactionId(null);
    } catch (error) {
      setError('Error updating transaction');
    }
  };

  return (
    <>
      <MyNavbar />
      <div className="container">
        <h1 className="text-center my-4">Your All Transactions</h1>
        {error && <p className="text-danger text-center">{error}</p>}

        <div className="filter-form mb-4">
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
                  {editTransactionId === transaction._id ? (
                    <>
                      <td>
                        <Form.Control 
                          as="select" 
                          name="type" 
                          value={editedTransaction.type} 
                          onChange={handleUpdateChange}
                        >
                          <option value="Credit">Credit</option>
                          <option value="Debit">Debit</option>
                        </Form.Control>
                      </td>
                      <td>
                        <Form.Control 
                          type="text" 
                          name="category" 
                          value={editedTransaction.category} 
                          onChange={handleUpdateChange}
                        />
                      </td>
                      <td>
                        <Form.Control 
                          type="text" 
                          name="description" 
                          value={editedTransaction.description} 
                          onChange={handleUpdateChange}
                        />
                      </td>
                      <td>
                        <Form.Control 
                          type="number" 
                          name="amount" 
                          value={editedTransaction.amount} 
                          onChange={handleUpdateChange}
                        />
                      </td>
                      <td>
                        <Button onClick={handleUpdateSubmit} variant="success">
                          ✅
                        </Button>
                      </td>
                      <td>
                        <Button onClick={() => setEditTransactionId(null)} variant="secondary">
                          ❌
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{transaction.type}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                      <td>
                        <Button onClick={() => handleDelete(transaction._id)} variant="danger">
                          ❌
                        </Button>
                      </td>
                      <td>
                        <Button onClick={() =>  handleEdit(transaction._id)} variant="warning">
                          ✏️
                        </Button>
                      </td>
                    </>
                  )}
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
        </Table>
      </div>
    </>
  );
};

export default AllTransaction;
