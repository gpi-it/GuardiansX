#!/bin/bash

timestamp=$(date +%c)

git add --all
git commit -m "$timestamp"
git push origin master
