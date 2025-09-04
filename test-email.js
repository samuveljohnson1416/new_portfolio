// Simple EmailJS test
import emailjs from '@emailjs/browser';

const testEmail = async () => {
  try {
    const result = await emailjs.send(
      'service_9ii8ddg',
      'template_mu6vyuh', 
      {
        from_name: 'Test User',
        from_email: 'test@example.com',
        subject: 'Test Email',
        message: 'This is a test message',
        to_name: 'Samuvel Johnson',
      },
      'Tj5amkNKZDjAiWi6x'
    );
    console.log('✅ SUCCESS:', result);
  } catch (error) {
    console.error('❌ ERROR:', error);
  }
};

testEmail();
