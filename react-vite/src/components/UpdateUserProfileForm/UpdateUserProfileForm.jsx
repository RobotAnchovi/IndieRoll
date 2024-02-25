import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkUpdateUserProfile } from '../../redux/session';
import "./UpdateUserProfileForm.css";


const UpdateUserProfileForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.session.user);
    const [username, setUsername] = useState('');
    const [userIntro, setUserIntro] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
      if (currentUser) {
        setUsername(currentUser.username || '');
        setUserIntro(currentUser.user_intro || '');
      }
    }, [currentUser]);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleUserIntroChange = (e) => setUserIntro(e.target.value);
    const handleProfilePictureChange = (e) => {
      if (e.target.files[0]) {
        setProfilePicture(e.target.files[0]);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (username.length < 4) {
        alert("Username must be 4 characters or more.");
        return;
      }

      const userData = { username, user_intro: userIntro };
      const response = await dispatch(thunkUpdateUserProfile(userData, profilePicture));
      if (response) {
        navigate('/profile');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="update-profile-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <label htmlFor="userIntro">Bio</label>
        <textarea
          id="userIntro"
          value={userIntro}
          onChange={handleUserIntroChange}
        />

        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          onChange={handleProfilePictureChange}
        />

        <button className='profile-submit' type="submit">Update Profile</button>
      </form>
    );
  };


    export default UpdateUserProfileForm;
