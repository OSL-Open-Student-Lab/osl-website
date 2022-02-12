package tests

import (
	"bytes"
	"fmt"
	"net/http"
	"testing"
)

var port = "8080"
var host = "localhost:" + port + "/api/v1/"

func TestAuthLogin(t *testing.T) {

	loginJson := []byte(`{"password":"a", "username":"a"}`)

	resp, err := http.NewRequest(
		"POST",
		host+"auth/login",
		bytes.NewBuffer(loginJson))

	if err != nil {
		fmt.Println(resp)
		t.Errorf("Error")
	} else {
		fmt.Println(resp)
	}
}
