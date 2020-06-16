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
	
	//Now, fetch the user data
	await fetch(`/api/v1/users/${uid}`)
	.then(async res => await res.json()
	.then(user => {

		//Set username header label
		$("#username").text(user.username)
		
		//Set input values
		$("#username-input").val(user.username)
		$("#email-input").val(user.email)
		$("#firstname-input").val(user.first_name)
		$("#lastname-input").val(user.last_name)

		//Set created at & updated at labels
		$("#created-at").append(user.created_at)
		$("#updated-at").append(user.updated_at)


		//If user owns or administrates any stores
		if (user.stores != undefined) {

			//Create store table
			$("#store-table").html(`
				<table class="table table-striped">
					<thead class="thead-dark">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Role</th>
							<th></th>
						</tr>
					</thead>
					<tbody id="table-body">
						
					</tbody>
				</table>
			`)
			
			//For each store in user.stores
			for (let index = 0; index < user.stores.length; index++) {

				let roleName;

				switch (user.stores[index].admin_type) {
					case 1:
						roleName = "Owner"
						break
					case 2:
						roleName = "Full access"
						break
					case 3:
						roleName = "Read only"
						break
				}

				//Add each store data to table
				$("#table-body").append(`
					<tr>
						<th>${index}</th>
						<td>${user.stores[index].name}</td>
						<td>${roleName}</td>
						<td>
							<button class="btn btn-dark btn-icon"><i class="fa fa-gear"></i></button>
						</td>
					<tr>
				`)
			}
		}
	}))

	//Catch the save profile settings submit event
	$("#user-form").on("submit", (event) => {

		//Prevent page reload
		event.preventDefault()

		//Get user settings input values
		let username = $("#username-input").val()
		let email = $("#email-input").val()
		let firstname = $("#firstname-input").val()
		let lastname = $("#lastname-input").val()

		//Create fetch put request
		fetch(`/api/v1/users/${uid}/update`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json; charset=UTF-8" 
			},
			body: JSON.stringify({
				username: username,
				email: email,
				firstname: firstname,
				lastname: lastname
			})
		})
		.then(response => response.json())
		.then(data => console.log(data))
	})

})