//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose=require("mongoose")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//ALl global declaration here baby!!
//mongoose.connect("mongodb://localhost:27017/posts",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://admin2-nir:test1234567890@cluster0.kubad.mongodb.net/posts",{useNewUrlParser: true, useUnifiedTopology: true});

const post_schema={
  title:String,
  content:String,
  header_image:String
}
const msg_schema={
  name: String,
  email: String,
  message:String,
}
const Post=new mongoose.model("post",post_schema);
const Msg=new mongoose.model("message",msg_schema);

app.get("/",function(req,res){
      res.render("home",{ctc_clr:"#333333",path_name:""});
});
app.get("/blog",function(req,res){

    Post.find({},function(err, result){
      res.render("blog",{title:"Blogs",posts:result,ctc_clr:"#0275c0",path_name:"blog"});
    });

});
app.get("/about",function(req,res){

    res.render("about",{ctc_clr:"#0275c0",path_name:"about"});
});

app.post("/contact",function(req,res){

    const new_msg=new Msg({
      name:req.body.name,
      email:req.body.email,
      message:req.body.message
    });

    new_msg.save();

    const redirect_path=req.body.button;

    res.redirect("/"+redirect_path);
});

app.get("/compose",function(req,res){
  res.render("compose",{title:"Compose",ctc_clr:"#0275c0",path_name:"compose"});
});
app.post("/compose",function(req,res){
    // const data={
    //    title:req.body.postTitle,
    //    body:req.body.postBody
    // };
    //
    // posts.push(data);

    // Post.findOne({title:req.body.postTitle},function(err,object){
    //   if(!err){
    //     if(!object){
    //       const new_post=new Post({
    //         title:req.body.postTitle,
    //         content: req.body.postBody
    //       })
    //
    //       new_post.save();
    //
    //       res.redirect("/");
    //     }else{
    //       res.redirect("/")
    //     }
    //   }
    // });

    Post.find({},function(err,result){
      if(result.length===0){
        const new_post=new Post({
            title:req.body.postTitle,
            content: req.body.postBody,
            header_image: req.body.postImage
          });
        new_post.save();
        res.redirect("/compose")
      }else{

      var title_check= _.lowerCase(req.body.postTitle);
      var temp=result.map(function(e){ return _.lowerCase(e.title); }).indexOf(title_check);
      if(temp===-1){
        const new_post=new Post({
          title:req.body.postTitle,
          content: req.body.postBody,
          header_image: req.body.postImage
        });
        new_post.save();
        res.redirect("/blog");
      }else{
        res.send("blog already there no need to create new one")
      }
    }
    });
//console.log(result);
});

app.get("/posts/:postid",function(req,res){

    Post.find({},function(err,result){
      var pi=_.lowerCase(req.params.postid);
      var pos = result.map(function(e) { return _.lowerCase(e.title); }).indexOf(pi);
      if(pos===-1){
        res.send("no such blog exsist");
      }else{

        res.render("post",{title:result[pos].title,body:result[pos].content,path_name:"posts/"+result[pos].title,ctc_clr:"#0275c0"});
      }
    });

    // var pi=_.lowerCase(req.params.postid);
    // var pos = posts.map(function(e) { return _.lowerCase(e.title); }).indexOf(pi);
    // if(pos===-1){
    //   res.send("no such blog exsist");
    // }else{
    //
    //   res.render("post",{title:posts[pos].title,body:posts[pos].body});
    // }
});







// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
  console.log("Server Started Successfully")
});
