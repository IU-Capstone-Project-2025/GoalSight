#!/bin/bash

set -a
source /app/.env
set +a

cd /app/goalsight
/usr/local/bin/python /app/goalsight/manage.py import_new_data