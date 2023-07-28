
  ## Teck Stack :
 - NodeJs
 - Express
 - Mongodb
   ##
## Requirements :
1. Create a REST api backend server using nodejs(preferred)/ any other backend language.
2. Create a database in mongodb (preferred)/ any other database.
    - User: name, number, email, password,is_premium_user(boolean type).
    - Article:title, content, is_premium(boolean type)
    - Comments: article_reference, user_reference, comment
           
3. Create 3 sample articles, (1 premium and 2 not premium) in database:-
      - Article1: title:’Article 1’, content:’This is a sample article1’,is_premium:false
      - Article2: title:’Article 2’, content:’This is a sample article2’,is_premium:false
      - Article3: title:’Article 3’, content:’This is a sample article3’,is_premium:true
      - Use a unique id as a primary key for all the documents in database (mongodb will have _id )



### Task Conditions:-
  - User can sign-up using the sign-up route which will be open to the public.
  - In sign-up, user can set his number,email, password and name.
  - User will be able to login using his (number or email) and (password)
  - User can see all the articles without logging in (except premium articles)
  - Only logged in user can comment on Articles.
 - User can opt to become a Premium User by paying some amount.
 -  Only premium users(check by is_premium) can view and comment on premium
Articles.

### Creating the following routes is must :-
 - User Login. (/login) POST
 - User Signup. (/signup) POST
 - User Profile edit . (/editUser) POST
 - User Delete. (/deleteUser) DELETE (note: user can delete his profile only when he is logged in)
 - Get Article (premium articles should be protected).(/getArticle/:id) GET
 - Get All Articles (premium articles should be protected). (/getAllArticles) GET
 - Comment on Articles (only logged in users should be allowed to comment)(/comment) POST
 - Go premium(/goPremium) POST —> Use this route to make user a premium user
(payment is not expected only change user to premium when the route is hit by a
logged-in user)

