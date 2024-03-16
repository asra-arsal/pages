#!/bin/bash

# Navigate to the parent directory and get its name
prevDir=$(basename "$(dirname "$(pwd)")")

# Get the current directory name
currDir=$(basename "$(pwd)")

# Construct the command
cmd="pm2 start app.js -n ${prevDir}-${currDir}"

# Echo the command
echo "Command: $cmd"

# Execute the command
eval $cmd
