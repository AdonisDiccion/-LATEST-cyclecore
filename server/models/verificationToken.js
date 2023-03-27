import mongoose from "mongoose";

const VerificationTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: "2h", // expires after 2 hours
    },
  },
  { timestamps: true }
);

const VerificationToken = mongoose.model(
  "VerificationToken",
  VerificationTokenSchema
);

export const sendVerificationEmail = async (email, firstname, token) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Email Verification",
    html: `Hello ${firstname}, <br/><br/>
    Thank you for registering with us. Please verify your email by clicking the following link: 
    <a href="${process.env.CLIENT_URL}/verify-email/${token}">${process.env.CLIENT_URL}/verify-email/${token}</a><br/><br/>
    This link will expire in 2 hours. <br/><br/>
    Best regards,<br/>
    Your App Name`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (err) {
    console.log(err);
  }
};

export default VerificationToken;
