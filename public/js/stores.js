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
    addCheckboxEventFunction("#typeBurger")
    addCheckboxEventFunction("#typeDessert")
    addCheckboxEventFunction("#typeGrill")
    addCheckboxEventFunction("#typeIndian")
    addCheckboxEventFunction("#typeMexican")
    addCheckboxEventFunction("#typePizza")
    addCheckboxEventFunction("#typeSandwich")
    addCheckboxEventFunction("#typeSushi")
    addCheckboxEventFunction("#typeTurkish")
    addCheckboxEventFunction("#typeVegan")

    //Get all stores data with ajax
    $.ajax({
        url: "/api/v1/stores",
        method: "GET",
        contentType: "application/json"
    })
    .done((stores) => {
        console.log("ajax call done!")
    })

    //Appends new store card html to cards container
    function addStoreCard(storeData) {
        cardContainer.append("<p>Hello world!</p>")
    }
})

function addCheckboxEventFunction(checkboxId) {
    $(checkboxId).change(() => {
        if ($(checkboxId).is(":checked")) {
            $("#typeAll").prop("checked", false)
        }
    })
}
