
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../utils/firebaseAuthService';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    let navigate = useNavigate()

    let changeEmail = (e) => {
        setEmail(e.target.value)
    }
    let changePassword = (e) => {
        setPassword(e.target.value)
    }

    const loginData = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        try {
            await login(email, password);

            toast.success("Login successful!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
            });

            setTimeout(() => {
                navigate("/studentdata");
            }, 2000);

        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                toast.error("Account does not exist. Please register.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            } else if (error.code === 'auth/wrong-password') {
                toast.error("Incorrect password. Please try again.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            } else {
                toast.error("Login failed: " + error.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            }
        } finally {
            setTimeout(() => setIsDisabled(false), 2500);
        }
    };


    return (
        <>
            <div className="bg-login d-flex justify-content-center align-items-center min-vh-100 bg-wrapper position-relative">
                <div className="position-absolute top-0 w-100 mt-4 text-center">
                    <h1 className="text-white fw-bold text-shadow">🎓 Student Management System</h1>
                </div>

                <div className="col-md-6 col-lg-4">
                    <div className="card glass-card-login shadow-lg border-0 rounded-4">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4 fw-semibold text-primary">Login</h3>
                            <form onSubmit={loginData}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Email</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={changeEmail}
                                        className={`form-control rounded-3 ${isDisabled ? "disabled" : ""}`}
                                        disabled={isDisabled}
                                        id="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={changePassword}
                                        className={`form-control rounded-3 ${isDisabled ? "disabled" : ""}`}
                                        disabled={isDisabled}
                                        id="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`btn btn-primary w-100 rounded-pill fw-semibold ${isDisabled ? "disabled" : ""}`}
                                    disabled={isDisabled}
                                >
                                    Login
                                </button>
                                <div className="text-center mt-3">
                                    <small className="text-muted">
                                        Don't have an account?{" "}
                                        <Link to="/register" className="fw-semibold text-decoration-none">Register</Link>
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

export default Login;

