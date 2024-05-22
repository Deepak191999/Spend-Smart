// const mongoose=require('mongoose')

const transactions = require('../models/transactions')
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
  
      res.redirect('/alltransaction');
} catch (error) {
    console.error("Error saving transaction:", error);
    next(error)
}
}

module.exports.getAllTransaction=async(req,res,next)=>{
const userId=req.user._id;
//  console.log("userid aya getAllTransaction",userId);
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

module.exports.getTransactionBar= async(req,res,next)=>{
    const userId=req.user._id;
//  console.log("userid aya getTransactionBar",userId);
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
        let turnOver=totalCredit+totalDebit;
        let savingsRate = totalCredit > 0 ? ((balance / totalCredit) * 100).toFixed(1) : 0;
        let savingsRateIsGood = (savingsRate > 20)
        res.render('transactionBar',{
            transactions:userTransaction,
            totalCredit,
            totalDebit,
            turnOver,
            balance,
            savingsRate,
            savingsRateIsGood
        })
    } catch (error) {
        console.log("error getting all transaction");
        next(error)
    }

}


module.exports.getIncomeStats=async (req,res,next)=>{
    const userId=req.user._id;
    // console.log("userid aya getIncomeStats",userId);

    try {
        const userTransaction= await transactions.find({userId,type:'Credit'})
        let totalIncome=0;
        let incomeCategory={}
        // console.log("userTransaction income",userTransaction)

        userTransaction.forEach((item)=>{
            totalIncome+=item.amount;
            if(incomeCategory[item.category]){
                incomeCategory[item.category] += item.amount
            }
            else{
                incomeCategory[item.category]= item.amount
            }

        })
        // console.log("incomeCategory",incomeCategory);
        let incomePercentage={};
        for (let ctgry in incomeCategory) {
            incomePercentage[ctgry]=((incomeCategory[ctgry]/totalIncome)*100).toFixed(1);
        }
        // console.log("incomePercentage",incomePercentage);

        res.render('incomeStats',{
            totalIncome,
            incomePercentage
        })
    } catch (error) {
        console.log("Error getting income statistics:", error);
        next(error);
    }
};


module.exports.getExpenseStats=async (req,res,next)=>{
    const userId=req.user._id;
    // console.log("userid aya getExpenseStats",userId);

    try {
        const userTransaction= await transactions.find({userId,type:'Debit'})
        let totalExpense = 0;
        let expenseCategory ={}
        // console.log("userTransaction Expense",userTransaction)

        userTransaction.forEach((item)=>{
             totalExpense += item.amount;
            if(expenseCategory[item.category]){
                expenseCategory[item.category] += item.amount
            }
            else{
                expenseCategory[item.category] = item.amount
            }

        })
        // console.log("expenseCategory",expenseCategory);
        let expensePercentage={};
        for (let ctgry in expenseCategory) {
            expensePercentage[ctgry]=((expenseCategory[ctgry]/totalExpense)*100).toFixed(1);
        }
        // console.log("expensePercentage",expensePercentage);

        res.render('expenseStats',{
            totalExpense,
            expensePercentage
        })
    } catch (error) {
        console.log("Error getting income statistics:", error);
        next(error);
    }
}