var express = require("express");
var mongoose = require("mongoose");
var que = require("./database").que;
var user = require("./database").user;
var admin = require("./database").admin;
var record = require("./database").record;


var app = express();
var url = require("url");
var path = require('path');
var bodyparser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var ejs  = require('ejs');
var m=0;

app.use(cookieParser());
app.use(
  session({
    secret: "asfaasdasd",
    resave: true,
    saveUninitialized: true
  })
);

app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'public')))
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost/quizzie", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("db connected");
  })
  .catch(error => {
    console.log(error);
  });






app.get("/", (req, res) => {
   if(req.cookies.email)
   {
      user.findOne({Email:req.cookies.email})
      .then((users)=>{
        if(users)
        res.render("user",{data:users.Name});
        else{
          res.render("user",{data:""});
        }
      })
   }
   else{
      res.redirect("/login/0");
   }
});


app.get('/admin',(req,res)=>{
   if(req.cookies.email)
   {
      admin.findOne({Email:req.cookies.email})
      .then((admins)=>{
        if(admins){
          console.log("adsf")
          res.render("admin",{data:admins.Name,que});
        }
        else{
          console.log("1324235")
          res.send({error:404})
        }
      })
   }
   else{
     res.render("admin",{data:"",que})
   }
})


// app.post("/addProducts", (req, res) => {
//   var ques = new que({
//     Name: req.body.productname,
//     Price: req.body.productprice,
//     Desc: req.body.productdesc,
//     Quantity: req.body.productqty
//   });

//   product.save()
//     .then(() => {
//         res.redirect("/");
//       })
//     .catch(error => {
//       console.log(error);
//     });
// });

app.get("/editadmin",function(req,res){
  if(req.cookies.email)
  {
    
  }
  else{
    res.redirect("/");
  }
})


app.post("/addingQue",(req,res)=>{
  if(req.body.que=="" || req.body.opt1=="" || req.body.opt2=="" || req.body.opt3=="" || req.body.opt3=="" || req.body.opt4=="" || req.body.correct=="")
  {
    res.send({error:400})
  }
  else{
  var ques = new que({
    Uid: req.cookies.email,
    Que: req.body.que,
    Opt1: req.body.opt1,
    Opt2: req.body.opt2,
    Opt3: req.body.opt3,
    Opt4: req.body.opt4,
    Correct:req.body.correct,
    Testno:req.body.testno
  });
  ques.save()
  .then(()=>{
    res.send({success:200});
  })
  .catch(()=>{
    res.send({error:400})
  })
  
}
})


