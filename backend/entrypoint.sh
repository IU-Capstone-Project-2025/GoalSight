#!/bin/bash

if [ "$1" = 'test' ]; then
  echo "⏳ Waiting for PostgreSQL to start (test mode)..."
  while ! nc -z db 5432; do
    sleep 0.5
  done
  echo "✅ PostgreSQL is up and running"

  echo "📦 Applying migrations (test mode)..."
  python manage.py migrate

  echo "🧪 Running tests..."
  python manage.py test

  exit 0
fi

echo "⏳ Waiting for PostgreSQL to start..."
while ! nc -z db 5432; do
  sleep 0.5
done
echo "✅ PostgreSQL is up and running"

echo "📦 Applying migrations..."
python manage.py migrate

echo "📥 Importing teams..."
python manage.py import_teams

echo "📥 Importing matches..."
python manage.py fetch_matches

echo "📥 Importing tournaments..."
python manage.py import_tournaments

echo "🚀 Starting the server..."
exec "$@"
