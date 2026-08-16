// Real transactional email via Resend's SMTP relay, sent through Nodemailer.
// Resend SMTP credentials: host smtp.resend.com, user is literally "resend",
// and the password is your Resend API key (https://resend.com/api-keys).
// Docs: https://resend.com/docs/send-with-smtp
const nodemailer = require("nodemailer");

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to your .env file — see .env.example."
    );
  }

  transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true, // true for port 465 (SSL)
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY
    }
  });

  return transporter;
}

// Sends the OTP email. Kept as its own function (rather than a generic
// "sendEmail") so the HTML template lives in one obvious place.
async function sendOtpEmail({ to, name, otp }) {
  const fromAddress = process.env.EMAIL_FROM || "NutriGuide Pro <onboarding@resend.dev>";

  const html = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background:#fdf8f2; border-radius: 16px;">
    <h2 style="color:#1a2e1a; margin-bottom: 4px;">🥬 NutriGuide Pro</h2>
    <p style="color:#6b7b6b; font-size: 14px; margin-top: 0;">Verify your email address</p>
    <p style="color:#1a2e1a; font-size: 15px;">Hi ${escapeHtml(name)},</p>
    <p style="color:#1a2e1a; font-size: 15px;">
      Use the code below to verify your account. This code expires in
      <strong>10 minutes</strong>.
    </p>
    <div style="text-align:center; margin: 28px 0;">
      <span style="display:inline-block; font-size: 32px; letter-spacing: 8px; font-weight: 800; color:#2d9e6b; background:#e8f5e9; padding: 14px 24px; border-radius: 12px;">
        ${otp}
      </span>
    </div>
    <p style="color:#6b7b6b; font-size: 13px;">
      If you did not create an account with NutriGuide Pro, you can safely ignore this email.
    </p>
  </div>`;

  const text = `Your NutriGuide Pro verification code is ${otp}. It expires in 10 minutes.`;

  const info = await getTransporter().sendMail({
    from: fromAddress,
    to,
    subject: "Your NutriGuide Pro verification code",
    text,
    html
  });

  return info;
}

// Minimal HTML-escaping for values interpolated into the email template.
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = { sendOtpEmail };
