#!/bin/sh
echo "Running cron task at $(date)"
/usr/local/bin/python manage.py fetch_matches