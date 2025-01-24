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

To use the app, a TMDB API key is required, which can be optained from [here](https://developer.themoviedb.org/docs/getting-started). To use the Radarr integration, you will also need a Radarr API key.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
