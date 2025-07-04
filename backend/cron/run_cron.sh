#!/bin/sh
echo "Running cron task at $(date)"
python manage.py fetch_matches