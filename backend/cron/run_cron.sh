#!/bin/sh
echo "Running cron task at $(date)"
/usr/local/bin/python /app/goalsight/manage.py fetch_matches