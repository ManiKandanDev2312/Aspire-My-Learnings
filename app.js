
// ---------module connections-------------

const express=require('express');
const app=express();
const mysql=require('mysql');
const nodemailer=require('nodemailer');
const path=require('path');
global.man="";
var ejs=require('ejs');
const e = require('express');

//---------------------------------------------

//--------mysql Connections----------------
const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    database: 'mani',
    password: "@Mani2001",
    port:3306
});
db.connect((err,result)=>{
    if(err) throw err;
    console.log("connected");
})

//------------------------------------------


//---------path selection------------------
const location=path.join(__dirname,"./public");
app.use(express.static(location));
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");

//------------------------------------------

//----------home page------------------
app.get("/",(req,res)=>{
    res.render("homepage");
});

//--------------------------------------



//----------login form-----------------
app.post("/loginvalue",(req,res)=>{
    const mobile=req.body.mob;
    const password=req.body.pass;


//----------- admin login------------------
    if(password=="2312" && mobile=="9876"){
        res.render("admin");
    }

//-----------------------------------------
    else{
        db.query('select * from signup where mobile=?',[mobile],async(err,result)=>{
            if(result.length<1){
                // global.mobileNum="";
                // mobileNum=result[0].mobile;
                const msg="mobile is invalid";
                 res.render("login",{msg:msg});
            }
            else{
                if(result[0].pass==password){
                    man=result[0].user_name;
                    res.render("hotel");
                }
                else{
                    const msg="password is invalid";
                 res.render("login",{msg:msg});
                }
                
            }
        });
    }
})

//-------------------------------------------------


//---------hotel pages data base----------------------
db.query('select * from hotel',(err,result)=>{
    hotel=result;
    // id=hotel.ID;
    // console.log(hotel);  


    db.query('select count(hotel_name) as count from hotel',(err,result)=>{
        Hcount="";
        Hcount=result[0].count; 
    }
    );  
  }
);
// db.query('select * as name from hotel where ID=?',(err,result)=>{
//     // console.log(result);
//     console.log(result);
// })

//---------------------------------------------------

//-------------------------------hotelDish--------------------

app.post("/hotelName",(req,res)=>{
    const Hname=req.body.hotelName;
    const Hnam=Hname.replaceAll(" ","_");
    const HnamValue=Hnam+"Dishes";
    console.log(HnamValue);
    
    for(var i=0;i< Hcount;i++){
        if(Hname==hotel[i].hotel_name){
            hotelPage=hotel[i];
            db.query('select dish_variety from ??',Hnam,(err,result)=>{
                dishVariety= result;
            })
            db.query('select count(dish_variety) as count from ??',Hnam,(err,result)=>{
                Dcount= result[0].count;
            })
            db.query('select * from ??',HnamValue,(err,result)=>{
                HotelDish= result;
            })
            db.query('select count(dishVariety) as count  from ??',HnamValue,(err,result)=>{
                HotelDishCount= result[0].count;
            })
            res.render("hotelPages");
        }
        else{
            if(i==Hcount-1)
            {
                res.render("hotel");
            }
        }
    }
})
//------------------------------------------------------------

//--------------admin hotel_details page---------------
app.post("/hotelvalue",(req,res)=>{
    const HID=parseInt(req.body.HID);
    const Himage=req.body.Himage;
    const Hname=req.body.Hname;
    const Hvariety=req.body.Hvariety;
    const Htime=req.body.Htime;
    const Hamount=req.body.Hamount;
    const Hoffer=req.body.Hoffer;
    console.log(typeof(HID));
    const ins={ID:HID,hotel_image:Himage,hotel_name:Hname,variety:Hvariety,time_del:Htime,amount:Hamount,offfer:Hoffer};
    const action=req.body.action;
    const Hnamev=Hname.replaceAll(" ","_");
    const Hnameva=Hnamev+"Dishes";
    if(action=='save'){
        db.query('insert into hotel set ?',ins,(err,result)=>{
            if(err) throw err;
            db.query('create table ??( ID int not null Primary key,dish_variety varchar(50));',Hnamev,(err,result)=>{
                console.log("table created.........");

            })
            db.query('create table ??( ID int not null primary key,dishVariety varchar(100) not null,dishImage varchar(100) not null,dishName varchar(100) not null,dishType varchar(50) not null,dishCost numeric(10) not null,dishDescription varchar(150) not null);',Hnameva,(err,result)=>{
                console.log("table created.........");

            })
            console.log("Data inserted......");
            res.render("hotel_details");
            hotel[HID-1]=ins; 
            
            Hcount++;
        });

    }
    else if(action=='update')
    {
        db.query('update hotel set ? where ID=?',[ins,HID],(err,result)=>{
            if(err) throw err;
            console.log("Data updated......");
            res.render("hotel_details");
            hotel[HID-1]=ins;
        });
    }
    else if(action=='delete')
    {
        
            db.query('delete from hotel where ID=?',HID,(err,result)=>{
                if(err) throw err;
                db.query('drop table ??;',Hnamev,(err,result)=>{
                    console.log("table droped.........");
    
                })
                db.query('drop table ??;',Hnameva,(err,result)=>{
                    console.log("table droped.........");
    
                })
                console.log("Data deleted......");
                res.render("hotel_details");
                hotel[HID-1]=ins;
                Hcount--;
            });
        
    }
    else {
        
        res.render("hotel_details");
    }
})


