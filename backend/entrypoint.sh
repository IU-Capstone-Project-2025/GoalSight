#!/bin/bash

echo "⏳ Waiting for PostgreSQL to start..."
while ! nc -z db 5432; do
  sleep 0.5
done
echo "✅ PostgreSQL is up and running"

echo "📦 Applying migrations..."
python manage.py migrate

if [ "$DJANGO_ENV" = "test" ]; then
  echo "🌱 Running local seed data command..."
  python manage.py fill_local_db
else
  echo "📥 Importing teams..."
  python manage.py import_teams

  echo "📥 Importing new data..."
  python manage.py import_new_data

  echo "📥 Importing matches..."
  python manage.py fetch_matches

  echo "📥 Importing tournaments..."
  python manage.py import_tournaments
fi

echo "🔁 Starting cron..."
cron &

echo "🚀 Starting the server..."
exec "$@"