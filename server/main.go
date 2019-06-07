package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

const (
	host   = "localhost"
	port   = 5432
	user   = "allyboyd"
	dbname = "employee-scheduler"
)

var db *sql.DB
var err error

func main() {
	// create DB connection
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s dbname=%s sslmode=disable", host, port, user, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(nil)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("Database connected")
	// POST
	sqlStatement := `INSERT INTO "user" (name, role, email, phone) VALUES ($1, $2, $3, $4) RETURNING id`
	id := 0
	err = db.QueryRow(sqlStatement, "Ally", "manager", "allyboyd85@gmail.com", "555-555-5555").Scan(&id)
	if err != nil {
		panic(err)
	}
	fmt.Println(id)

	// GET a few columns from last added row
	sqlStatement = `SELECT id, name FROM "user" WHERE id = $1`
	var ID int
	var name string
	row := db.QueryRow(sqlStatement, id)
	switch err := row.Scan(&ID, &name); err {
	case sql.ErrNoRows:
		fmt.Println("No rows returned")
	case nil:
		fmt.Println(ID, name)
	default:
		panic(err)
	}

	// GET all columns from last added row
	type User struct {
		ID    int
		name  string
		role  string
		email string
		phone string
	}
	sqlStatement = `SELECT * FROM "user" WHERE id = $1`
	var user User
	row = db.QueryRow(sqlStatement, id)
	err = row.Scan(&user.ID, &user.name, &user.role, &user.email, &user.phone)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("No rows found")
		return
	case nil:
		fmt.Println(user)
	default:
		panic(err)
	}

	// GET all columns from all rows

	rows, err := db.Query(`SELECT * FROM "user"`)
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var id int
		var name string
		var role string
		var email string
		var phone string

		err = rows.Scan(&id, &name, &role, &email, &phone)
		if err != nil {
			panic(err)
		}
		fmt.Println(id, name, role, email, phone)
		err = rows.Err()
		if err != nil {
			panic(err)
		}
	}
}
