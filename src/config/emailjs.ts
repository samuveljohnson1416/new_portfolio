// EmailJS Configuration - Using Environment Variables for Security
// The actual values are stored in .env.local file which is not committed to Git

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

// Fallback values for development (remove these in production)
if (!emailjsConfig.serviceId) {
  console.warn('EmailJS credentials not found in environment variables');
}

// For production, consider using environment variables:
// export const emailjsConfig = {
//   serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
//   templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//   publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
// };
