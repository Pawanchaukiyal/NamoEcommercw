
import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, onSnapshot, orderBy, deleteDoc, doc, query, QuerySnapshot } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);

    // User State
    const [getAllProduct, setGetAllProduct] = useState([]);

     // get product function
    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    // User State
     const [getAllOrder, setGetAllOrder] = useState([]);
    // create an order state
    const getAllOrderFunction = async () => {
        setLoading(true);

        try {
            const q = query(
                collection(fireDB,"order"),
                // orderby is a method which show your data accord to timewise
                orderBy('time')
            );

            const data = onSnapshot(q,(QuerySnapshot)=>{
                let orderArray = [];
                QuerySnapshot.forEach((doc)=>{
                    orderArray.push({
                        ...doc.data(),id:doc.id
                    })
                    setGetAllOrder(orderArray);
                    setLoading(false);
                })
            })
            return ()=> data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Delete order func
    const orderDelete = async(id)=>{
        setLoading(true);
        try {
            // delete data in fb
            await deleteDoc(doc(fireDB,'order',id))
            toast.success("order deleted successfully")
            getAllOrderFunction();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const [getAllUser,setGetAllUser]=useState([]);
    // get user func
    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "user"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
        getAllUserFunction();
    }, []);
    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            getAllOrderFunction,
            getAllOrder,
            orderDelete,
            getAllUser
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState