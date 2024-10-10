##### "VIDEO EDITING APPLICATION" ####

### Overview
    A simple video editing application built with React, express.js and Node.js that allows users to upload videos, add text overlays, edit the video and download edited video.

### Features
1. Upload videos to the platform
2. Add multiple text overlays to videos
3. Preview the edited video with overlays
4. Download the edited video
5. Shows Overlay time means in which time what text will show

### Technologies Used
1. Frontend: React, Tailwind CSS
2. Backend: Node.js, Express.js, Multer (for file uploads)
3. Others: FFmpeg (for video processing)

### Setup Instructions
1. **Create a new React app:**
   ```terminal
   npx create-react-app video-editing-app
   cd video-editing-app
2. **Install Tailwind CSS:**
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
3. **Configure Tailwind CSS:**
    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file structure
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    }
4. **Add Tailwind directives to index.css file:**
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
5. **Start the development server:**
    npm run start


### Approach
1. Video Upload: Users upload videos, which are stored on the server.
2. Overlay Management: Users can create and manage overlays with specified start and end times.
3. Video Editing: The application uses FFmpeg to process the video and add overlays based on user inputs.
4. Preview and Download: Users can preview the edited video and download it for use.


###### GitHub Link of this project ######
    https://github.com/Shivu031/video-editing-app