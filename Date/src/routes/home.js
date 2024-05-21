const homeController = require('../controllers/homeController');
const middlewareController = require('../controllers/middlewareController');

const router = require('express').Router();

router.get('/', middlewareController.verifyToken, homeController.showHome);
router.post('/like', middlewareController.verifyToken, homeController.likeUser);
router.post('/dislike', middlewareController.verifyToken, homeController.dislikeUser);

module.exports = router;