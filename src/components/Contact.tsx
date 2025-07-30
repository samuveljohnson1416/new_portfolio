import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle, Clock, CheckCircle, AlertCircle, Code } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjs';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // EmailJS configuration
      const { serviceId, templateId, publicKey } = emailjsConfig;
      
      // Template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Samuvel Johnson',
        reply_to: formData.email,
      };
      
      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      console.log('Email sent successfully!');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'samuveljohnson.cv@gmail.com',
      href: 'mailto:samuveljohnson.cv@gmail.com',
      color: 'text-neon-green',
      description: 'Best way to reach me'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9489322076',
      href: 'tel:+919489322076',
      color: 'text-neon-blue',
      description: 'Available Mon-Fri, 9AM-6PM IST'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Tamil Nadu, India',
      href: '#',
      color: 'text-neon-pink',
      description: 'Open to remote opportunities'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/samuveljohnson1416',
      color: 'hover:text-neon-green',
      username: '@samuveljohnson1416'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/samuvel-johnson',
      color: 'hover:text-neon-blue',
      username: '/in/samuvel-johnson'
    },
    {
      icon: Code, // Using Code icon as LeetCode substitute since lucide-react doesn't have a specific LeetCode icon
      label: 'LeetCode',
      href: 'https://leetcode.com/u/Samuvel_Johnson/',
      color: 'hover:text-yellow-400',
      username: '/u/Samuvel_Johnson'
    }
  ];

  const quickTopics = [
    'Freelance Project',
    'Full-time Opportunity',
    'Collaboration',
    'Mentorship',
    'Other'
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="mb-6 p-4 bg-dark-card border border-neon-green/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center"
          >
            <Mail className="text-neon-green" size={32} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold">
            <span className="text-neon-green">{'<'}</span>
            Contact
            <span className="text-neon-green">{'/>'}</span>
          </h1>
          <p className="text-gray-400 mt-4 font-mono">
            Let's build something amazing together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-dark-card border border-neon-green/20 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="text-neon-green" size={24} />
                <h2 className="text-2xl font-display font-semibold">Send me a message</h2>
              </div>

              {/* Quick Topic Selection */}
              <div className="mb-6">
                <label className="block text-sm font-mono text-gray-300 mb-3">
                  What's this about? (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickTopics.map((topic) => (
                    <motion.button
                      key={topic}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData(prev => ({ ...prev, subject: topic }))}
                      className={`px-3 py-1 text-xs font-mono rounded-full border transition-all duration-300 ${
                        formData.subject === topic
                          ? 'bg-neon-green/20 text-neon-green border-neon-green/40'
                          : 'bg-gray-800 text-gray-400 border-gray-600 hover:border-neon-green/30'
                      }`}
                    >
                      {topic}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-mono text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-dark-bg border rounded-lg focus:outline-none transition-colors font-mono text-sm ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-gray-600 focus:border-neon-green'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs font-mono mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-mono text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-dark-bg border rounded-lg focus:outline-none transition-colors font-mono text-sm ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-gray-600 focus:border-neon-green'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs font-mono mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-mono text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg focus:outline-none transition-colors font-mono text-sm ${
                      errors.subject 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-gray-600 focus:border-neon-green'
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs font-mono mt-1">{errors.subject}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-dark-bg border rounded-lg focus:outline-none transition-colors font-mono text-sm resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-gray-600 focus:border-neon-green'
                    }`}
                    placeholder="Tell me about your project or idea..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs font-mono mt-1">{errors.message}</p>
                  )}
                  <p className="text-gray-500 text-xs font-mono mt-1">
                    {formData.message.length}/500 characters
                  </p>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full px-6 py-3 rounded-lg font-mono font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-neon-green text-dark-bg hover:bg-neon-green/90'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
                    >
                      <CheckCircle size={16} />
                      <span className="font-mono text-sm">Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                    >
                      <AlertCircle size={16} />
                      <span className="font-mono text-sm">Failed to send message. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-dark-card border border-neon-green/20 rounded-lg p-8">
              <h2 className="text-2xl font-display font-semibold mb-6">
                Get in touch
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-dark-bg rounded-lg hover:bg-gray-800/50 transition-all duration-300 group"
                  >
                    <div className={`p-3 rounded-lg bg-gray-800 ${info.color} group-hover:scale-110 transition-transform`}>
                      <info.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-mono text-gray-400">{info.label}</p>
                      <p className="font-mono text-white mb-1">{info.value}</p>
                      <p className="text-xs font-mono text-gray-500">{info.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-dark-card border border-neon-green/20 rounded-lg p-8">
              <h2 className="text-2xl font-display font-semibold mb-6">
                Connect with me
              </h2>
              
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 p-4 bg-dark-bg rounded-lg text-gray-400 ${social.color} transition-all duration-300 hover:shadow-lg group`}
                  >
                    <social.icon size={24} className="group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-mono font-semibold">{social.label}</p>
                      <p className="text-sm font-mono text-gray-500">{social.username}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="bg-dark-card border border-neon-green/20 rounded-lg p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <h3 className="text-lg font-display font-semibold">Available for work</h3>
              </div>
              <p className="text-gray-300 font-mono text-sm leading-relaxed mb-4">
                I'm currently available for freelance projects and full-time opportunities. 
                Let's discuss how we can work together to bring your ideas to life!
              </p>
              
              <div className="flex items-center gap-2 text-sm font-mono text-gray-400">
                <Clock size={16} />
                <span>Usually responds within 24 hours</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;