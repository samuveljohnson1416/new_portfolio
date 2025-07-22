# Contact Form Email Setup Guide

## Option 1: EmailJS Setup (Recommended for Frontend-only)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### Step 2: Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID**

### Step 3: Create an Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: {{subject}} - Portfolio Contact Form

Hello Samuvel,

You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website.
Reply directly to: {{reply_to}}
```

4. Save the template and note down the **Template ID**

### Step 4: Get Your Public Key
1. Go to "Account" in your dashboard
2. Find your **Public Key** (User ID)

### Step 5: Update Configuration
1. Open `src/config/emailjs.ts`
2. Replace the placeholder values:
   - `YOUR_SERVICE_ID` with your actual Service ID
   - `YOUR_TEMPLATE_ID` with your actual Template ID  
   - `YOUR_PUBLIC_KEY` with your actual Public Key

### Step 6: Test the Form
1. Start your development server: `npm run dev`
2. Go to the Contact page
3. Fill out and submit the form
4. Check your email inbox!

---

## Option 2: Environment Variables (For Production)

Create a `.env.local` file in your project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then uncomment the environment variable configuration in `emailjs.ts`.

---

## Alternative Options

### Option 3: Formspree (Simple)
1. Go to [Formspree.io](https://formspree.io/)
2. Create a form and get the endpoint
3. Update the form action to POST to the Formspree endpoint

### Option 4: Netlify Forms (If hosting on Netlify)
1. Add `netlify` attribute to your form
2. Add a hidden input: `<input type="hidden" name="form-name" value="contact" />`
3. Netlify will handle form submissions automatically

### Option 5: Custom Backend
1. Create a Node.js/Express server
2. Use nodemailer to send emails
3. Deploy to services like Vercel, Railway, or Heroku

---

## Security Notes

- Never expose sensitive credentials in your frontend code
- Use environment variables for production
- Consider rate limiting to prevent spam
- Add CAPTCHA for additional security

---

## Troubleshooting

**Form not sending emails?**
- Check browser console for errors
- Verify EmailJS credentials are correct
- Make sure template variables match
- Check spam folder for test emails

**Getting CORS errors?**
- Make sure you're using the correct EmailJS domain
- Check if your EmailJS service is active

**Need help?**
- Check EmailJS documentation
- Test with simple HTML form first
- Contact EmailJS support if needed
