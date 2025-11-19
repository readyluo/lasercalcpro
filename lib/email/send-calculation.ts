import nodemailer from 'nodemailer';

interface SendCalculationEmailParams {
  to: string;
  title: string;
  calculationType: string;
  inputData: Record<string, any>;
  results: Record<string, any>;
}

/**
 * Send calculation results via email
 * Note: This is a basic implementation. In production:
 * 1. Use environment variables for SMTP config
 * 2. Consider using a service like Resend, SendGrid, or AWS SES
 * 3. Add email templates
 * 4. Handle attachments (PDF generation)
 */
export async function sendCalculationEmail({
  to,
  title,
  calculationType,
  inputData,
  results,
}: SendCalculationEmailParams): Promise<void> {
  // Create transporter (configure with your SMTP settings)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Format input data for email
  const inputDataHtml = Object.entries(inputData)
    .map(([key, value]) => {
      const formattedKey = key
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      return `<tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${formattedKey}</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${value}</td></tr>`;
    })
    .join('');

  // Format results for email
  const resultsHtml = Object.entries(results)
    .map(([key, value]) => {
      const formattedKey = key
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      const formattedValue = typeof value === 'number' 
        ? value.toLocaleString('en-US', { maximumFractionDigits: 2 })
        : String(value);
      return `<tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${formattedKey}</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${formattedValue}</td></tr>`;
    })
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">LaserCalc Pro</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${title}</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; color: #6b7280;">
          Thank you for using LaserCalc Pro! Here are your calculation results:
        </p>

        <div style="margin: 30px 0;">
          <h2 style="color: #2563eb; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Input Parameters
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${inputDataHtml}
          </table>
        </div>

        <div style="margin: 30px 0;">
          <h2 style="color: #2563eb; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Calculation Results
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${resultsHtml}
          </table>
        </div>

        <div style="margin: 30px 0; padding: 20px; background: #f9fafb; border-left: 4px solid #2563eb; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">
            <strong>Note:</strong> These calculations are estimates based on standard industry formulas and user-provided data. 
            Actual costs may vary depending on specific conditions, equipment efficiency, and other factors.
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://lasercalcpro.com/calculators" 
             style="display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Calculate Again
          </a>
        </div>
      </div>

      <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p style="margin: 5px 0;">
          LaserCalc Pro - Professional Manufacturing Cost Calculators
        </p>
        <p style="margin: 5px 0;">
          <a href="https://lasercalcpro.com" style="color: #2563eb; text-decoration: none;">Visit Website</a> | 
          <a href="https://lasercalcpro.com/privacy" style="color: #2563eb; text-decoration: none;">Privacy Policy</a>
        </p>
      </div>
    </body>
    </html>
  `;

  // Send email
  await transporter.sendMail({
    from: `"LaserCalc Pro" <${process.env.SMTP_FROM || 'noreply@lasercalcpro.com'}>`,
    to,
    subject: `Your ${calculationType} Calculation Results - LaserCalc Pro`,
    html: htmlContent,
    text: `
      LaserCalc Pro - ${title}
      
      Your ${calculationType} calculation results have been generated.
      
      Visit https://lasercalcpro.com to view and download your complete report.
      
      ---
      This is an automated email from LaserCalc Pro.
    `,
  });
}

