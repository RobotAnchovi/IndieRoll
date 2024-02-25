import { useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoContent } from "../../redux/content";
import "./UserProfile.css";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const contents = useSelector((state) => state.content.contents);
  const user  = useSelector((state) => state.session.user);
  console.log("🚀 ~ UserProfilePage ~ user:", user)

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchVideoContent());
    }
  }, [dispatch, user]);

  const userOwnedContent = useMemo(() => contents.filter(content => content.user_id === user?.id), [contents, user]);

  const handleAddNewFilm = () => {
    navigate('/submit-film');
  };

  const handleUpdateProfile = () => {
    navigate('/profile/update');
  };

  return (
    <div className='profile-page'>
      {/* Display user information */}
      <img className="profile-photo" src={user?.profile_picture} alt={user?.username} />
      <h1>{user?.username}</h1>
      <p>{user?.user_intro}</p>
      {/* Button to add a new film */}
      <div className="button-box">
      <button className="button" onClick={handleUpdateProfile}>Update My Profile</button>
      <button className="button" onClick={handleAddNewFilm}>Add a new Film</button>
      </div>

      {/* List of current user's films */}
      <h2>My Films</h2>
      <div className="profile-grid">
      {userOwnedContent.length > 0 ? (
        userOwnedContent.map((content) => (
          <div key={content.id} className="movie-item">
          <NavLink to={`/content/all/${content.id}`}>
            <img src={content.thumbnail_url} alt={`${content.title} thumbnail`} className="movie-thumbnail" />
            <div className="movie-item-details">
            <h3>{content.title}</h3>
            </div>
            {/* You might want to display a thumbnail or other details here */}
          </NavLink>
        </div>
        ))
        ) : (
          <p>You have not uploaded any films.</p>
          )}
          </div>
    </div>
  );
};

export default UserProfilePage;
