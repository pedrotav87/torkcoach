# Firebase Domain Authorization - Visual Guide

## 🎯 Your Goal
Add `coach.tork.pro` to Firebase so external users can authenticate.

---

## 📍 Where to Go

```
🌐 Firebase Console
   └── 🔐 Authentication
       └── ⚙️ Settings
           └── 🌍 Authorized domains
               └── ➕ Add domain
```

---

## 🖱️ Click Path

```
1. Open: https://console.firebase.google.com/project/tork-cafe5
   
2. Click: "Authentication" (in left sidebar)
   
3. Click: "Settings" (tab at top)
   
4. Scroll to: "Authorized domains"
   
5. Click: "Add domain" (blue button)
   
6. Type: coach.tork.pro
   
7. Click: "Add"
```

---

## ✅ What You Should See

### Before Adding:
```
┌─────────────────────────────────┐
│ Authorized domains              │
├─────────────────────────────────┤
│ localhost                  [x]  │
│ tork-cafe5.firebaseapp.com [x]  │
├─────────────────────────────────┤
│ [+ Add domain]                  │
└─────────────────────────────────┘
```

### After Adding:
```
┌─────────────────────────────────┐
│ Authorized domains              │
├─────────────────────────────────┤
│ localhost                  [x]  │
│ tork-cafe5.firebaseapp.com [x]  │
│ coach.tork.pro            [x]  │
├─────────────────────────────────┤
│ [+ Add domain]                  │
└─────────────────────────────────┘
```

---

## 🚫 Common Mistakes

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `https://coach.tork.pro` | `coach.tork.pro` |
| `coach.tork.pro/` | `coach.tork.pro` |
| `www.coach.tork.pro` | `coach.tork.pro` |
| `http://coach.tork.pro` | `coach.tork.pro` |

**Remember:** 
- ❌ No `https://`
- ❌ No `http://`
- ❌ No trailing `/`
- ✅ Just the domain name

---

## 🧪 Testing

### 1. Clear Browser Cache
```
Windows: Ctrl + Shift + Delete
Mac:     Cmd + Shift + Delete
```

### 2. Visit Your Site
```
https://coach.tork.pro
```

### 3. Try to Sign In
- Should work immediately
- No errors in console
- Authentication succeeds

### 4. Check Console (F12)
- ✅ No Firebase errors
- ✅ No "domain not authorized"
- ✅ No red error messages

---

## 📱 Test on External Device

| Device | How to Test |
|--------|-------------|
| 📱 Mobile | Use cellular data (not WiFi) |
| 💻 Friend's Computer | Ask someone else to try |
| 🌐 Another Network | Coffee shop WiFi, etc. |
| 🔒 Incognito Mode | Ctrl+Shift+N (Cmd+Shift+N) |

---

## ⏰ How Long?

| Step | Time |
|------|------|
| Find Firebase Console | 30 sec |
| Navigate to Settings | 30 sec |
| Add domain | 30 sec |
| Test | 1 min |
| **TOTAL** | **~2-3 min** |

---

## 🔍 Troubleshooting

### "I don't see 'Authorized domains'"
→ Make sure you're in **Authentication → Settings**  
→ Not in "Sign-in method" or other tabs

### "Domain added but still not working"
→ Clear browser cache completely  
→ Try incognito mode  
→ Wait 1-2 minutes for Firebase to sync

### "Can't find the settings page"
→ Direct link: https://console.firebase.google.com/project/tork-cafe5/authentication/settings

### "It says my project doesn't exist"
→ Make sure you're signed into correct Google account  
→ Account must have access to `tork-cafe5` project

---

## 📋 Complete Checklist

### Prerequisites:
- [ ] Have access to Firebase Console
- [ ] Logged into correct Google account
- [ ] Project `tork-cafe5` exists

### Steps:
- [ ] Opened Firebase Console
- [ ] Selected project `tork-cafe5`
- [ ] Clicked "Authentication"
- [ ] Clicked "Settings" tab
- [ ] Found "Authorized domains" section
- [ ] Clicked "Add domain"
- [ ] Typed `coach.tork.pro`
- [ ] Clicked "Add" button
- [ ] Confirmed domain appears in list

