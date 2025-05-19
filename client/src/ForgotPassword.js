import { Link } from 'react-router-dom'
import { update } from './utils/authService'
import { useState } from 'react'

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-lg-4">
                <div className="card shadow-lg">
                    <div className="card-body">
                        <h4 className="card-title text-center mb-4">Forgot Password</h4>
                        <form onSubmit={(email) => update(email)}>
                            <div className="mb-3">
                                <label className="form-label">Enter your registered email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">New Password</label>
                                <input type="password" value={pass1} onChange={(e) => setPass1(e.target.value)} className="form-control" id="pass1" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" value={pass2} onChange={(e) => setPass2(e.target.value)} className="form-control" id="pass2" required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                            <div className="text-center mt-3">
                                <small><Link to="/">Back to Login</Link></small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;