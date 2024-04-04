const express = require("express");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user.routes");
const UserModel = require("./models/user.model");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const axios = require("axios");

const PORT = 8080;

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
          type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  role: String!
}

          type Book {
  id: ID!
  title: String!
  author: String!
  owner: ID
}


          type Query{
              getAllUsers: [User!]!
              getBooks: [Book!]!
              getUser(id:ID):User
          }
      `,
    resolvers: {
      Book: {
        user: async (todo) =>
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.id}`
            )
          ).data,
      },
      Query: {
        getTodos: async () =>
          (
            await axios.get(
              "https://jsonplaceholder.typicode.com/todos?_limit=10"
            )
          ).data,
        getAllUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUser: async (_, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },
    },
  });

  await server.start();

  //MIDDLEWARE
  app.use(express.json());
  app.use(logReqRes("log.txt"));
  app.use("/api/users", userRouter);
  app.use(cors());

  app.use("/graphql", expressMiddleware(server));

  //default route
  app.get("/", (req, res) => {
    if (req.url === "favicon.ico") return;
    res.setHeader("X-devlopBy", "Abhijit"); //Custom Header by using "X"
    return res.status(200).json({ message: "hello world" });
  });

  app.listen(PORT, async () => {
    try {
      await connectMongoDb(
        "mongodb+srv://abhijitbarman96:barman@cluster0.z52p8mq.mongodb.net/ideadb?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log(`MongoDB Connected & App is running at ${PORT}`);
    } catch (error) {
      console.log(error);
    }
  });
}

startServer();
