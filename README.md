

## Description

Notification system with user management

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start or npm run dev

```


## API Documentation 

1. create a user 

API endpoint: http://localhost:5000/signup


Request method: POST

Request Body : 
```json
{
  "user": {
    "external_id": "dsfswe",
    "email": "ruhul.33s3@gmail.com",
    "first_name": "Subon ",
    "last_name": "mina",
    "custom_attributes": {
      "plan": "enterprise",
      "pricing_version": "v10",
      "preferred_pronoun": "She"
    },
    "phone_numbers": [
      "+15005550001"
    ]
  }
}
``` 

2. GET All created users 

API endpoint: http://localhost:5000/getuser

Request method: GET

Response 
```json
{
    "per_page": 100,
    "current_page": 1,
    "users": [
        {
            "id": "8584656b-9ae8-4684-9729-d5e229dd5a51",
            "project_id": 8076,
            "custom_attributes": {
                "plan": "enterprise",
                "pricing_version": "v10",
                "preferred_pronoun": "She"
            },
            "external_id": "dsfswe",
            "email": "ruhul.33s3@gmail.com",
            "first_name": "Subon ",
            "last_name": "mina",
            "created_at": "2024-03-02T09:24:02.289546Z",
            "updated_at": "2024-03-02T09:24:02.289546Z",
            "last_seen_at": null,
            "last_notified_at": null
        },
        {
            "id": "fbe27c0d-61aa-47e2-872d-7864e6b34af3",
            "project_id": 8076,
            "custom_attributes": {
                "plan": "enterprise",
                "pricing_version": "v10",
                "preferred_pronoun": "They"
            },
            "external_id": "56780",
            "email": "ruhul.cse123@gmail.com",
            "first_name": "Person",
            "last_name": "Doe",
            "created_at": "2024-03-02T07:46:39.167462Z",
            "updated_at": "2024-03-02T15:12:32.134458Z",
            "last_seen_at": null,
            "last_notified_at": "2024-03-02T15:12:32.134258Z"
        },
        {
            "id": "03ce5fa5-b40f-48c3-a0d3-882b40fd2532",
            "project_id": 8076,
            "custom_attributes": {},
            "external_id": null,
            "email": "ruhul.cse7862@gmail.com",
            "first_name": null,
            "last_name": null,
            "created_at": "2024-02-29T18:14:09.604711Z",
            "updated_at": "2024-03-02T07:15:28.874785Z",
            "last_seen_at": "2024-03-02T07:15:28.874375Z",
            "last_notified_at": "2024-02-29T18:14:10.579279Z"
        }
    ]
}
````

3. Sent notification

API endpoint: http://localhost:5000/sendNotification

Request method: POST

Request Body: 
```json
{
    "broadcast": {
        "title": "We're processing your order",
        "content": "<p>Thank you for your order. We'll notify you when these items are ready.</p>",
        "category": "order_created",
        "topic": "order:33098",
        "recipients": [
            {
                "email": "ruhul.cse123@gmail.com"
            },
            {
                "external_id": "56780",
                "first_name": "Person",
                "last_name": "Doe",
                "custom_attributes": {
                    "plan": "enterprise",
                    "pricing_version": "v10",
                    "preferred_pronoun": "They"
                },
                "phone_numbers": [
                    "+1 5005550001"
                ]
            }
        ],
        "overrides": {
            "channels": {
                "email": {
                    "title": "[MagicBell] We're processing your order",
                    "content": "Thank you for your order. If you need help, or have any questions please don't hesitate to reach out to us directly at hello@magicbell.com"
                }
            }
        }
    }
}
```

4. get notification 

API endpoint: http://localhost:5000/users/{user_id}/notifications

Example: http://localhost:5000/users/fbe27c0d-61aa-47e2-872d-7864e6b34af3/notifications

Request method: GET

Response: 
```json
{
    "message": "successfully get data",
    "data": {
        "id": 1,
        "title": "introduction to javascript",
        "description": "basic javascript",
        "start_at": "2022-11-27T10:35:53.000Z",
        "end_at": "2022-11-28T10:36:05.000Z",
        "total_reservations": 2
    }
}
```


