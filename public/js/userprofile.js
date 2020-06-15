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
						</tr>
					</thead>
					<tbody id="table-body">
						
					</tbody>
				</table>
			`)
			
			//For each store in user.stores
			for (let index = 0; index < user.stores.length; index++) {

				//Add each store data to table
				$("#table-body").append(`
					<tr>
						<th>${index}</th>
						<td>${user.stores[index].name}</td>
						<td>${user.stores[index].admin_type}</td>
					<tr>
				`)
			}
		}
	}))

})