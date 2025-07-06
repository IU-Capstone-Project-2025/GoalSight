#!/bin/bash

echo "⏳ Waiting for PostgreSQL to start..."
while ! nc -z db 5432; do
  sleep 0.5
done
echo "✅ PostgreSQL is up and running"

echo "📦 Making migrations..."
python manage.py makemigrations

echo "📦 Applying migrations..."
python manage.py migrate

echo "📥 Importing teams..."
python manage.py import_teams

echo "📥 Importing matches..."
python manage.py fetch_matches

echo "📥 Importing tournaments..."
python manage.py import_tournaments

echo "🔁 Starting cron..."
cron &

echo "🚀 Starting the server..."
exec "$@"
