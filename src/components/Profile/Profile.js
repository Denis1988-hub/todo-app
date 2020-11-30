import React, {Component} from 'react';
import classes from './Profile.module.css'
import defaultAvatar from '../../img/default.png'


class Profile extends Component {

  img = 'https://cdn0.iconfinder.com/data/icons/occupation-002/64/programmer-programming-occupation-avatar-512.png'

  state = {
    userData: {
      avatar: this.img,
      name: 'Den4ik',
      surname: 'Programmer',
      email: 'den4ik@gmail.com'
    }
  };

  render() {

    const { userData } = this.state;

    return (
        <div className={classes.profile}>
          <span>
            <img src={userData.avatar} alt={defaultAvatar} />
          </span>

          <p>
            {`${userData.name} ${userData.surname}`}<br />
            {`${userData.email}`}
          </p>
        </div>
    );
  }
}

export default Profile;