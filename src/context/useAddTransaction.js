import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';

export const useAddTransaction =() => {
    
    const { user } = useAuth();
    const addTransaction = async (description, amt, type, uid) => {

    const newTransaction = {
        description,
        amt,
        type,
        createdAt: serverTimestamp(),
        uid
    };

    try {
        const docRef = await addDoc(collection(db, "transactions"), newTransaction);
        return { id: docRef.id, ...newTransaction };
    } catch (error) {
        console.error('Error adding transaction:', error);
        throw error;
    }
};
    return { addTransaction };
};
