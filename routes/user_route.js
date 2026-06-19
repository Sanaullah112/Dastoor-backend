import express  from "express";
import { adminLogin, getUsers, Login, Registration } from "../controller/user_controller.js";
import  User from '../validator/user_validation.js'
import  validator  from "../middleware/validator_middleware.js";

const apps = express.Router();
apps.route('/').get(getUsers);
apps.route('/register').post(validator(User),Registration);
apps.route('/login').post(Login);
apps.route('/admin').post(adminLogin);

export default apps;
