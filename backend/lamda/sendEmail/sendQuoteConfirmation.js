const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

exports.handler = async (event) => {
	// Allow CORS
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "content-type",
	};

	if (event.httpMethod === "OPTIONS") {
		// CORS preflight request
		return {
			statusCode: 200,
			headers,
			body: "OK",
		};
	}

	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			headers,
			body: "Method Not Allowed",
		};
	}

	let body;
	try {
		body = JSON.parse(event.body);
	} catch (e) {
		return {
			statusCode: 400,
			headers,
			body: "Invalid JSON",
		};
	}

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

	var durationHour = Math.floor(duration);
	var durationMinute = Math.round((duration % 1) * 60);

	const subject = `Website Booking Request | ${customerName} | ${customerPhone} | ${serviceDate}`;
	const text = `
Booking Details:
- Type of Service: ${serviceType}
- Bedrooms: ${bedrooms}
- Bathrooms: ${bathrooms}
- Kitchens: ${kitchens}
- Living Rooms: ${livingRooms}
- Floors: ${floors}
- Date of Service: ${serviceDate}

Quote Details:
- Estimated Duration: ${durationHour} hours ${durationMinute} minutes
- Estimated Total: AU$${total}
- Estimated Rate: AU$${rate} per hour

Special Request: ${specialRequest}

Contact Information:
- Name: ${customerName}
- Phone: ${customerPhone}
- Email: ${customerEmail}
`;

	try {
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			cc: "phuong.nguyentien192@gmail.com",
			subject,
			text,
		});
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({ message: "Quote request sent successfully." }),
		};
	} catch (error) {
		console.error("Failed to send quote request:", error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ message: "Failed to send quote request." }),
		};
	}
};
