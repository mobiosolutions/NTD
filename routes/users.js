const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/UserController');
const sendNotificationcontroller = require('../app/controllers/SendNotification');
const checkToken = require('../app/middleware/auth');
let multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
let upload = multer({ storage: storage });

router.get('/', (req,res)=>{
 res.json('index');
});


router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/changePassword',checkToken.checkToken,controller.changePassword)
router.post('/forgetPassword',controller.forgetPassword)
router.post('/resetPassword',controller.resetPassword)
router.post('/fileUpload',upload.single('image'),controller.fileUpload)
router.get('/generateExcel',controller.generateExcel)

router.get('/notify', (req, res) => {
    res.render('index');
});
router.post('/sendNotification',sendNotificationcontroller.sendNotification)
router.post('/sendNotificationToDevice',sendNotificationcontroller.sendNotificationToDevice)


router.get('/findUserById/:id', controller.findUserById);
router.get('/findUsers', controller.findUsers);
router.post('/addUser', controller.addUser);
router.put('/updateUser/:id', controller.updateUser);
router.get('/deleteUser/:id', controller.deleteUser);

module.exports = router;