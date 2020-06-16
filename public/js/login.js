$(document).ready(() => {

	//Catch the login-form submit event
	$("#login-form").on("submit", (event) => {

		//Prevent page from refreshing
		event.preventDefault()

		//Retrieve the login input values
		let username = $("#username").val()
		let password = $("#password").val()

		//Create fetch POST request to /login endpoint
		fetch("/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8" 
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
		.then(response => response.json())
		.then((jsonRes) => {
			
			//If login credentials was authenticated
			if (jsonRes.status == "OK") {
				
				//Redirect authenticated user to index page
				window.location.replace("/")
			}

			//Else if user profile is deactivated
			else if (jsonRes.status == "Forbidden") {

				//Show re-active profile modal
				$("#reactivate-profile-modal").modal("show")
			}

			//Either username or password credential was wrong
			else {

				//Display bad credentials box
			}
		})

	})

	//Catch the reactivate-profile-btn click event
	$("#reactivate-profile-btn").click(() => {
		
	})

})