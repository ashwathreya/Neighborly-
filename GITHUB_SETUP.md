# How to Push to GitHub

## Step 1: Configure Git (if not already done)

Run these commands with your GitHub email and name:

```powershell
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

Replace:
- `your-email@example.com` with your GitHub email
- `Your Name` with your name

## Step 2: Create Initial Commit

```powershell
git commit -m "Initial commit: Neighborly - All-in-one neighborhood marketplace"
```

## Step 3: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `neighborly` (or any name you prefer)
3. Description: "All-in-one neighborhood marketplace for services and community"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

## Step 4: Connect and Push to GitHub

After creating the repo, GitHub will show you commands. Use these:

```powershell
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/neighborly.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```powershell
git remote add origin git@github.com:YOUR_USERNAME/neighborly.git
git branch -M main
git push -u origin main
```

## Troubleshooting

### If you get "remote origin already exists":
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/neighborly.git
```

### If you need to authenticate:
- GitHub no longer accepts passwords for HTTPS
- Use a **Personal Access Token** instead:
  1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token with `repo` permissions
  3. Use the token as your password when pushing

### Or use GitHub CLI (easier):
```powershell
# Install GitHub CLI if you don't have it
# Then run:
gh repo create neighborly --public --source=. --remote=origin --push
```

## Quick Commands Summary

```powershell
# 1. Configure Git (one time only)
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"

# 2. Commit (already done if you followed above)
git commit -m "Initial commit: Neighborly - All-in-one neighborhood marketplace"

# 3. Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/neighborly.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username!

