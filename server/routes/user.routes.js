const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user.controller");

const router = express.Router();

//Routes ClientSideRendering
/*
router.get("/", handleGetAllUsers);
router.post("/", handleCreateNewUser);
*/
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
