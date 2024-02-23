import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addNewContent, deleteContent, updateContent } from "../../redux/content";
import "./SubmitFilm.css";

const SubmitFilmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  const contentToUpdate = location.state?.content;


  const [title, setTitle] = useState(contentToUpdate?.title || '');
  const [description, setDescription] = useState(contentToUpdate?.description || '');
  const [genre, setGenre] = useState(contentToUpdate?.genre.toLowerCase() || '');
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
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre.charAt(0).toUpperCase() + genre.slice(1));
    formData.append("thumbnail", thumbnail_url);
    formData.append("video", video_url);

    if (contentToUpdate) {
      await dispatch(updateContent(contentToUpdate.id, formData));
      navigate(`/content/${contentToUpdate.id}`);
      // Dispatch the thunk action to add new content
    } else {

      const actionResult = await dispatch(addNewContent(formData));
      const contentId = actionResult.payload;
   if (contentId) {
      navigate(`/content/${contentId}`); // Navigate to the content's details page
    }
  }
  };

  const handleDelete = async () => {
    if (location.state?.content) {
      await dispatch(deleteContent(location.state.content.id));
      navigate('/profile');
    }
  };

  return (
    <div className="submit-film-page">
       <h1>{contentToUpdate ? "Update Film" : "Add a New Film"}</h1>
      <form
        className="video-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="video-description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required>
          <option value="">Select a genre</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="horror">Horror</option>
        </select>
        {thumbnailPreview && (
          <div className="thumbnail-preview">
            <label>Current Thumbnail:</label>
            <img src={thumbnailPreview} alt="Thumbnail Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
          </div>
        )}

        <label htmlFor="thumbnail">Change Thumbnail</label>
        <input
          id="thumbnail"
          type="file"
          onChange={handleThumbnailChange}
          required={!thumbnailPreview} // If there's no preview, make the field required
        />

        {/* Video preview */}
        {/* Displaying a video preview might require a player or a link since auto-playing videos can be intrusive */}
        {videoPreview && (
          <div className="video-preview">
            <label>Current Video:</label>
            <video width="320" height="240" controls>
              <source src={videoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <label htmlFor="videoFile">Change Video File</label>
        <input
          id="videoFile"
          type="file"
          label="Video File"
          onChange={handleVideoChange}
          required={!videoPreview} // If there's no preview, make the field required
        />

        <button className="video-submit" type="submit">
          {contentToUpdate ? "Update Film" : "Submit Film"}
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
