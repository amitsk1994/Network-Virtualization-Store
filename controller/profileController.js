var express = require('express');
var router = express.Router();

//var session = require('express-session');
var user = require('../models/user');
//var userProfile = require('../models/userProfile');
var itemDB = require('../utility/itemDB');
var userDB = require('../utility/userDB');
var bodyParser=require('body-parser');
var session=require('express-session');
var dialog = require('dialog');
//var app = module.exports = express();

var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

/*db code*/
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/applicationDB');

var Schema=mongoose.Schema;
var userSchema=new Schema({
  userID:{type:Number, required:true},
  password:{type:String, required:true},
  firstName:{type:String, required:true},
  lastName:{type:String, required:true},
  emailID:{type:String, required:true},
  address:String,
  city:String,
  state:String,
  zipCode:String,
  country:String
},{collection:'appUsers'});

var userData=mongoose.model('userData',userSchema);

var itemSchema=new Schema({
  userID:{type:Number},
  itemCode:{type:Number, required:true},
  itemName:{type:String, required:true},
  catalogCategory:{type:String, required:true},
  description:{type:String, required:true},
  rating:{type:Number, required:true},
  itemImage: {type:String, required:true}
},{collection:'itemDB'});

var itemData=mongoose.model('itemData',itemSchema);

var profileSchema=new Schema({
  userID:{type:Number, required:true},
   item:
     { itemCode: {type:Number, required:true},
       itemName: {type:String, required:true},
       catalogCategory: {type:String, required:true},
       description:{type:String, required:true},
       rating: {type:Number, required:true},
       itemImage: {type:String, required:true} },
    rating: {type:Number, required:true},
    used: {type:String, required:true}

},{collection:'userProfile'});

var profileData=mongoose.model('profileData',profileSchema);



router.use(session({secret:"iloveit"}));
console.log('profile-controller code running');

//for SignIn firsttime and storing session
router.get('/',async function(req,res){

  let model = require('../models/user.js');
  let userDB = require('../utility/userDB.js');
  let itemDB = require('../utility/itemDB.js');
  let profileDB = require('../utility/userItemDB.js');
  let userItem= require('../models/userItem.js');
  if(req.session.theUser==null){
    res.render('login',{user:req.session.theUser});
  }
  else{
    let call= req.session.theUser;

    model=model.user(call.userID,call.password, call.firstName, call.lastName, call.emailID, call.address,call.city,call.state,call.zipCode,call.country);
    req.session.theUser = model;
    var userID=req.session.theUser.userID;
    var list=await profileDB.getItems(profileData,userID);
    var listforCodes=await profileDB.getItems(profileData,userID);
    let itemCodeList=[];
    for(let j=0;j<listforCodes.length;j++){
      itemCodeList.push(listforCodes[j].item.itemCode);
    }
    req.session.userProfile=list;
    res.render('myItems',{list:list,user:req.session.theUser,itemList:itemCodeList});
  }
  //res.render('login',{user:req.session.theUser});
});

const { check, validationResult } = require('express-validator/check');
router.post('/',urlencodedParser,[
  check('login').not().isEmpty().isEmail(),
  check('password').not().isEmpty().isLength({min:4,max:12})
],async function(req,res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    dialog.info("Invalid data provided. Please provide proper inputs.");
    //return res.status(422).json({ errors: errors.array() });
    console.log("Invalid data provided");
    console.log(errors.array());
    return res.render('login',{user:req.session.theUser});

  }

  let model = require('../models/user.js');
  let userDB = require('../utility/userDB.js');
  let itemDB = require('../utility/itemDB.js');
  let profileDB = require('../utility/userItemDB.js');
  let userItem= require('../models/userItem.js');
  //let userProfile= require('../models/userProfile.js');
  let call= await userDB.getAllUsers(userData);


  let tempUser;
  for(let i=0;i<call.length;i++){

    if(call[i].emailID==req.body.login && call[i].password==req.body.password){

        tempUser=call[i];
        break;

    }
  }
  if (tempUser==null){
    dialog.info("Incorrect username or password");
    res.render('index',{user:req.session.theUser});
  }
  else{
    //console.log(tempUser);
    model=model.user(tempUser.userID,tempUser.password, tempUser.firstName, tempUser.lastName, tempUser.emailID, tempUser.address,tempUser.city,tempUser.state,tempUser.zipCode,tempUser.country);
    req.session.theUser = model;
    var userID=req.session.theUser.userID;
    var list=await profileDB.getItems(profileData,userID);
    var listforCodes=await profileDB.getItems(profileData,userID);
    let itemCodeList=[];
    for(let j=0;j<listforCodes.length;j++){
      itemCodeList.push(listforCodes[j].item.itemCode);
    }
    req.session.userProfile=list;
    res.render('myItems',{list:list,user:req.session.theUser,itemList:itemCodeList});
  }

});