app.get("/testpage/:id",(req,res)=>{
if(req.cookies.email)
{  
  user.findOne({Email:req.cookies.email})
  .then((users)=>{
    if(users)
    {
      var testid = req.params.id;
      que.find({Testno:testid})
      .then((tests)=>{
          res.render("test",{data:tests})
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    else{
      res.redirect("/login/0")
    }
  })

}
else{
  res.redirect("/login/0");
}
})

app.post("/showresult",async (req,res)=>{
    var c=[];
    var sol = req.body.array;
    var testno;
    var email = req.cookies.email;
    var name;
    var marks="";

    user.findOne({Email:req.cookies.email})
    .then((users)=>{
      if(users){
        name=users.Name;
      }
      console.log(users.Name)
    })

    for(let i=0;i<sol.length;i++)
    {
        await que.findOne({_id:sol[i].qid})
        .then((check)=>{
          testno=check.Testno
          if(check.Correct==sol[i].ans)
          {
            c.push(i)
          }
        })
        .catch((error)=>{
          console.log(error);
        })
    }

    marks+=(c.length/sol.length)*100;
    if(marks>50){
    status="Passed"
    }
    else{
      status="Failed"
    }
    
    var markssub;

    // var n = marks.length;
    // console.log(n)

    if(marks.length>4)
    markssub = marks.substr(0,5);
    else{
      markssub=marks
    }

    var date;
    console.log(markssub)
    var ISTTime=""
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    ISTTime+= new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    date = ISTTime.substr(0,15);


    var records = new record({
        TestNo:testno,
        Name:name,
        Email:email,
        Maxmarks:sol.length,
        Marks:c.length,
        Percentage:markssub,
        Status:status,
        Date:date
    })
    records.save()
    .then(()=>{
      res.send({mark:c.length,prcnt:marks})
    })
}) 


app.get("/test/:id",(req,res)=>{

if(req.cookies.email){
  var flag=0;
  user.findOne({Email:req.cookies.email})
  .then((loginuser)=>{
    if(loginuser){
  var testid = req.params.id;
  record.find({Email:req.cookies.email})
  .then((records)=>{
    if(records)
    {
      console.log(records)
      for(var i=0;i<records.length;i++)
      {
       if(records[i].TestNo==testid){
         flag=1;
         break;
        }
      }
      if(flag==1)
      {
        res.send({done:201});
      }
      else{
          que.find({Testno:testid})
        .then((tests)=>{
          console.log(tests)
          if(tests!=""){
          console.log(tests)
          res.send({success:200})
          }
          else{
            console.log("asd")
            res.send({error:400})
          }
        })
        .catch(()=>{
          res.send({error:400})
        })
      }

    }
    else
    {
      que.find({Testno:testid})
      .then((tests)=>{
        console.log(tests)
        if(tests!=""){
        console.log(tests)
        res.send({success:200})
        }
        else{
          console.log("asd")
          res.send({error:400})
        }
      })
      .catch(()=>{
        res.send({error:400})
      })
    }
  })
  }
  else{
    res.send({error:202})
  }
  })
}
else{
  res.send({error:202})
}
})



app.get("/login/:id", (req, res) => {
  console.log(req.params );
  res.render('login',{data:req.params.id});
});



app.post("/checkUser/:id", (req, res) => {
  if(!req.body.email || !req.body.pwd)
  {
    res.send({error:"empty"});
  }
  else if(req.params.id==='0')
  {
    var email = req.body.email;
    var password = req.body.pwd;

    user.findOne({Email: email})
      .then(loginuser => {
        if (loginuser.Password == password) {
          res.cookie("email", email,{maxAge:3600000, httpOnly:true});
          res.send({success:"success"});
        } 
        else {
          res.send({error:"wrong"});
        }
      })
      .catch(()=>{
        res.send({error:"wrong"});
      })
  }
  else if(req.params.id==='1'){
    var email = req.body.email;
    var password = req.body.pwd;

    admin.findOne({Email: email})
      .then(loginuser => {
        if(loginuser){
          console.log(loginuser)
        if (loginuser.Password == password) {
          res.cookie("email", email,{maxAge:3600000, httpOnly:true});
          res.send({success:200})
        } else {
          res.send({error:"wrong"});
        }
      }
      else{
        res.sendFile({error:"wrong"});
      }
      })
    
      .catch(()=>{
        res.send({error:"wrong"});
      })
  }
  else{
    res.redirect("/login/0");
  }
});



app.get("/checkLogin",(req,res)=>{
    if(req.cookies.email)
    {
        admin.findOne({Email:req.cookies.email})
        .then((admins)=>{
            if(admins)
            {
              res.send({success:200})
            }
            else{
              res.send({error:404})
            }
        })
    }
    else{
      res.send({error:404})
    }
})



app.get("/register", (req, res) => {
  res.render('register')
});


app.post("/registerUser", (req, res) => {

  if(!req.body.name || !req.body.email || !req.body.pwd1 || !req.body.pwd2 || !req.body.phone)
  {
    res.send({error:"empty"});
  }


  else if(req.body.pwd1==req.body.pwd2)
  {

    console.log(req.body.email);
    user.findOne({Email:req.body.email})
    .then((usr)=>{
      if(!usr)
      {
        admin.findOne({Email:req.body.email})
        .then((admins)=>{
          if(!admins)
          {
            var users = new user({
              Name: req.body.name,
              Email: req.body.email,
              Password: req.body.pwd1,
              Phone: req.body.phone
            });
            users.save()
            .then(() => {
              res.send({success:"added"});
            });
          }
          else{
            res.send({error:"admin"});
          }
        })

      }

      else{
        res.send({error:"already"});
      }

    })

  }
  else if(req.body.pwd1!=req.body.pwd2){
    res.send({error:"mismatch"});
  }
})


app.get('/logOut',(req,res)=>{
   res.clearCookie("email");
   res.redirect('/');
});

app.get('/logOutAdmin',(req,res)=>{
  res.clearCookie("email");
  res.redirect("/login/1");
})


app.get('/checkOut',(req,res)=>{
  cart.find({Email:req.cookies.email})
  .then((c)=>{
    var sum=0;
    for(var i=0;i<c.length;i++)
    {
      sum+=c[i].TotalCost;
    }
    res.render('cart',{c,sum});
  })
})


app.post('/pay',(req,res)=>{
  user.findOne({Email:req.cookies.email})
  .then((d)=>{
    cart.find({Email:req.cookies.email})
    .then((c)=>{
        for(var i=0;i<c.length;i++)
        {
          checkoutUser = new checkout({
            Name:c[i].Name,
            Desc:c[i].Desc,
            Price:c[i].Price,
            CartId: c[i]._id,
            PId:c[i].Pid,
            Quantity:c[i].Quantity,
            Email:c[i].Email,
            userName:d.Name,
            TotalCost:c[i].TotalCost,
            Date:Date.now()
          })
          checkoutUser.save()
        .then((product)=>{
          cart.findByIdAndRemove(product.CartId)
          .then(()=>{
            res.send({error:'Done'})    
          })
          .catch((error)=>{
            // console.log(error)
          })
        })
        .catch((error)=>{
          // console.log(error)
        })
      }
    })
  })
})



app.get('/order-panel',(req,res)=>{
  checkout.find()
  .then((order)=>{
      res.render('order-panel',{order});
    })
  })

app.get('/checkadmin', function(req, res)
{
  if(req.cookies.email)
  {
      admin.findOne({Email:req.cookies.email})
      .then((admins)=>{
        if(admins)
        res.send({code:200,uname:admins.Name})
        else
        res.send({error:"toLogin"});
      })
  }
  else{
    res.send({error:"toLogin"});
  }
  console.log(req.cookies.email);
})


app.post("/getResult",(req,res)=>{
  if(req.cookies.email)
  {
      admin.findOne({Email:req.cookies.email})
      .then((admins)=>{
          if(admins)
          {
            if(req.body.testname){
              que.find({TestNo:req.body.testname})
              .then((Ques)=>{
                console.log(Ques)
                if(Ques)
                {
                    res.send({success:200})
                }
                else{
                  res.send({error:202})
                }
              })
            }
            else{
              res.send({error:201})
            }
            // res.send({success:200})
          }
          else{
            res.send({error:404})
          }
      })
  }
  else{
    res.send({error:404})
  }
})



app.get("/resultPanel/:id",(req,res)=>{
    record.find({TestNo:req.params.id})
    .then((records)=>{
      res.render("result",{records});
    })
})



app.get('/checkEdit',function(req,res){
  if(req.cookies.email)
  {
      admin.findOne({Email:req.cookies.email})
      .then((admins)=>{
        if(admins)
        res.send({code:200,uname:admins.Name})
        else
        throw  "Not Login"
      })
  }
  else{
    throw "Not Login"
  }
  console.log(req.cookies.email);
})


app.listen(3000, () => {
  console.log("Connected");
});
