const Freelance = require('../models/Freelance');

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.createFreelance = async (req, res) => {
  try {
    const { name, email, phone, projectDeadline, projectDescription } = req.body;
    const freelance = new Freelance({ name, email, phone, projectDeadline, projectDescription });
    await freelance.save();
    await Promise.all([
  resend.emails.send({
    from: "CodeWithRahul <onboarding@resend.dev>",
    to: process.env.EMAIL,
    subject: "New Freelance Inquiry",
    html: `
      <h2>New Freelance Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Deadline:</strong> ${projectDeadline}</p>
      <p><strong>Description:</strong> ${projectDescription}</p>
    `,
  }),

  resend.emails.send({
    from: "CodeWithRahul <onboarding@resend.dev>",
    to: email,
    subject: "We received your request",
    html: `
      <h2>Thank You for Your Inquiry!</h2>
      <p>Hi ${name},</p>
      <p>We have received your freelance project request.</p>
      <p>I will review your requirements and get back to you shortly.</p>
      <p>Regards,<br/>Rahul Kumawat</p>
    `,
  }),
]);
    res.status(201).json({
      message: 'Freelance request created and email sent successfully',
      data: freelance,
      success: true
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllFreelances = async (req, res) => {
  try {
    const freelances = await Freelance.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'Freelance requests retrieved successfully',
      data: freelances,
      success: true 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
