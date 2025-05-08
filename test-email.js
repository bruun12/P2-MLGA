import { sendEmail } from './models/account-model.js';

(async () => {
    try {
        await sendEmail('recipient@example.com', 'Test Subject', 'This is a test email.');
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
})();