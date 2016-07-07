#!/bin/bash

timestamp=$(date +%c)

echo "pulling from github"
git pull
echo "adding and commiting changes"
git add --all
git commit -m "$timestamp"
echo "pushing to master"
git push origin master

unset timestamp
