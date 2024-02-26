import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { updateContent, deleteContent } from '../../redux/content';
import '../SubmitFilmPage/SubmitFilm.css';
import './EditFilm.css';

const EditFilmPage = () => {
  const { id } = useParams(); // Get the film ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const contentToUpdate = location.state?.content;
  const [thumbnailPreview] = useState(contentToUpdate?.thumbnail_url || '');
  const [videoPreview] = useState(contentToUpdate?.video_url || '');
  const [newThumbnail] = useState(null);
const [newVideo] = useState(null);

// Event handlers for file inputs
// const handleThumbnailChange = (event) => {
//     setNewThumbnail(event.target.files[0]);
// };

// const handleVideoChange = (event) => {
//     setNewVideo(event.target.files[0]);
// };
  // Assume the Redux state has a structure where contents are under `state.content.contents`
  const filmDetails = useSelector((state) =>
    state.content.contents.find((content) => content.id === parseInt(id))
  );


  // If filmDetails is directly available, initialize state with those values
  const [title, setTitle] = useState(filmDetails?.title || '');
  const [description, setDescription] = useState(
    filmDetails?.description || ''
  );
  const [genre, setGenre] = useState(filmDetails?.genre.toLowerCase() || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data, including any new thumbnail or video selected by the user
    const updateData = {
      title: title, // Assuming 'title' comes from component state
      description: description, // Assuming 'description' comes from component state
      genre: genre.charAt(0).toUpperCase() + genre.slice(1), // Capitalize genre
    };

    // Dispatch the update action, passing the content ID, update data, and any new files
    const result = await dispatch(updateContent(id, updateData, newThumbnail, newVideo, thumbnailPreview, videoPreview));

    // Handle the response
    if (result?.success) {
      navigate(`/content/all/${id}`, { state: { updated:true }});
    } else {
      // Handle error
      console.error('Update failed');
    }
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
        <div className="thumbnail-preview">
          {thumbnailPreview && (
            <div>
              <img src={thumbnailPreview} alt="Thumbnail Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
            </div>
          )}
        </div>
        {/* <div className="thumbnail-upload">
    <label htmlFor="thumbnail">Update Thumbnail:</label>
    <input
        type="file"
        id="thumbnail"
        onChange={handleThumbnailChange}
        accept="image/png, image/jpeg, image/gif"
    />
</div> */}
        <div className="video-preview">
          {videoPreview && (
            <div>
              <video width="320" height="240" controls>
                <source src={videoPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
        {/* <div className="video-upload">
    <label htmlFor="video">Update Video:</label>
    <input
        type="file"
        id="video"
        onChange={handleVideoChange}
        accept="video/mp4, video/mov"
    />
</div> */}
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
