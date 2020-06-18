$(document).ready(() => {

	$("#stores-table").css("width", "100%")
	$("#products-table").css("width", "100%")

	//jQuery ajax request for users table
	$.ajax({
		url: "/api/v1/users",
		method: "GET",
		contentType: "application/json"
	})
	.done((data) => {

		//Once the request has finished insert data into table
		$('#users-table').DataTable({
			aaData: data,
			columns: [
				{ title: "Username", data: "username" },
				{ title: "Email", data: "email" },
				{ title: "Firstname", data: "first_name" },
				{ title: "Lastname", data: "last_name" },
				{ title: "Role", data: "role" },
				{ title: "Active", data: "active" },
				{ title: "Created", data: "created_at" }
			],
		})
	})

	//jQuery ajax request for stores table
	$.ajax({
		url: "/api/v1/stores",
		method: "GET",
		contentType: "application/json"
	})
	.done((data) => {

		//Once the request has finished insert data into table
		$('#stores-table').DataTable({
			aaData: data,
			columns: [
				{ title: "Store ID", data: "id"},
				{ title: "Name", data: "name" },
				{
					title: "Address", data: "street_name",
					render: function (data, type, row) {
						return `${row.street_name} ${row.street_number}, ${row.postal_code} ${row.city_name}`
					}
				},
				{ title: "Owner", data: "owner" },
				{ title: "Created", data: "created_at" }
			],
		})
	})

	//Catch the products table form
	$("#products-search-form").on("submit", (event) => {

		//Prevent page from refreshing
		event.preventDefault()

		//Retrieve the sid from input
		let sid = $("#store-id-input").val()

		//Update the products table by calling this function
		updateProductsTable(sid)
	})

	function updateProductsTable(sid) {
		//jQuery ajax request for stores table
		$.ajax({
			url: `/api/v1/products/${sid}`,
			method: "GET",
			contentType: "application/json"
		})
		.done((data) => {
			
			//Once the request has finished insert data into table
			$('#products-table').DataTable({
				destroy: true,
				aaData: data,
				columns: [
					{ title: "Name", data: "name" },
					{ title: "Price", data: "price" },
					{ title: "Product type", data: "food_type" },
					{ title: "Description", data: "description" },
					{ title: "Created at", data: "created_at"}
				],
			})

		})
	}


	$("#list-users-tab").click(() => {
		console.log("users clicked!")
		$("#list-stores-tab").removeClass("active")
		$("#list-products-tab").removeClass("active")
	})

	$("#list-stores-tab").click(() => {
		console.log("stores clicked!")
		$("#list-users-tab").removeClass("active")
		$("#list-products-tab").removeClass("active")
	})

	$("#list-products-tab").click(() => {
		console.log("products clicked!")
		$("#list-stores-tab").removeClass("active")
		$("#list-users-tab").removeClass("active")
	})

})