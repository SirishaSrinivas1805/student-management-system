import './App.css';
import Login from './components/Login'
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'
import StudentDetails from './components/StudentDetails';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import NotFound from './components/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
          <Route path="/studentdata" element={<StudentDetails />}></Route>
          <Route path='/addstudent' element={<AddStudent />}></Route>
          <Route path='/editstudent/:id' element={<EditStudent />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
