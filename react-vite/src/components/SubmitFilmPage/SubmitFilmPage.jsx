import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewContent } from '../../redux/content';

const SubmitFilmPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleThumbnailChange = (e) => {
    // Implement file handling logic
    setThumbnail(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    // Implement file handling logic
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement the submit logic
    //Jason - You'll need to handle file upload here before dispatching
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('thumbnail', thumbnail);
    formData.append('video', video);

    // Dispatch the thunk action to add new content
    dispatch(addNewContent(formData));
  };

  return (
    <div className="submit-film-page">
      <h1>Add a New Film</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Genre:
          <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
            <option value="">Select a genre</option>
            {/* Add more genres as needed */}
            <option value="action">Action</option>
            <option value="drama">Drama</option>
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
          </select>
        </label>
        <label>
          Thumbnail:
          <input
            type="file"
            onChange={handleThumbnailChange}
            required
          />
        </label>
        <label>
          Video File:
          <input
            type="file"
            onChange={handleVideoChange}
            required
          />
        </label>
        <button type="submit">Submit Film</button>
      </form>
    </div>
  );
};

export default SubmitFilmPage;
