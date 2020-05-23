$('document').ready(() => {
    
    //Hide pass label text
    $('#passlabel').hide()

    //If password input is focused, show password requirement label
    $('#password')
    .focus(() => {
        $('#passlabel').show(250)
    })
    .focusout(() => {
        $('#passlabel').hide(250)
    })

    $('#password, #repassword').keyup(() => {

        if ($('#password').val().length == 0 && $('#repassword').val().length == 0) {
            $('#password, #repassword').attr('class', 'form-control')
        }

        else if ($('#password').val() !== $('#repassword').val()) {
            
            if ($('#password').is(':focus') && $('#repassword').val().length > 0 ||
                $('#repassword').val().length >= $('#password').val().length) {
                $('#repassword').attr('class', 'form-control is-invalid')
            }
        } 

        else {
            $('#repassword').attr('class', 'form-control is-valid')
        }

    })
})
