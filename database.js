
var mongoose = require('mongoose');

var Schema  = mongoose.Schema

let Ques = new Schema({
    Uid:{type:String},
    Que:{type:String},
    Opt1:{type:String},
    Opt2:{type:String},
    Opt3:{type:String},
    Opt4:{type:String},
    Correct:{type:String},
    Testno:{type:String}
})

var que = mongoose.model("que",Ques)

let Users = new Schema({
    Name:{type:String},
    Email:{type:String},
    Password:{type:String},
    Phone:{type:String},
})

var user = mongoose.model("user",Users);


let Admins = new Schema({
    Name:{type:String},
    Email:{type:String},
    Password:{type:String},
})

var admin = mongoose.model("admin",Admins);



var Records = new Schema({
    TestNo:{type:String},
    Name:{type:String},
    Email:{type:String},
    Maxmarks:{type:String},
    Marks:{type:String},
    Percentage:{type:String},
    Status:{type:String},
    Date:{type:String}
})

var record = mongoose.model("record",Records);
// let Checkout = new Schema({
//     Name:{type:String},
//     Desc:{type:String},
//     Price:{type:Number},
//     CartId:{
//         type: Schema.Types.ObjectId,
//         ref: "cart"
//     },
//     PId:{
//         type:Schema.Types.ObjectId,
//         ref:"cart"
//     },
//     Quantity:{type:Number},
//     Email:{type:String},
//     userName:{type:String},
//     TotalCost:{type:Number},
//     Date:{type:Date}
// })

// var checkout = mongoose.model("checkout",Checkout);

module.exports={
    que,
    user,
    admin,
    record
}
