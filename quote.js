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
