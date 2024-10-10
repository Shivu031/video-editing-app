import React from 'react';

const EditedVideo = ({ videoURL, overlays }) => {
  return (
    <div className="mt-6">
        <h2 className="text-2xl font-bold">Edited Video</h2>
        <video src={videoURL} controls className="mt-4 w-full rounded-lg shadow-lg"></video>
        <a
            href={videoURL}
            download="edited_video.mp4"
            className="block mt-4 px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-500"
        >
            Download Video
        </a>
        <div className='border border-gray-400 rounded-xl p-5 mt-4'>
            <h3 className="text-xl font-semibold text-purple-600 mb-2">Overlay Timeline</h3>
            <ul className="list-disc pl-6">
                {overlays.map((overlay, index) => (
                <li key={index}>
                    {`Overlay ${index + 1}: "${overlay.text}" from ${overlay.start} to ${overlay.end} seconds`}
                </li>
                ))}
            </ul>
      </div>
    </div>
  );
};

export default EditedVideo;
