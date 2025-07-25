# Calculator GitHub Pages Deployment Guide

## Problem
Your calculator at https://osa277.github.io/calculator/ shows 404 because GitHub Pages isn't configured for React/Vite projects.

## Solution Steps

### 1. Go to Calculator Repository
- Visit: https://github.com/Osa277/calculator
- Click **Settings** tab
- Go to **Pages** section

### 2. Configure Pages Source
- Under **Source**, select: **"GitHub Actions"**
- Don't use "Deploy from a branch" (that's for simple HTML sites)

### 3. Add Deployment Workflow
Create file: `.github/workflows/deploy.yml` in your calculator repository

```yaml
name: Deploy React App to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. Update Vite Configuration
Update `vite.config.js` in your calculator repository:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/calculator/', // This is important for GitHub Pages
  build: {
    outDir: 'dist',
  },
})
```

### 5. After Setup
1. Commit and push the workflow file
2. GitHub will automatically build and deploy
3. Your calculator will be live at: https://osa277.github.io/calculator/

## Alternative: Quick Fix
If you want to show your calculator code immediately, the portfolio links now point to your GitHub repository where visitors can see the source code.
