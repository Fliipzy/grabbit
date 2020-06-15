//Checks if url has a hash appended then displays message accordingly
let hash = window.location.hash.replace("#", "");
let element = document.getElementById("status-container")

if (hash) {
	let status = { alertType: undefined, text: undefined }
	let foundStatus = true
	switch (hash) {
		case "failed":
			status.alertType = "danger"
			status.text = `Incorrect username or password`
			break

		case "signup-success":
			status.alertType = "success"
			status.text = `Welcome to Grabbit, please log in!`
			break

		default:
			foundStatus = false
			break
	}
	if (foundStatus) {
		element.innerHTML = `<div class="alert alert-${status.alertType}" role="alert">
                                ${status.text}
                            </div>`
	}
}