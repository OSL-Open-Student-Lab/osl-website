# Names for our OSL api endpoints by REST API

## Routes:
- /queues
    - POST /queues
    - GET /queues/{type_id}/{date} -> date is optional
    - DELETE /queues/{booking_id}
- /auth
    - POST /auth/registration
    - POST /auth/login
    - GET /auth/current
- /facilities
    - POST /facilities/
    - POST /facilities/types/
    - GET /facilities/types/
    - GET /facilities/types/{id}

## Background tasks:
- saving images for facilities
- working with database?