### Verification:
- [ ] Cleared browser cache
- [ ] Visited https://coach.tork.pro
- [ ] Tried signing in
- [ ] No Firebase errors in console
- [ ] Tested from external device

---

## 🎨 Visual Reference

### Firebase Console Navigation:

```
╔════════════════════════════════════╗
║ Firebase Console                   ║
╠════════════════════════════════════╣
║ Projects                           ║
║ ┌────────────────────────────────┐ ║
║ │ tork-cafe5                  ⚙️ │ ← Click here
║ └────────────────────────────────┘ ║
╚════════════════════════════════════╝
           ↓
╔════════════════════════════════════╗
║ tork-cafe5                         ║
╠════════════════════════════════════╣
║ Sidebar:                           ║
║ 🔐 Authentication          ← Click ║
║ 💾 Firestore Database              ║
║ 🖼️ Storage                          ║
║ 🔧 Functions                        ║
║ ⚙️ Settings                         ║
╚════════════════════════════════════╝
           ↓
╔════════════════════════════════════╗
║ Authentication                     ║
╠════════════════════════════════════╣
║ Tabs:                              ║
║ [Users] [Sign-in method] [Settings]║
║                              ↑ Click
╚════════════════════════════════════╝
           ↓
╔════════════════════════════════════╗
║ Settings                           ║
╠════════════════════════════════════╣
║ Authorized domains                 ║
║ ┌────────────────────────────────┐ ║
║ │ localhost              [x]     │ ║
║ │ tork-cafe5.firebaseapp.com [x]│ ║
║ └────────────────────────────────┘ ║
║                                    ║
║ [+ Add domain]             ← Click ║
╚════════════════════════════════════╝
           ↓
╔════════════════════════════════════╗
║ Add domain                         ║
╠════════════════════════════════════╣
║ ┌────────────────────────────────┐ ║
║ │ coach.tork.pro                 │ ║ ← Type here
║ └────────────────────────────────┘ ║
║                                    ║
║         [Cancel]  [Add]    ← Click ║
╚════════════════════════════════════╝
```

---

## 🎯 Success Criteria

You'll know it worked when:
- ✅ Domain appears in authorized list
- ✅ Can visit https://coach.tork.pro
- ✅ Can sign in without errors
- ✅ No console errors about domains
- ✅ Works from external devices

---

## 📞 Quick Links

| Resource | URL |
|----------|-----|
| Your Firebase Console | https://console.firebase.google.com/project/tork-cafe5 |
| Auth Settings Direct | https://console.firebase.google.com/project/tork-cafe5/authentication/settings |
| Firebase Auth Docs | https://firebase.google.com/docs/auth/web/auth-domain |
| DNS Checker | https://www.whatsmydns.net/#A/coach.tork.pro |

---

## 💡 Pro Tips

1. **Bookmark the settings page** for quick access
2. **Add domains before deploying** to avoid confusion
3. **Test in incognito first** to avoid cache issues
4. **Use direct links** if you can't find the page
5. **Screenshot the final list** for your records

---

## 📸 What It Looks Like

When you're in the right place, you'll see:

**Page Title:** "Authentication Settings"

**Section Header:** "Authorized domains"

**Description:** "Domains authorized for OAuth redirects. Add the domains of your apps to allow sign-in on these domains."

**Default domains already listed:**
- localhost
- tork-cafe5.firebaseapp.com

**Button at bottom:** "Add domain"

---

## 🚀 Next Steps After Adding

1. ✅ Domain authorized in Firebase
2. 🔄 Clear your browser cache
3. 🌐 Visit https://coach.tork.pro
4. 🔐 Try signing in
5. 📱 Test on mobile device
6. 👥 Share with your clients!

---

## ⚡ Super Quick Version

```bash
1. Go to: https://console.firebase.google.com/project/tork-cafe5/authentication/settings
2. Click: "Add domain"
3. Type: coach.tork.pro
4. Click: "Add"
5. Done!
```

---

**Total Time:** 2 minutes  
**Difficulty:** Easy  
**Technical Skill Required:** None  
**Can Break Anything:** No  
**Immediate Effect:** Yes

---

**🎉 That's it! Your custom domain is now authorized for Firebase Authentication.**
