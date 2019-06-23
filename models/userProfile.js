// var userItem = require('../models/userItem');
// var userID=function(userItem){
//   return userID;
// }
//
// var addItem=function(userItem){
//     let flag=0;
//     for(let i=0;i<listObjects.length;i++){
//
//       //console.log(userItem);
//       if(listObjects[i].item==userItem.item){
//         flag=1;
//
//         break;
//       }
//     }
//     //console.log(flag);
//       if(flag==0){
//         listObjects.push(userItem);
//       }
//       //console.log(listObjects);
// }
//
// var removeItem=function(userItem){
//   var index=listObjects.indexOf(userItem);
//   if(index>-1){
//     listObjects.splice(index,1);
//   }
// }
//
// var updateItem=function(userItem,updateElement){
//   for(let i=0;i<listObjects.length;i++){
//
//     if(listObjects[i]===userItem){
//       if(updateElement=="0"||updateElement=="1"||updateElement=="2"||updateElement=="3"||updateElement=="4"||updateElement=="5"){
//         listObjects[i].rating=updateElement;
//       }
//       if(updateElement=="on"||updateElement=="off"){
//         listObjects[i].used=updateElement;
//       }
//     }
//   }
// }
// var getItems=function(){
//   return listObjects;
// }
// var emptyProfile=function(){
//   listObjects=[];
// }
// let listObjects=[
//   { userID:1,
//     item:
//      { itemCode: 1001,
//        itemName: 'OpenVSwitch',
//        catalogCategory: 'Switches',
//        description:'Open vSwitch is a production quality, multilayer virtual switch licensed under the open source Apache 2.0 license. It is designed to enable massive network automation through programmatic extension, while still supporting standard management interfaces andprotocols (e.g. NetFlow, sFlow, IPFIX, RSPAN, CLI, LACP, 802.1ag). In addition, it is designed to support distribution across multiple physical servers similar to VMware\'s vNetwork distributed vswitch or Cisco\'s Nexus 1000V.Open vSwitch can operate both as a soft switch running within the hypervisor, and as the control stack for switching silicon. It has been ported to multiple virtualization platforms and switching chipsets. It is the default switch in XenServer 6.0, the Xen Cloud Platform and also supports Xen, KVM, Proxmox VE and VirtualBox. It has also been integrated into many virtual management systems including OpenStack, openQRM, OpenNebula and oVirt.The kernel datapath is distributed with Linux, and packages are available for Ubuntu, Debian, Fedora and openSUSE. Open vSwitch is also supported on FreeBSD and NetBSD. The Open vSwitch release in development has been ported to DPDK. The bulk of the code is written in platform-independent C and is easily ported to other environments.',
//        rating: 2,
//        itemImage: '2000px-Open_vSwitch_Logo.png' },
//     rating: '3',
//     used: 'off' }
// ]
//
// module.exports.userID=userID;
// module.exports.addItem=addItem;
// module.exports.removeItem=removeItem;
// module.exports.updateItem=updateItem;
// module.exports.getItems=getItems;
// module.exports.emptyProfile=emptyProfile;
// module.exports.listObjects=listObjects;
