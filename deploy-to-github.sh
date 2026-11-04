#!/usr/bin/env bash
# Quick helper to push your Golis Expeditions project to your GitHub repository
# Usage: ./deploy-to-github.sh https://github.com/YOUR_USERNAME/YOUR_REPO.git

REPO_URL="$1"

if [ -z "$REPO_URL" ]; then
  echo "Usage: ./deploy-to-github.sh <GITHUB_REPO_URL>"
  echo "Example: ./deploy-to-github.sh https://github.com/mahadxasan0062z/golis-expeditions.git"
  exit 1
fi

echo "Connecting remote origin to $REPO_URL..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

echo "Setting branch to main..."
git branch -M main

echo "Pushing latest production code to GitHub..."
git push -u origin main --force

echo "Done! Netlify will automatically detect this push and deploy to https://golis-expedition-somaliland.netlify.app/ with all pictures live."
