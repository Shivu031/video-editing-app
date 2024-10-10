import React, { useState } from 'react';
import axios from 'axios';
import VideoUpload from './components/VideoUpload';
import OverlayForm from './components/OverlayForm';
import EditedVideo from './components/EditedVideo';

function App() {
  const [video, setVideo] = useState(null);
  const [overlays, setOverlays] = useState([{ text: '', start: 0, end: 5 }]);
  const [videoURL, setVideoURL] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleVideoUpload = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleOverlayChange = (index, field, value) => {
    const newOverlays = [...overlays];
    newOverlays[index][field] = value;
    setOverlays(newOverlays);
  };

  const addOverlay = () => {
    setOverlays([...overlays, { text: '', start: 0, end: 5 }]);
  };

  const removeOverlay = (index) => {
    const newOverlays = overlays.filter((_, i) => i !== index);
    setOverlays(newOverlays);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      alert('Please upload a video.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('overlays', JSON.stringify(overlays));

    setIsEditing(true);

    try {
      const response = await axios.post('http://localhost:5000/api/edit-video', formData, {
        responseType: 'blob',
      });

      const url = URL.createObjectURL(new Blob([response.data], { type: 'video/mp4' }));
      setVideoURL(url);
    } catch (error) {
      console.error('Error editing video:', error);
      alert('Error editing video. Please try again.');
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-600 font-serif my-6">Video Editing App</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <VideoUpload onVideoUpload={handleVideoUpload} />
        <OverlayForm
          overlays={overlays}
          onOverlayChange={handleOverlayChange}
          addOverlay={addOverlay}
          removeOverlay={removeOverlay}
        />
        <button
          type="submit"
          disabled={isEditing}
          className={`px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-500 ${isEditing && 'opacity-50 cursor-not-allowed'}`}
        >
          {isEditing ? 'Processing...' : 'Edit Video'}
        </button>
      </form>

      {videoURL && <EditedVideo videoURL={videoURL} overlays={overlays} />}
    </div>
  );
}

export default App;
