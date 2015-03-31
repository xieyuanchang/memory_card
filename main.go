// SimpleWebSever project main.go
package main

import (
	"log"
	"net/http"
	"os"
)

func isExists(path string) bool {
	_, err := os.Stat(path)
	if err != nil {
		log.Println(path, " is not exists ")
		log.Println(err.Error())
		return false
	}
	return true
}

func staticFileHandle(w http.ResponseWriter, r *http.Request) {
	fileName := "." + r.URL.RequestURI()
	if isExists(fileName) {
		http.ServeFile(w, r, fileName)
		log.Println(r.Method, fileName, "ok")
	}
}

func main() {
	http.HandleFunc("/", staticFileHandle)
	err := http.ListenAndServe(":9999", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err.Error())
	}

}
