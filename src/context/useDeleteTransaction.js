import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useState } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { useGetUserInfo } from './useGetUserInfo';

export const useDeleteTransaction = () => {
    const [transactions, setTransaction] = useState([]);
    const deleteTransaction = async (transactionId) => {

        const transactionRef = doc(db, 'transactions', transactionId);
        await deleteDoc(transactionRef);
        setTransaction(transactions.filter(transaction => transaction.id !== transactionId));
    }
    return { deleteTransaction }
};