// Email Service - Graceful degradation for Cloudflare
// Note: Nodemailer requires Node.js runtime. For Cloudflare Workers, use alternative email services.

const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@lasercalcpro.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lasercalcpro.com';

// Check if email service is available
function isEmailServiceAvailable(): boolean {
  // Check if we're in Node.js environment with SMTP configured
  return !!(
    typeof process !== 'undefined' &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    typeof require !== 'undefined'
  );
}

// Lazy load nodemailer only when available
async function getTransporter() {
  if (!isEmailServiceAvailable()) {
    throw new Error('Email service not available in this environment');
  }

  try {
    // Dynamic import for Node.js environments only
    const nodemailer = await import('nodemailer');
    
    const SMTP_CONFIG = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    return nodemailer.default.createTransporter(SMTP_CONFIG);
  } catch (error) {
    console.warn('Failed to load email service:', error);
    throw new Error('Email service not available');
  }
}

/**
 * Send subscription confirmation email
 */
export async function sendSubscriptionConfirmationEmail(
  email: string,
  name: string | null,
  token: string
): Promise<boolean> {
  // Graceful degradation: skip if email service not available
  if (!isEmailServiceAvailable()) {
    console.log('📧 Email service not configured - skipping confirmation email');
    return false;
  }

  try {
    const transport = await getTransporter();
    const confirmUrl = `${SITE_URL}/api/subscribe/confirm?token=${token}`;

    const mailOptions = {
      from: `"LaserCalc Pro" <${EMAIL_FROM}>`,
      to: email,
      subject: 'Confirm Your Subscription - LaserCalc Pro',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirm Your Subscription</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">LaserCalc Pro</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0;">Manufacturing Cost Calculators</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #667eea; margin-top: 0;">Welcome${name ? ` ${name}` : ''}!</h2>
            
            <p>Thank you for subscribing to LaserCalc Pro updates. We're excited to have you join our community of manufacturing professionals!</p>
            
            <p>To complete your subscription and start receiving our valuable content, please confirm your email address by clicking the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Confirm My Subscription
              </a>
            </div>
            
            <p style="font-size: 14px; color: #718096;">Or copy and paste this link into your browser:</p>
            <p style="font-size: 13px; color: #667eea; word-break: break-all; background: #f7fafc; padding: 10px; border-radius: 5px;">
              ${confirmUrl}
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <h3 style="color: #2d3748; font-size: 18px;">What You'll Get:</h3>
              <ul style="color: #4a5568;">
                <li>Latest manufacturing cost calculation tips</li>
                <li>New calculator tools and features</li>
                <li>Industry insights and best practices</li>
                <li>Exclusive content for subscribers</li>
              </ul>
            </div>
          </div>
          
          <div style="background: #f7fafc; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="margin: 0; color: #718096; font-size: 14px;">
              This email was sent because you subscribed to LaserCalc Pro at ${SITE_URL}
            </p>
            <p style="margin: 10px 0 0 0; color: #a0aec0; font-size: 12px;">
              If you didn't subscribe, you can safely ignore this email.
            </p>
            <p style="margin: 10px 0 0 0;">
              <a href="${SITE_URL}" style="color: #667eea; text-decoration: none;">Visit LaserCalc Pro</a>
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome${name ? ` ${name}` : ''}!

Thank you for subscribing to LaserCalc Pro updates. We're excited to have you join our community of manufacturing professionals!

To complete your subscription, please confirm your email address by clicking this link:
${confirmUrl}

What You'll Get:
- Latest manufacturing cost calculation tips
- New calculator tools and features
- Industry insights and best practices
- Exclusive content for subscribers

This email was sent because you subscribed to LaserCalc Pro at ${SITE_URL}
If you didn't subscribe, you can safely ignore this email.

Visit us: ${SITE_URL}
      `.trim(),
    };

    await transport.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return false;
  }
}

/**
 * Send welcome email after confirmation
 */
export async function sendWelcomeEmail(
  email: string,
  name: string | null
): Promise<boolean> {
  // Graceful degradation: skip if email service not available
  if (!isEmailServiceAvailable()) {
    console.log('📧 Email service not configured - skipping welcome email');
    return false;
  }

  try {
    const transport = await getTransporter();

    const mailOptions = {
      from: `"LaserCalc Pro" <${EMAIL_FROM}>`,
      to: email,
      subject: 'Welcome to LaserCalc Pro! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to LaserCalc Pro</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome!</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0;">You're now subscribed to LaserCalc Pro</p>
          </div>
          
          <div style="background: #ffffff; padding: 40px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #667eea; margin-top: 0;">Hi${name ? ` ${name}` : ''}!</h2>
            
            <p><strong>Your subscription is confirmed!</strong></p>
            
            <p>We're thrilled to have you as part of the LaserCalc Pro community. You're now set to receive the latest updates, tips, and tools to help you optimize your manufacturing costs.</p>
            
            <div style="background: #f7fafc; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0;">
              <h3 style="margin-top: 0; color: #2d3748;">Get Started with Our Calculators:</h3>
              <ul style="color: #4a5568; margin-bottom: 0;">
                <li><a href="${SITE_URL}/calculators/laser-cutting" style="color: #667eea; text-decoration: none;">Laser Cutting Calculator</a></li>
                <li><a href="${SITE_URL}/calculators/cnc-machining" style="color: #667eea; text-decoration: none;">CNC Machining Estimator</a></li>
                <li><a href="${SITE_URL}/calculators/roi" style="color: #667eea; text-decoration: none;">Equipment ROI Calculator</a></li>
                <li><a href="${SITE_URL}/calculators/energy" style="color: #667eea; text-decoration: none;">Energy Cost Calculator</a></li>
                <li><a href="${SITE_URL}/calculators/material-utilization" style="color: #667eea; text-decoration: none;">Material Utilization Calculator</a></li>
              </ul>
            </div>
            
            <p>Have questions or feedback? We'd love to hear from you! Simply reply to this email.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${SITE_URL}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Explore Calculators
              </a>
            </div>
          </div>
          
          <div style="background: #f7fafc; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="margin: 0; color: #718096; font-size: 14px;">
              © ${new Date().getFullYear()} LaserCalc Pro. All rights reserved.
            </p>
            <p style="margin: 10px 0 0 0; color: #a0aec0; font-size: 12px;">
              You're receiving this because you subscribed at ${SITE_URL}
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
Hi${name ? ` ${name}` : ''}!

Your subscription is confirmed!

We're thrilled to have you as part of the LaserCalc Pro community. You're now set to receive the latest updates, tips, and tools to help you optimize your manufacturing costs.

Get Started with Our Calculators:
- Laser Cutting Calculator: ${SITE_URL}/calculators/laser-cutting
- CNC Machining Estimator: ${SITE_URL}/calculators/cnc-machining
- Equipment ROI Calculator: ${SITE_URL}/calculators/roi
- Energy Cost Calculator: ${SITE_URL}/calculators/energy
- Material Utilization Calculator: ${SITE_URL}/calculators/material-utilization

Have questions or feedback? We'd love to hear from you! Simply reply to this email.

Explore Calculators: ${SITE_URL}

© ${new Date().getFullYear()} LaserCalc Pro. All rights reserved.
You're receiving this because you subscribed at ${SITE_URL}
      `.trim(),
    };

    await transport.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
}

/**
 * Verify SMTP connection
 */
export async function verifyEmailConnection(): Promise<boolean> {
  if (!isEmailServiceAvailable()) {
    console.log('📧 Email service not configured');
    return false;
  }

  try {
    const transport = await getTransporter();
    await transport.verify();
    console.log('✅ Email service is ready');
    return true;
  } catch (error) {
    console.error('❌ Email service error:', error);
    return false;
  }
}

