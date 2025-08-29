# AET.ski App Architecture & Infrastructure Explanation

## Overview
This document explains how the different parts of your AET.ski website work together, from the database to hosting, and how to access the various services.

## 🏗️ **How the App is Built**

### Frontend (What Visitors See)
- **Next.js 15** - Modern React framework for fast, SEO-friendly websites
- **React 19** - User interface library for interactive components
- **Tailwind CSS** - Utility-first CSS framework for consistent, beautiful styling
- **Motion** - Smooth animations and transitions throughout the site

### Key Features
- **Multi-step booking form** - Guides customers through the transfer booking process
- **Interactive route maps** - Shows transfer routes using MapTiler
- **Dynamic content management** - Easy updates through Sanity CMS
- **Responsive design** - Works perfectly on all devices (mobile, tablet, desktop)

---

## 🗄️ **Database & Content Management (Sanity)**

### What is Sanity?
Sanity is your **content management system (CMS)** - think of it as a digital filing cabinet where you can easily update:
- Transfer routes and prices
- Customer testimonials
- Company information
- Images and logos
- Contact details

### How It Connects to Your App
1. **Content Creation**: You log into Sanity Studio at `aet-ski.com/studio`
2. **Data Storage**: All content is stored in Sanity's cloud database
3. **Real-time Updates**: Changes appear on your website immediately
4. **API Integration**: Your website fetches content from Sanity automatically

### Your Sanity Project Details
- **Project ID**: `hns0qja9`
- **Dataset**: `production`
- **Studio URL**: `aet-ski.com/studio`

---

## 📧 **Email Service (Resend)**

### What is Resend?
Resend handles all email communications from your website:
- **Quote confirmations** - Sent when customers request transfers
- **Booking confirmations** - Sent when transfers are confirmed
- **Contact form notifications** - Sent when customers contact you
- **Error notifications** - Sent if something goes wrong

### How It Works
1. Customer fills out a form on your website
2. Your website sends the data to Resend's API
3. Resend delivers the email to the customer
4. You receive a copy of all communications

---

## 🗺️ **Maps & Location Services (MapTiler)**

### What is MapTiler?
MapTiler provides the interactive maps showing:
- Transfer routes from airports to ski resorts
- Distance and travel time calculations
- Visual representation of your service area

### How It Connects
- Maps are embedded directly in your website
- Real-time route calculations
- Professional, branded appearance

---

## ☁️ **Media Management (Cloudinary)**

### What is Cloudinary?
Cloudinary stores and optimizes all your images:
- Company logos
- Route images
- Website graphics
- Automatically creates different sizes for different devices

---

## 🔄 **Current Hosting vs. Target Hosting**

### **Current: Vercel (Temporary)**
- **What**: Vercel is a modern hosting platform that's currently hosting your site
- **Why Temporary**: While excellent for development, it's not your final hosting solution
- **Limitations**: Not optimized for your specific business needs

### **Target: Ionos (Your Final Host)**
- **What**: Ionos is a professional hosting provider with servers in Europe
- **Benefits**: 
  - Better performance for European customers
  - More control over your hosting environment
  - Professional support for business websites
  - Better pricing for long-term hosting

---

## 📚 **Code Management (GitHub)**

### What is GitHub?
GitHub is where all your website code is stored and managed:
- **Version Control**: Tracks every change made to your website
- **Collaboration**: Multiple developers can work on the project
- **Backup**: Your code is safely stored in the cloud
- **Deployment**: Changes can be automatically deployed to your hosting

### How It Works
1. **Code Repository**: All your website files are stored in a GitHub repository
2. **Development**: Changes are made in "branches" before going live
3. **Review Process**: Changes are reviewed before being applied
4. **Automatic Deployment**: When approved, changes automatically go live

---

## 🔐 **How to Access Each Service**

### 1. **Sanity CMS Access**
- **URL**: Go to `aet-ski.com/studio`
- **Login**: Use the credentials provided by your development team
- **What You Can Do**: Update routes, prices, testimonials, company info

### 2. **Resend Email Service**
- **Access**: Your development team will provide you with:
  - Resend account login credentials
  - API keys for sending emails
  - Dashboard to monitor email delivery
- **What You Can Do**: View email logs, manage email templates, monitor delivery rates

### 3. **GitHub Repository Access**
- **Access**: Your development team will provide you with:
  - GitHub account access
  - Repository access permissions
  - Instructions for viewing code changes
- **What You Can Do**: View code history, track changes, understand what's being built

### 4. **Hosting Access (Ionos)**
- **Access**: Your development team will provide you with:
  - Ionos hosting control panel access
  - FTP/SFTP credentials for file uploads
  - Domain management access
- **What You Can Do**: Monitor website performance, manage domain settings

---

## 🔄 **How Everything Works Together**

### Daily Operations Flow
1. **Customer visits** your website at `aet-ski.com`
2. **Website loads** content from Sanity database
3. **Customer books** a transfer through your booking form
4. **Form data** is processed and stored
5. **Confirmation email** is sent via Resend
6. **You receive** notification of the booking
7. **Maps show** the exact route and pricing

### Content Updates Flow
1. **You log into** Sanity Studio
2. **You update** route prices, add testimonials, change company info
3. **Changes appear** on your website immediately
4. **No technical knowledge** required - just type and save

---

## 🚀 **Migration from Vercel to Ionos**

### What This Means for You
- **No downtime**: Your website will remain accessible during the move
- **Better performance**: Faster loading times for European customers
- **More control**: You'll have direct access to your hosting environment
- **Professional support**: Ionos provides business-grade hosting support

### Timeline
- **Phase 1**: Set up Ionos hosting environment
- **Phase 2**: Test everything works perfectly
- **Phase 3**: Switch domain to point to Ionos
- **Phase 4**: Monitor performance and optimize

---

## 💡 **Benefits of This Architecture**

### For Your Business
- **Easy Updates**: Change prices, routes, and content without technical help
- **Professional Appearance**: Modern, fast-loading website
- **Customer Experience**: Smooth booking process with instant confirmations
- **Scalability**: Can easily add new features as your business grows

### For Your Customers
- **Fast Loading**: Optimized for quick page loads
- **Mobile Friendly**: Works perfectly on all devices
- **Easy Booking**: Simple, step-by-step transfer booking
- **Instant Communication**: Immediate email confirmations

---

## 🆘 **Support & Maintenance**

### What You Can Do Yourself
- Update content through Sanity Studio
- Monitor email delivery through Resend
- View website analytics through Ionos

### What Requires Technical Support
- Adding new website features
- Changing website design
- Technical troubleshooting
- Performance optimization

---

## 📞 **Next Steps**

1. **Review this document** and ask any questions
2. **Receive access credentials** for each service
3. **Training session** on how to use Sanity Studio
4. **Migration planning** from Vercel to Ionos
5. **Go-live** with your new, optimized website

---

## ❓ **Questions & Support**

If you have any questions about:
- How any part of the system works
- How to access any service
- What you can and cannot change
- The migration process

**Please ask!** Your development team is here to ensure you understand everything and can manage your website effectively.

---

*This document will be updated as your website evolves and new features are added.*
