import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { login, reset } from "../../features/auth/authSlice";
import Spinner from '../../components/Spinner'
import "./Login.css";
import Header from "../../components/Header";

function Login() {
  // React States
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  
  const { email, password } = loginFormData;
  
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
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    }
    dispatch(login(userData));
  }
  
  const onChange = (e) => {
    setLoginFormData((prevState) => ({
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
          <div className="title">Login</div>
          <div className="form">
            <form onSubmit={handleOnSubmit}>
              <div className="input-container">
                <label>Email </label>
                <input type="email" id="email" name="email" value={email} onChange={onChange} required/>
              </div>
              <div className="input-container">
                <label>Password </label>
                <input type="password" id="password" name="password" value={password} onChange={onChange} required/>
              </div>
              <div className="button-container">
                <input type="submit" value="Login"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;