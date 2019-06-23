let user = function( userID,password,firstName,lastName,emailID,address,city,state,zipCode,country) {
  let userInfo ={
    userID:userID,
    password:password,
  firstName:firstName,
  lastName:lastName,
  emailID:emailID,
  address:address,
  city:city,
  state:state,
  zipCode:zipCode,
  country:country
  }
  return userInfo;
};


module.exports.user=user;
