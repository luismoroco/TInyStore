# luismoroco-Ravn-Challenge-V2-LuisAngelMoroco
This is an online store repository built with PostgreSQL and Prisma as the database layer, Express, Typescript and REST. This repository represents a challenge for a Node.js developer trainee position. 

# Structure 

```
proyecto/
├── node_modules/
├── prisma/
├── docs/
├── src/
│   ├── index.ts
│   ├── config/
│   │   ├── mailer.ts
│   │   └── ...
│   ├── modules/
│   │   ├── auth/
│   │   ├── cart/
│   │   └── ...
│   ├── patterns/
│   │   ├── server.singleton.ts
│   │   └── ...
│   ├── routes/
│   │   ├── main.ts
│   ├── services/
│   │   ├── forgot.password.ts
│   │   └── ...
│   └── utils/
│       ├── lib.ts
│       └── ...
├── tests/
│   ├── unit/
│   └── integration/
├── uploads/
├── .gitignore
├── package.json
└── README.md
```

# Mail
Send an email when the user change the password

![mail](./docs/mail.png)

# Changue Password 

Using MAILTRAP for send emails

![mail_1](./docs/passwordrecovery.png)

![mail_2](./docs/newpasswordnotify.png)
