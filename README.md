## Mini Wordpres

Build with express,
Bootstrap Vue, Vue Framework & RESTful API.

## How to Use
* 'Blog Posts' -> see all post, search title and content (type enter to search)
* 'Your Post' -> edit and delete your post
* 'Media' -> upload picture to use in pres ( not yet implemented )


### List of user routes:

| Routes        | HTTP           | Header(s) | Body| Description | Success | Error|
| ------------- |:-------------:| :-----:| ---- | --- | ---| ---|
### List of user routes:

| Routes        | HTTP           | Header(s) | Body| Description | Success | Error|
| ------------- |:-------------:| :-----:| ---- | --- | ---| ---|
|/users | GET| none | none | Get all users list <br> No Need login | Status:200 <br> dataTypes:{} | Status:500 <br> dataTypes:{} |
|/users | POST | none | {email:String,<br>password:String,<br>confirmPassword:String} | Register via Email | Status: 201<br> dataTypes:{}| Status:500<br> dataTypes:{}|
|/login | POST | none | {email:String,<br>password:String,} | Login via Email | Status: 201<br> dataTypes:{}| Status:500<br> dataTypes:{}|
|/google-login | POST | none | {email:String,<br>password:String,} | Login via Google Email | Status: 201<br> dataTypes:{}| Status:500<br> dataTypes:{}|


### List of user routes:

| Routes        | HTTP           | Header(s) | Body| Description | Success | Error|
| ------------- |:-------------:| :-----:| ---- | --- | ---| ---|
|/images | GET| {token:String} | none | Get all images from logged in user | Status:200 <br> dataTypes:{} | Status:500 <br> dataTypes:{} |
|/images/upload | POST | {token:String} | formData -> {file:ObjectFile} | Upload Picture to Google Cloud Storage | Status: 201<br> dataTypes:{}| Status:500<br> dataTypes:{}|



### List of articles routes: 
| Routes        | HTTP           | Header(s) | Body| Description | Success | Error
| ------------- |:-------------:| :---:| ---- | --- | --- | ---|
### List of user routes:

| Routes        | HTTP           | Header(s) | Body| Description | Success | Error|
| ------------- |:-------------:| :-----:| ---- | --- | ---| ---|
|/articles | GET| none | none | Get all articles list <br> No Need login | Status:200 <br> dataTypes:{} | Status:500 <br> dataTypes:{} |
|/articles/:id | GET| none | none | Find One Article <br> No Need login | Status:200 <br> dataTypes:{} | Status:500 <br> dataTypes:{} |
|/articles/users | GET| none | none | Get all articles from user that is logged in| Status:200 <br> dataTypes:{} | Status:500 <br> dataTypes:{} |
|/articles | POST | none | {title:String, content:String, user:ObjectId, createdAt:Date} | Create new Article <br> Must be logged in| Status: 201<br> dataTypes:{}| Status:500<br> dataTypes:{}|
|/articles/:id | DELETE | {token:String} | {email:String,<br>password:String,} | Delete article <br> Must be authorized | Status: 201<br> dataTypes:{}| Status:500<br> dataTypes:{}|
|/articles/:id | PATCH | {token:String} | {title:String, content:String} | Edit Article <br> Must be authorized | Status: 201<br> dataTypes:{}| Status:500<br> dataTypes:{}|


## Usage
Make sure Node.js is installed in your computer then run these commands:

> `$ npm install` <br>
> `$ npm start` <br>
> `$ npm run dev` <br>


## Credit
* Tamvan GCStroge Uploader API by @tamatamvan
* vue-wysiwyg-example by @dmtrxw
