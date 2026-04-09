# Commit and Push Workflow
1. Remove .git/index.lock if it exists
2. Run `git status` to show changes
3. Ask user for commit message (or generate one from diff)
4. Run `git add .`, `git commit -m "<message>"`, `git push origin main`
5. Confirm push succeeded
