#!/bin/bash
cd /Users/shydev/mini-projects/sub-agents.directory
rm -f biome.json
rm -rf apps
rm -rf packages
rm -rf node_modules
bun install
echo "Cleanup complete!"
