# Cloudflare Worker Deployment

## GitHub Actions (recommended)

This repository includes a deployment workflow at:

- `.github/workflows/deploy.yml`

It deploys on pushes to `main` and can also be run manually from **Actions → Deploy Cloudflare Worker**.

### Required GitHub Secrets

Set these repository secrets before running the workflow:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Manual deployment

```bash
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... npm run deploy
```
