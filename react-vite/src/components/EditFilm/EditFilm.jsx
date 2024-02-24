import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateContent, deleteContent } from '../../redux/content';
import '../SubmitFilmPage/SubmitFilm.css';
import './EditFilm.css';

const EditFilmPage = () => {
  const { id } = useParams(); // Get the film ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Assume the Redux state has a structure where contents are under `state.content.contents`
  const filmDetails = useSelector((state) =>
    state.content.contents.find((content) => content.id === parseInt(id))
  );

  // If filmDetails is directly available, initialize state with those values
  const [title, setTitle] = useState(filmDetails?.title || '');
  const [description, setDescription] = useState(
    filmDetails?.description || ''
  );
  const [genre, setGenre] = useState(filmDetails?.genre || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement the submit logic for updating, excluding thumbnail and video uploads
    await dispatch(updateContent(id, { title, description, genre }));
    navigate(`/content/all/${id}`); // Redirect to the updated film's detail page
  };

  const handleDelete = async () => {
    // Implement the delete logic
    await dispatch(deleteContent(id));
    navigate('/profile'); // Redirect to the user's profile page after deletion
  };

  return (
    <div className='submit-film-page'>
      <h1>Edit Film</h1>
      <form className='video-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className='video-description'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          <option value=''>Select a genre</option>
          <option value='action'>Action</option>
          <option value='drama'>Drama</option>
          <option value='comedy'>Comedy</option>
          <option value='horror'>Horror</option>
        </select>
        {/* Removed file inputs for thumbnail and video */}
        <button className='video-submit' type='submit'>
          Update Film
        </button>
      </form>
      <button className='video-delete' onClick={handleDelete}>
        Delete Film
      </button>{' '}
      {/* Separate delete button outside the form */}
    </div>
  );
};

export default EditFilmPage;
