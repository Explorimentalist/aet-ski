  # AET Ski Website Management Handout

  ## Welcome to Your New Website! 🎿

  This guide will help you manage your AET Ski website without needing technical expertise. Think of this as your website's instruction manual.

  ---

  ## 🗝️ Important: Keys & Credentials

  ### Where to Find Your Login Information
  All your website credentials and API keys are stored in a secure file called `.env.local` in your project folder. **Never share these publicly!**

  **Location**: `/aet-ski/.env.local`

  ### What Each Key Does:
  - **Sanity Keys**: Allow you to edit website content
  - **Cloudinary Keys**: Manage your images and photos
  - **MapTiler Key**: Powers the interactive maps on your site
  - **Resend Keys**: Handles email sending (quotes, confirmations)

  > ⚠️ **Security Tip**: Treat these keys like passwords. Never post them online or share via email.

  ---

  ## 📝 Managing Content with Sanity CMS

  ### What is Sanity?
  Sanity is your website's content management system - think of it as a user-friendly way to edit your website's text, images, and information without touching code.

  ### How to Access Sanity:
  1. **Online Studio**: Visit `https://aet.sanity.studio`
  2. **Local Studio**: Go to `aet.ski/studio`
  3. Log in with your Sanity account

  ### What You Can Edit in Sanity:
  - ✅ **Testimonials**: Customer reviews and feedback
  - ✅ **Route Information**: Ski transfer routes and pricing
  - ✅ **Terms & Conditions**: Legal text and policies
  - ✅ **Contact Details**: Phone numbers, emails, addresses
  - ✅ **Links**: Quick access links and navigation

  ### Adding New Content:

  #### Adding a New Testimonial:
  1. Go to "Testimonials" section in Sanity
  2. Click "Create new"
  3. Fill in:
    - Customer name
    - Review text
    - Star rating (1-5)
    - Date of service
  4. Click "Publish"

  #### Updating Route Information:
  1. Navigate to "Routes" section
  2. Select the route you want to edit
  3. Modify:
    - Route name
    - Pricing
    - Duration
    - Description
  4. Save changes

  > 💡 **Pro Tip**: Always click "Publish" after making changes, or they won't appear on your live website!

  ---

  ## 📧 Email System with Resend

  ### What is Resend?
  Resend handles all email sending from your website - quote confirmations, contact form submissions, and automated messages.

  ### How It Works:
  1. **Customer fills out quote form** → Email sent automatically
  2. **Someone uses contact form** → You receive notification email
  3. **Booking confirmation** → Customer gets confirmation email

  ### Managing Email Templates:
  - Templates are stored in your code (`src/lib/email.ts`)
  - To modify email content, you'll need developer assistance
  - Current email types:
    - Quote requests
    - Booking confirmations
    - Contact form submissions

  ### Monitoring Email Delivery:
  1. Log into your Resend dashboard: `https://resend.com/login`
  2. Check "Logs" section to see:
    - Emails sent successfully
    - Failed deliveries
    - Open rates and click tracking

  > 📬 **Important**: Check your Resend dashboard weekly to ensure emails are delivering properly.

  ---

  ## 🖼️ Managing Images with Cloudinary

  ### What is Cloudinary?
  Cloudinary stores and optimizes all your website's images - logos, photos, route maps, and graphics.

  ### How to Add New Images:

  #### Method 1: Cloudinary Dashboard
  1. Log into Cloudinary: `https://cloudinary.com/console`
  2. Go to "Media Library"
  3. Click "Upload"
  4. Drag and drop your images
  5. Copy the image URL to use in Sanity

  #### Method 2: Through Sanity (Recommended)
  1. In Sanity, find an image field
  2. Click "Upload"
  3. Select your image - it automatically uploads to Cloudinary
  4. Image appears on your website

  ### Image Best Practices:
  - **File formats**: Use JPG for photos, PNG for logos with transparency
  - **File size**: Keep under 2MB for faster loading
  - **Image dimensions**: 
    - Hero images: 1920x1080 pixels
    - Logos: 400x400 pixels maximum
    - Testimonial photos: 300x300 pixels

  ### Organizing Your Images:
  - Create folders in Cloudinary for different image types:
    - `/logos/` - Company and partner logos
    - `/routes/` - Route and destination photos  
    - `/testimonials/` - Customer photos
    - `/general/` - Other website images

  ---

  ## 🌐 Website Hosting

  ### Current Setup: Vercel
  Your website is currently hosted on **Vercel**, which provides:
  - ✅ Fast global delivery
  - ✅ Automatic SSL certificates (secure https://)
  - ✅ Automatic deployments from GitHub
  - ✅ Built-in performance monitoring

  ### Future Migration: IONOS
  **Target Goal**: Move hosting to IONOS for cost savings and local support

  #### Why Migrate to IONOS?
  - European-based support
  - Local data storage compliance
  - Dedicated support in multiple languages

  #### Migration Timeline:
  - **Phase 1**: Test deployment on IONOS staging
  - **Phase 2**: DNS migration planning
  - **Phase 3**: Live migration with minimal downtime
  - **Phase 4**: Monitor performance and optimize

  > 🚀 **Current Status**: Website runs smoothly on Vercel. IONOS migration planned for OCT 2025.

  ---

  ## 📁 GitHub: Your Website's Backbone

  ### What is GitHub?
  GitHub stores all your website's code and automatically updates your live site when changes are made.

  ### Getting a Copy of Your Website Code (Cloning)

  Sometimes you might need to download a complete copy of your website's code to your computer. This is called "cloning" the repository.

  #### When You Might Need This:
  - Setting up the website on a new computer
  - Making local backups of your code
  - Working with a developer who needs access
  - Testing changes before they go live

  #### How to Clone Your Repository:

  **Prerequisites** (one-time setup):
  1. **Install Git**: Download from `https://git-scm.com/downloads`
  2. **GitHub Account**: Ensure you have access to the repository
  3. **Terminal/Command Prompt**: Use your computer's command line tool

  **Step-by-Step Cloning Process:**

  1. **Open Terminal/Command Prompt**
    - **Mac**: Press `Cmd + Space`, type "Terminal"
    - **Windows**: Press `Win + R`, type "cmd"

  2. **Navigate to Where You Want the Code**
    ```bash
    cd Desktop
    # This puts the code folder on your Desktop
    ```

  3. **Clone the Repository**
    ```bash
    git clone https://github.com/Explorimentalist/aet-ski.git
    ```

  4. **Enter the Project Folder**
    ```bash
    cd aet-ski
    ```

  5. **Install Dependencies** (needed to run the website locally)
    ```bash
    npm install
    ```

  #### What You'll Get:
  After cloning, you'll have a folder called `aet-ski` containing:
  - All your website's code files
  - Configuration files
  - This handout document
  - Development tools and scripts

  #### Running the Website Locally:
  Once cloned, you can run the website on your computer:
  ```bash
  npm run dev
  ```
  Then visit `http://localhost:3000` in your browser to see your website running locally.

  > 💡 **Tip**: Local development is useful for testing changes before they go live on your actual website.

  ### How GitHub Powers Your Hosting:
  ```
  Developer makes changes → Pushes to GitHub → Vercel automatically deploys → Live website updates
  ```

  ### What You Need to Know:
  - **Repository**: `your-username/aet-ski` contains all website code
  - **Branches**: 
    - `main` - Live website code
    - `development` - Testing new features
  - **Automatic Deployments**: Every code change triggers automatic website update

  ### GitHub Access:
  - **Repository URL**: `https://github.com/Explorimentalist/aet-ski`
  - **Access Level**: You have admin access to monitor changes
  - **Notifications**: Enable email notifications for deployments

  ### What to Monitor:
  1. **Successful Deployments**: Green checkmarks = website updated successfully
  2. **Failed Deployments**: Red X = issue needs developer attention  
  3. **Recent Changes**: See what was recently modified

  > 🔄 **Automation**: GitHub + Vercel means your website updates automatically when code changes. No manual uploading needed!

  ---

  ## 🛠️ Day-to-Day Website Management

  ### Weekly Tasks:
  - [ ] Check Sanity for any content updates needed
  - [ ] Review Resend email logs for delivery issues
  - [ ] Verify website is loading correctly
  - [ ] Check for any customer messages or reviews

  ### Monthly Tasks:
  - [ ] Review Cloudinary storage usage
  - [ ] Check website performance with Google PageSpeed Insights
  - [ ] Update testimonials if new reviews received
  - [ ] Review and update route pricing if needed

  ### Quarterly Tasks:
  - [ ] Full content audit - check all pages for accuracy
  - [ ] Review and update terms & conditions
  - [ ] Analyze website traffic and conversion rates
  - [ ] Plan any seasonal content updates

  ---

  ## 🆘 Troubleshooting Common Issues

  ### Website Not Loading:
  1. Check Vercel dashboard for deployment status
  2. Verify domain name settings
  3. Contact hosting support if issue persists

  ### Images Not Displaying:
  1. Check Cloudinary media library
  2. Verify image URLs in Sanity
  3. Clear browser cache and refresh

  ### Emails Not Sending:
  1. Check Resend dashboard for error messages
  2. Verify email templates are correctly configured
  3. Check spam folders for test emails

  ### Content Changes Not Appearing:
  1. Ensure you clicked "Publish" in Sanity
  2. Wait 2-3 minutes for cache to update
  3. Try refreshing the page in incognito mode

  ---

  ## 📞 Getting Help

  ### Self-Service Resources:
  - **Sanity Help**: `https://sanity.io/help`
  - **Cloudinary Docs**: `https://cloudinary.com/documentation`
  - **Resend Support**: `https://resend.com/docs`

  ### When to Contact Your Developer:
  - Code changes or new features
  - Complex integration issues
  - Performance optimization
  - Security updates
  - IONOS migration planning

  ### Emergency Contacts:
  - **Developer**: +44 07 592 659 046
  - **Vercel Support**: For hosting emergencies
  - **Domain Registrar**: For domain-related issues

  ---

  ## 📈 Performance Monitoring

  ### Key Metrics to Watch:
  - **Page Load Speed**: Should be under 3 seconds
  - **Uptime**: Website should be available 99.9% of the time
  - **Email Delivery Rate**: 95%+ emails should deliver successfully
  - **Mobile Performance**: Website should work perfectly on phones

  ### Tools for Monitoring:
  - **Google PageSpeed Insights**: Check website speed
  - **Vercel Analytics**: Monitor traffic and performance
  - **Resend Dashboard**: Track email performance
  - **Google Analytics**: Understand visitor behavior

  ---

  ## 🎯 Success Tips

  ### Best Practices:
  1. **Regular Updates**: Keep content fresh and current
  2. **Image Quality**: Use high-quality, properly-sized images
  3. **Mobile First**: Always test changes on mobile devices
  4. **Backup Mindset**: Sanity automatically backs up your content
  5. **Stay Organized**: Use consistent naming for images and content

  ### Content Strategy:
  - Update testimonials monthly with fresh reviews
  - Seasonal content updates (winter vs summer skiing)
  - Regular route information and pricing reviews
  - Keep contact information current

  ---

  *This handout is your guide to confidently managing your AET Ski website. Keep it handy and don't hesitate to reach out if you need help!* 🎿✨