// const mongoose=require('mongoose')

const transaction= require('../models/transactions')
const User= require('../models/users')
const bcrypt=require('bcrypt')


module.exports.getHome= (req,res,next)=>{
    if(req.user){return res.redirect('/profile')}
    res.render('home')
}

module.exports.getLogin= (req,res,next)=>{
    if(req.user){return res.redirect('/profile')}
    res.render('login')
}

module.exports.getSignup= (req,res,next)=>{
    if(req.user){return res.redirect('/profile')}
    res.render('signup')

}



module.exports.postSignup= async(req,res,next)=>{
    if(req.user){return res.redirect('/profile')}
    const {username,password}= req.body;
    let user= await User.findOne({username})
    if(user){
        return res.render('signup',{
            msg:"Username exists choose diff name"
        })
    }
const saltRounds=10;
    bcrypt.hash(password, saltRounds,async function(err, hash) {
        user=new User({
            username,
            password:hash
        })

        await user.save()
        res.redirect('/login')
    });
    

}

module.exports.getProfile=(req,res,next)=>{
    // if(!req.user){return res.redirect('/login')}
    res.render('profile',{
        user:req.user
        
    })
}

module.exports.postAddTransaction = async(req,res,next)=>{
const {amount,type,creditCategory,debitCategory,description,date}=req.body;
const userId = req.user ? req.user._id : null;
console.log("Request Body:", req.body);
  console.log("User Id:", userId);
  if (!userId) {
    console.error("User is not authenticated");
    return res.status(401).send("User is not authenticated");
  }

const category = type === "Credit" ? creditCategory : debitCategory;
try {
    const newTransaction = new transaction({
        userId,
        amount,
        type,
        category,
        description,
        date
      });
  
      await newTransaction.save();
      console.log("Transaction saved successfully:", newTransaction);
  
      res.redirect('/profile');
} catch (error) {
    console.error("Error saving transaction:", error);
    next(error)
}
}

module.exports.getAllTransaction=async(req,res,next)=>{
const userId=req.user._id;
 console.log("userid aya",userId);
    try {
        const userTransaction= await transaction.find({userId});
        let totalCredit=0;
        let totalDebit=0
        userTransaction.forEach((item)=>{
            if(item.type==="Credit"){
                totalCredit += item.amount} 
            if(item.type==="Debit"){
                totalDebit += item.amount}
        })
        let balance=totalCredit-totalDebit;
        res.render('alltransaction',{
            transactions:userTransaction,
            totalCredit,
            totalDebit,
            balance
        })
    } catch (error) {
        console.log("error getting all transaction");
        next(error)
    }

}