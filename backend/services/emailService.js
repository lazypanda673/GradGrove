const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendRiskAlertNotification(student, prediction, counselor) {
    const subject = `🚨 Risk Alert: ${student.personalInfo.firstName} ${student.personalInfo.lastName}`;
    
    const html = `
      <h2>Student Risk Alert</h2>
      <p><strong>Student:</strong> ${student.personalInfo.firstName} ${student.personalInfo.lastName} (${student.studentId})</p>
      <p><strong>Risk Level:</strong> ${prediction.riskLevel}</p>
      <p><strong>Risk Score:</strong> ${(prediction.riskScore * 100).toFixed(1)}%</p>
      <p><strong>Key Factors:</strong></p>
      <ul>
        ${prediction.importantFactors.slice(0, 3).map(factor => 
          `<li>${factor.feature}: ${(factor.importance * 100).toFixed(1)}% importance</li>`
        ).join('')}
      </ul>
      <p><strong>Recommendations:</strong></p>
      <ul>
        ${prediction.recommendations.map(rec => `<li>${rec}</li>`).join('')}
      </ul>
      <br>
      <p>Please schedule an intervention meeting with the student.</p>
    `;

    return this.sendEmail(counselor.email, subject, html);
  }

  async sendWelcomeEmail(user) {
    const subject = 'Welcome to GradGrove - Student Success Platform';
    
    const html = `
      <h2>Welcome to GradGrove, ${user.firstName}!</h2>
      <p>Your account has been successfully created with role: <strong>${user.role}</strong></p>
      <p>You can now access the GradGrove platform to monitor student progress and identify at-risk students.</p>
      <br>
      <p>Best regards,<br>GradGrove Team</p>
    `;

    return this.sendEmail(user.email, subject, html);
  }

  async sendEmail(to, subject, html) {
    try {
      const mailOptions = {
        from: `"GradGrove" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }
}

module.exports = new EmailService();