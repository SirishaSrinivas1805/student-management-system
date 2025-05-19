import './App.css';
import Login from './Login'
import Register from './Register';
import ForgotPassword from './ForgotPassword'
import Student from './Student';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
          <Route path="/studentdata" element={<Student />}></Route>
          <Route path='/addstudent' element={<AddStudent />}></Route>
          <Route path='/editstudent/:id' element={<EditStudent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
