# GitHub Secrets Setup Guide

This guide explains how to configure all required secrets and environment variables for the AET.ski GitHub Actions CI/CD pipeline.

## Required GitHub Secrets

Navigate to your GitHub repository: `https://github.com/Explorimentalist/aet-ski/settings/secrets/actions`

### 1. Sanity CMS Configuration
```
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_API_TOKEN=your_sanity_api_token
```

**How to get:**
- Project ID: Found in your Sanity dashboard URL or `sanity.config.ts`
- API Token: Create in Sanity dashboard under API → Tokens

### 2. MapTiler Configuration
```
MAPTILER_KEY=your_maptiler_api_key
```

**How to get:**
- Sign up at [MapTiler](https://www.maptiler.com/)
- Go to Account → API Keys
- Copy your API key

### 3. Cloudinary Configuration
```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**How to get:**
- Sign up at [Cloudinary](https://cloudinary.com/)
- Go to Dashboard → Account Details
- Copy Cloud Name, API Key, and API Secret

### 4. Ionos Hosting Configuration
```
IONOS_HOST=your_ionos_ftp_host
IONOS_USER=your_ionos_ftp_username
IONOS_PASS=your_ionos_ftp_password
```

**How to get:**
- Log into your Ionos control panel
- Go to Hosting → FTP Access
- Note the FTP server, username, and password

### 5. Fasthosts Configuration
```
FASTHOSTS_HOST=your_fasthosts_ftp_host
FASTHOSTS_USER=your_fasthosts_ftp_username
FASTHOSTS_PASS=your_fasthosts_ftp_password
```

**How to get:**
- Log into your Fasthosts control panel
- Go to Hosting → FTP Details
- Note the FTP server, username, and password

### 6. Security & Monitoring (Optional)
```
SNYK_TOKEN=your_snyk_token
```

**How to get:**
- Sign up at [Snyk](https://snyk.io/)
- Go to Account Settings → API Token
- Generate a new token

## Setting Up Secrets in GitHub

1. **Navigate to Repository Settings:**
   - Go to `https://github.com/Explorimentalist/aet-ski`
   - Click on "Settings" tab
   - Click on "Secrets and variables" → "Actions"

2. **Add Each Secret:**
   - Click "New repository secret"
   - Enter the secret name (exactly as shown above)
   - Enter the secret value
   - Click "Add secret"

3. **Verify All Secrets:**
   - Ensure all 11 secrets are listed
   - Double-check spelling and values

## Environment Variables

The following environment variables are automatically set during the build process:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=${{ secrets.SANITY_PROJECT_ID }}
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=${{ secrets.SANITY_API_TOKEN }}
NEXT_PUBLIC_MAPTILER_KEY=${{ secrets.MAPTILER_KEY }}
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${{ secrets.CLOUDINARY_CLOUD_NAME }}
CLOUDINARY_API_KEY=${{ secrets.CLOUDINARY_API_KEY }}
CLOUDINARY_API_SECRET=${{ secrets.CLOUDINARY_API_SECRET }}
NEXT_PUBLIC_APP_URL=https://www.aet.ski
```

## Security Best Practices

1. **Never commit secrets to code**
2. **Use different tokens for different environments**
3. **Rotate secrets regularly**
4. **Use least-privilege access**
5. **Monitor secret usage**

## Testing the Setup

After setting up all secrets:

1. **Trigger a manual workflow:**
   - Go to Actions tab
   - Select "CI/CD Pipeline"
   - Click "Run workflow"

2. **Check the build logs:**
   - Ensure all steps pass
   - Verify deployment succeeds
   - Check health endpoint responds

3. **Verify deployment:**
   - Visit https://www.aet.ski
   - Test key functionality
   - Check https://www.aet.ski/healthz

## Troubleshooting

### Common Issues:

1. **Build fails with "Secret not found"**
   - Double-check secret names match exactly
   - Ensure secrets are added to the correct repository

2. **Deployment fails**
   - Verify FTP credentials are correct
   - Check server directory paths
   - Ensure FTP access is enabled

3. **Health check fails**
   - Wait a few minutes after deployment
   - Check server logs
   - Verify the health endpoint is accessible

### Getting Help:

- Check GitHub Actions logs for detailed error messages
- Verify all external services (Sanity, MapTiler, Cloudinary) are accessible
- Test FTP connections manually if deployment fails

## Next Steps

Once all secrets are configured:

1. ✅ Test the CI/CD pipeline
2. ✅ Verify deployment to both hosts
3. ✅ Set up monitoring and alerts
4. ✅ Configure branch protection rules
5. ✅ Set up automated dependency updates
