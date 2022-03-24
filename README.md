# Phone Book


___

## Project setup

---

## Step 1

Clone project

```
    git innit
    git clone https://github.com/IlliaKadobanskij/PhoneBook.git
```

---

## Step 2

Open project with and create venv
```
    python -m venv venv
```



---

## Step 3

Install dependencies:

``` 
    pip install -r requirements.txt 
    cd frontend 
    npm install 
``` 

---

## Step 4

Install PostgreSQL 14 and MongoDB

---

## Step 5

In PgAdmin create new database:

DB name: ```phone_book_db```

Insert your db credentials in ```settings.py```

---

## Step 6

Run following command in the terminal:

```
   cd ../phone_book
   python manage.py migrate
   python manage.py runserver
```
In separate terminal:

```
   cd frontend
   npm start
```

---

