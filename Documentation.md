# Fancy Todo
Fancy Todo is an application to create and edit todo list based on your needs to keep you organized.

List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /todos`
- `GET /todos/id`
- `POST /todos`
- `PUT /todos/id`
- `PATCH /todos/id`
- `DELETE /todos/id`
- `GET /weather`

&nbsp;

Tech Stack used to build this app :
* Node JS
* Express JS framework
* PostgreSQL
* Bcryptjs
* Cors
* Axios
* Google-auth-library
* Jsonwebtoken
* Sequelize

Dev Dependancy
* Dotenv


&nbsp;

## Global Responses
> These responses are applied globally on all endpoints

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

_Response (400 - Bad request)_
```
{
  "message": "Invalid email or password"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Unauthorized"
}
```

&nbsp;

## RESTful endpoints
### POST /register

> Register user

_Request Body_
```
{
    'name': 'string',
    'email': 'string',
    'password': 'string'
}
```
_Response (201 - Created)_
```
 {
    'msg': 'Register success',
    'id': 'integer',
    'email': 'string'
 }
```


### POST /login

> Login user

_Request Body_
```
{
    'email': 'string',
    'password': 'string'
}
```

_Response (200)_
```
 {
    'access_token': 'string'
 }
```


---
### POST /googleLogin

_Request Body_
```
{
    'email': 'string'
}
```

_Response (201 - Created)_
```
 {
    'id': 'integer',
    'email': 'string',
    'access_token': 'string'
 }
```

---
### GET /todos

> Get all todo list

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
 {
    'Todo': {
        "title": 'string',
        "description": 'string',
        "status": 'string',
        "due_date": 'date'
    }
 }
```

---
### GET /todos/id

> Get todo list by id

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
 {
    'Todo': {
        "title": 'string',
        "description": 'string',
        "status": 'string',
        "due_date": 'date'
    }
 }
```

---
### POST /todos

> Create new todo

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
{
  "title": 'string',
  "description": 'string',
  "status": 'string',
  "due_date": 'date'
}

```

_Response (201 - Created)_
```
{
    'Todo': {
        "title": 'string',
        "description": 'string',
        "status": 'string',
        "due_date": 'date'
    }
}
```

---
### PUT /todos/id

> Edit existing todo

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
{
  "title": 'string',
  "description": 'string',
  "due_date": 'date'
}

```

_Response (200)_
```
{
    'Todo': {
        "title": 'string',
        "description": 'string',
        "status": 'string',
        "due_date": 'date'
    }
}
```

---
### PATCH /todos/id

> Update status todo

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
{
  "status": 'string'
}

```

_Response (200)_
```
{
    'Todo': {
        "title": 'string',
        "description": 'string',
        "status": 'string',
        "due_date": 'date'
    }
}
```

### DELETE /todos/id

> Delete todo by id

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
 OK
```


---
### GET /weather

> Get weather data in the city

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "city": "string",
    "temp": "float",
    "status": "string"
}
```
