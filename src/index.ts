import express from "express";
import "reflect-metadata";
import usersRoutes from "./users/routes/users-routes"

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server run in port: ${PORT}`);
});