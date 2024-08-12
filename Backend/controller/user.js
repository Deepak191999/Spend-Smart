const Transaction= require('../models/transactions')
const User= require('../models/users')
const bcrypt=require('bcrypt')
const moment = require('moment');
const exceljs= require('exceljs')
const Verify = require("../authentication/VerifyJWT");



const generateAccessTokenAndRefereshToken = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = await user.generateAccessToken();
      const refreshToken = await user.generateRefreshToken();
      user.refreshToken = refreshToken;
      user.accessToken = accessToken;
  
      await user.save();
  
      return { accessToken, refreshToken };
    } catch (err) {
      console.log("Error generating tokens:", err);
    }
  };
  


  module.exports.getCheckAuth = async(req, res, next) => {

    if(await Verify(req,res,next)){
      console.log("User is authenticated");
      return res.json({ authenticated: true });
    }
    console.log("User is not authenticated");
    return res.json({ authenticated: false });
  }


//done 1
module.exports.getHome= async(req,res,next)=>{
    if(await Verify(req,res,next)){
        return res.status(302).json({ message: "Redirecting" });
      }
      res.status(200).json({ message: "Welcome to the Home Page" });
}

//done 1
module.exports.getLogin=async (req,res,next)=>{
    if (await Verify(req,res,next)) {
        return res.redirect(302, "/profile");
      }   
      res.status(200).json({ message: 'Please log in' });
}

//done 1
module.exports.getSignup= async(req,res,next)=>{
    // if (req.user) { 
    //     return res.redirect(302, '/profile');
    //   }
    if (await Verify(req,res,next)) {
        return res.redirect(302, "/profile");
      }
      res.status(200).json({ message: 'Please sign up' });

}


//done 1
module.exports.postSignup= async(req,res,next)=>{
    if (await Verify(req,res,next)) {
        return res.redirect(302, "/profile");
      }
    
    
      const { email, password } = req.body;
      
      try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
          // Send JSON response with status code 400 (Bad Request) if username exists
          return res.status(400).json({ message: 'Email exists, choose a different name' });
        }
    
        // Hash the password
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            // Send JSON response with status code 500 (Internal Server Error) if hashing fails
            return res.status(500).json({ message: 'Error hashing password' });
          }
    
          // Create new user
          user = new User({
            email,
            password: hash,
          });
    
          // Save the user to the database
          await user.save();
          
          // Send JSON response with status code 201 (Created) after successful signup
          res.status(201).json({ message: 'Signup successful, please log in' });
        });
      } catch (error) {
        // Send JSON response with status code 500 (Internal Server Error) if any error occurs
        res.status(500).json({ message: 'Server error', error });
      }
}

module.exports.postLogin = async (req, res, next) => {
   
  
    if(await Verify(req,res,next)){
      return res.status(200).json({ message: "User already logged in" });
    }
  
    
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    let existingUser  = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
  
    const isMatch = await bcrypt.compare(password, existingUser.password);
  
          if (!isMatch) {
            return res.status(400).json({ message: "Password worng" });
          } 
  
    const { accessToken, refreshToken } =await generateAccessTokenAndRefereshToken(existingUser._id);
    const options = {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 31557600),
      secure:true,
      sameSite:'none',
      }
  
    let user = await User.findOne({ _id: existingUser._id }).select(
      "-refreshToken -password"
    );
   console.log(user);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user,
        message: "Successfully Logged In",
      });
  }

//done 1
module.exports.getProfile=async(req,res,next)=>{
    if (!(await Verify(req,res,next))) {
        // Send JSON response with status code 401 (Unauthorized) if the user is not logged in
        return res.status(401).json({ message: 'Unauthorized access. Please log in.' });
      }
    
      // Send JSON response with user data if logged in
      res.status(200).json({ user: req.user });
}


//done 1
module.exports.postAddTransaction = async(req,res,next)=>{
    const { amount, type, creditCategory, debitCategory, description, date } = req.body;
    
  
    // Check if the user is authenticated
    if (!(await Verify(req,res,next))) {
      console.error("User is not authenticated");
      return res.status(401).json({ message: "User is not authenticated" });
    }
    const userId = req.user._id;
    const category = type === "Credit" ? creditCategory : debitCategory;
  
    try {
      const newTransaction = new Transaction({
        userId,
        amount,
        type,
        category,
        description,
        date,
      });
  
      await newTransaction.save();
      console.log("Transaction saved successfully:", newTransaction);
  
      res.status(201).json({ message: 'Transaction saved successfully', transaction: newTransaction });
    } catch (error) {
      console.error("Error saving transaction:", error);
      res.status(500).json({ message: 'Error saving transaction', error: error.message });
    }
}