//for displaying register page
router.get('/signUp',async function(req,res){
  console.log("sadas");
  let model = require('../models/user.js');
  let userDB = require('../utility/userDB.js');
  let itemDB = require('../utility/itemDB.js');
  let profileDB = require('../utility/userItemDB.js');
  let userItem= require('../models/userItem.js');
  //let userProfile= require('../models/userProfile.js');
  let call=await userDB.getAllUsers(userData);
  //model=model.user(call[0].userID,call[0].password, call[0].firstName, call[0].lastName, call[0].emailID, call[0].address,call[0].city,call[0].state,call[0].zipCode,call[0].country);
  req.session.theUser = null;
  //var userID=req.session.theUser.userID;
  //var list=await profileDB.getItems(profileData);
  res.render('UserRegistration',{user:req.session.theUser});
});

//post for completing registration
router.post('/signUp',urlencodedParser,[
  check('firstName').not().isEmpty(),
  check('lastName').not().isEmpty(),
  check('email').not().isEmpty().isEmail(),
  check('password').not().isEmpty(),
  check('repassword').not().isEmpty(),
  check('address').not().isEmpty(),
  check('city').not().isEmpty(),
  check('state').not().isEmpty(),
  check('zip').not().isEmpty(),
  check('country').not().isEmpty()
],async function(req,res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    dialog.info("Invalid data provided. Please provide proper inputs.");

    console.log("Invalid data provided");
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
    //return res.render('login',{user:req.session.theUser});

  }
  console.log("hi")
  let model = require('../models/user.js');
  let userDB = require('../utility/userDB.js');
  let itemDB = require('../utility/itemDB.js');
  let profileDB = require('../utility/userItemDB.js');
  let userItem= require('../models/userItem.js');
  //let userProfile= require('../models/userProfile.js');
  let call= await userDB.getAllUsers(userData);


  let tempUser;
  for(let i=0;i<call.length;i++){

    if(call[i].emailID==req.body.login && call[i].password==req.body.password){

        tempUser=call[i];
        break;

    }
  }
  if (tempUser==null){
    dialog.info("Incorrect username or password");
    res.render('index',{user:req.session.theUser});
  }
  else{
    //console.log(tempUser);
    model=model.user(tempUser.userID,tempUser.password, tempUser.firstName, tempUser.lastName, tempUser.emailID, tempUser.address,tempUser.city,tempUser.state,tempUser.zipCode,tempUser.country);
    req.session.theUser = model;
    var userID=req.session.theUser.userID;
    var list=await profileDB.getItems(profileData,userID);
    var listforCodes=await profileDB.getItems(profileData,userID);
    let itemCodeList=[];
    for(let j=0;j<listforCodes.length;j++){
      itemCodeList.push(listforCodes[j].item.itemCode);
    }
    req.session.userProfile=list;
    res.render('myItems',{list:list,user:req.session.theUser,itemList:itemCodeList});
  }

});

//for signing out, i.e., removing the session
router.get('/signOut',async function(req,res){

  let model = require('../models/user.js');
  let userDB = require('../utility/userDB.js');
  let itemDB = require('../utility/itemDB.js');
  let profileDB = require('../utility/userItemDB.js');
  let userItem= require('../models/userItem.js');
  //let userProfile= require('../models/userProfile.js');
  let call=await userDB.getAllUsers(userData);
  //model=model.user(call[0].userID,call[0].password, call[0].firstName, call[0].lastName, call[0].emailID, call[0].address,call[0].city,call[0].state,call[0].zipCode,call[0].country);
  req.session.theUser = null;
  //var userID=req.session.theUser.userID;
  //var list=await profileDB.getItems(profileData);
  res.render('index',{user:req.session.theUser});
});

