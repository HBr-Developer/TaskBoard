import './userAvatar.css';
import { avatarColors } from '../../data/avatarColors';

const UserAvatar = ({ name, color }) => {
  
  const letters = name.split(' ');
  const avatar = letters[0].slice(0, 1).toUpperCase() + letters[1].slice(0, 1).toUpperCase();
  return (
    <div style={{ backgroundColor: avatarColors[color] }} className={'avatar'}>{avatar}</div>
  )
}

export default UserAvatar;