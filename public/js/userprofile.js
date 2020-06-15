$(document).ready(async () => {

	let uid = null

	//Fetch the session data
	await fetch("/api/v1/session")
	.then(async res => await res.json()
	.then(session => {

		//Retrieve the user id from session object
		uid = session.user.id

	}))
	
	//Set value of hidden user id input
	$("#user-id-input").val("what")

	console.log("hello")
	
	//Now, fetch the user data
	await fetch(`/api/v1/users/${uid}`)
	.then(async res => await res.json()
	.then(user => {

	}))

})