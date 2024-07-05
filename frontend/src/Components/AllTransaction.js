import React from "react";
import { Form, Table, Button } from "react-bootstrap";


const AllTransaction = ({ transactions, totalCredit, totalDebit, balance }) => {
  return (
    <div className="container">
      <h1 className="text-center my-4">Your All Transactions</h1>

      <div className="filter-form mb-4">
        <Form action="/alltransaction" method="post">
          <Form.Group controlId="startDate">
            <Form.Label>From:</Form.Label>
            <Form.Control type="date" name="startDate" />
          </Form.Group>

          <Form.Group controlId="endDate">
            <Form.Label>To:</Form.Label>
            <Form.Control type="date" name="endDate" />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Filter
          </Button>
        </Form>
      </div>

      <div className="Export-data mb-4 text-center">
        <Form action="/exportdata" method="GET">
          <Button type="submit" variant="success">
            Export All Data
          </Button>
        </Form>
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
                <td>{/* format date using moment */}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>
                  <Form
                    action={`/deletetransaction/${transaction._id}`}
                    method="POST"
                  >
                    <Button type="submit" variant="danger">
                      ❌
                    </Button>
                  </Form>
                </td>
                <td>
                  <Form
                    action={`/updatetransaction/${transaction._id}`}
                    method="GET"
                  >
                    <Button type="submit" variant="warning">
                      ✏️
                    </Button>
                  </Form>
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
      </Table>
    </div>
  );
};

export default AllTransaction;
