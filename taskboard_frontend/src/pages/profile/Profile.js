import { useNavigate } from "react-router-dom";
import './profile.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { avatarColors } from '../../data/avatarColors';
import { logout, reset } from "../../features/auth/authSlice";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [currentUser, setCurrentUser] = useState({ name: user.name, email: user.email, newPassword: '' });
  
  const letters = user.name.split(' ');
  const avatar = letters[0].slice(0, 1).toUpperCase() + letters[1].slice(0, 1).toUpperCase();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/member/${user._id}`, currentUser);
      dispatch(reset());
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className="profile-container">
      <form onSubmit={onSubmit}>
        <div style={{ backgroundColor: avatarColors[user.color], color: '#FFFFFF' }} className="profile-avatar">
          {avatar}
        </div>
        <div className='name'>
          <label htmlFor="name">Full Name: </label>
          <input type="text" name='name' id='name' pattern="^\w+( \w+)$" title="first name space last name"
                 value={currentUser.name} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}/>
        </div>
        
        <div className='email'>
          <label htmlFor="email">Email: </label>
          <input type="email" name='email' id='email' value={currentUser.email}
                 onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}/>
        </div>
        
        <div className='current-password'>
          <label htmlFor="email">Current Password: </label>
          <input type="password" name='cpassword' id='cpassword' required
                 onChange={(e) => setCurrentUser({ ...currentUser, currentPassword: e.target.value })}/>
        </div>
        
        <div className='new-password'>
          <label htmlFor="email">New Password: </label>
          <input type="password" name='npassword' id='npassword'
                 onChange={(e) => setCurrentUser({ ...currentUser, newPassword: e.target.value })}/>
        </div>
        
        <div>
          <input type="submit" value='Save Changes'/>
        </div>
      </form>
    </div>
  );
};

export default Profile;