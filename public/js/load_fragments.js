//Wait till document is ready
$(document).ready(function () {

    //Load fragments html
    $("#navbar-fragment").load("html/fragments/navbar.html")
    $("#footer-fragment").load("html/fragments/footer.html")

    //Fetch the session data
    fetch("/api/v1/session").then((res) => {

        //Get the session json data
        res.json().then((session) => {

            //Check if session is authenticated
            if (session.authenticated) {
                
                //Add G-Chat to the left nav side
                $("#navbar-left-items").append(`
                    <li class="nav-item active">
                        <a class="nav-link" href="/stores">Order food</a>
                    </li>

                    <li class="nav-item active">
                        <a class="nav-link" href="/gchat">G-Chat <span class="pill badge badge-success">Beta</span> </a>
                    </li>
                `)

                //Add logout and user sign to right nav side
                $("#navbar-right-items").append(`
                    <div class="user-sign">
                        <span>
                            <p>${session.user.username} <img src="/svg/form/person.svg"></p>
                        </span>
                    </div>

                    <form action="/logout" method="GET">
                        <button id="auth-button" class="btn btn-outline-light my-2 my-sm-0" type="submit">Sign out</button>
                    </form>
                `)
            }
            else {

                //Add login form to the right nav side
                $("#navbar-right-items").append(`
                    <form action="/login" method="GET">
                        <button id="auth-button" class="btn btn-outline-light my-2 my-sm-0" type="submit">Sign in</button>
                    </form>
                `)
            }
        })
    })
})