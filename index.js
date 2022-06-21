const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
var lst=[
    {name:'Lochan',
     phone:'23448329'
    },
    {
     name:'Samaresh',
     phone:'428476182'
    },
    {
        name:'Skandhan',
        phone:'872836412'
    }
]
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());


app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render("home",{list:contacts});
    });
   
});

app.post('/add-info',function(req,res){
    // lst.push(req.body);
    // // lst.push(req.)
    // for(var i=0;i<lst.length;i++){
    //     console.log(lst[i]);
    // }
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error in creating a contact");
            return;
        }
        // console.log(newContact);
        return res.redirect('back');
    });
    
});

app.get('/delete-info/',function(req,res){
    let ph=req.query.id;
    Contact.findByIdAndDelete(ph,function(err){
        if(err){
            console.log("could'nt delete contact");
            return;
        }
        return res.redirect('back');
    })
    
})
app.listen(port,function(err){
    if(err){
        console.log('failed to start the server',err);
        return;
    }
    console.log("Server, succesfully running in port ",port);
});