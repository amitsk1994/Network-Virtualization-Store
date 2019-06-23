var userItem = require('../models/userItem.js');
var item=require('../models/item.js');
// let listObjects=[
//   { item:
//      { itemCode: 1001,
//        itemName: 'OpenVSwitch',
//        catalogCategory: 'Switches',
//        description:'Open vSwitch is a production quality, multilayer virtual switch licensed under the open source Apache 2.0 license. It is designed to enable massive network automation through programmatic extension, while still supporting standard management interfaces andprotocols (e.g. NetFlow, sFlow, IPFIX, RSPAN, CLI, LACP, 802.1ag). In addition, it is designed to support distribution across multiple physical servers similar to VMware\'s vNetwork distributed vswitch or Cisco\'s Nexus 1000V.Open vSwitch can operate both as a soft switch running within the hypervisor, and as the control stack for switching silicon. It has been ported to multiple virtualization platforms and switching chipsets. It is the default switch in XenServer 6.0, the Xen Cloud Platform and also supports Xen, KVM, Proxmox VE and VirtualBox. It has also been integrated into many virtual management systems including OpenStack, openQRM, OpenNebula and oVirt.The kernel datapath is distributed with Linux, and packages are available for Ubuntu, Debian, Fedora and openSUSE. Open vSwitch is also supported on FreeBSD and NetBSD. The Open vSwitch release in development has been ported to DPDK. The bulk of the code is written in platform-independent C and is easily ported to other environments.',
//        rating: 2,
//        itemImage: '2000px-Open_vSwitch_Logo.png' },
//     rating: 3,
//     used: 'off' }
// ]

var getItems=function(db,userID){
  return new Promise((resolve, reject) => {
    db.find({userID:userID}).then(data => {

      resolve(data);
    }).catch(err => { return reject(err); })
  })
}

var addItem=function(db,userItem){

  return new Promise((resolve, reject) => {
    db.create({userID:userItem.userID,item:userItem.item[0],rating:Number(userItem.rating),used:userItem.used}).then(data => {

      resolve();
    }).catch(err => { return reject(err); })
  })
}

var removeItem=function(db,userItem){

  return new Promise((resolve, reject) => {
    db.deleteOne({userID:userItem.userID,item:userItem.item,rating:Number(userItem.rating),used:userItem.used}).then(data => {
      //console.log("in delete all " + data);
      resolve();
    }).catch(err => { return reject(err); })
  })
}

var addItemRating=function(db,userItem,rating){
  //console.log("in addrating");

  return new Promise((resolve, reject) => {
    db.updateOne({ userID:userItem.userID,item : userItem.item },
      { $set: { rating : rating } }).then(data => {
    //  console.log("in update" + data);
      resolve();
    }).catch(err => { return reject(err); })
  })
}

var addMadeIt=function(db,userItem,used){
  //console.log("in addrating");
  //console.log(userItem);
  //console.log(rating);
  return new Promise((resolve, reject) => {
    db.updateOne({ userID:userItem.userID,item : userItem.item },
      { $set: { used : used } }).then(data => {
      //console.log("in update" + data);
      resolve();
    }).catch(err => { return reject(err); })
  })
}

//module.exports.listObjects=listObjects;
module.exports.getItems=getItems;
module.exports.addItem=addItem;
module.exports.removeItem=removeItem;
module.exports.addItemRating=addItemRating;
module.exports.addMadeIt=addMadeIt;
