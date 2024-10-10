const express = require('express');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const cors = require('cors');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath); // Set the path to ffmpeg-static

// Ensure the outputs directory exists
const outputsDir = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputsDir)) {
  fs.mkdirSync(outputsDir, { recursive: true });
  console.log("object")
}

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Unique filename to prevent collisions
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route to upload and edit video
app.post('/api/edit-video', upload.single('video'), (req, res) => {
  const { overlays } = req.body; // Expected to be a JSON string
  const parsedOverlays = JSON.parse(overlays); // Array of overlay objects

  if (!req.file) {
    return res.status(400).json({ message: 'No video file uploaded.' });
  }

  const inputPath = path.join(__dirname, 'uploads', req.file.filename);
  const outputFilename = `edited_${Date.now()}.mp4`;
  const sanitizedFilename = outputFilename.replace(/[<>:"/\\|?*]/g, '_');
  const outputPath = path.join(outputsDir, sanitizedFilename);

  // Debugging: Log the output path
    console.log('Output Path:', outputPath);

  // Build ffmpeg filter for text overlays
  let filter = '';
  parsedOverlays.forEach((overlay, index) => {
    // Escape single quotes in text
    const safeText = overlay.text.replace(/'/g, "\\'");
    filter += `drawtext=font='Serif':text='${safeText}':fontsize=28:fontcolor=red:enable='between(t,${overlay.start},${overlay.end})':x=(w-text_w)/2:y=(h-text_h)/2,`;
  });

  // Remove trailing comma
  filter = filter.slice(0, -1);

  ffmpeg(inputPath)
    .videoFilters(filter)
    .on('end', () => {
      // Send the edited video for download
      res.download(outputPath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Error processing video.');
        }
        // Optionally, clean up files after download
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      });
    })
    .on('error', (err) => {
      console.error('FFmpeg error:', err);
      res.status(500).send('Error processing video.');
    })
    .save(outputPath);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
