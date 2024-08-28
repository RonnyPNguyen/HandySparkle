// Import required modules
const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");

// Create an instance of Express
const app = express();
const port = 3000; // You can change this port if needed

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle POST requests to /send-quote
app.post("/send-quote", (req, res) => {
	const {
		customerName,
		customerPhone,
		customerEmail,
		bedrooms,
		bathrooms,
		kitchens,
		livingRooms,
		serviceDate,
		rate,
	} = req.body;

	// Create a transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "handy.sparkle.au@gmail.com", // Your business email
			pass: "your-email-password", // Your email password or app password
		},
	});

	// Set up email data
	const mailOptions = {
		from: "handy.sparkle.au@gmail.com", // Sender address
		to: "handy.sparkle.au@gmail.com", // List of receivers (you can add more recipients if needed)
		subject: `Booking Request | ${customerName} | ${customerPhone} | ${serviceDate}`, // Subject line
		text: `
            Booking Details:
            - Name: ${customerName}
            - Phone: ${customerPhone}
            - Email: ${customerEmail}
            - Date of Service: ${serviceDate}
            - Number of Bedrooms: ${bedrooms}
            - Number of Bathrooms: ${bathrooms}
            - Number of Kitchens: ${kitchens}
            - Number of Living Rooms: ${livingRooms}
            - Estimated Rate: ${rate}
        `, // Plain text body
	};

	// Send email using the defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(500).send(error.toString()); // Send an error response if email fails
		}
		res.send("Email sent: " + info.response); // Send a success response
	});
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
