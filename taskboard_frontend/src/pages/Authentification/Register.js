import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { register, reset } from "../../features/auth/authSlice";
import Spinner from '../../components/Spinner'

import "./Login.css";
import Header from "../../components/Header";

function Register() {
  // React States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  
  const { name, email, password, password2 } = formData;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('../board');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    if (password !== password2) {
      toast.error("Passwords don't match");
    } else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData));
    }
  }
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  
  if (isLoading) {
    return <Spinner/>;
  }
  
  return (
    <>
      <Header/>
      <div className="app">
        <div className="login-form">
          <img src="http://www.mars-itech.com/wp-content/uploads/2019/12/logo.png" alt="logo"/>
          <div className="title">Register</div>
          <div className="form">
            <form onSubmit={handleOnSubmit}>
              <div className="input-container">
                <label>Username </label>
                <input type="text" id="name" name="name" value={name} pattern="^\w+( \w+)$"
                       title="first name space last name" onChange={onChange} required/>
              </div>
              <div className="input-container">
                <label htmlFor='email'>Email </label>
                <input type="email" id="email" name="email" value={email} onChange={onChange} required/>
              </div>
              <div className="input-container">
                <label>Password </label>
                <input type="password" id="password" name="password" value={password} onChange={onChange} required/>
              </div>
              <div className="input-container">
                <label>Confirm password </label>
                <input type="password" id="password2" name="password2" value={password2} onChange={onChange} required/>
              </div>
              <div className="button-container">
                <input type="submit" value="Register"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;