var item=require("../models/item.js")
let userItem = function(userID,item,rating,used){
  let userItems={
    userID:userID,
    item:item,

    rating:rating,
    used:used
  }
  return userItems;
};

module.exports.userItem=userItem;
