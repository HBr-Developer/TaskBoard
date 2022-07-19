import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const NewUser = ({ setUsers, users, userToUpdate, setOpenPopup }) => {
  const [formData, setFormData] = useState({
    name: userToUpdate ? userToUpdate.name : '',
    email: userToUpdate ? userToUpdate.email : '',
    password: '',
    password2: ''
  });
  
  const { name, email, password, password2 } = formData;
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // add user
    if (!userToUpdate) {
      if (password !== password2) {
        toast.error("Passwords don't match");
      } else {
        const userData = {
          name,
          email,
          password
        }
        try {
          const newUser = await axios.post("http://localhost:3001/member/", userData);
          setUsers([...users, newUser.data]);
          setOpenPopup(false);
        } catch (err) {
          toast.error(err.response.data)
        }
      }
    }
    
    // update user
    if (userToUpdate) {
      try {
        await axios.patch(`http://localhost:3001/member/${userToUpdate._id}`, {
          name,
          email,
          currentPassword: password,
          newPassword: password2
        });
        const updatedUserIndex = users.indexOf(userToUpdate);
        users.splice(updatedUserIndex, 1, { ...users[updatedUserIndex], name: formData.name, email: formData.email });
        setUsers(users);
        setOpenPopup(false);
      } catch (err) {
        toast.error(err.response.data);
      }
    }
  }
  //
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  
  return (
    <div className="form" style={{ width: '400px', padding: "20px 10px" }}>
      <form onSubmit={handleOnSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input style={{ padding: '5px 6px', fontSize: '1rem' }} type="text" id="name" name="name" value={name}
                 pattern="^\w+( \w+)$"
                 title="first name space last name" onChange={onChange} required/>
        </div>
        <div className="input-container">
          <label htmlFor='email'>Email </label>
          <input style={{ padding: '5px 6px', fontSize: '1rem' }} type="email" id="email" name="email" value={email}
                 onChange={onChange} required/>
        </div>
        {!userToUpdate ? (
          <>
            <div className="input-container">
              <label>Password </label>
              <input style={{ padding: '5px 6px', fontSize: '1rem' }} type="password" id="password" name="password"
                     value={password} onChange={onChange} required/>
            </div>
            <div className="input-container">
              <label>Confirm password </label>
              <input style={{ padding: '5px 6px', fontSize: '1rem' }} type="password" id="password2" name="password2"
                     value={password2} onChange={onChange} required/>
            </div>
          </>
        ) : (
          <>
            <div className="input-container">
              <label>Current Password </label>
              <input style={{ padding: '5px 6px', fontSize: '1rem' }} type="password" id="password" name="password"
                     value={password} onChange={onChange} required/>
            </div>
            <div className="input-container">
              <label>New password </label>
              <input style={{ padding: '5px 6px', fontSize: '1rem' }} type="password" id="password2" name="password2"
                     value={password2} onChange={onChange}/>
            </div>
          </>
        )}
        <div className="button-container">
          <input style={{ borderRadius: 3 }} type="submit" value={userToUpdate ? "Save Changes" : "Save User"}/>
        </div>
      </form>
    </div>
  );
};

export default NewUser;