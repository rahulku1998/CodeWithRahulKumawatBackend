const Contact = require("../models/Contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);


exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

   // Email to YOU
    await Promise.all([
      resend.emails.send({
        from: "CodeWithRahul <onboarding@resend.dev>",
        to: process.env.EMAIL,
        subject: `New Contact Form: ${subject}`,
        html: `
          <h2>New Contact Request</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      }),

      resend.emails.send({
        from: "CodeWithRahul <onboarding@resend.dev>",
        to: email,
        subject: "We received your message",
        html: `
          <h2>Thank You!</h2>
          <p>Hi ${name},</p>
          <p>We received your message and will reply soon.</p>
          <p>- Rahul Kumawat</p>
        `,
      }),
    ]);


    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};