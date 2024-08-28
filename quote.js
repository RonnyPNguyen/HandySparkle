function calculateEstimate() {
	const bedrooms = document.getElementById("bedrooms").value;
	const bathrooms = document.getElementById("bathrooms").value;
	const kitchens = document.getElementById("kitchens").value;
	const livingRooms = document.getElementById("livingRooms").value;

	// Example formula for estimation (you can adjust this)
	const rate =
		bedrooms * 50 + bathrooms * 40 + kitchens * 60 + livingRooms * 30;

	document.getElementById("rate").textContent = `$${rate}`;
	document.getElementById("rateValue").value = rate;
	document.getElementById("bedroomsValue").value = bedrooms;
	document.getElementById("bathroomsValue").value = bathrooms;
	document.getElementById("kitchensValue").value = kitchens;
	document.getElementById("livingRoomsValue").value = livingRooms;
	document.getElementById("serviceDateValue").value =
		document.getElementById("serviceDate").value;

	// Display the personal details form
	document.getElementById("estimateResult").style.display = "block";
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
				showNotification("Quote request sent successfully.", "success");
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
		}
	});

function showNotification(message, type) {
	const notification = document.getElementById("notification");
	notification.textContent = message;
	notification.className = `alert alert-${type}`;
	notification.style.display = "block";
}
