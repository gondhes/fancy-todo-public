const baseUrl = 'http://localhost:3000'

$('document').ready(function() {

    $('#main-header').show()
    $('#login').hide()
    $('#text-box').show()
    $('#register').hide()
    $('#todo-list-header').hide()
    $('#todo-table').hide()
    $('#create-todo').hide()
    $('#edit-todo').hide()
    $('#weather').show()
    $('#footer').show()

    $('#link-login').on('click', (event) => {
        event.preventDefault()
        $('#main-header').show()
        $('#login').show()
        $('#text-box').hide()
        $('#register').hide()
        $('#todo-list-header').hide()
        $('#todo-table').hide()
        $('#create-todo').hide()
        $('#edit-todo').hide()
        $('#weather').hide()
        $('#footer').show()
    })

    $('#btn-login').on('click', () => {
        login()
    })

    $('#link-register').on('click', (event) => {
        event.preventDefault()
        $('#main-header').show()
        $('#login').hide()
        $('#text-box').hide()
        $('#register').show()
        $('#todo-list-header').hide()
        $('#todo-table').hide()
        $('#create-todo').hide()
        $('#edit-todo').hide()
        $('#weather').hide()
        $('#footer').show()
    })

    $('#btn-register').on('click', () => {
        register()
    })

    $('#btn-logout').on('click', (event) => {
        event.preventDefault()
        logout()
    })

    $('#link-edit').on('click', (event) => {
        event.preventDefault()
        $('#main-header').hide()
        $('#login').hide()
        $('#text-box').hide()
        $('#register').hide()
        $('#todo-list-header').show()
        $('#todo-table').hide()
        $('#create-todo').hide()
        $('#edit-todo').show()
        $('#weather').hide()
        $('#footer').show()
    })

    $('#link-delete').on('click', (event) => {
        event.preventDefault()
        $('#main-header').hide()
        $('#login').hide()
        $('#text-box').hide()
        $('#register').hide()
        $('#todo-list-header').show()
        $('#todo-table').show()
        $('#create-todo').hide()
        $('#edit-todo').hide()
        $('#weather').show()
        $('#footer').show()
    })
})

function login() {
    const email = $('#email-login').val()
    const password = $('#password-login').val()

    $.ajax({
        url: baseUrl+'/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .done((res) => {
        Swal.fire('Welcome', 'login success', 'success')
        localStorage.setItem('access_token', res.access_token)
        checkLocalStorage()
    })
    .fail((err) => {
        if(!email || !password){
            Swal.fire('Error', 'email and password is required', 'error')
        } else {
            Swal.fire('Error', 'invalid email or password', 'error')
        }
    })
    .always(() => {
        $('#email-login').val('')
        $('#password-login').val('')
    })
}

function register() {
    const name = $('#name-register').val()
    const email = $('#email-register').val()
    const password = $('#password-register').val()

    $.ajax({
        url: baseUrl+'/register',
        method: 'POST',
        data: {
            name,
            email,
            password
        }
    })
    .done((res) => {
        Swal.fire('Success', 'registration success', 'success')
        $('#main-header').show()
        $('#login').show()
        $('#text-box').hide()
        $('#register').hide()
        $('#todo-list-header').hide()
        $('#todo-table').hide()
        $('#create-todo').hide()
        $('#edit-todo').hide()
        $('#weather').hide()
        $('#footer').show()
    })
    .fail((err) => {
        if(!email || !password){
            Swal.fire('Error', 'email and password is required', 'error')
        } else {
            Swal.fire('Error', 'invalid email or password', 'error')
        }
    })
    .always(() => {
        $('#name-register').val('')
        $('#email-register').val('')
        $('#password-register').val('')
    })
}

function checkLocalStorage() {
    if(localStorage.access_token) {
        console.log(localStorage.access_token);
        $('#main-header').hide()
        $('#login').hide()
        $('#text-box').hide()
        $('#register').hide()
        $('#todo-list-header').show()
        $('#todo-table').show()
        $('#create-todo').hide()
        $('#edit-todo').hide()
        $('#weather').show()
        $('#footer').show()
    } else {
        $('#main-header').show()
        $('#login').show()
        $('#text-box').hide()
        $('#register').hide()
        $('#todo-list-header').hide()
        $('#todo-table').hide()
        $('#create-todo').hide()
        $('#edit-todo').hide()
        $('#weather').hide()
        $('#footer').show()
    }
}

function logout() {
    localStorage.removeItem('access_token')
    Swal.fire('Logged out', 'logout success', 'success')
    $('#main-header').show()
    $('#login').hide()
    $('#text-box').show()
    $('#register').hide()
    $('#todo-list-header').hide()
    $('#todo-table').hide()
    $('#create-todo').hide()
    $('#edit-todo').hide()
    $('#weather').show()
    $('#footer').show()
}