//--------------------------------------------------
    
//---------Customer page data base----------------------
db.query('select * from signup',(err,result)=>{
    Customer=result;
 
 
     db.query('select count(mobile) as count from signup',(err,result)=>{
         Ccount="";
         Ccount=result[0].count; 
     }
     );  
   }
 );
 
 //---------------------------------------------------
 
 

//--------------admin Customer_details page---------------
app.post("/Customervalue",(req,res)=>{
    const cname=req.body.CNAME;
    const mobile=req.body.CNUM;
    const email=req.body.CEMAIL;
    const pass=req.body.CPASS;
    const ins={user_name:cname,email:email,mobile:mobile,pass:pass};
    const action=req.body.action;

    if(action=='save'){
        db.query('insert into signup set ?',ins,(err,result)=>{
            if(err) throw err;
            console.log("Data inserted......");
            res.render("customer_details");
            Customer[-1]=ins;
            Ccount++;
        });

    }
    else if(action=='update')
    {
        db.query('update signup set ? where mobile=?',[ins,mobile],(err,result)=>{
            if(err) throw err;
            console.log("Data updated......");
            res.render("customer_details");
            Customer[-1]=ins;
        });
    }
    else if(action=='delete')
    {
        
            db.query('delete from signup where mobile=?',mobile,(err,result)=>{
                if(err) throw err;
                console.log("Data deleted......");
                res.render("customer_details");
               
                // ind=Customer.findIndex(mobile);
                // console.log(ind);
                Ccount--;
            });
        
    }
    else {
        
        res.render("customer_details");
    }
})


//--------------------------------------------------
   




//--------------admin render-----------------------
app.get("/admin2305",(req,res)=>{
    res.render("admin");
});

//------------------------------------------------

// ------------------forgot password-----------


app.post("/forgotValue",(req,res)=>{
    const mobile=req.body.mob;
    const newpass=req.body.newpass;

    const ins={mobile:mobile,pass:newpass};

    db.query('select mobile from signup where mobile=?',[mobile],(err,result)=>{
        if(result.length>=1)
        {
            db.query('update signup set ? where mobile=?',[ins,mobile],(err,ressult)=>{
                console.log("updated successfully");
            })

            res.render("login",{msg:""});
            
        }
        else{
            res.render("forgotPass",{msg:"mobile is invalid"});
        }
})

})

//--------------------------------------------

//--------------signup form-------------------
app.post("/value",(req,res)=>{
    const username=req.body.name;
    const mobile=req.body.mob;
    const password=req.body.pass;
    const email=req.body.email;
    const ins={user_name:username,mobile:mobile,pass:password,email:email};
    db.query('select mobile from signup where mobile=?',[mobile],(err,result)=>{
        if(result.length>=1)
        {
            res.render("signup",{msg:"mobile is already taken"});
        }
        else{

            //-------------data insertion-------------------------------


            db.query('insert into signup set ?',ins,(err,result)=>{
                if(err) throw err;
                res.render("login",{msg:""});
            });


            //---------------------------------------------


            //------------email sender-------------------------


            const transporter=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'2k19me028@kiot.ac.in',
                    pass:'2k19me028'
                }
              });
              const mailoptions={
                from:'2k19me028@kiot.ac.in',
                to:email,
                subject:'greetings mail',
                text:`Thanks for creating an account, Account registered successfully`
              };
            
              transporter.sendMail(mailoptions,function(err,info){
                if(err) throw err;
                console.log('email sent:'+info.response);
              });


              //---------------------------------------------
        }
    });
    
});

// app.get("/admin231201",(req,res)=>{
//     res.render("hotel");
// });


//------render pages------------------------------

app.get("/login",(req,res)=>{
    res.render("login",{msg:""})
});
// app.get("/admin",(req,res)=>{
//     res.render("admin")
// });
app.get("/signup",(req,res)=>{
    res.render("signup",{msg:""})
});
app.get("/hotel",(req,res)=>{
    res.render("homepage");
});

app.get("/hotel_details",(req,res)=>{
    res.render("hotel_details");
});
app.get("/customer_details",(req,res)=>{
    res.render("customer_details");
});

app.get("/forgotPass",(req,res)=>{
    res.render("forgotPass",{msg:""});
})
app.get("/Geetha_canteen",(req,res)=>{
    res.render("Geetha_canteen");
})
app.get("/hotelPages",(req,res)=>{
    res.render("hotelPages");
})
app.get("/Payment",(req,res)=>{
    res.render("Payment");
})


//--------------------------------------------

//---------port decalaration-----------------------


app.listen(300,(err,res)=>{
    if(err) throw err;
    console.log("port created....");
})


//----------------------------------------------------







