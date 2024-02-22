import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserContents } from '../../redux/content';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contents } = useSelector((state) => state.content);
  const { user } = useSelector((state) => state.session);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserContents(user.id));
    }
  }, [dispatch, user]);

  const handleAddNewFilm = () => {
    navigate('/submit-film');
  };

  return (
    <div>
      {/* Display user information */}
      <h1>{user?.username}</h1>
      <p>{user?.user_intro}</p>
      {/* Button to add a new film */}
      <button onClick={handleAddNewFilm}>Add a new Film</button>

      {/* List of current user's films */}
      <h2>My Films</h2>
      {contents.map((content) => (
        <div key={content.id}>
          <h3>{content.title}</h3>
          {/* ... other content details */}
        </div>
      ))}
    </div>
  );
};

export default UserProfilePage;
