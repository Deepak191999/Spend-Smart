const express=require('express')
const app=express()
const router= express.Router()
const passport=require('passport')
const userController= require('../controller/user')
const isLoggedIn= require('../middlewares/isLoggedIn')



router.get('/',userController.getHome)
router.get('/login',userController.getLogin)
router.get('/signup',userController.getSignup)
router.get('/profile',isLoggedIn,userController.getProfile)

router.post('/logout', function(req, res, next){
    // req.logout(function(err) {
    //   if (err) { return next(err); }
    //   res.json({ message: 'Logged out successfully' });
    // });

    req.logout((err) => {
      if (err) {
          return res.status(500).json({ message: 'Error logging out' });
      }
      res.status(200).json({ message: 'Logout successful' });
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

router.get('/checkAuth', isLoggedIn, (req, res) => {
  res.json({ authenticated: true });
});

 router.post('/addTransaction',isLoggedIn,userController.postAddTransaction);

router.get('/allTransaction',isLoggedIn,userController.getAllTransaction);
router.post('/allTransaction',isLoggedIn,userController.postAllTransaction);

router.get('/transactionBar',isLoggedIn,userController.getTransactionBar);
router.get('/incomestats',isLoggedIn,userController.getIncomeStats);
router.get('/expensestats',isLoggedIn,userController.getExpenseStats);

router.get('/deletetransaction/:id',isLoggedIn,userController.getDeleteTransaction);


router.get('/updatetransaction/:id', isLoggedIn, userController.getUpdateTransaction);
router.post('/updatetransaction/:id', isLoggedIn, userController.postUpdateTransaction);

router.get('/exportdata', isLoggedIn, userController.getExportData);




module.exports=router;




