$(document).ready(() => {

	//Retrieve the sid parameter
	let href = window.location.href.split("/")
	let sid = href.pop()

	//Fetch the store data
	fetch(`/api/v1/stores/${sid}`)
	.then(res => res.json()
	.then((store) => {

		$("#store-name").append(store.name)

	})) 
		
})