# **A Chat App API - Express.js and MongoDB**

## **Project Author**

---

### **[Gita Alekhya Paul](https://github.com/gitaalekhyapaul)**

# **API Documentation**

## **API Link:**

**_[https://chat-app-gap-05052020.herokuapp.com/](https://chat-app-gap-05052020.herokuapp.com/)_**

## **Routes declared:**

1. **[/api/auth/register](#apiauthregister--post-route) : To register new users([username format](#username-format)).**
2. **[/api/auth/login](#apiauthlogin--post-route) : To login for registered users.**
3. **[/api/chats/send](#apichatssend--post-route) : To send chats (in the [specified format](#api-note-specification)) to other users from the logged in user.**
4. **[/api/chats/get](#apichatsget--get-route) : To get the chat inbox logged in user.**
5. **[/api/chats/getUsers](#apichatsgetusers--get-route) : To get the list of registered users**

### **1. Authentication Routes:**

1.  ### **/api/auth/register => POST Route**

    > - HTTP Method: POST
    > - Authorization: None
    > - Request Type: application/x-www-form-urlencoded
    > - **Request Parameters:**
    >
    > 1. Parameter Name: _username_  
    >    Parameter Requirement: **Yes**  
    >    Data Type: String  
    >    Description: The username of the user in the [**SPECIFIED BELOW FORMAT**](#username-format)
    > 2. Parameter Name: _password_  
    >    Parameter Requirement: **Yes**  
    >    Data Type: String  
    >    Description: The password of the user
    >
    > - **Response Parameters:**
    >
    > 1. Parameter Name: success  
    >    Data Type: Boolean  
    >    Description: `true` if request carried out succesfully, `false` if request failed.
    > 2. Parameter Name: err  
    >    Data Type: String  
    >    Description: Returns the error message if `"success": false`
    >
    > - **HTTP Codes and Errors:**
    >
    > 1. Code: 200  
    >    Description: Success
    > 2. Code: 406  
    >    Description: Username already exists.
    >
    > - **Example Response JSON**  
    >    `{ "success": true } OR {"success": false, "err": "<Your Error Message>" }`

# **Username Format:**

**Usernames can contain `a-z`, `0-9`, `.` or `_`.**  
**USERNAME SHOULD NOT END WITH `.`**

2.  ### **/api/auth/login => POST Route**

    > - HTTP Method: POST
    > - Authorization: None
    > - Request Type: application/x-www-form-urlencoded
    > - **Request Parameters:**
    >
    > 1. Parameter Name: _username_  
    >    Parameter Requirement: **Yes**  
    >    Data Type: String  
    >    Description: The username of the user
    > 2. Parameter Name: _password_  
    >    Parameter Requirement: **Yes**  
    >    Data Type: String  
    >    Description: The password of the user
    >
    > - **Response Parameters:**
    >
    > 1. Parameter Name: success  
    >    Data Type: Boolean  
    >    Description: `true` if request carried out succesfully, `false` if request failed.
    > 2. Parameter Name: authToken  
    >    Data Type: String  
    >    Description: Returns The JWT Token issued by the server
    > 3. Parameter Name: err  
    >    Data Type: String  
    >    Description: Returns the error message if `"success": false`
    >
    > - **HTTP Codes and Errors:**
    >
    > 1. Code: 200  
    >    Description: Success
    > 2. Code: 403  
    >    Description: Username or Password Wrong.
    > 3. Code: 500  
    >    Description: Server Error. Please try again.
    >
    > - **Example Response JSON**  
    >    `{ "success": true, "authToken": "<Your Auth Token>"} OR { "success": false, "err": "<Your Error Message>" }`

3.  ### **/api/chats/send => POST Route**
    > - HTTP Method: POST
    > - Authorization: Bearer Tokens in the 'Authorization' header in the format:  
    >   `Bearer <Your JWT>`
    > - Request Type: application/x-www-form-urlencoded
    > - **Request Parameters:**
    >
    > 1. Parameter Name: _content_  
    >    Parameter Requirement: **Yes**  
    >    Data Type: String  
    >    Description: Chat with usertags as [**SPECIFIED BELOW FORMAT**](#api-note-specification)
    >
    > - **Request Headers:**
    >
    > 1. Header: Authorization  
    >    Header Requirement: **Yes**  
    >    Type: Bearer Token  
    >    Description: The auth token issued on login.
    >
    > - **Response Parameters:**
    >
    > 1. Parameter Name: success  
    >    Data Type: Boolean  
    >    Description: `true` if request carried out succesfully, `false` if request failed.
    > 2. Parameter Name: err  
    >    Data Type: String  
    >    Description: Returns the error message if `"success": false`
    >
    > - **HTTP Codes and Errors:**
    >
    > 1. Code: 200  
    >    Description: Success
    > 2. Code: 400  
    >    Description: Bad request format. Missing content.
    >
    > - **Example Response JSON**  
    >    `{
        "success": true } OR
    {
    "success": false,
    "err": "<Your Error Message>"
    }`

# **API Note Specification:**

**The note should contain the usernames of the recipient preceded by `@` symbol. An exapmle of a note is as follows:**  
`"content" : "Hello. This note should reach the @admin and @client users. Thank you."`  
**When this string is passed in the API, the `admin` and `client` usernames are searched for, in the DB and **ONLY IF FOUND**, the note is delivered to their accounts.**

4.  ### **/api/chats/get => GET Route**

    > - HTTP Method: GET
    > - Authorization: Bearer Tokens in the 'Authorization' header in the format:  
    >   `Bearer <Your JWT>`
    > - Request Type: No Body Required
    > - **Request Headers:**
    >
    > 1. Header: Authorization  
    >    Header Requirement: Yes  
    >    Type: Bearer Token  
    >    Description: The auth token issued on login.
    >
    > - **Response Parameters:**
    >
    > 1. Parameter Name: success  
    >    Data Type: Boolean  
    >    Description: `true` if request carried out succesfully, `false` if request failed.
    > 2. Parameter Name: username  
    >    Data Type: String  
    >    Description: Username of the logged in user.
    > 3. Parameter Name: chats  
    >    Data Type: Array of JSON Objects  
    >    Description: Each object has a sender username under `sender.username` and a message under `content`
    > 4. Parameter Name: err  
    >    Data Type: String  
    >    Description: Returns the error message if `"success": false`
    >
    > - **HTTP Codes and Errors:**
    >
    > 1. Code: 200  
    >    Description: Success
    > 2. Code: 500  
    >    Description: Server Error. Please try again.
    >
    > - **Example Response JSON**  
    >    `{"success":true,"chats":[{"sender":{"username":"<Sender Username>"},"content":"<Note Content>"}],"username":"<Logged In Username>"} OR { "success": false, "err": "<Your Error Message>" }`

5.  ### **/api/chats/getUsers => GET Route**
    > - HTTP Method: GET
    > - Authorization: Bearer Tokens in the 'Authorization' header in the format:  
    >   `Bearer <Your JWT>`
    > - Request Type: No Body Required
    > - **Request Headers:**
    >
    > 1. Header: Authorization  
    >    Header Requirement: Yes  
    >    Type: Bearer Token  
    >    Description: The auth token issued on login.
    >
    > - **Response Parameters:**
    >
    > 1. Parameter Name: success  
    >    Data Type: Boolean  
    >    Description: `true` if request carried out succesfully, `false` if request failed.
    > 2. Parameter Name: users  
    >    Data Type: Array of String  
    >    Description: Each element has a registered user's username
    > 3. Parameter Name: err  
    >    Data Type: String  
    >    Description: Returns the error message if `"success": false`
    >
    > - **HTTP Codes and Errors:**
    >
    > 1. Code: 200  
    >    Description: Success
    > 2. Code: 500  
    >    Description: Server Error. Please try again.
    >
    > - **Example Response JSON**  
    >    `{"success":true,"users":[<Usernames>]} OR { "success": false, "err": "<Your Error Message>" }`

### **Dependencies and Packages**

---

> - Node.js
> - Express.js
> - Bcrypt
> - Body Parser
> - CORS
> - Dotenv
> - Jsonwebtoken
> - Mongoose
