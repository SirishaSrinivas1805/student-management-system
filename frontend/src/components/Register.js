import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from "../utils/firebaseAuthService";


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [isDisabled, setIsDisabled] = useState(false)
    const navigate = useNavigate();


    let changeName = (e) => {
        setName(e.target.value)
    }
    let changeEmail = (e) => {
        setEmail(e.target.value)
    }
    let changePass1 = (e) => {
        setPassword(e.target.value)
    }
    let changePass2 = (e) => {
        setPassword1(e.target.value)
    }


    const addUser = async (e) => {
        e.preventDefault();

        if (password !== password1) {
            toast.warning("Passwords do not match.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
            });
            return;
        }

        try {
            const res = await register(email, password);
            const user = res.user;

            toast.success(`Registration successful for user ${user.displayName || name}.`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
            });

            setIsDisabled(true);

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            setIsDisabled(true);
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email already exists. Try logging in.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
                setTimeout(() => setIsDisabled(false),2500);
            } else {
                setIsDisabled(true);
                toast.error("Registration failed: " + error.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
                setTimeout(() => setIsDisabled(false),2500);
            }
        }
    };

    return (
        <>
            <div className="bg-login d-flex justify-content-center align-items-center min-vh-100 bg-wrapper position-relative">
                <div className="col-md-6 col-lg-4">
                    <div className="card glass-card-login shadow-lg border-0 rounded-4">
                        <div className="card-body p-4">
                            <h3 className="text-center text-primary mb-4 fw-bold">Register</h3>
                            <form onSubmit={addUser}>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label fw-semibold">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={changeName}
                                        className={`form-control rounded-3 ${isDisabled ? 'disabled' : ''}`}
                                        disabled={isDisabled}
                                        id="fullName"
                                        required
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={changeEmail}
                                        className={`form-control rounded-3 ${isDisabled ? 'disabled' : ''}`}
                                        disabled={isDisabled}
                                        id="email"
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={changePass1}
                                        className={`form-control rounded-3 ${isDisabled ? 'disabled' : ''}`}
                                        disabled={isDisabled}
                                        id="password"
                                        required
                                        placeholder="Enter password"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={password1}
                                        onChange={changePass2}
                                        className={`form-control rounded-3 ${isDisabled ? 'disabled' : ''}`}
                                        disabled={isDisabled}
                                        id="confirmPassword"
                                        required
                                        placeholder="Re-enter password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`btn btn-primary w-100 fw-semibold rounded-pill ${isDisabled ? 'disabled' : ''}`}
                                    disabled={isDisabled}
                                >
                                    Create Account
                                </button>
                                <div className="text-center mt-3">
                                    <small>
                                        Already have an account? <Link to="/" className="text-decoration-none fw-semibold">Login</Link>
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register;