//all the forms with post will get controlled in the following method
router.post('/function',urlencodedParser,[
  check('itemCode').optional().isNumeric(),
  check('action').isAlpha(),
  check('checkbox').optional().isIn(['on', 'off']),
  check('selectpicker').optional().isNumeric(),
],async function(req,res){
  //console.log(req.body.itemCode);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let model = require('../models/user.js');
  let modelItem = require('../models/item.js');
  let userDB = require('../utility/userDB.js');
  let itemDB = require('../utility/itemDB.js');
  let profileDB = require('../utility/userItemDB.js');
  let userItem= require('../models/userItem.js');
  //let userProfile= require('../models/userProfile.js');
  let call= req.session.theUser;
  model=model.user(call.userID, call.firstName, call.lastName, call.emailID, call.address,call.city,call.state,call.zipCode,call.country);
  //model=req.session.theUser;
  //req.session.theUser = model;

  var userID=req.session.theUser.userID;
  var listforCodes=await profileDB.getItems(profileData,userID);
  let itemCodeList=[];
  for(let j=0;j<listforCodes.length;j++){
    itemCodeList.push(listforCodes[j].item.itemCode);
  }


  //save action parameter functionality
  if(req.body.action=="save"){

    var itemCode=req.body.itemCode;
    let itemCall=await itemDB.getItem(itemData,Number(itemCode));

    var templist=await profileDB.getItems(profileData);

    if(!itemCodeList.includes(parseInt(itemCode))){
      if(itemCode!=undefined){
        let itemAdd=userItem.userItem(req.session.theUser.userID,itemCall,"0","off");
        //console.log("item add"+itemAdd);
        await profileDB.addItem(profileData,itemAdd);
      }
      var list=await profileDB.getItems(profileData,userID);

      req.session.userProfile=list;
      //console.log("list"+list);
      res.render('myItems',{list:list,user:req.session.theUser,itemList:itemCodeList});
    }
    else{
      //console.log("hi");
      //res.redirect('categories');
      dialog.info("Item already exists in saved items");
      res.render('index',{user:req.session.theUser});
    }

  }
//delete action parameter functionality
  if(req.body.action=="deleteItem"){

    var itemCode=req.body.list;

    var templist=await profileDB.getItems(profileData,userID);
    for(let i=0;i<templist.length;i++){
      if(templist[i].item.itemCode==itemCode){
        let item1=templist[i];
        //console.log(item1);
        await profileDB.removeItem(profileData,item1);
        break;
      }
    }
    var list=await profileDB.getItems(profileData,userID);
    //console.log(list);
    req.session.userProfile=list;

    res.render('myItems',{list:req.session.userProfile,user:req.session.theUser,itemList:itemCodeList});
  }
//update action parameter functionality
  if(req.body.action=="updateProfile"){
    var rate="0";
    var checkedSent="off";
    var itemCode=req.body.list;
    req.session.itemCode=itemCode;

    if(itemCodeList.includes(parseInt(itemCode))){

      let call2=await itemDB.getItem(itemData,Number(itemCode));
      call=call2[0];
      var listtemp=await profileDB.getItems(profileData,userID);
      //console.log("list temp"+listtemp);
      for(let i=0;i<listtemp.length;i++){
        if(listtemp[i].item.itemCode==itemCode){
          checkedSent=listtemp[i].used;
          rate=listtemp[i].rating;
        }
      }
      req.session.itemList=itemCodeList;
      modelItem=modelItem.item(call.itemCode, call.itemName, call.catalogCategory, call.description, call.rating,call.itemImage);
       res.render('feedback',{item:modelItem,rate:rate,checkedSent:checkedSent,user:req.session.theUser,itemList:itemCodeList});
    }
    else{
      res.redirect('/profile');
    }


  }
  //update rating action parameter functionality
  if(req.body.action=="updateRating"){


    var itemCode=req.body.list;
    if(itemCodeList.includes(parseInt(itemCode))){
      var templist=await profileDB.getItems(profileData,userID);
      for(let i=0;i<templist.length;i++){
        if(templist[i].item.itemCode==itemCode){
          let item1=templist[i];

          await profileDB.addItemRating(profileData,item1,req.body.selectpicker);
          break;
        }
      }

      var list=await profileDB.getItems(profileData,userID);

      req.session.userProfile=list;

      res.render('myItems',{list:list,user:req.session.theUser,itemList:itemCodeList});
    }
    else{
      res.redirect('/profile');
    }

      }

//updateFlag action parameter functionality
  if(req.body.action=="updateFlag"){

    var itemCode=req.body.list;

    if(itemCodeList.includes(parseInt(itemCode))){
      var templist=await profileDB.getItems(profileData,userID);
      for(let i=0;i<templist.length;i++){
        if(templist[i].item.itemCode==itemCode){
          let item1=templist[i];

          var checkBox=req.body.checkbox;
          if(req.body.checkbox==undefined){
            var checkBox="off";
          }
          await profileDB.addMadeIt(profileData,item1,checkBox);
          break;
        }
      }

      var list=await profileDB.getItems(profileData,userID);
      req.session.userProfile=list;
      res.render('myItems',{list:list,user:req.session.theUser,itemList:itemCodeList});
    }
    else{
      res.redirect('/profile');
    }


    }

});
module.exports = router;
