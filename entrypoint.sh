#!/bin/sh

# Generate runtime config from environment variables
cat > /home/static/config.js << EOF
window.ENV_CONFIG = {
  RADARR_API_KEY: '${RADARR_API_KEY:-}',
  TMDB_API_KEY: '${TMDB_API_KEY:-}',
  RADARR_URL: '${RADARR_URL:-}',
  COUNTRY_CODE: '${COUNTRY_CODE:-}'
};
EOF

echo "Runtime configuration generated:"
cat /home/static/config.js

# Start the web server
exec busybox httpd -f -v -p 3001

