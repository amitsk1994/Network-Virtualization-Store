var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');
//const { check, validationResult } = require('express-validator/check');
var dialog = require('dialog');
mongoose.connect('mongodb://localhost:27017/applicationDB');

var Schema=mongoose.Schema;
var userSchema=new Schema({
  userID:{type:Number, required:true},
  firstName:{type:String, required:true},
  lastName:{type:String, required:true},
  emailID:{type:String, required:true},
  address:String,
  city:String,
  state:String,
  zipCode:String,
  country:String
},{collection:'appUsers'});

var userData2=mongoose.model('userData2',userSchema);

var itemSchema=new Schema({
  userID:{type:Number},
  itemCode:{type:Number, required:true},
  itemName:{type:String, required:true},
  catalogCategory:{type:String, required:true},
  description:{type:String, required:true},
  rating:{type:Number, required:true},
  itemImage: {type:String, required:true}
},{collection:'itemDB'});

var itemData2=mongoose.model('itemData2',itemSchema);
const { check, validationResult } = require('express-validator/check');
router.get('/',function(req,res){
   res.render('index',{user:req.session.theUser});
  });
router.get('/index' ,function(req,res){
     res.render('index');
  });
router.get('/categories',async function(req,res){
  let model = require('../models/itemCategory.js');
  let itemDB = require('../utility/itemDB.js');
  let call=await itemDB.getItems(itemData2);
  let cat=await itemDB.getCategories(itemData2);

  model=model.itemCategory(cat);

  res.render('categories',{getItems:call,getCat:model,user:req.session.theUser});
  });

router.get('/categories/item/:itemCode',
[check('itemCode').not().isEmpty().isNumeric()],async function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      dialog.info("Invalid page request");
      return res.redirect('/categories');
    }

  let model = require('../models/item.js');
  let itemDB = require('../utility/itemDB.js');
  let itemCode= req.params.itemCode;

  let itemDisplay=await itemDB.getItem(itemData2,Number(itemCode));

  if(itemDisplay==null){
    res.redirect('/categories');
  }
  else{
    model=model.item(itemDisplay[0].itemCode, itemDisplay[0].itemName, itemDisplay[0].catalogCategory, itemDisplay[0].description, itemDisplay[0].rating,itemDisplay[0].itemImage);

     res.render('item',{item:model,user:req.session.theUser});
  }

  });

  router.get('/categories/item/feedback/:itemCode',[check('itemCode').not().isEmpty().isNumeric()],async function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      dialog.info("Invalid page request");
      return res.redirect('/categories');
    }

    let model = require('../models/item.js');
    let itemDB = require('../utility/itemDB.js');

    var rate="0";
    var checkedSent="off";
    let itemCode= req.params.itemCode;
    let itemDisplay= await itemDB.getItem(itemData2,Number(itemCode));
    var listtemp=req.session.userProfile;
    //console.log("listtemp in rate it"+listtemp[0]);
    if(listtemp==undefined){
      res.redirect('/categories');
      //res.end();
    }
    if(listtemp!=undefined){
    for(let i=0;i<listtemp.length;i++){
      if(listtemp[i].item.itemCode==itemCode){
        checkedSent=listtemp[i].used;
        rate=listtemp[i].rating;
      }
    }

    model=model.item(itemDisplay[0].itemCode, itemDisplay[0].itemName, itemDisplay[0].catalogCategory, itemDisplay[0].description, itemDisplay[0].rating,itemDisplay[0].itemImage);
     res.render('feedback',{item:model,rate:rate,checkedSent:checkedSent,user:req.session.theUser,itemList:req.session.itemList});
   }
 });




router.get('/about',function(req,res){
   res.render('about',{user:req.session.theUser});
  });

router.get('/contact',function(req,res){
   res.render('contact',{user:req.session.theUser});
  });
// router.get('/signIn',function(req,res){
//   let model = require('../models/user.js');
//   let db = require('../utility/userDB.js');
//   let call=db.getUsers();
//   console.log(call[0].userID);
//   model=model.user(call[0].userID, call[0].firstName, call[0].lastName, call[0].emailID, call[0].address,call[0].city,call[0].state,call[0].zipCode,call[0].country);
//
//
// req.session.theUser = model;
//
// });



module.exports= router;
