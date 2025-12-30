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

You can configure the application in three ways:

1. **Through the UI**: Click the settings button in the app to enter your configuration values. These will be stored in your browser's local storage.

2. **Through Environment Variables (Development)**: Create a `.env` file in the project root (you can copy `.env.example` as a starting point) and set the following variables:

   ```bash
   REACT_APP_RADARR_URL=http://localhost:7878
   REACT_APP_RADARR_API_KEY=your_radarr_api_key_here
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   REACT_APP_COUNTRY_CODE=US
   ```

   **Note**: These `REACT_APP_` prefixed variables are embedded at **build time**. After creating or modifying the `.env` file, restart the development server for changes to take effect.

3. **Through Environment Variables (Docker/Production)**: When running in Docker, use runtime environment variables **without** the `REACT_APP_` prefix:

   ```bash
   RADARR_URL=http://localhost:7878
   RADARR_API_KEY=your_radarr_api_key_here
   TMDB_API_KEY=your_tmdb_api_key_here
   COUNTRY_CODE=US
   ```

   These can be set in your `docker-compose.yml`:

   ```yaml
   services:
     find-streaming:
       image: find-streaming
       container_name: find-streaming
       ports:
         - "3001:3001"
       environment:
         - RADARR_API_KEY=${RADARR_API_KEY}
         - TMDB_API_KEY=${TMDB_API_KEY}
         - RADARR_URL=${RADARR_URL}
         - COUNTRY_CODE=${COUNTRY_CODE:-US}
   ```

   Or passed directly via docker run:

   ```bash
   docker run -p 3001:3001 \
     -e RADARR_API_KEY=your_key \
     -e TMDB_API_KEY=your_key \
     -e RADARR_URL=http://radarr:7878 \
     -e COUNTRY_CODE=US \
     find-streaming
   ```

**Priority**: Values stored in the browser's local storage take precedence over runtime environment variables, which take precedence over build-time environment variables.

## Docker

To build and run with Docker:

```bash
# Build the React app
npm run build

# Build the Docker image
docker build -t find-streaming .

# Run with docker-compose
docker-compose up
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
