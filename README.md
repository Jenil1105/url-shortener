# URL Shortener

A basic URL Shortener project built for practicing backend development concepts like authentication, database schemas, and REST APIs using Node.js.

---

## Features

- User Authentication (Signup & Login using JWT)
- Generate short URLs from original URLs
- Track number of clicks on each shortened URL
- Each user can only view their own generated URLs
- Clean UI using EJS templates

---

## Tech Stack

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- EJS (Templating)

---

## Project Structure

```

│   .env
│   .gitignore
│   connectMongo.js
│   index.js
│   package-lock.json
│   package.json
│
├───controllers
│       url.js
│       user.js
│
├───middlewares
│       auth.js
│
├───models
│       url.js
│       user.js
│
├───routes
│       staticRouter.js
│       url.js
│       user.js
│
├───services
│       auth.js
│
└───views
        home.ejs
        login.ejs
        signup.ejs

```

---

## Setup & Run Locally

1. Clone the repository
```bash
git clone https://github.com/Jenil1105/url-shortener.git
```

2. Navigate into the project
```bash
cd url-shortener
```

3. Create a `.env` file and add your MongoDB URL
```bash
MONGO_URL=your_mongodb_connection_string
```

4. Install dependencies
```bash
npm install
```

5. Start the server
```bash
npm start
```

---

## How It Works

1. User signs up and logs in  
2. Enters a long URL  
3. Gets a shortened URL  
4. Can track how many times it was visited  
5. Only their own URLs are visible to them  

---

*Created by Jenil*
