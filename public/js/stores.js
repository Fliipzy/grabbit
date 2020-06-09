//Wait till document is ready
$(document).ready(() => {

    //Get all stores with ajax
    $.ajax({
        url: "/api/v1/stores",
        method: "GET",
        contentType: "application/json"
    })
    .done((data) => {
        
    })
})