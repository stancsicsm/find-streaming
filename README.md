# Find Streming

## Overview

`find-streaming` is a tool to help you find where your favorite movies are available for streaming. It also integrates with Radarr, allowing you to add movies directly to your Radarr library for automated downloading and management.

## Features

- Search for movies using data from The Movie Database (TMDB)
- Retrieves detailed movie information from TMDB, including streaming availability
- Integrates with Radarr to add movies for automated downloading and management

## Installation

To install `find-streaming`, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/find-streaming.git
cd find-streaming
npm install
```

## Usage

To start the application, run:

```bash
npm start
```

Then open your browser and navigate to `http://localhost:3000`.

## Configuration

To use the app, a TMDB API key is required, which can be obtained from [here](https://developer.themoviedb.org/docs/getting-started). To use the Radarr integration, you will also need a Radarr API key.

### Configuration Options

You can configure the application in two ways:

1. **Through the UI**: Click the settings button in the app to enter your configuration values. These will be stored in your browser's local storage.

2. **Through Environment Variables**: Create a `.env` file in the project root (you can copy `.env.example` as a starting point) and set the following variables:

   ```bash
   REACT_APP_RADARR_URL=http://localhost:7878
   REACT_APP_RADARR_API_KEY=your_radarr_api_key_here
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   REACT_APP_COUNTRY_CODE=US
   ```

   **Note**: Environment variables are used as fallback values when local storage is empty. Values stored in the browser's local storage take precedence over environment variables.

   After creating or modifying the `.env` file, restart the development server for changes to take effect.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
