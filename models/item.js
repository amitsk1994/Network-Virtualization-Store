let item = function( itemCode,itemName,catalogCategory,description,rating,itemImage) {
  let itemInfo ={
    userID:0,
    itemCode:itemCode,
  itemName:itemName,
  catalogCategory:catalogCategory,
  description:description,
  rating:rating,
  getImageURL :getImageURL=function(){
    return"/assets/images/"+itemImage;
  }
  }
  return itemInfo;
};

// let getImageURL = function(itemImage){
//   console.log("/assets/images/"+itemImage);
//   return"/assets/images/"+itemImage;
// };
module.exports.item=item;