//done 1
module.exports.getAllTransaction = async (req, res, next) => {
    if (!(await Verify(req,res,next))) {
        console.error("User is not authenticated");
        return res.status(401).json({ message: "User is not authenticated" });
      }
    const userId = req.user._id; // Get user ID from the authenticated user

    try {
        // Fetch all transactions for the authenticated user
        const userTransactions = await Transaction.find({ userId }).sort({ date: 1 });


        let totalCredit = 0;
        let totalDebit = 0;

        // Calculate total credit and debit
        userTransactions.forEach((item) => {
            if (item.type === 'Credit') {
                totalCredit += item.amount;
            }
            if (item.type === 'Debit') {
                totalDebit += item.amount;
            }
        });

        // Calculate balance
        const balance = totalCredit - totalDebit;

        // Send response with transaction data
        res.status(200).json({
            transactions: userTransactions,
            totalCredit,
            totalDebit,
            balance
        });
    } catch (error) {
        console.error("Error getting all transactions:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


//done 1
module.exports.postAllTransaction = async (req, res, next) => {
    if (!(await Verify(req,res,next))) {
        console.error("User is not authenticated");
        return res.status(401).json({ message: "User is not authenticated" });
      }
    const userId = req.user._id;
    const { startDate, endDate } = req.body;

    try {
        const userTransactions = await Transaction.find({ userId }).sort({ date: 1 });

        let filteredTransactions = userTransactions;
        let start, end;
        if (startDate && endDate) {
            start = moment(startDate, 'YYYY-MM-DD');
            end = moment(endDate, 'YYYY-MM-DD').endOf('day');

            filteredTransactions = userTransactions.filter((item) => {
                const transactionDate = moment(item.date, 'YYYY-MM-DD');
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

        const balance = totalCredit - totalDebit;

        // Send JSON response with filtered transactions and totals
        res.status(200).json({
            transactions: filteredTransactions,
            totalCredit,
            totalDebit,
            balance,
            start: start ? start.format('YYYY-MM-DD') : null,
            end: end ? end.format('YYYY-MM-DD') : null
        });
    } catch (error) {
        console.error('Error filtering transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



//done 1
module.exports.getTransactionBar = async (req, res, next) => {
    if (!(await Verify(req,res,next))) {
        console.error("User is not authenticated");
        return res.status(401).json({ message: "User is not authenticated" });
      }
    const userId = req.user._id;

    try {
        const userTransactions = await Transaction.find({ userId });

        let totalCredit = 0;
        let totalDebit = 0;

        // Calculate total credit and debit
        userTransactions.forEach((item) => {
            if (item.type === "Credit") {
                totalCredit += item.amount;
            }
            if (item.type === "Debit") {
                totalDebit += item.amount;
            }
        });

        let balance = totalCredit - totalDebit;
        let turnOver = totalCredit + totalDebit;

        // Avoid division by zero
        let savingsRate;
        if (totalCredit > 0) {
            savingsRate = ((balance / totalCredit) * 100).toFixed(1);
        } else {
            savingsRate = 0;
        }
        let savingsRateIsGood = (savingsRate > 20);

        // Send JSON response with data
        res.status(200).json({
            transactions: userTransactions,
            totalCredit,
            totalDebit,
            turnOver,
            balance,
            savingsRate,
            savingsRateIsGood
        });
    } catch (error) {
        console.error("Error getting transactions:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//done 1
module.exports.getIncomeStats=async (req,res,next)=>{
    if (!(await Verify(req,res,next))) {
        console.error("User is not authenticated");
        return res.status(401).json({ message: "User is not authenticated" });
      }
    const userId = req.user._id;

    try {
        const userTransactions = await Transaction.find({ userId, type: 'Credit' });

        let totalIncome = 0;
        let incomeCategory = {};

        userTransactions.forEach((item) => {
            totalIncome += item.amount;
            if (incomeCategory[item.category]) {
                incomeCategory[item.category] += item.amount;
            } else {
                incomeCategory[item.category] = item.amount;
            }
        });

        let incomePercentage = {};
        for (let category in incomeCategory) {
            incomePercentage[category] = ((incomeCategory[category] / totalIncome) * 100).toFixed(1);
        }

        // Send JSON response with data
        res.status(200).json({
            totalIncome,
            incomePercentage
        });
    } catch (error) {
        console.error("Error getting income statistics:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//done 1
module.exports.getExpenseStats=async (req,res,next)=>{
    if (!(await Verify(req,res,next))) {
        console.error("User is not authenticated");
        return res.status(401).json({ message: "User is not authenticated" });
      }
    const userId = req.user._id;

    try {
        const userTransactions = await Transaction.find({ userId, type: 'Debit' });

        let totalExpense = 0;
        let expenseCategory = {};

        userTransactions.forEach((item) => {
            totalExpense += item.amount;
            if (expenseCategory[item.category]) {
                expenseCategory[item.category] += item.amount;
            } else {
                expenseCategory[item.category] = item.amount;
            }
        });

        let expensePercentage = {};
        for (let category in expenseCategory) {
            expensePercentage[category] = ((expenseCategory[category] / totalExpense) * 100).toFixed(1);
        }

        // Send JSON response with data
        res.status(200).json({
            totalExpense,
            expensePercentage
        });
    } catch (error) {
        console.error("Error getting expense statistics:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


//done 1
module.exports.getDeleteTransaction= async(req,res,next)=>{
    const transactionId = req.params.id;
    if (!(await Verify(req,res,next))) {
        console.error("User is not authenticated");
        return res.status(401).json({ message: "User is not authenticated" });
      }
    const userId = req.user._id;

    try {
        // Find the transaction to delete
        const userTransaction = await Transaction.findOne({ _id: transactionId, userId });

        if (!userTransaction) {
            console.log('Transaction not found for deletion.');
            return res.status(404).json({ message: 'Transaction not found.' });
        }

        // Delete the transaction
        await Transaction.deleteOne({ _id: transactionId });

        // Fetch the updated transactions
        const userNewTransactions = await Transaction.find({ userId }).sort({ date: 1 });

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

        // Send JSON response with updated data
        res.status(200).json({
            transactions: userNewTransactions,
            totalCredit,
            totalDebit,
            balance
        });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//done 1
module.exports.getUpdateTransaction=async(req,res,next)=>{
    const transactionId = req.params.id;
    if (!(await Verify(req,res,next))) {
        console.error("User is not authenticated");
        return res.status(401).json({ message: "User is not authenticated" });
      }
    const userId = req.user._id;

    try {
        const userTransaction = await Transaction.findOne({ _id: transactionId, userId });
        if (!userTransaction) {
            console.log('Transaction not found for updation.');
            return res.status(404).json({ message: 'Transaction not found.' });
        }

        res.status(200).json(userTransaction);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//done 1
module.exports.postUpdateTransaction= async(req,res,next)=>{
    const { amount, type, creditCategory, debitCategory, description, date } = req.body;
    const transactionId = req.params.id;
    if (!(await Verify(req,res,next))) {
        console.error("User is not authenticated");
        return res.status(401).json({ message: "User is not authenticated" });
      }
    const userId =  req.user._id;

    try {
        // Validate the user
        if (!userId) {
            return res.status(401).json({ message: 'User is not authenticated.' });
        }

        // Find the transaction
        let userTransaction = await Transaction.findOne({ _id: transactionId, userId });
        if (!userTransaction) {
            return res.status(404).json({ message: 'Transaction not found.' });
        }

        // Validate category based on type
        if (type === 'Credit' && !creditCategory) {
            return res.status(400).json({ message: 'Credit category is required.' });
        }

        if (type === 'Debit' && !debitCategory) {
            return res.status(400).json({ message: 'Debit category is required.' });
        }
        
        // Update transaction details
        userTransaction.amount = amount;
        userTransaction.type = type;
        userTransaction.category = type === 'Credit' ? creditCategory : debitCategory;
        userTransaction.description = description;
        userTransaction.date = date;

        // Save the updated transaction
        await userTransaction.save();

        // Fetch all transactions to recalculate totals
        const userNewTransactions = await Transaction.find({ userId }).sort({ date: 1 });

        // Calculate totals
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

        // Respond with updated data
        res.status(200).json({
            transactions: userNewTransactions,
            totalCredit,
            totalDebit,
            balance
        });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}


//done 1
module.exports.getExportData= async(req,res,next)=>{
    if (!(await Verify(req,res,next))) {
        console.error("User is not authenticated");
        return res.status(401).json({ message: "User is not authenticated" });
      }
      

    try {
        // Create a new workbook and worksheet
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("User Transaction");

        // Define columns
        worksheet.columns = [
            { header: "S No.", key: "sNo", width: 15 },
            { header: "Date", key: "date", width: 15 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Type", key: "type", width: 15 },
            { header: "Category", key: "category", width: 15 },
            { header: "Description", key: "description", width: 20 },
        ];

        // Fetch transactions
        let transactions = await Transaction.find({ userId: req.user._id }).sort({ date: 1 });
        let counter = 1;

        // Add rows
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

        // Style the header row
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        // Set headers for file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=user_transactions.xlsx');

        // Write file to response
        await workbook.xlsx.write(res);
        res.status(200).end();
    } catch (error) {
        console.error("Error exporting data:", error);
        next(error);
    }
}



