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
    getWeather()

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

    $('#link-create-todo').on('click', (event) => {
        event.preventDefault()
        $('#main-header').hide()
        $('#login').hide()
        $('#text-box').hide()
        $('#register').hide()
        $('#todo-list-header').show()
        $('#todo-table').hide()
        $('#create-todo').show()
        $('#edit-todo').hide()
        $('#weather').show()
        $('#footer').show()
    })

    $('#btn-create').on('click', () => {
        createTodo()
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
        localStorage.setItem('userId', res.id)
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
        console.log(localStorage.access_token)
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
        fetchTodo()
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
    localStorage.removeItem('userId')
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
    signOut()
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function fetchTodo() {
    $('#todo-list-data').empty()
    $.ajax({
        url: baseUrl+'/todos',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done((res) => {
        console.log(res.todo[1]);
        const todos = res.todo
        for(i = 0; i < todos.length; i++) {
            $('#todo-list-data').append(
                `
                <tr>
                <td>${i + 1}</td>
                <td>${todos[i].title}</td>
                <td>${todos[i].description}</td>
                <td>${todos[i].status}</td>
                <td>${todos[i].due_date}</td>
                <td>
                    <button href="/todos/${todos[i].id}" class="btn" onclick="updateStatusTodo(event, ${todos[i].id})">finish</button>
                    <button href="/todos/${todos[i].id}" class="btn" onclick="updateTodo(event, ${todos[i].id})">edit</button>
                    <button href="/todos/${todos[i].id}" class="btn" onclick="deleteTodo(event, ${todos[i].id})">delete</button>
                </td>
                </tr>
                `
            )
        }
    })
    .fail((err) => {
        console.log(err)
    })
}

function createTodo() {
    const title = $('#create-title').val()
    const description = $('#create-description').val()
    const due_date = $('#create-due_date').val()

    $.ajax({
        url: baseUrl+'/todos',
        method: 'POST',
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            due_date,
            userId: localStorage.userId
        }
    })
    .done((res) => {
        Swal.fire('Success', 'todo created successfully', 'success')
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
        fetchTodo()
    })
    .fail((err) => {
        if(!title || !description || !status || !due_date){
            Swal.fire('Error', 'fields cannot be empty', 'error')
        } else {
            Swal.fire('Error', 'internal server error', 'error')
        }
    })
}

function deleteTodo(event, id) {
   event.preventDefault()
   $.ajax({
       url: baseUrl+'/todos/'+id,
       method: 'DELETE',
       headers: {
           access_token: localStorage.access_token
       }
   })
   .done(() => {
    Swal.fire('Success', 'todo deleted successfully', 'success')
       fetchTodo()
   })
   .fail(err => {
       console.log(err)
       Swal.fire('Error', 'not authorized', 'error')
   })
}

function updateStatusTodo(event, id) {
    event.preventDefault()
    let status = 'finished'
    $.ajax({
        url: baseUrl+'/todos/'+id,
        method: 'PATCH',
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            status
        }
    })
    .done(() => {
     Swal.fire('Success', 'todo status updated', 'success')
        fetchTodo()
    })
    .fail(err => {
        console.log(err)
        Swal.fire('Error', 'not authorized', 'error')
    })
 }


function updateTodo() {
    
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: 'POST',
        url: baseUrl+'/googleLogin',
        data: {
            token: id_token
        }
    })
    .done((res) => {
        Swal.fire('Succes', 'Success login', 'success')
        localStorage.setItem('access_token', res.access_token)
        localStorage.setItem('userId', res.id)
        checkLocalStorage()
    })
    .fail((err) => {
        console.log(err)
        Swal.fire('Error', 'cannot login', 'error')
    })
}

function getWeather() {
    $.ajax({
        url: baseUrl+'/weather',
        method: 'GET'
    })
    .done((res) => {
        const city = res.city
        const temp = res.temp
        const status = res.status
        const icon = res.icon
            $('#weather').append(
                `
                <h2>${city}</h2>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>
                <h3>${status}</h3>  
                <br>
                <h4>${temp} °C</h4>  
                `
            )
    })
    .fail((err) => {
        console.log(err)
    })
}