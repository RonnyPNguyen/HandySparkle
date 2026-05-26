var deepCleaningRate = {
	bedrooms: {
		duration: 45, // minute per room
		unitPrice: 60, // AUD per hour
	},
	bathrooms: {
		duration: 45, // minute per room
		unitPrice: 65, // AUD per hour
	},
	kitchens: {
		duration: 50, // minute per room
		unitPrice: 60, // AUD per hour
	},
	livingRooms: {
		duration: 45, // minute per room
		unitPrice: 60, // AUD per hour
	},
	floors: {
		duration: 45, // minute per room
		unitPrice: 60, // AUD per hour
	},
};
var oneTimeRate = {
	bedrooms: {
		duration: 45, // minute per room
		unitPrice: 50, // AUD per hour
	},
	bathrooms: {
		duration: 45, // minute per room
		unitPrice: 55, // AUD per hour
	},
	kitchens: {
		duration: 50, // minute per room
		unitPrice: 50, // AUD per hour
	},
	livingRooms: {
		duration: 45, // minute per room
		unitPrice: 50, // AUD per hour
	},
	floors: {
		duration: 45, // minute per room
		unitPrice: 50, // AUD per hour
	},
};
var endOfLeaseRate = {
	bedrooms: {
		duration: 50, // minute per room
		unitPrice: 60, // AUD per hour
	},
	bathrooms: {
		duration: 55, // minute per room
		unitPrice: 65, // AUD per hour
	},
	kitchens: {
		duration: 55, // minute per room
		unitPrice: 65, // AUD per hour
	},
	livingRooms: {
		duration: 50, // minute per room
		unitPrice: 60, // AUD per hour
	},
	floors: {
		duration: 55, // minute per room
		unitPrice: 60, // AUD per hour
	},
};
var newOpeningRate = {
	bedrooms: {
		duration: 40, // minute per room
		unitPrice: 50, // AUD per hour
	},
	bathrooms: {
		duration: 45, // minute per room
		unitPrice: 55, // AUD per hour
	},
	kitchens: {
		duration: 45, // minute per room
		unitPrice: 50, // AUD per hour
	},
	livingRooms: {
		duration: 45, // minute per room
		unitPrice: 60, // AUD per hour
	},
	floors: {
		duration: 45, // minute per room
		unitPrice: 50, // AUD per hour
	},
};

function updateQuoteForm() {
	const serviceType = document.getElementById("serviceType").value;
	const exceptionDiv = document.getElementById("exception");
	const normalFormDiv = document.getElementById("normalForm");

	if (serviceType === "regularCleaning") {
		exceptionDiv.style.display = "block";
		normalFormDiv.style.display = "none";
	} else {
		exceptionDiv.style.display = "none";
		normalFormDiv.style.display = "block";
	}
}

