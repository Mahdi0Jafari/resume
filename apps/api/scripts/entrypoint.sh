#!/bin/bash
set -e

# Wait for database
echo "Waiting for database..."
# (Optional: add wait-for-it.sh or pg_isready if healthchecks aren't enough)

# ⚠️ Only run migrations if the command is starting the API (uvicorn)
# This prevents worker containers from trying to run migrations simultaneously
if [[ "$*" == *"uvicorn"* ]]; then
    echo "Running database migrations..."
    alembic upgrade head
    echo "Migrations complete."
fi

echo "Executing command: $@"
# exec "$@" to preserve the signal handling and process management of the child process
exec "$@"
