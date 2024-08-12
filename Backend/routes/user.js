const express=require('express')
const router= express.Router()
const userController= require('../controller/user')



router.get('/',userController.getHome)
router.get('/login',userController.getLogin)
router.get('/signup',userController.getSignup)
router.get('/profile',isLoggedIn,userController.getProfile)

router.get('/logout', function(req, res, next){
  const options = {
  httpOnly: true,
  expires: 0,
  secure:true,
  sameSite:'none',
  }

  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
  
  res.redirect("/");
  });


router.get("/checkAuth", userController.getCheckAuth);

router.post('/signup',userController.postSignup)

router.post("/login", userController.postLogin);

 router.post('/addTransaction',userController.postAddTransaction);

router.get('/allTransaction',userController.getAllTransaction);
router.post('/allTransaction',userController.postAllTransaction);

router.get('/transactionBar',userController.getTransactionBar);
router.get('/incomestats',userController.getIncomeStats);
router.get('/expensestats',userController.getExpenseStats);

router.get('/deletetransaction/:id',userController.getDeleteTransaction);


router.get('/updatetransaction/:id', userController.getUpdateTransaction);
router.post('/updatetransaction/:id', userController.postUpdateTransaction);

router.get('/exportdata', userController.getExportData);




module.exports=router;




