import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import axios from "../../utils/axios"
import { useParams, useNavigate } from 'react-router-dom';
import MyNavbar from '../MyNavbar/MyNavbar';

const UpdateTransaction = () => {
  const { id } = useParams(); // Get the transaction ID from the URL
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Credit');
  const [creditCategory, setCreditCategory] = useState('');
  const [debitCategory, setDebitCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the existing transaction details
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`/updatetransaction/${id}`, { withCredentials: true });
        const { amount, type, category, description, date } = response.data; // Assuming the response has this structure
        setAmount(amount);
        setType(type);
        setDescription(description);
        setDate(date);
        // Set category based on type
        if (type === 'Credit') {
          setCreditCategory(category);
          setDebitCategory('');
        } else {
          setDebitCategory(category);
          setCreditCategory('');
        }
      } catch (error) {
        setMessage('Error fetching transaction data');
      }
    };

    fetchTransaction();
  }, [id]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
    if (event.target.value === 'Credit') {
      setDebitCategory(''); // Clear debitCategory if Credit is selected
    } else {
      setCreditCategory(''); // Clear creditCategory if Debit is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/updatetransaction/${id}`, {
        amount,
        type,
        creditCategory: type === 'Credit' ? creditCategory : '',
        debitCategory: type === 'Debit' ? debitCategory : '',
        description,
        date,
      }, { withCredentials: true });

      setMessage(response.data.message);
      // Navigate back to the transaction list or another page
      navigate('/allTransaction');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('User is not authenticated. Please log in.');
      } else {
        setMessage('An error occurred while updating the transaction.');
      }
    }
  };

  return (
    <>
      <MyNavbar />
      <Container>
        <h1>Update Transaction</h1>
        <Form id="transactionForm" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup controlId="amount">
                <FormLabel>Amount:</FormLabel>
                <FormControl
                  type="number"
                  id="amount"
                  name="amount"
                  required
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup controlId="type">
                <FormLabel>Type:</FormLabel>
                <FormControl
                  as="select"
                  id="type"
                  name="type"
                  value={type}
                  onChange={handleTypeChange}
                  required
                >
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </FormControl>
              </FormGroup>
            </Col>
          </Row>

          {/* Credit Options */}
          {type === 'Credit' && (
            <Row>
              <Col xs={12}>
                <FormGroup controlId="creditCategory">
                  <FormLabel>Category:</FormLabel>
                  <FormControl
                    as="select"
                    id="creditCategory"
                    name="creditCategory"
                    value={creditCategory}
                    onChange={(event) => setCreditCategory(event.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Salary">Salary</option>
                    <option value="Allowance">Allowance</option>
                    <option value="Cash">Petty Cash</option>
                    <option value="Bonus">Bonus</option>
                    <option value="Other">Other</option>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
          )}

          {/* Debit Options */}
          {type === 'Debit' && (
            <Row>
              <Col xs={12}>
                <FormGroup controlId="debitCategory">
                  <FormLabel>Category:</FormLabel>
                  <FormControl
                    as="select"
                    id="debitCategory"
                    name="debitCategory"
                    value={debitCategory}
                    onChange={(event) => setDebitCategory(event.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Life">Social Life</option>
                    <option value="Pets">Pets</option>
                    <option value="Transport">Transport</option>
                    <option value="Culture">Culture</option>
                    <option value="Household">Household</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Gift">Gift</option>
                    <option value="Other">Other</option>
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
          )}

          <FormGroup controlId="description">
            <FormLabel>Description:</FormLabel>
            <FormControl
              type="text"
              id="description"
              name="description"
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormGroup>

          <FormGroup controlId="date">
            <FormLabel>Date:</FormLabel>
            <FormControl
              type="date"
              id="date"
              name="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </FormGroup>

          <Button type="submit" variant="primary">Update</Button>
        </Form>
        {message && <p>{message}</p>}
      </Container>
    </>
  );
};

export default UpdateTransaction;
