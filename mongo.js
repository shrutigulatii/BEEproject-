// const mongoose =require('mongoose');
// mongoose.connect('mongodb://localhost:27017/employee',{
//     useNewUrlParser :true,
//     useUnifiedTopology:true
// })
// .then(()=>{
//     console.log("mongoose connected");
// }).catch((e)=>{
//     console.log("mongoose connection failed");

// })
// const userSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     dob: { type: Date, required: true },
//     gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
//     maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced'], required: true },
//     nationality: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     jobTitle: { type: String, required: true },
//     department: { type: String, enum: ['HR', 'Engineering', 'Marketing', 'Finance'], required: true },
//     dateOfJoining: { type: Date, required: true },
//     employmentType: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract'], required: true },
//     education: { type: String, required: true },
//     skills: { type: String, required: true },
//     bankName: { type: String, required: true },
//     accountNumber: { type: String, required: true },
//     resume: { type: String, required: true }, // You can store the file path or URL
//     agreeTerms: { type: Boolean, required: true },


// })
// const usercollection= new mongoose.model('employeedb',userSchema)

// module.exports=usercollection

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee',{
        useNewUrlParser :true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("mongoose connected");
    }).catch((e)=>{
        console.log("mongoose connection failed");
    
    })

const userSchema = new mongoose.Schema({
    fullName: String,
    dob: Date,
    gender: String,
    maritalStatus: String,
    nationality: String,
    email: { type: String, required: true, unique: true }, // Example: email is required and must be unique
    phone: String,
    address: String,
    jobTitle: String,
    department: String,
    dateOfJoining: Date,
    employmentType: String,
    education: String,
    skills: [String], // Array of skills
    bankName: String,
    accountNumber: String,
    resume: String,
    agreeTerms: Boolean,
});

module.exports = mongoose.model('User', userSchema);
