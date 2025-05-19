
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudent() {
    const [name, setName] = useState("")
    const [regNo, setRegNo] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [percentage, setPercentage] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)

    const navigate = useNavigate()

    const changeName = (e) => {
        setName(e.target.value)
    }
    const changeRegNo = (e) => {
        setRegNo(e.target.value)
    }
    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    const changeMobileNo = (e) => {
        setMobileNo(e.target.value)
    }
    const changePercentage = (e) => {
        setPercentage(e.target.value)
    }
    const changeCity = (e) => {
        setCity(e.target.value)
    }
    const changeState = (e) => {
        setState(e.target.value)
    }

    function addStudent(e) {
        e.preventDefault()
        let studentdata = { name, regNo, email, mobileNo, percentage, city, state }
        fetch("http://localhost:3001/students", {
            method: "POST",
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(studentdata)
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                toast.success("Student data added successfully!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                })
                setIsDisabled(true)
                setTimeout(() => {
                    navigate('/studentdata');
                }, 2000)
            }
            else {
                toast.error("Failed to add student.", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                })
            }
        }).catch((err) => {
            console.error("Error insert student data:", err);
            toast.error("Failed to add student.", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
            })
        })
    }
    return (
        <>
            <div className="bg-addstudent d-flex justify-content-center align-items-center min-vh-100">
                <div className="container col-md-6 col-lg-6">
                    <div className="card shadow-lg glass-card-addstudent">
                        <div className="card-header bg-primary text-white">
                            <h4 className="text-center">Add Student</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={addStudent}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={changeName}
                                        className="form-control"
                                        disabled={isDisabled}
                                        placeholder="Enter Name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Register Number</label>
                                    <input
                                        type="text"
                                        value={regNo}
                                        onChange={changeRegNo}
                                        className="form-control"
                                        disabled={isDisabled}
                                        placeholder="Enter Register Number"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={changeEmail}
                                        className="form-control"
                                        disabled={isDisabled}
                                        placeholder="Enter Email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mobile Number</label>
                                    <input
                                        type="text"
                                        value={mobileNo}
                                        onChange={changeMobileNo}
                                        className="form-control"
                                        disabled={isDisabled}
                                        placeholder="Enter Mobile Number"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Percentage</label>
                                    <input
                                        type="number"
                                        value={percentage}
                                        onChange={changePercentage}
                                        className="form-control"
                                        disabled={isDisabled}
                                        placeholder="Enter Marks %"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={changeCity}
                                        className="form-control"
                                        disabled={isDisabled}
                                        placeholder="Enter City"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">State</label>
                                    <input
                                        type="text"
                                        value={state}
                                        onChange={changeState}
                                        className="form-control"
                                        disabled={isDisabled}
                                        placeholder="Enter State"
                                        required
                                    />
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-success px-4 me-3"
                                        disabled={isDisabled}
                                    >
                                        Submit
                                    </button>
                                    <Link to="/studentdata">
                                        <button className="btn btn-secondary px-4">Back</button>
                                    </Link>
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

export default AddStudent;