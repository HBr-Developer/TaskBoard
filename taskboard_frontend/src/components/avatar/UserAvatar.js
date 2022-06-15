import './userAvatar.css';

const UserAvatar = ({ name }) => {
  const letters = name.split(' ');
  const avatar = letters[0].slice(0, 1).toUpperCase() + letters[1].slice(0, 1).toUpperCase();
  
  return (
    <div className={'avatar'}>{avatar}</div>
  )
}

export default UserAvatar;