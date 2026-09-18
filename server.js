const express=require("express");
const path=require("path");
const app=express();
const PORT=process.env.PORT||3000;
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

let users=[
 {id:1,name:"Demo Customer",phone:"03000000000",role:"customer"},
 {id:2,name:"MoveFast Logistics",phone:"03111111111",role:"provider",verified:true},
 {id:3,name:"Admin",phone:"03222222222",role:"admin"}
];
let requests=[];
let quotes=[];
let bookings=[];

app.get("/api/health",(req,res)=>res.json({ok:true,service:"MoveMart API"}));
app.get("/api/requests",(req,res)=>res.json(requests));
app.get("/api/quotes",(req,res)=>res.json(quotes));
app.get("/api/bookings",(req,res)=>res.json(bookings));

app.post("/api/signup",(req,res)=>{
 const {name,phone,role="customer"}=req.body;
 if(!name||!phone) return res.status(400).json({error:"Name and phone are required"});
 const user={id:Date.now(),name,phone,role,verified:role!=="provider"};
 users.push(user); res.json({ok:true,user});
});
app.post("/api/login",(req,res)=>{
 const {phone}=req.body;
 const user=users.find(u=>u.phone===phone);
 if(!user) return res.status(404).json({error:"Account not found. Sign up first."});
 res.json({ok:true,user});
});
app.post("/api/requests",(req,res)=>{
 const r={id:"MM-"+Date.now().toString().slice(-8),...req.body,status:"open",createdAt:new Date().toISOString()};
 requests.push(r); res.json({ok:true,request:r});
});
app.post("/api/quotes",(req,res)=>{
 const q={id:"Q-"+Date.now().toString().slice(-7),...req.body,status:"pending",createdAt:new Date().toISOString()};
 quotes.push(q); res.json({ok:true,quote:q});
});
app.post("/api/bookings",(req,res)=>{
 const b={id:"BOOK-"+Date.now().toString().slice(-7),...req.body,status:"confirmed",createdAt:new Date().toISOString()};
 bookings.push(b); res.json({ok:true,booking:b});
});
app.post("/api/admin/verify",(req,res)=>{
 const u=users.find(x=>x.id===Number(req.body.userId));
 if(!u) return res.status(404).json({error:"Provider not found"});
 u.verified=req.body.approved===true; res.json({ok:true,user:u});
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`MoveMart running on port ${PORT}`));