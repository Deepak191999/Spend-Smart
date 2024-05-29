// const mongoose=require('mongoose')

const transactions = require('../models/transactions')
const transaction= require('../models/transactions')
const User= require('../models/users')
const bcrypt=require('bcrypt')
const moment = require('moment');
const exceljs= require('exceljs')



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
// console.log("Request Body:", req.body);
//   console.log("User Id:", userId);
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


module.exports.getAllTransaction = async (req, res, next) => {
    const userId = req.user._id;
    
    try {
        const userTransactions = await transaction.find({ userId }).sort({date:1});

        let totalCredit = 0;
        let totalDebit = 0;
        userTransactions.forEach((item) => {
            if (item.type === 'Credit') {
                totalCredit += item.amount;
            }
            if (item.type === 'Debit') {
                totalDebit += item.amount;
            }
        });

        let balance = totalCredit - totalDebit;
        
        res.render('alltransaction', {
            transactions: userTransactions,
            totalCredit,
            totalDebit,
            balance
        });
    } catch (error) {
        console.log("Error getting all transactions", error);
        next(error);
    }
}

module.exports.postAllTransaction = async (req, res, next) => {
    const userId = req.user._id;
    const { startDate, endDate } = req.body;

    try {
        
        const userTransactions = await transaction.find({ userId }).sort({date:1});

        let filteredTransactions = userTransactions;
        let start;
        let end
        if (startDate && endDate) {
            start = moment(startDate, 'YYYY-MM-DD');
             end = moment(endDate, 'YYYY-MM-DD').endOf('day'); 
            console.log("start",start);
            console.log("End",end);

            filteredTransactions = userTransactions.filter((item) => {
                const transactionDate = moment(item.date, 'DD MMM YYYY');
                // console.log("transactionDate",transactionDate);
                return transactionDate.isBetween(start, end, null, '[]');
            });
        }

        
        let totalCredit = 0;
        let totalDebit = 0;
        filteredTransactions.forEach((item) => {
            if (item.type === 'Credit') {
                totalCredit += item.amount;
            }
            if (item.type === 'Debit') {
                totalDebit += item.amount;
            }
        });

        // Calculate balance
        let balance = totalCredit - totalDebit;

        // Render the alltransaction view with filtered transactions and totals
        res.render('alltransaction', {
            transactions: filteredTransactions,
            totalCredit,
            totalDebit,
            balance,
            start,
            end
        });
    } catch (error) {
        console.log("Error filtering transactions", error);
        next(error);
    }
};

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



module.exports.postDeleteTransaction= async(req,res,next)=>{
    const transactionId = req.params.id;
    const userId = req.user._id;
    // console.log("transactionId",transactionId);
    // console.log("userId",userId);

    try {
        const userTransaction= await transactions.find({_id:transactionId,userId})
       console.log('userTransaction',userTransaction);
        if (!userTransaction) {
           console.log('Transaction not found for deletion.');
            return res.status(404).send('Transaction not found.');
        }
        await transactions.deleteOne({_id:transactionId});
        
        const userNewTransactions = await transaction.find({ userId }).sort({ date: 1 });

        console.log("Transaction deleted");


        let totalCredit = 0;
        let totalDebit = 0;
        userNewTransactions.forEach((item) => {
            if (item.type === 'Credit') {
                totalCredit += item.amount;
            }
            if (item.type === 'Debit') {
                totalDebit += item.amount;
            }
        });

        let balance = totalCredit - totalDebit;

        // Render the alltransaction view with updated data
        res.render('alltransaction', {
            transactions: userNewTransactions,
            totalCredit,
            totalDebit,
            balance
        });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        next(error);
    }
};

module.exports.getUpdateTransaction=async(req,res,next)=>{
    const transactionId = req.params.id;
    const userId = req.user._id;
    try {
        const userTransaction= await transaction.findOne({_id:transactionId, userId})
        if (!userTransaction) {
            console.log('Transaction not found for updation.');
            return res.status(404).send('Transaction not found.');
        }
        
        res.render("updateTransaction", {
            transaction: userTransaction,
          });
    } catch (error) {
        next(error);
    }
}

module.exports.postUpdateTransaction= async(req,res,next)=>{
    const {amount,type, creditCategory, debitCategory,description,date}=req.body;
    const transactionId = req.params.id;
    const userId = req.user ? req.user._id : null;
    // console.log("Request Body:", req.body);
    //   console.log("User Id:", userId);

    try {
        let userTransaction= await transaction.findOne({_id:transactionId,userId})
       
        userTransaction.amount=amount;
        userTransaction.type=type;
        userTransaction.category = type === 'Credit' ? creditCategory : debitCategory;
        userTransaction.description=description;
        userTransaction.date=date;

     await  userTransaction.save()
        


        const userNewTransactions = await transaction.find({ userId }).sort({ date: 1 });

        let totalCredit = 0;
        let totalDebit = 0;
        userNewTransactions.forEach((item) => {
            if (item.type === 'Credit') {
                totalCredit += item.amount;
            } else if (item.type === 'Debit') {
                totalDebit += item.amount;
            }
        });

        let balance = totalCredit - totalDebit;

        res.render('alltransaction', {
            transactions: userNewTransactions,
            totalCredit,
            totalDebit,
            balance
        });
    } catch (error) {
        console.error('Error updating transaction:', error);
        next(error);
    }
    
}

module.exports.getExportData= async(req,res,next)=>{
    try {
        const workbook=new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("User Transaction");
        worksheet.columns =[
            {header:"S no.", key:"sNo",width: 15 },
            {header:"Date", key:"date",width: 15 },
            {header:"Amount ", key:"amount",width: 15 },
            {header:"Type", key:"type", width: 15 },
            {header:"Category", key:"category",width: 15 },
            {header:"Description", key:"description",width: 20 },
        ]
        let counter=1;
        let transactions = await transaction.find({ userId:req.user._id }).sort({date:1});

        transactions.forEach((item) => {
            worksheet.addRow({
                sNo: counter,
                date: item.date,
                amount: item.amount,
                type: item.type,
                category: item.category,
                description: item.description
            });
            counter++;
        });
        worksheet.getRow(1).eachCell((cell)=>{
            cell.font={bold:true};
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'user_transactions.xlsx');

        return workbook.xlsx.write(res).then(()=>{
            res.status(200);
        })
    } catch (error) {
        console.log("error in get export DataTransfer",error);
        next(error)
    }
}