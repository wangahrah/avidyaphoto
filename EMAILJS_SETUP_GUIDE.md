# EmailJS Setup Guide for Avidya Photo Booking Form

This guide explains how to set up EmailJS to receive email notifications when users submit booking requests through your photography website.

## Why EmailJS?

EmailJS is the recommended solution for your Vue.js booking form because:

✅ **Free Tier**: 200 emails/month (perfect for a photography portfolio)  
✅ **No Backend Required**: Works directly from your Vue.js frontend  
✅ **Easy Integration**: Designed for static sites and SPAs  
✅ **Reliable**: Used by 25,000+ developers worldwide  
✅ **Professional**: Emails sent from your actual email address  
✅ **Secure**: No sensitive API keys exposed in frontend code  

## Alternative Options Considered

| Service | Free Tier | Status | Notes |
|---------|-----------|--------|-------|
| **EmailJS** | 200 emails/month | ✅ Active | **Recommended** |
| Formspree | 50 submissions/month | ✅ Active | Good alternative |
| SendGrid | 100 emails/day | ❌ Retiring May 27, 2025 | Will require paid plan |

## Setup Instructions

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up Free"
3. Create your account and verify your email address
4. You'll be taken to the EmailJS dashboard

### Step 2: Connect Your Email Service

1. In the EmailJS dashboard, navigate to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP** (for business emails)
4. Follow the authentication process for your chosen service
5. **Important**: Copy and save your **Service ID** (you'll need this later)
   - It will look like: `service_abc123xyz`

### Step 3: Create Email Template

1. Go to **"Email Templates"** in the EmailJS dashboard
2. Click **"Create New Template"**
3. Set up your template with these details:

#### Template Configuration:

**To Email**: `your-email@example.com` (where you want to receive bookings)

**Subject**:
```
New Booking Request from {{from_name}}
```

**Content**:
```html
<h2>New Photography Booking Request</h2>

<p>You have received a new booking request through your website:</p>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Name:</td>
    <td style="border: 1px solid #ddd; padding: 8px;">{{from_name}}</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Email:</td>
    <td style="border: 1px solid #ddd; padding: 8px;">{{from_email}}</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Phone:</td>
    <td style="border: 1px solid #ddd; padding: 8px;">{{phone}}</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Service Type:</td>
    <td style="border: 1px solid #ddd; padding: 8px;">{{service_type}}</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Preferred Date:</td>
    <td style="border: 1px solid #ddd; padding: 8px;">{{preferred_date}}</td>
  </tr>
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Preferred Time:</td>
    <td style="border: 1px solid #ddd; padding: 8px;">{{preferred_time}}</td>
  </tr>
</table>

<h3>Message:</h3>
<p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #c7b299;">
  {{message}}
</p>

<hr>
<p><small>This email was sent from your Avidya Photo website booking form.</small></p>
```

4. **Important**: Copy and save your **Template ID** (you'll need this later)
   - It will look like: `template_xyz789abc`

### Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in the EmailJS dashboard
2. Find the **"Public Key"** section
3. **Copy your Public Key** (it will look like: `abc123XYZ789_`)

### Step 5: Update Your Code

In your `BookingView.vue` file, replace the placeholder values:

```javascript
await emailjs.send(
  'service_YOUR_ACTUAL_ID',    // Replace with your Service ID
  'template_YOUR_ACTUAL_ID',   // Replace with your Template ID  
  templateParams,
  'YOUR_ACTUAL_PUBLIC_KEY'     // Replace with your Public Key
)
```

**Example of what it should look like**:
```javascript
await emailjs.send(
  'service_abc123xyz',
  'template_xyz789abc',
  templateParams,
  'abc123XYZ789_'
)
```

## Testing Your Setup

### Test the Integration:

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Navigate to your booking page in the browser
3. Fill out the form completely with test data
4. Submit the form
5. Check your email inbox for the booking notification

### Troubleshooting:

**If emails aren't being sent:**

1. **Check browser console** for errors
2. **Verify all IDs are correct** (Service ID, Template ID, Public Key)
3. **Ensure your email service is properly connected** in EmailJS dashboard
4. **Check your spam folder** for test emails
5. **Verify template variables match** the templateParams in your code

**Common Issues:**

- **403 Forbidden**: Usually means incorrect Service ID or Template ID
- **401 Unauthorized**: Usually means incorrect Public Key
- **Template variables not showing**: Check that template variable names match exactly

## Security Notes

- ✅ EmailJS Public Keys are **safe to expose** in frontend code
- ✅ No sensitive credentials are stored in your repository
- ✅ EmailJS handles rate limiting to prevent spam
- ✅ Form includes client-side validation

## Production Deployment

When deploying to production:

1. **No additional configuration needed** - EmailJS works the same in production
2. **Domain allowlist**: Optionally add your domain to EmailJS allowlist for extra security
3. **Monitor usage**: Keep track of your monthly email count in EmailJS dashboard

## Usage Limits

**Free Plan**: 200 emails/month
- Perfect for a photography portfolio website
- Monitor usage in EmailJS dashboard
- Upgrade to paid plan if needed (starts at $20/month for 2,000 emails)

## Support Resources

- **EmailJS Documentation**: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **Vue.js Integration Guide**: [https://www.emailjs.com/docs/examples/vuejs/](https://www.emailjs.com/docs/examples/vuejs/)
- **EmailJS Support**: Contact through their dashboard if issues arise

## Future Enhancements

Consider these improvements later:

1. **Auto-Reply**: Set up automatic confirmation emails to clients
2. **reCAPTCHA**: Add spam protection for public forms
3. **Multiple Templates**: Different templates for different service types
4. **Email Analytics**: Track open rates and engagement

---

## Quick Reference

Once set up, you only need these three values in your code:

```javascript
// Replace these with your actual values from EmailJS dashboard
const SERVICE_ID = 'service_YOUR_ID';
const TEMPLATE_ID = 'template_YOUR_ID';  
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

---

**Created**: January 2025  
**Last Updated**: January 2025  
**Status**: Ready for implementation
