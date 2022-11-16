var express = require('express');
var router = express.Router();
var  user_controller=("../controllers/userController");
/* GET users listing. */
router.get('/sign-up',user_controller.sign_up_get)
router.post('/sign-up',user_controller.sign_up_post
)
router.get('/log-in',user_controller.log_in_get)
router.post('/log-in',user_controller.log_in_post)


module.exports = router;
