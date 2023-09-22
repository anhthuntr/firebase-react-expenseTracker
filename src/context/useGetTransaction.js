import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from '../firebase';
import { useGetUserInfo } from './useGetUserInfo';
import { useAuth } from "./AuthContext";

export const useGetTransactions = () => {
    const [trans, setTransaction] = useState([]);
    //const [user, setUser] = useState(null);
    const [transactionTotal, setTotal] = useState({
        balance: 0.0,
        income: 0.0,
        expense: 0.0,
      });
    const { user } = useAuth();

    const getTransaction = async () => {

        let unsubscribeSnapshot;
        const q = query(
            collection(db, "transactions"),
            where("uid", "==", user.uid),
            orderBy("createdAt"),
            );
          
        unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const transactionArr = [];
          let totalIncome = 0;
          let totalExpense = 0;
  
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
  
            transactionArr.push({...data, id});
  
            if (data.type === "Expense") {
              totalExpense += Number(data.amt);
            } else if (data.type === "Income") {
              totalIncome += Number(data.amt);
            }
            console.log(totalExpense, totalIncome)
          });
          setTransaction(transactionArr);
  
          let balance = totalIncome - totalExpense
          setTotal({
            balance,
            expense: totalExpense,
            income: totalIncome,
          })
        });
      
        return () => { 
          unsubscribeSnapshot()
        };
      };


      useEffect(() => {
        if (user) {
          getTransaction();
        }
      }, []);

    return { trans, transactionTotal };
};