function calculateEstimate() {
	const serviceTypeElement = document.getElementById("serviceType");
	const serviceType = serviceTypeElement.value;
	const bedrooms = document.getElementById("bedrooms").value;
	const bathrooms = document.getElementById("bathrooms").value;
	const kitchens = document.getElementById("kitchens").value;
	const livingRooms = document.getElementById("livingRooms").value;
	const floors = document.getElementById("floors").value;
	const serviceDate = document.getElementById("serviceDate").value;

	if (
		bedrooms < 0 ||
		bathrooms < 0 ||
		kitchens < 0 ||
		livingRooms < 0 ||
		floors < 0
	) {
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

	if (serviceType === "One Time Cleaning") {
		total =
			((bedrooms * oneTimeRate.bedrooms.duration) / 60) *
				oneTimeRate.bedrooms.unitPrice +
			((bathrooms * oneTimeRate.bathrooms.duration) / 60) *
				oneTimeRate.bathrooms.unitPrice +
			((kitchens * oneTimeRate.kitchens.duration) / 60) *
				oneTimeRate.kitchens.unitPrice +
			((livingRooms * oneTimeRate.livingRooms.duration) / 60) *
				oneTimeRate.livingRooms.unitPrice +
			((floors * oneTimeRate.floors.duration) / 60) *
				oneTimeRate.floors.unitPrice;

		total = Math.round(total * 100) / 100;
		duration =
			bedrooms * oneTimeRate.bedrooms.duration +
			bathrooms * oneTimeRate.bathrooms.duration +
			kitchens * oneTimeRate.kitchens.duration +
			livingRooms * oneTimeRate.livingRooms.duration +
			floors * oneTimeRate.floors.duration;

		rate = total / (duration / 60);
	}
	if (serviceType === "Deep Cleaning") {
		total =
			((bedrooms * deepCleaningRate.bedrooms.duration) / 60) *
				deepCleaningRate.bedrooms.unitPrice +
			((bathrooms * deepCleaningRate.bathrooms.duration) / 60) *
				deepCleaningRate.bathrooms.unitPrice +
			((kitchens * deepCleaningRate.kitchens.duration) / 60) *
				deepCleaningRate.kitchens.unitPrice +
			((livingRooms * deepCleaningRate.livingRooms.duration) / 60) *
				deepCleaningRate.livingRooms.unitPrice +
			((floors * deepCleaningRate.floors.duration) / 60) *
				deepCleaningRate.floors.unitPrice;

		total = Math.round(total * 100) / 100;
		duration =
			bedrooms * deepCleaningRate.bedrooms.duration +
			bathrooms * deepCleaningRate.bathrooms.duration +
			kitchens * deepCleaningRate.kitchens.duration +
			livingRooms * deepCleaningRate.livingRooms.duration +
			floors * deepCleaningRate.floors.duration;
		rate = total / (duration / 60);
	}
	if (serviceType === "End Of Lease Cleaning") {
		total =
			((bedrooms * endOfLeaseRate.bedrooms.duration) / 60) *
				endOfLeaseRate.bedrooms.unitPrice +
			((bathrooms * endOfLeaseRate.bathrooms.duration) / 60) *
				endOfLeaseRate.bathrooms.unitPrice +
			((kitchens * endOfLeaseRate.kitchens.duration) / 60) *
				endOfLeaseRate.kitchens.unitPrice +
			((livingRooms * endOfLeaseRate.livingRooms.duration) / 60) *
				endOfLeaseRate.livingRooms.unitPrice +
			((floors * endOfLeaseRate.floors.duration) / 60) *
				endOfLeaseRate.floors.unitPrice;

		total = Math.round(total * 100) / 100;
		duration =
			bedrooms * endOfLeaseRate.bedrooms.duration +
			bathrooms * endOfLeaseRate.bathrooms.duration +
			kitchens * endOfLeaseRate.kitchens.duration +
			livingRooms * endOfLeaseRate.livingRooms.duration +
			floors * endOfLeaseRate.floors.duration;
		rate = total / (duration / 60);
	}
	if (serviceType === "New Opening House/Office Cleaning") {
		total =
			((bedrooms * newOpeningRate.bedrooms.duration) / 60) *
				newOpeningRate.bedrooms.unitPrice +
			((bathrooms * newOpeningRate.bathrooms.duration) / 60) *
				newOpeningRate.bathrooms.unitPrice +
			((kitchens * newOpeningRate.kitchens.duration) / 60) *
				newOpeningRate.kitchens.unitPrice +
			((livingRooms * newOpeningRate.livingRooms.duration) / 60) *
				newOpeningRate.livingRooms.unitPrice +
			((floors * newOpeningRate.floors.duration) / 60) *
				newOpeningRate.floors.unitPrice;

		total = Math.round(total * 100) / 100;
		duration =
			bedrooms * newOpeningRate.bedrooms.duration +
			bathrooms * newOpeningRate.bathrooms.duration +
			kitchens * newOpeningRate.kitchens.duration +
			livingRooms * newOpeningRate.livingRooms.duration +
			floors * newOpeningRate.floors.duration;
		rate = total / (duration / 60);
	}

	rate = Math.round(rate * 100) / 100;
	var durationHour = Math.floor(duration / 60);
	var durationMinute = Math.round((duration % 60) * 100) / 100;
	document.getElementById("service").textContent = serviceType;
	document.getElementById("total").textContent = `AU$${total}`;
	document.getElementById("duration").textContent =
		`${durationHour} Hours and ${durationMinute} Minutes`;
	document.getElementById("totalValue").value = total;
	document.getElementById("durationValue").value = duration;
	document.getElementById("rateValue").value = rate;
	document.getElementById("serviceTypeValue").value = serviceType;
	document.getElementById("bedroomsValue").value = bedrooms;
	document.getElementById("bathroomsValue").value = bathrooms;
	document.getElementById("kitchensValue").value = kitchens;
	document.getElementById("livingRoomsValue").value = livingRooms;
	document.getElementById("floorsValue").value = floors;
	document.getElementById("serviceDateValue").value =
		document.getElementById("serviceDate").value;

	document.getElementById("estimateResult").style.display = "block";
}

document
	.getElementById("bookingForm")
	.addEventListener("submit", async function (e) {
		e.preventDefault(); // Prevent the default form submission

		const formData = new FormData(this);
		const data = {};

		formData.forEach((value, key) => {
			data[key] = value;
		});
		console.log(JSON.stringify(data));

		try {
			const response = await fetch(
				"https://f2k308ynu4.execute-api.ap-southeast-2.amazonaws.com/default/HandySparkle-sendQuoteConfirmation",
				{
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(data),
				},
			);
			if (response.ok) {
				showNotification(
					"Quote request sent successfully. We will be in touch soon!",
					"success",
				);
			} else {
				showNotification(
					"Failed to send quote request. Please try again.",
					"danger",
				);
			}
		} catch (error) {
			console.error("Error:", error);
			showNotification(
				"Failed to send quote request. Please try again.",
				"danger",
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

// Copyright 2024 Ronny Nguyen - All Rights Reserved. Handy Sparkle Cleaning Services.
