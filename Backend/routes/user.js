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
      res.json({ message: 'Logged out successfully' });
    });
  });

router.post('/signup',userController.postSignup)

// router.post('/login',
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     function (req, res) {
//         res.redirect('/profile');
//     });

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
});


 router.post('/addTransaction',isLoggedIn,userController.postAddTransaction);

router.get('/allTransaction',isLoggedIn,userController.getAllTransaction);
router.post('/allTransaction',isLoggedIn,userController.postAllTransaction);

router.get('/transactionBar',isLoggedIn,userController.getTransactionBar);
router.get('/incomestats',isLoggedIn,userController.getIncomeStats);
router.get('/expensestats',isLoggedIn,userController.getExpenseStats);

router.post('/deletetransaction/:id',isLoggedIn,userController.postDeleteTransaction);


router.get('/updatetransaction/:id', isLoggedIn, userController.getUpdateTransaction);
router.post('/updatetransaction/:id', isLoggedIn, userController.postUpdateTransaction);

router.get('/exportdata', isLoggedIn, userController.getExportData);




module.exports=router;




