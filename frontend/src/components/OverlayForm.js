import React from 'react';

const OverlayForm = ({ overlays, onOverlayChange, addOverlay, removeOverlay }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Text Overlays</h2>
      {overlays.map((overlay, index) => (
        <div key={index} className="border p-4 rounded-lg mb-4">
          <h3 className="text-lg font-medium mb-2">Overlay {index + 1}</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Enter text"
              value={overlay.text}
              onChange={(e) => onOverlayChange(index, 'text', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <input
              type="number"
              placeholder="Start Time (seconds)"
              value={overlay.start}
              onChange={(e) => onOverlayChange(index, 'start', parseFloat(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="0"
              step="0.1"
              required
            />
            <input
              type="number"
              placeholder="End Time (seconds)"
              value={overlay.end}
              onChange={(e) => onOverlayChange(index, 'end', parseFloat(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              min="0.1"
              step="0.1"
              required
            />
          </div>
          {overlays.length > 1 && (
            <button
              type="button"
              onClick={() => removeOverlay(index)}
              className="mt-4 text-red-500 hover:underline"
            >
              Remove Overlay
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addOverlay}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-500"
      >
        Add Another Overlay
      </button>
    </div>
  );
};

export default OverlayForm;
