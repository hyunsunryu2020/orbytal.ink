package main

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/clerkinc/clerk-sdk-go/clerk"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	token := ""
	if cookie, ok := request.Headers["cookie"]; ok {
		spl := strings.Split(cookie, ";")
		for _, el := range spl {
			if strings.HasPrefix(el, "__session=") {
				spl2 := strings.Split(el, "__session=")
				if len(spl2) == 2 {
					token = spl2[1]
				}
			}
		}
	}

	if token == "" {
		return &events.APIGatewayProxyResponse{
			StatusCode: 401,
		}, nil
	}

	apiKey := os.Getenv("CLERK_API_KEY")

	client, err := clerk.NewClient(apiKey)
	if err != nil {
		log.Println(err)
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, nil
	}

	claims, err := client.VerifyToken(token)
	if err != nil {
		log.Println(err)
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, nil
	}

	user, err := client.Users().Read(claims.Subject)
	if err != nil {
		log.Println(err)
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, nil
	}

	jbytes, err := json.Marshal(user)
	if err != nil {
		log.Fatal(err)
	}
	// THIS PRINTS THE USER
	log.Println(string(jbytes))

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "hello world!",
	}, nil
}

func main() {
	lambda.Start(handler)
}
