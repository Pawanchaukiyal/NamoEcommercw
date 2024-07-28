
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();
        // user signup state
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });
       // user signup function
    const userSignupFunction = async (e) => {
        e.preventDefault(); // Prevent default form submission
         // apply validation --   
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            return toast.error("All fields are required!");
        }

        setLoading(true);
        try {
            const emailQuery = query(collection(fireDB, "user"), where("email", "==", userSignup.email));
            const nameQuery = query(collection(fireDB, "user"), where("name", "==", userSignup.name));

            const [emailSnapshot, nameSnapshot] = await Promise.all([getDocs(emailQuery), getDocs(nameQuery)]);
 
            // we dont user name query due to some problem -- check it on future
            if (!emailSnapshot.empty) {
                setLoading(false);
                return toast.error("Email already use");
            }

            // if (!nameSnapshot.empty) {
            //     setLoading(false);
            //     return toast.error("Name is already in use!");
            // }

              // create user with email and password using firewall methods
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);
              // create user object for firebase like userSchema in mongodb
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric"
                    }
                )
            };
              // create user Refrence which store our user in firebase -- collection come from firebase and their paremeter FireDb come from uyour config.file and user collection
            const userRefrence = collection(fireDB, "user");
             // Add User Detail-- two parameter , user reference, and object which you store
            await addDoc(userRefrence, user);
              //  setUserSignup once it stored in firebase and empty it
            setUserSignup({
                name: "",
                email: "",
                password: ""
            });
            toast.success("User SignUp Successfully");
              // when user create, sucessfully
            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            setLoading(false);
            return toast.error(error)
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {/* condition when loading is true */}
            {loading && <Loader />}
            {/* when false */}
            {!loading && (
                <div className="login_Form bg-blue-50 px-1 lg:px-8 py-6 border border-blue-100 rounded-xl shadow-md">
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-blue-500'>
                            Signup
                        </h2>
                    </div>
                    <form onSubmit={userSignupFunction}>
                        {/* Input field 1 for name */}
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder='Full Name'
                                className='bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-300'
                                value={userSignup.name}
                                onChange={(e) => {
                                    setUserSignup({
                                        ...userSignup,
                                        name: e.target.value
                                    });
                                }}
                                autoComplete="name"
                            />
                        </div>
                        {/* Input field 2 for email */}
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder='Email Address'
                                className='bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200'
                                value={userSignup.email}
                                onChange={(e) => {
                                    setUserSignup({
                                        ...userSignup,
                                        email: e.target.value
                                    });
                                }}
                                autoComplete="email"
                            />
                        </div>
                        {/* Input field 3 for password */}
                        <div className="mb-5">
                            <input
                                type="password"
                                placeholder='Password'
                                value={userSignup.password}
                                onChange={(e) => {
                                    setUserSignup({
                                        ...userSignup,
                                        password: e.target.value
                                    });
                                }}
                                className='bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200'
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="mb-5">
                            <button
                                type='submit'
                                className='bg-blue-500 hover:bg-blue-600 w-full text-white text-center py-2 font-bold rounded-md'
                                // instead of it we use onsumbit fun to signup
                                // onClick={userSignupFunction} 
                            >
                                Signup
                            </button>
                        </div>
                    </form>
                    <div>
                        <h2 className='text-black'>Have an account? 
                            <Link className='text-blue-500 font-bold' to={'/login'}>Login</Link>
                        </h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;


