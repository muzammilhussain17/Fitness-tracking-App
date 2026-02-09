# Git Push Guide for MicroServices Project

## Repository
**Target:** https://github.com/muzammilhussain17/Fitness-tracking-App.git

---

## Step 1: Initialize Git (if not already done)

```bash
cd d:\MicroServices
git init
```

## Step 2: Add Remote Repository

```bash
git remote add origin https://github.com/muzammilhussain17/Fitness-tracking-App.git
```

> **Note:** If remote already exists, update it:
> ```bash
> git remote set-url origin https://github.com/muzammilhussain17/Fitness-tracking-App.git
> ```

## Step 3: Stage All Files

```bash
git add .
```

## Step 4: Commit Changes

```bash
git commit -m "Complete microservices platform with Docker, Kubernetes, and API documentation"
```

## Step 5: Push to GitHub

```bash
# Push to main branch
git push -u origin main
```

> **If main branch doesn't exist or you get an error:**
> ```bash
> git branch -M main
> git push -u origin main --force
> ```

---

## Quick One-Liner (All Steps Combined)

```bash
cd d:\MicroServices && git init && git add . && git commit -m "Complete microservices platform" && git remote add origin https://github.com/muzammilhussain17/Fitness-tracking-App.git && git branch -M main && git push -u origin main
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "remote origin already exists" | Use `git remote set-url origin <url>` |
| "failed to push" | Try `git push -u origin main --force` |
| Authentication failed | Use GitHub Personal Access Token instead of password |

---

## Verify Push
After pushing, visit: https://github.com/muzammilhussain17/Fitness-tracking-App
