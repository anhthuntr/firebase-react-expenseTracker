import NavBar from './NavBar';
import './DashBoard.css'
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import "firebase/firestore";
import { Box, Button, Grid, CircularProgress, Container, IconButton, Divider, Stack, Typography} from '@mui/material';
import { Form } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddTransaction } from '../context/useAddTransaction';
import { useGetTransactions } from '../context/useGetTransaction';
import { useDeleteTransaction } from '../context/useDeleteTransaction';
import { useAuth } from '../context/AuthContext';


function Dashboard() {
    const { user, loading } = useAuth();
    const [transactions, setTransaction] = useState([]);
    const [description, setDescription] = useState('');
    const [amt, setAmt] = useState('');
    const [type, setType] = useState('');

    const { addTransaction } = useAddTransaction();
    const { deleteTransaction } = useDeleteTransaction();
    const { trans, transactionTotal } = useGetTransactions();
    const { balance, income, expense } = transactionTotal;

    const handleAddTransaction = async() => {
      if (description === '' || amt === '' || type === '') {
        alert('Please fill out all the field');
        console.log(transactions);
        return;
      }
      try {
        const newTransaction = await addTransaction(description, amt, type, user.uid);
        setTransaction([...transactions, newTransaction]);
        // Clear input fields
        setDescription('');
        setAmt('');
        setType('');
      } catch (error) {
        console.log(error);
      }
    };

    const planStyle = {
      backgroundColor: '#d5cedc',
      fontSize: '20px',
      padding: '12px',
      marginTop: '10px',
      marginBottom: '10px',
      marginRight: '50px',
      marginLeft: '60px',
      borderRadius: '5px',
      display: 'inline-block',
      width: '250px',
    };
  
    if (loading && !user) {
        return <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%' }}/>;
    }

    return (
      <>
        <div className='db-container' >
          <NavBar />
            <Container>
              <Stack direction="row" sx={{ paddingTop: "0.5em" }}>
                <Typography variant="h5" sx={{ lineHeight: 2, paddingLeft: "1.0em" }}>
                WELCOME BACK!
                </Typography>
              </Stack>
            </Container>
            <Container>
            <Stack direction="row" sx={{ paddingTop: "0.1em" }}>
              <div style={planStyle}> Balance: 
              {balance >= 0 ? <b> ${balance}</b>: <b> -${balance * -1}</b>}
              </div>
              <div style={planStyle}> Expenses: <b> ${expense}</b>
              </div>
              <div style={planStyle}> Income: <b> ${income}</b>
              </div>
              </Stack>
              <Stack direction="row" sx={{ paddingTop: "1em" , paddingLeft: "3.7em" }} >
              <Form>
            <Form.Group>
              <Form.Control
                id="description"
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value = {description}
              />
            </Form.Group>
            </Form>
            <Form>
            <Form.Group>
              <Form.Control
                id="amount"
                type="text"
                placeholder="Amount"
                onChange={(e) => setAmt(e.target.value)}
                value = {amt}
              />
            </Form.Group>
            </Form>
            <Form>
            <Form.Group>
            <Form.Select
              id="type"
              onChange={(e) => setType(e.target.value)} 
              value={type}
              >
              <option>Select type</option>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </Form.Select>
            </Form.Group>
            </Form>
            <IconButton aria-label="edit" onClick={handleAddTransaction} color="black">
            <AddIcon />
          </IconButton>
              </Stack>
              <h3>
              <Stack direction="row" sx={{ paddingTop: "0.1em" , paddingLeft: "2.3em" }} >
                Transaction
              </Stack>
              </h3>
              <div className='transactions'>
              <Stack direction="row" sx={{ paddingTop: "0.1em" }}>
                <div className="text-container">
                  <div className="text">Description</div>
                  <div className="text">Amount</div>
                  <div className="text">Type</div>
                </div>
              </Stack>
              <Divider variant="middle" />
              <div>
          {trans.map((transaction) => {
            const { description, amt, type } =
              transaction;
            return (
              <div key={transaction.id}>
            <Box sx={{ width: '100%' }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ paddingTop: "0.5em", paddingLeft: "0.5em" }}>
                <Grid item xs={4}>
                  {description}
                </Grid>
                <Grid item xs={3}>
                  ${transaction.amt}
                </Grid>
                <Grid item xs={2.5} >
                <label
                    style={{
                      color: type === "Expense" ? "red" : "green",
                    }}
                  >
                    {type}
                  </label>
                </Grid>
                <Grid item xs={2}>
                <Button 
                  onClick = {() => deleteTransaction(transaction.id)}
                  sx={{ position: "relative", top: -5}} 
                  size="large" startIcon={<DeleteIcon />}>
                </Button>
                </Grid>
              </Grid>
            </Box>
              <Divider variant="middle" />
              </div>
            );
          })}
          </div>
        </div>
            </Container>  
        </div>
        </>
    );
}

export default Dashboard;
