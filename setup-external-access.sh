#!/bin/bash

# External Access Quick Setup Script
# This script helps prepare your app for external access

set -e

echo "🚀 Tork Coach - External Access Setup"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if public folder exists
if [ ! -d "public" ]; then
    echo -e "${YELLOW}Creating public folder...${NC}"
    mkdir -p public
    echo -e "${GREEN}✓ Public folder created${NC}"
fi

# Copy CNAME to public folder if it doesn't exist there
if [ -f "CNAME" ] && [ ! -f "public/CNAME" ]; then
    echo -e "${YELLOW}Copying CNAME to public folder...${NC}"
    cp CNAME public/CNAME
    echo -e "${GREEN}✓ CNAME copied to public/CNAME${NC}"
elif [ -f "public/CNAME" ]; then
    echo -e "${GREEN}✓ CNAME already in public folder${NC}"
fi

# Check if .env exists
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ .env file exists${NC}"
else
    echo -e "${RED}✗ .env file missing${NC}"
    echo -e "${YELLOW}Creating .env from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠ Please edit .env with your Firebase credentials${NC}"
fi

echo ""
echo "📋 Setup Checklist:"
echo "==================="
echo ""
echo "Local Setup (Completed):"
echo "  ✓ CNAME file ready for deployment"
echo "  ✓ .env file exists"
echo "  ✓ Firebase configuration in place"
echo ""
echo "Next Steps (Required for External Access):"
echo ""
echo "1️⃣  Add GitHub Secrets:"
echo "   → Go to: Your Repo → Settings → Secrets and variables → Actions"
echo "   → Add these 7 secrets with your Firebase values:"
echo "      • VITE_FIREBASE_API_KEY"
echo "      • VITE_FIREBASE_AUTH_DOMAIN"
echo "      • VITE_FIREBASE_PROJECT_ID"
echo "      • VITE_FIREBASE_STORAGE_BUCKET"
echo "      • VITE_FIREBASE_MESSAGING_SENDER_ID"
echo "      • VITE_FIREBASE_APP_ID"
echo "      • VITE_FIREBASE_MEASUREMENT_ID"
echo ""
echo "2️⃣  Authorize Domain in Firebase:"
echo "   → Go to: Firebase Console → Authentication → Settings"
echo "   → Add to Authorized domains: coach.tork.pro"
echo ""
echo "3️⃣  Configure DNS (if not done):"
echo "   → Add CNAME record at your domain registrar:"
echo "      Name: coach"
echo "      Target: [your-github-username].github.io"
echo ""
echo "4️⃣  Enable GitHub Pages:"
echo "   → Go to: Your Repo → Settings → Pages"
echo "   → Source: GitHub Actions"
echo "   → Custom domain: coach.tork.pro"
echo "   → Enable HTTPS"
echo ""
echo "5️⃣  Deploy:"
echo "   → git add ."
echo "   → git commit -m 'Setup for external access'"
echo "   → git push origin main"
echo ""
echo -e "${GREEN}See EXTERNAL_ACCESS_SOLUTION.md for detailed instructions!${NC}"
echo ""

# Ask if user wants to commit the changes
read -p "Do you want to commit these changes now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add public/ .env 2>/dev/null || true
    git status
    echo ""
    echo -e "${YELLOW}Review the changes above.${NC}"
    read -p "Proceed with commit? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git commit -m "Setup for external access - move CNAME to public folder"
        echo -e "${GREEN}✓ Changes committed${NC}"
        echo -e "${YELLOW}Run 'git push origin main' to deploy${NC}"
    fi
fi

echo ""
echo "🎯 Quick Reference:"
echo "==================="
echo "Local dev:  npm run dev"
echo "Build:      npm run build"
echo "Preview:    npm run preview"
echo ""
echo "Your app will be accessible at:"
echo "  → https://coach.tork.pro (after DNS propagation)"
echo ""
