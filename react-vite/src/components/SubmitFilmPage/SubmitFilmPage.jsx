import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewContent } from '../../redux/content';
import './SubmitFilm.css';
const SubmitFilmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [thumbnail_url, setThumbnail] = useState(null);
  const [video_url, setVideo] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(contentToUpdate?.thumbnail_url || '');
  const [videoPreview, setVideoPreview] = useState(contentToUpdate?.video_url || '');

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };


  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement the submit logic
    //Jason - You'll need to handle file upload here before dispatching
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append(
      'genre',
      genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase()
    );
    formData.append('thumbnail', thumbnail_url);
    formData.append('video', video_url);

    // Dispatch the thunk action to add new content
    const contentId = await dispatch(addNewContent(formData));
    if (contentId) {
      navigate(`/content/all/${contentId}`);
    }
  };

  return (
    <div className='submit-film-page'>
      <h1>Add a New Film</h1>
      <form
        className='video-form'
        onSubmit={handleSubmit}
        encType='multipart/form-data'
      >
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
        <label htmlFor='thumbnail'>Thumbnail</label>
        <input
          id='thumbnail'
          type='file'
          onChange={handleThumbnailChange}
          required
        />

        <label htmlFor='videoFile'>Video File</label>
        <input
          id='videoFile'
          type='file'
          label='Video File'
          onChange={handleVideoChange}
          required={!videoPreview} // If there's no preview, make the field required
        />
        <button className='video-submit' type='submit'>
          Submit Film
        </button>

        {/* Delete button, shown only when editing an existing film */}
        {contentToUpdate && (
          <button type="button" onClick={handleDelete} className="delete-film-button">
            Delete Film
          </button>
        )}
      </form>
    </div>
  );
}

export default SubmitFilmPage;
