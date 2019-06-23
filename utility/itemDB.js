// let itemList =[
//   {
//     itemCode:1001,
//     itemName:'OpenVSwitch',
//     catalogCategory:'Switches',
//     description:"Open vSwitch is a production quality, multilayer virtual switch licensed under the open source Apache 2.0 license. It is designed to enable massive network automation through programmatic extension, while still supporting standard management interfaces and protocols (e.g. NetFlow, sFlow, IPFIX, RSPAN, CLI, LACP, 802.1ag). In addition, it is designed to support distribution across multiple physical servers similar to VMware's vNetwork distributed vswitch or Cisco's Nexus 1000V.Open vSwitch can operate both as a soft switch running within the hypervisor, and as the control stack for switching silicon. It has been ported to multiple virtualization platforms and switching chipsets. It is the default switch in XenServer 6.0, the Xen Cloud Platform and also supports Xen, KVM, Proxmox VE and VirtualBox. It has also been integrated into many virtual management systems including OpenStack, openQRM, OpenNebula and oVirt.The kernel datapath is distributed with Linux, and packages are available for Ubuntu, Debian, Fedora and openSUSE. Open vSwitch is also supported on FreeBSD and NetBSD. The Open vSwitch release in development has been ported to DPDK. The bulk of the code is written in platform-independent C and is easily ported to other environments.",
//     rating:2,
//     itemImage: '2000px-Open_vSwitch_Logo.png'
//   },
//   {
//     itemCode:1002,
//     itemName:'Indigo Virtual Switch (IVS)',
//     catalogCategory:'Switches',
//     description:"Indigo Virtual Switch (IVS) is an open source virtual switch for Linux compatible with the KVM hypervisor and leveraging the Open vSwitch kernel module for packet forwarding. IVS is built on the Indigo Framework and leverages LoxiGen generated code (loci) to handle OpenFlow messages.The project is distributed under the epl open source license and is maintained by a community off developers and engineers at Big Switch Networks.",
//     rating:4,
//     itemImage: 'indigoSwitch.png'
//   },
//   {
//     itemCode:1003,
//     itemName:'Hyper-V-Switch',
//     catalogCategory:'Switches',
//     description:'Hyper-V Virtual Switch is a software-based layer-2 Ethernet network switch that is available in Hyper-V Manager when you install the Hyper-V server role. Hyper-V Virtual Switch includes programmatically managed and extensible capabilities to connect VMs to both virtual networks and the physical network. In addition, Hyper-V Virtual Switch provides policy enforcement for security, isolation, and service levels.',
//     rating:4,
//     itemImage: 'hyperv.jpg'
//   },
//   {
//     itemCode:2001,
//     itemName:'Juniper VMX',
//     catalogCategory:'Routers',
//     description:'The full-featured, carrier-grade vMX extends more than 20 years of Juniper edge routing expertise to the virtual realm. The vMX Virtual Router runs the Junos operating system and compiles the programmable Trio chipset microcode for x86 chipsets, which maintains complete feature and operational consistency with physical MX Series 3D Universal Edge Routers. The vMX provides sophisticated routing services that support business and broadband services, route reflection, and customer premises equipment (CPE) applications. Optional virtualized services for the vMX significantly expand its application range.',
//     rating:4,
//     itemImage: 'junipervMX.jpg'
//   },
//   {
//     itemCode:2002,
//     itemName:'VyOS',
//     catalogCategory:'Routers',
//     description:'VyOS is an open source network operating system based on Debian GNU/Linux.VyOS provides a free routing platform that competes directly with other commercially available solutions from well known network providers. Because VyOS is run on standard amd64, i586 and ARM systems, it is able to be used as a router and firewall platform for cloud deployments.',
//     rating:4,
//     itemImage: 'vyos.png'
//   },
//   {
//     itemCode:2003,
//     itemName:'Brocade vRouters',
//     catalogCategory:'Routers',
//     description:'The Brocade vRouter is purpose-built for Network Functions Virtualization (NFV), bringing an impressive performance boost. As the first virtual router for carrier-class networks, the Brocade vRouter is the highest-performing software router in the industry, achieving 10+ Gbps performance per physical core. The Brocade vRouter delivers advanced routing, stateful firewall, NAT, and VPN capabilities in software without sacrificing the reliability and carrier-class performance of hardware networking solutions.',
//     rating:4,
//     itemImage: 'brocade.png'
//   },
//   {
//     itemCode:3001,
//     itemName:'Juniper vSRX',
//     catalogCategory:'Firewalls',
//     description:'The vSRX offers the same features as our physical SRX Series firewalls but in a virtualized form factor for delivering security services that scale to match network demand. It offers the same features as the SRX appliance, including core firewall, robust networking, full next-gen capabilities, and automated life-cycle management. Handling speeds up to 100 Gbps, the vSRX is the industry’s fastest virtual firewall.',
//     rating:4,
//     itemImage: 'junipervsrx.jpg'
//   },
//   {
//     itemCode:3002,
//     itemName:'pfSense',
//     catalogCategory:'Firewalls',
//     description:'pfSense® software is a free, open source customized distribution of FreeBSD specifically tailored for use as a firewall and router that is entirely managed via web interface. In addition to being a powerful, flexible firewalling and routing platform, it includes a long list of related features and a package system allowing further expandability without adding bloat and potential security vulnerabilities to the base distribution.',
//     rating:4,
//     itemImage: 'pfsense.png'
//   },
//   {
//     itemCode:3003,
//     itemName:'OPNSense',
//     catalogCategory:'Firewalls',
//     description:'OPNsense is open source, FreeBSD-based firewall and routing software developed by Deciso, a company in the Netherlands that makes hardware and sells support packages for OPNsense. It is a fork of m0n0wall, which was built on FreeBSD. It was launched in January 2015.ar, OPNsense has a web-based interface and can be used on i386 and x86-64 platforms. Along with acting as a firewall, it has traffic shaping, load balancing, and virtual private network capabilities, and others can be added via plugins',
//     rating:4,
//     itemImage: 'opnsense.jpg'
//   }
// ]
let getCategories=function(db){
  return new Promise((resolve, reject) => {
    db.find({}).then(data => {
      let categoryList=[];
      for(let i=0;i<data.length;i++){
        if(!categoryList.includes(data[i].catalogCategory)){
          categoryList.push(data[i].catalogCategory);
        }
      }
      
      resolve(categoryList);
    }).catch(err => { return reject(err); })
  })
  let catList= ['Switches','Routers','Firewalls'];
  return catList;
}
let getItems=function(db){
  return new Promise((resolve, reject) => {
    db.find({}).then(data => {

      resolve(data);
    }).catch(err => { return reject(err); })
  })
};

let getItem=function(db,itemC){
  return new Promise((resolve, reject) => {
    db.find({itemCode:itemC}).then(data => {

      resolve(data);
    }).catch(err => {
      return reject(err);
    })
  });

}
//module.exports.itemList=itemList;
module.exports.getItems=getItems;
module.exports.getItem=getItem;
module.exports.getCategories=getCategories;
