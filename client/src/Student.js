import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from './Pagination';
import { auth } from "./utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "./utils/authService";


function Student() {
  const [data, setData] = useState([]); // Full data from API
  const [filteredData, setFilteredData] = useState([]); // Data after search/sort filter
  const [searchTerm, setSearchTerm] = useState("");
  const [sortTerm, setSortTerm] = useState("");
  const [page, setPage] = useState(1);
  const [records] = useState(5); // Records per page fixed at 5
  const [loading, setLoading] = useState(true); // Loading auth/user data
  const [user, setUser] = useState(null);

  // Monitor Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Fetch student data once on mount
  useEffect(() => {
    fetch("http://localhost:3001/students")
      .then(res => res.json())
      .then(resp => {
        setData(resp);
        setFilteredData(resp);
      })
      .catch(err => {
        console.error("Error fetching student data:", err);
      });
  }, []);

  if (loading) return <p>Loading user data...</p>;


  // Filter data based on search term
  const searchFilter = (term) => {
    setSearchTerm(term);
    const lowerTerm = term.toLowerCase();

    const filtered = data.filter(student =>
      Object.values(student).some(val =>
        val?.toString().toLowerCase().includes(lowerTerm)
      )
    );

    setFilteredData(filtered);
    setPage(1); // Reset page on new search
  };

  // Sort data by given key
  const sortData = (key) => {
    setSortTerm(key);

    const sorted = [...filteredData].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (!isNaN(valA) && !isNaN(valB)) {
        return parseFloat(valA) - parseFloat(valB);
      }

      return valA.toString().toLowerCase().localeCompare(valB.toString().toLowerCase());
    });

    setFilteredData(sorted);
  };

  // Delete student and update data & filteredData
  const removeStudent = (id) => {
    fetch(`http://localhost:3001/students/${id}`, { method: "DELETE" })
      .then(res => {
        if (res.status === 200) {
          const newData = data.filter(student => student.id !== id);
          setData(newData);
          const newFiltered = filteredData.filter(student => student.id !== id);
          setFilteredData(newFiltered);
          toast.success("Student data deleted successfully!", {
            position: "top-center",
            autoClose: 1000
          });
        } else {
          throw new Error("Failed to delete");
        }
      })
      .catch(err => {
        console.error("Error deleting student:", err);
        toast.error("Failed to delete student data. Please try again.", {
          position: "top-center",
          autoClose: 1000
        });
      });
  };

  // Pagination calculations
  const lastIndex = page * records;
  const firstIndex = lastIndex - records;
  const currentRecords = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / records);

  return (
    <>

      <div className="bg-light-gradient min-vh-100 py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="card shadow-lg border-0">
                <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 bg-primary text-white">
                  <h2 className="mb-2 mb-md-0">🎓 Student Management System</h2>
                  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
                    <span className="badge bg-info text-dark fw-semibold px-3 py-2 rounded-pill text-nowrap">
                      {user ? user.email : ""}
                    </span>
                    <Link to="/">
                      <button className="btn btn-outline-light fw-semibold" onClick={logout}>
                        Logout
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="card-body bg-white">
                  <div className="row g-2 mb-3 align-items-center">
                    <div className="col-12 col-sm-4 col-md-3">
                      <Link to="/addstudent">
                        <button className="btn btn-success w-100 fw-semibold">➕ Add Student</button>
                      </Link>
                    </div>
                    <div className="col-12 col-sm-4 col-md-3">
                      <select
                        className="form-select fw-semibold"
                        onChange={(e) => sortData(e.target.value)}
                        value={sortTerm}
                      >
                        <option value="">Sort By</option>
                        <option value="id">ID</option>
                        <option value="name">Name</option>
                        <option value="regNo">Reg No</option>
                        <option value="email">Email</option>
                        <option value="mobileNo">Mobile No</option>
                        <option value="percentage">Marks %</option>
                        <option value="city">City</option>
                        <option value="state">State</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-4 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Search student details..."
                        value={searchTerm}
                        onChange={(e) => searchFilter(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered align-middle">
                      <thead className="table-primary text-center">
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Register Number</th>
                          <th>Email</th>
                          <th>Mobile Number</th>
                          <th>Marks %</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRecords.length > 0 ? (
                          currentRecords.map((item) => (
                            <tr className="text-center" key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.regNo}</td>
                              <td>{item.email}</td>
                              <td>{item.mobileNo}</td>
                              <td>{item.percentage}</td>
                              <td>{item.city}</td>
                              <td>{item.state}</td>
                              <td>
                                <div className="d-flex justify-content-center gap-2">
                                  <Link to={`/editstudent/${item.id}`}>
                                    <button className="btn btn-sm btn-outline-primary">
                                      ✏️ Edit
                                    </button>
                                  </Link>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeStudent(item.id)}
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center text-muted py-4">
                              🚫 No student data found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card-footer bg-light text-center">
                  <Pagination totalPages={totalPages} currentPage={page} fun={setPage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Student;
