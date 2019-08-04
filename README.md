# mongo-homework

### Installation
1. Clone repo
2. Open project directory
3. run ```npm install``` command
3. run ```npm start``` command


#### User Schema

```
{
  firstName: type string, min length 4, max length 50, required field,
  lastName: type string, min length 3, max length 60, required field
  role: type string, only valid values is [admin, writer, guest],
  createdAt: type Datetime, with default value,
  numberOfArticles: type number, default value 0, not required,
  nickname: type string, not required
}
```
  **/users (POST)**,
  **/users/:userId (PUT)**, 
  **/users/:userId (GET)**,
  **/users/:userId (DELETE)**,
  **/users/:userId/articles (GET)**, 

#### Article Schema

```
{
  title: type string, min length 5, max length 400, required field, add text index
  subtitle: type string, min length 5, not required field,
  description: type string, min length 5, max length 5000, required,
  owner: user reference, required field,
  category: valid options [sport, games, history], required
  createdAt: type datetime, required field
  updatedAt: type datetime, required field
}
```

* **/articles (POST)**, 
 **/articles/:articleId (PUT)**, 
 **/articles (GET)**,
**/articles/:articleId (DELETE)**,
