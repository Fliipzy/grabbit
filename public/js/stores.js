//Wait till document is ready
$(document).ready(() => {

    //Get card container
    let cardContainer = $("#store-card-container")

    //Get food type checkboxes
    let cboxAll = $("#typeAll")
    let cboxBurger = $("#typeBurger")
    let cboxDessert = $("#typeDessert")
    let cboxGrill = $("#typeGrill")
    let cboxIndian = $("#typeIndian")
    let cboxMexican = $("#typeMexican")
    let cboxPizza = $("#typePizza")
    let cboxSandwich = $("#typeSandwich")
    let cboxSushi = $("#typeSushi")
    let cboxTurkish = $("#typeTurkish")
    let cboxVegan = $("#typeVegan")

    //Checkboxes events
    cboxAll.change(() => {
        //If all type checkbox is checked
        if (cboxAll.is(":checked")) {

            //Uncheck all other checkboxes
            cboxBurger.prop("checked", false)
            cboxDessert.prop("checked", false)
            cboxGrill.prop("checked", false)
            cboxIndian.prop("checked", false)
            cboxMexican.prop("checked", false)
            cboxPizza.prop("checked", false)
            cboxSandwich.prop("checked", false)
            cboxSushi.prop("checked", false)
            cboxTurkish.prop("checked", false)
            cboxVegan.prop("checked", false)
        }
    })

    //Add checkbox events to every checkbox
    addCheckBoxEvent("#typeBurger")
    addCheckBoxEvent("#typeDessert")
    addCheckBoxEvent("#typeGrill")
    addCheckBoxEvent("#typeIndian")
    addCheckBoxEvent("#typeMexican")
    addCheckBoxEvent("#typePizza")
    addCheckBoxEvent("#typeSandwich")
    addCheckBoxEvent("#typeSushi")
    addCheckBoxEvent("#typeTurkish")
    addCheckBoxEvent("#typeVegan")

    //Get all stores data with ajax
    $.ajax({
        url: "/api/v1/stores",
        method: "GET",
        contentType: "application/json"
    })
    .done((stores) => {
        //Foreach store in stores array
        stores.forEach(store => {
            addStoreCard(store)
        });
    })

    let today = new Date()
    let day = today.getDay() - 1
    let timeNowArray = `${today.getHours().toString()}:${today.getMinutes.toString()}`

    //Appends new store card html to cards container
    function addStoreCard(store) {

        let isOpen = false

        let openingTime = store.opening_hours[day].opens_at
        let closingTime = store.opening_hours[day].closes_at
        let yesterdayClosingTime = store.opening_hours[day - 1].closes_at

        //Check if time now is more than opening time and less than closing 
        //time or if time is less than yesterdays closing time
        if ((openingTime != null || closingTime != null) && 
            (timeNowArray >= openingTime && timeNowArray <= closingTime) || timeNowArray < yesterdayClosingTime) {
          isOpen = true
        }


        cardContainer.append(`
        <div class="store-card card shadow-sm">

          <section>

            <!--Store card image-->
            <div class="store-card-image rounded border" style="background-image: 
            url('/images/stores/profile-images/${store.image_name}');">

            </div>

            <!--Store card description-->
            <div class="store-card-description">

              <!--title-->
              <div id="storeName" class="store-card-title ellipsis">${store.name}</div>

              <!--address-->
              <div id="storeAddress" class="store-card-address ellipsis">${store.street_name} ${store.street_number}, 
                ${store.postal_code} ${store.city_name}</div>
              
              <!--Food types-->
              <div id="storeFoodTypes" class="store-card-foodtypes ellipsis">${store.food_types.join(", ")}</div>

              <!--open status-->
              <span id="storeStatus" class="store-status badge badge-${isOpen ? "success" : "danger"}">${isOpen ? "Open" : "Closed"}</span>

            </div>

            <!--rating-->
            <div id="rating-container" class="store-card-rating">
              ${'<span class="fa fa-star checked"></span>\n'.repeat(store.rating)}
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              (4092)
            </div>

            <button id="order-button" class="btn btn-warning">Order</button>

          </section>

        </div>
        `)
    }
})

function addCheckBoxEvent(checkboxId) {
    $(checkboxId).change(() => {
        if ($(checkboxId).is(":checked")) {
            $("#typeAll").prop("checked", false)
        }
    })
}
