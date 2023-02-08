const express = require("express");
const cors = require("cors");
require("./db/config");
const User  = require("./db/user"); 
const Products = require("./db/product"); 
const app = express()

app.use(express.json());
app.use(cors());

app.post("/signup" , async (req , resp)=>{
    let user1 = new User(req.body);
    let result = await user1.save();
    result = result.toObject() ; 
    delete result.password;
    resp.send(result);
} );

app.post("/login" , async(req ,resp)=> {
    if(req.body.password && req.body.email){
        let user  = await User.findOne(req.body).select("-password");
        if(user){
            resp.send(user);
        }
        else{
            resp.send({result : "No user found" });
        }
    }
    else{
        resp.send({result : "Specify password" });
    }
});

app.post("/products" , async (req , resp)=>{
    const product = new Products(req.body);
    const result = await product.save();
    resp.send(result);
});

app.get("/products" , async (req , resp)=>{
    const result = await Products.find();
    resp.send(result);
});
app.delete("/products" , async (req , resp)=>{
    const result = await Products.deleteOne({_id:req.body._id});
    resp.send(result);
});
app.get("/oneproducts" , async (req , resp)=>{
    const result = await Products.findOne({_id:req.query._id});
    resp.send(result);
});

app.put("/product/:id" , async(req, resp)=>{
    const result = await Products.updateOne(
        {_id:req.params.id}, 
        {$set: req.body}
        );
    resp.send(result);
});
app.get('/' , (req ,resp)=> {
    resp.send("App is working")
})

app.listen(5000);
console.log("listen on 5000");