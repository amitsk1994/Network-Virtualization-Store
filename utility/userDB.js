
let getAllUsers=function(db){
  return new Promise((resolve, reject) => {
    db.find({}).then(data => {
      //console.log("in find all " + data);
      resolve(data);
    }).catch(err => { return reject(err); })
  })
  //return userList;
};

module.exports.getAllUsers=getAllUsers;
