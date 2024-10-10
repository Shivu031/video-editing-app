import React from 'react';

const VideoUpload = ({ onVideoUpload }) => {
  return (
    <div className="space-y-2">
        <label className="block text-lg font-medium">Upload Video:</label>
        <input
            type="file"
            accept="video/*"
            onChange={onVideoUpload}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
        />
    </div>
  );
};

export default VideoUpload;
