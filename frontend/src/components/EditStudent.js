import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function EditStudent() {
    const [name, setName] = useState("")
    const [regNo, setRegNo] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [percentage, setPercentage] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    const updateName = (e) => {
        setName(e.target.value)
    }
    const updateRegNo = (e) => {
        setRegNo(e.target.value)
    }
    const updateEmail = (e) => {
        setEmail(e.target.value)
    }
    const updateMobileNo = (e) => {
        setMobileNo(e.target.value)
    }
    const updatePercentage = (e) => {
        setPercentage(e.target.value)
    }
    const updateCity = (e) => {
        setCity(e.target.value)
    }
    const updateState = (e) => {
        setState(e.target.value)
    }

    useEffect(() => {
        fetch(`${BASE_URL}/students/${id}`, { method: 'GET' })
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw new Error(`Failed to fetch student. Status: ${res.status}`);
                }
            })
            .then((student) => {
                setName(student.name);
                setRegNo(student.regNo);
                setEmail(student.email);
                setMobileNo(student.mobileNo);
                setPercentage(student.percentage);
                setCity(student.city);
                setState(student.state);
            })
            .catch((err) => {
                console.error('Failed to fetch student', err);
            });
    }, [id]);


    function editStudent(e) {
        e.preventDefault()
        let studentdata = { name, regNo, email, mobileNo, percentage, city, state }
        fetch(`${BASE_URL}/students/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentdata)
        }).then((res) => {
            if (res.status === 200) {
                toast.success("Student data updated successfully!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                })
                setIsDisabled(true)
                setTimeout(() => {
                    navigate('/studentdata');
                }, 2000)
            }
        }).catch((err) => {
            setIsDisabled(true);
            console.log("Update student data error:", err)
            toast.error("Failed to update student data" + err.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
            })
            setTimeout(() => setIsDisabled(false), 2500);
        })

    }

    return (
        <>
            <div className="bg-editstudent d-flex justify-content-center align-items-center min-vh-100">
                <div className="container col-md-6 col-lg-6">
                    <div className="card shadow-lg glass-card-editstudent">
                        <div className="card-header bg-warning text-white">
                            <h4 className="text-center">Edit Student</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={editStudent}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={updateName}
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
                                        onChange={updateRegNo}
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
                                        onChange={updateEmail}
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
                                        onChange={updateMobileNo}
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
                                        onChange={updatePercentage}
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
                                        onChange={updateCity}
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
                                        onChange={updateState}
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
                                        Update
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
};

export default EditStudent;