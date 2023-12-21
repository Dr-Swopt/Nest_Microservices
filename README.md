## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Instructions for testing

Run start startall.bat. IT will build and run all the applications within the apps folder. There should be 3. Use postman or equivalent service to interact with the public API exposed from the apigateway controller. Just navigate into apps/apigateway/apigateway.controller.ts


## Description

So, the APIgateway, as the name implies will act as a gate way for clients to post request. The request will posted and the controller will then communiate with the service that will access the functions based on the definitions from the proto file. APIgateway itself will call nestjs microservice and act as a client. Then, the the grpc-client(app) will receive the function call from apigateway. (*all of these could be done in just APIgateway and gRPC server, but I wanted to test if a server can be both client and server concurrently. and Yes you can). So the grpc-client APP, is both a server that takes in client calls from apigateway APP, and further that request by acting as a client itself and making a grpc-client call to call the actual function in the grpc app that act as a server. In this test, there is a function in grpc to stream back a response of a {100} messages, so, when the client sends a post request to ask procure a stream response, it will then receive all the stream wrapped as an observable.
