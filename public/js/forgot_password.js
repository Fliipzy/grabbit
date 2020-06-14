//Hide spinner
$("#reset-spinner").hide()

//Make sure document has rendered fully
$(document).ready(() => {

	//Catch the reset-form submit event
	$("#reset-form").on("submit", (event) => {

		//Prevent page from refreshing
		event.preventDefault()

		//Get email from input
		let email = $("#email-input").val()

		//Show spinner while ajax request is in progress
		$("#reset-spinner").show(250)

		//Execute the ajax request function
		sendAjaxRequest(email)

		//Hide spinner again
		$("#reset-spinner").hide(100)
	})
})

//Let's try to use ajax without jQuery here
function sendAjaxRequest(email) {

	//Create ajax object
	const xhr = new XMLHttpRequest()

	//What to do once the request is loaded
	xhr.onload = () => {

		//Get request status code
		let status = xhr.status

		switch (status) {
			case 500:
				showStatusMessage("Something went wrong internally!", false)
				break
			case 204:
				showStatusMessage("No user with that email was found!", false)
				break
			case 200:
				showStatusMessage("Email with reset link has been sent to you!", true)
				break
		}
	}

	xhr.open("POST", "/forgot")
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xhr.send(`email=${email}`)
}

function showStatusMessage(text, isvalid) {
	$("#status-container").html(
		`<div class="alert alert-${isvalid == true ? "success" : "danger"}" role="alert">
		<span><img src="svg/form/${isvalid == true ? "check.svg" : "alert-triangle.svg"}" width="21px" height="21px">  ${text}</span>
		</div>`
	)
}