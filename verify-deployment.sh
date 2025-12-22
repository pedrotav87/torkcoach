#!/bin/bash

# Tork Coach - Pre-Deployment Verification Script
# This script verifies that your app is ready for deployment

echo "🔍 Tork Coach - Pre-Deployment Verification"
echo "============================================"
echo ""

# Check if .env file exists
echo "✓ Checking .env configuration..."
if [ -f ".env" ]; then
    echo "  ✓ .env file exists"
    
    # Check for required Firebase variables
    if grep -q "VITE_FIREBASE_API_KEY" .env && \
       grep -q "VITE_FIREBASE_AUTH_DOMAIN" .env && \
       grep -q "VITE_FIREBASE_PROJECT_ID" .env; then
        echo "  ✓ Firebase environment variables configured"
    else
        echo "  ⚠ Missing Firebase environment variables"
    fi
else
    echo "  ⚠ .env file not found"
fi

echo ""

# Check if CNAME exists
echo "✓ Checking CNAME configuration..."
if [ -f "CNAME" ]; then
    echo "  ✓ CNAME file exists: $(cat CNAME)"
else
    echo "  ⚠ CNAME file not found"
fi

echo ""

# Check if Firebase config exists
echo "✓ Checking Firebase integration..."
if [ -f "src/lib/firebase.ts" ]; then
    echo "  ✓ Firebase configuration file exists"
else
    echo "  ⚠ Firebase configuration not found"
fi

echo ""

# Check if GitHub Actions workflow exists
echo "✓ Checking deployment workflow..."
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "  ✓ GitHub Actions deployment workflow configured"
else
    echo "  ⚠ Deployment workflow not found"
fi

echo ""

# Check package.json and package-lock.json sync
echo "✓ Checking package dependencies..."
if [ -f "package.json" ] && [ -f "package-lock.json" ]; then
    echo "  ✓ package.json and package-lock.json exist"
    
    # Quick check if firebase is installed
    if grep -q '"firebase"' package.json; then
        echo "  ✓ Firebase package configured"
    else
        echo "  ⚠ Firebase package not found in dependencies"
    fi
else
    echo "  ⚠ Package files missing"
fi

echo ""
echo "============================================"
echo "📋 Next Steps:"
echo ""
echo "1. Ensure GitHub Secrets are configured:"
echo "   → Go to Settings → Secrets → Actions"
echo "   → Add all VITE_FIREBASE_* variables"
echo ""
echo "2. Verify Firebase Console settings:"
echo "   → Add coach.tork.pro to authorized domains"
echo "   → Enable Email/Password authentication"
echo ""
echo "3. Deploy to GitHub Pages:"
echo "   → git add ."
echo "   → git commit -m 'Deploy with fixed Firebase config'"
echo "   → git push origin main"
echo ""
echo "4. Monitor deployment:"
echo "   → Check GitHub Actions tab for build status"
echo "   → Visit coach.tork.pro after deployment"
echo ""
echo "============================================"
echo "✅ Pre-deployment check complete!"
