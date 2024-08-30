var oneTimeRate = {
	bedrooms: {
		duration: 15, // per room
		unitPrice: 50, // per hour
	},
	bathrooms: {
		duration: 25, // per room
		unitPrice: 55, // per hour
	},
	kitchens: {
		duration: 25, // per room
		unitPrice: 55, // per hour
	},
	livingRooms: {
		duration: 20, // per room
		unitPrice: 45, // per hour
	},
};
var regularRate = {
	bedrooms: {
		duration: 15, // per room
		unitPrice: 45, // per hour
	},
	bathrooms: {
		duration: 20, // per room
		unitPrice: 50, // per hour
	},
	kitchens: {
		duration: 25, // per room
		unitPrice: 50, // per hour
	},
	livingRooms: {
		duration: 15, // per room
		unitPrice: 40, // per hour
	},
};

function calculateEstimate() {
	const serviceTypeElement = document.getElementById("serviceType");
	const serviceType = serviceTypeElement.value;
	const bedrooms = document.getElementById("bedrooms").value;
	const bathrooms = document.getElementById("bathrooms").value;
	const kitchens = document.getElementById("kitchens").value;
	const livingRooms = document.getElementById("livingRooms").value;
	const serviceDate = document.getElementById("serviceDate").value;

	if (bedrooms < 0 || bathrooms < 0 || kitchens < 0 || livingRooms < 0) {
		showNotification("Please enter valid non-negative values.", "danger");
		return;
	}

	serviceTypeElement.addEventListener("change", (event) => {
		var selectedServiceType = event.target.value;
		console.log(`Selected service type: ${selectedServiceType}`);
	});

	document.addEventListener("DOMContentLoaded", function () {
		var today = new Date().toISOString().split("T")[0];
		document.getElementById("serviceDate").setAttribute("min", today);
	});

	var today = new Date().toISOString().split("T")[0];
	if (serviceDate < today) {
		showNotification("Please select a valid date (today or later).", "danger");
		return; // Exit the function if validation fails
	}

	var total, duration, rate;

	if (serviceType === "One time cleaning") {
		total =
			((bedrooms * oneTimeRate.bedrooms.duration) / 60) *
				oneTimeRate.bedrooms.unitPrice +
			((bathrooms * oneTimeRate.bathrooms.duration) / 60) *
				oneTimeRate.bathrooms.unitPrice +
			((kitchens * oneTimeRate.kitchens.duration) / 60) *
				oneTimeRate.kitchens.unitPrice +
			((livingRooms * oneTimeRate.livingRooms.duration) / 60) *
				oneTimeRate.livingRooms.unitPrice;
		total = Math.round(total * 100) / 100;

		duration =
			bedrooms * 15 + bathrooms * 25 + kitchens * 25 + livingRooms * 20;

		rate = total / (duration / 60);
	} else if (serviceType === "Regular cleaning") {
		total =
			((bedrooms * regularRate.bedrooms.duration) / 60) *
				regularRate.bedrooms.unitPrice +
			((bathrooms * regularRate.bathrooms.duration) / 60) *
				regularRate.bathrooms.unitPrice +
			((kitchens * regularRate.kitchens.duration) / 60) *
				regularRate.kitchens.unitPrice +
			((livingRooms * regularRate.livingRooms.duration) / 60) *
				regularRate.livingRooms.unitPrice;

		duration =
			bedrooms * 15 + bathrooms * 20 + kitchens * 25 + livingRooms * 15;

		rate = total / (duration / 60);
	}
	rate = Math.round(rate * 100) / 100;
	document.getElementById("service").textContent = serviceType;
	document.getElementById("total").textContent = `AU$${total}`;
	document.getElementById("duration").textContent = `${duration} minutes`;
	// document.getElementById("rate").textContent = `AU$${rate} per hour`;
	document.getElementById("totalValue").value = total;
	document.getElementById("durationValue").value = duration;
	document.getElementById("rateValue").value = rate;

	document.getElementById("serviceTypeValue").value = serviceType;
	document.getElementById("bedroomsValue").value = bedrooms;
	document.getElementById("bathroomsValue").value = bathrooms;
	document.getElementById("kitchensValue").value = kitchens;
	document.getElementById("livingRoomsValue").value = livingRooms;
	document.getElementById("serviceDateValue").value =
		document.getElementById("serviceDate").value;

	// Display the personal details form

	document.getElementById("estimateResult").style.display = "block";
	// if (serviceType === "Regular cleaning") {
	// 	document.getElementById("estimateResult").style.display = "block";
	// 	document.getElementById("estimatedTotal").style.display = "none";
	// } else if (serviceType === "One time cleaning") {
	// 	document.getElementById("estimateResult").style.display = "block";
	// 	document.getElementById("estimatedTotal").style.display = "block";
	// }
}

// Handle AJAX submission of the booking form
document
	.getElementById("bookingForm")
	.addEventListener("submit", async function (e) {
		e.preventDefault(); // Prevent the default form submission

		const formData = new FormData(this);
		const data = {};

		formData.forEach((value, key) => {
			data[key] = value;
		});

		try {
			const response = await fetch(
				"https://handy-sparkle-backend-2de7f358d4c0.herokuapp.com/send-quote",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (response.ok) {
				showNotification(
					"Quote request sent successfully. We will be in touch soon!",
					"success"
				);
			} else {
				showNotification(
					"Failed to send quote request. Please try again.",
					"danger"
				);
			}
		} catch (error) {
			console.error("Error:", error);
			showNotification(
				"Failed to send quote request. Please try again.",
				"danger"
			);
			document
				.getElementById("contactButton")
				.addEventListener("click", function () {
					window.location.href = "index.html#contact";
				});
		}
	});

function showNotification(message, type) {
	const notification = document.getElementById("notification");
	notification.textContent = message;
	notification.className = `alert alert-${type}`;
	notification.style.display = "block";
}
