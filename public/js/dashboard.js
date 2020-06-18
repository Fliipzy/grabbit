$(document).ready(() => {
	
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