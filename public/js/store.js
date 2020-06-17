$(document).ready(async () => {


	//Retrieve the sid parameter
	let href = window.location.href.split("/")
	let sid = href.pop()

	//Fetch the store data
	await fetch(`/api/v1/stores/${sid}`)
		.then(res => res.json()
			.then((store) => {

				//Set store name
				$("#store-name").text(store.name)

				//Set store address
				$("#store-address").text(`${store.street_name} ${store.street_number}, ${store.postal_code} ${store.city_name}`)

				//Set store image
				$("#store-image").css("background-image", `url('/images/stores/profile-images/${store.image_name}')`)

				//Set store rating container
				$("#store-rating-container").append(
					`<span class="fa fa-star fa-lg checked"></span>\n`.repeat(store.rating) +
					`<span class="fa fa-star fa-lg"></span>\n`.repeat(6 - store.rating))
			}))

	//Fetch the store's products data
	await fetch(`/api/v1/products/${sid}`)
		.then(res => res.json())
		.then((products) => {

			//Get unique array of product categories
			let productCategories = Array.from(new Set(products.map((value) => {
				return value["food_type"]
			})))

			//For each unique product category
			for (let index = 0; index < productCategories.length; index++) {

				//Create product category divs with label
				$("#menu-card div.card-body").append(`
					<div id="${productCategories[index]}">
						<h4 class="product-category-label rounded shadow-sm"><strong>${productCategories[index]}</strong></h4>
					</div>
				`)

				//Append category href links to product-categories-card
				$("#product-categories-card div.card-body div.list-group").append(`
					<a class="list-group-item-action" href="#${productCategories[index]}">${productCategories[index]}</a>
				`)
				
			}

			//For each product
			for (let index = 0; index < products.length; index++) {

				//Append product element to corresponding category div
				$(`#${products[index].food_type}`).append(`
					<div class="product">
						<div class="product-left">
							<div class="product-name"><strong>${products[index].name}</strong></div>
							<div class="product-description">${products[index].description}</div>
						</div>
						<div class="product-right">
							<div class="product-right-container">
								<div class="product-price">${products[index].price} kr</div>
								<button class="btn btn-dark btn-icon"><i class="fa fa-plus"></i></button>
							</div>
						</div>
					</div>

					<hr class="dashed">
				`)
			}

		})

})