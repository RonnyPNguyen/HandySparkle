const nodemailer = require("nodemailer");

// Email transporter setup using environment variables
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// CORS headers
const headers = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Allow-Methods": "OPTIONS,POST",
	"Content-Type": "application/json",
};

exports.handler = async (event) => {
	// Handle CORS preflight
	if (event.httpMethod === "OPTIONS") {
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({ message: "CORS preflight OK" }),
		};
	}

	// Only allow POST
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			headers,
			body: JSON.stringify({ message: "Method Not Allowed" }),
		};
	}

	// Parse JSON body
	let body;
	try {
		body = JSON.parse(event.body);
	} catch (error) {
		console.error("JSON parsing error:", error);
		return {
			statusCode: 400,
			headers,
			body: JSON.stringify({ message: "Invalid JSON in request body" }),
		};
	}

	// Destructure input fields
	const {
		customerName,
		customerPhone,
		customerEmail,
		serviceType,
		bedrooms,
		bathrooms,
		kitchens,
		livingRooms,
		floors,
		serviceDate,
		rate,
		total,
		duration,
		specialRequest,
	} = body;

	var durationHour = Math.floor(duration / 60);
	var durationMinute = Math.round((duration % 1) * 60);

	// Basic validation (optional)
	if (!customerName || !customerPhone || !serviceType || !serviceDate) {
		return {
			statusCode: 400,
			headers,
			body: JSON.stringify({ message: "Missing required fields" }),
		};
	}

	// Build email content
	const subject = `Website Booking | ${customerName} | ${customerPhone} | ${serviceDate}`;
	const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; background-color: #f9f9f9;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="logo.svg" alt="HandySparkle" style="max-width: 200px;">
      <h2 style="color: #333;">Booking Confirmation</h2>
    </div>
  
    <p style="font-size: 16px;">Dear ${customerName},</p>
    <p style="font-size: 15px; color: #333;">Thank you for your booking request! Below are the details we’ve received:</p>
  
    <h3 style="color: #2c3e50;">Booking Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px;">Type of Service:</td><td style="padding: 8px;"><strong>${serviceType}</strong></td></tr>
      <tr><td style="padding: 8px;">Bedrooms:</td><td style="padding: 8px;">${bedrooms}</td></tr>
      <tr><td style="padding: 8px;">Bathrooms:</td><td style="padding: 8px;">${bathrooms}</td></tr>
      <tr><td style="padding: 8px;">Kitchens:</td><td style="padding: 8px;">${kitchens}</td></tr>
      <tr><td style="padding: 8px;">Living Rooms:</td><td style="padding: 8px;">${livingRooms}</td></tr>
      <tr><td style="padding: 8px;">Floors:</td><td style="padding: 8px;">${floors}</td></tr>
      <tr><td style="padding: 8px;">Date of Service:</td><td style="padding: 8px;">${serviceDate}</td></tr>
    </table>
  
    <h3 style="color: #2c3e50;">Quote Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px;">Estimated Duration:</td><td style="padding: 8px;">${durationHour} hours ${durationMinute} minutes</td></tr>
      <tr><td style="padding: 8px;">Estimated Total:</td><td style="padding: 8px;">AU$${total}</td></tr>
    </table>
  
    <h3 style="color: #2c3e50;">Special Request</h3>
    <p style="padding: 8px; background: #fff; border: 1px solid #eee;">${specialRequest}</p>
  
    <h3 style="color: #2c3e50;">Contact Information</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px;">Name:</td><td style="padding: 8px;">${customerName}</td></tr>
      <tr><td style="padding: 8px;">Phone:</td><td style="padding: 8px;">${customerPhone}</td></tr>
      <tr><td style="padding: 8px;">Email:</td><td style="padding: 8px;">${customerEmail}</td></tr>
    </table>
  
    <p style="margin-top: 30px; font-size: 14px; color: #555;">
      We will be in touch with you shortly to confirm your booking.
      <br><br>Warm regards,<br><strong>HandySparkle Team</strong>
    </p>
  </div>
  `;

	// Send the email
	try {
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			cc: "phuong.nguyentien192@gmail.com", // Optional
			subject,
			text: `Booking Request from ${customerName}`, // plain fallback
			html,
		});

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({ message: "Quote request sent successfully." }),
		};
	} catch (error) {
		console.error("Email send failed:", error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ message: "Failed to send email." }),
		};
	}
};
