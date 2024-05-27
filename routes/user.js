const express=require('express')
const app=express()
const router= express.Router()
const passport=require('passport')
const userController= require('../controller/user')
const isLoggedIn= require('../middlewares/isLoggedIn')
const isLoggedOut= require('../middlewares/isLoggedOut')


router.get('/',userController.getHome)
router.get('/login',userController.getLogin)
router.get('/signup',userController.getSignup)
router.get('/profile',isLoggedIn,userController.getProfile)

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

router.post('/signup',userController.postSignup)

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/profile');
    });


 router.post('/addTransaction',isLoggedIn,userController.postAddTransaction);

router.get('/allTransaction',isLoggedIn,userController.getAllTransaction);
router.post('/allTransaction',isLoggedIn,userController.postAllTransaction);

router.get('/transactionBar',isLoggedIn,userController.getTransactionBar);
router.get('/incomestats',isLoggedIn,userController.getIncomeStats);
router.get('/expensestats',isLoggedIn,userController.getExpenseStats);

router.post('/deletetransaction/:id',isLoggedIn,userController.postDeleteTransaction);

// router.get('/updatetransaction/:id',isLoggedIn,userController.getUpdateTransaction);
// router.post('/updatetransaction/:id',isLoggedIn,userController.postUpdateTransaction);
router.get('/updatetransaction/:id', isLoggedIn, userController.getUpdateTransaction);
router.post('/updatetransaction/:id', isLoggedIn, userController.postUpdateTransaction);


module.exports=router;




