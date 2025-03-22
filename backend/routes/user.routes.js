import { Router } from "express";
import * as userController from "../controllers/user.controllers.js";
import { body } from "express-validator";
import  * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    body("email").isEmail().withMessage("Please enter a valid email"), //middleware
    body("password").isLength({ min: 3 }),
    userController.createUserController
  );

  router.post(
    "/login",
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 3 }),
    userController.loginUserController
  );

  router.get("/profile", authMiddleware.authUser, userController.getProfileUserController);

  router.get("/logout", authMiddleware.authUser, userController.logoutUserController);
  
  export default router;
