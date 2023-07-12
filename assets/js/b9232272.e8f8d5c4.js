"use strict";(self.webpackChunkSRT210=self.webpackChunkSRT210||[]).push([[620],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return c}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),d=p(n),c=r,h=d["".concat(l,".").concat(c)]||d[c]||u[c]||o;return n?a.createElement(h,i(i({ref:t},m),{},{components:n})):a.createElement(h,i({ref:t},m))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8057:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return i},default:function(){return u},frontMatter:function(){return o},metadata:function(){return s},toc:function(){return p}});var a=n(3117),r=(n(7294),n(3905));const o={id:"assignment1",title:"Assignment 1",sidebar_position:1,description:"Assignment 1"},i="Assignment 1",s={unversionedId:"B-Assignments/assignment1",id:"B-Assignments/assignment1",title:"Assignment 1",description:"Assignment 1",source:"@site/docs/B-Assignments/assignment1.md",sourceDirName:"B-Assignments",slug:"/B-Assignments/assignment1",permalink:"/SRT210/B-Assignments/assignment1",draft:!1,editUrl:"https://github.com/Seneca-ICTOER/SRT210/tree/main/docs/B-Assignments/assignment1.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"assignment1",title:"Assignment 1",sidebar_position:1,description:"Assignment 1"},sidebar:"courseNotesSidebar",previous:{title:"Lab 8",permalink:"/SRT210/A-Labs/lab8"},next:{title:"Assignment 2",permalink:"/SRT210/B-Assignments/assignment2"}},l={},p=[{value:"Part 1: Set up and routing (10 marks)",id:"part-1-set-up-and-routing-10-marks",level:2},{value:"Part 2: Multiple WebServer Setup (10 marks)",id:"part-2-multiple-webserver-setup-10-marks",level:2},{value:"Part 3: Report (10 marks)",id:"part-3-report-10-marks",level:2},{value:"A1 Test Cases",id:"a1-test-cases",level:2},{value:"Submit",id:"submit",level:2}],m={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"assignment-1"},"Assignment 1"),(0,r.kt)("p",null,"Due date: 12th of June"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"(Update: June 13 2019)"),": Final version. Added clarity (See the ",(0,r.kt)("strong",{parentName:"li"},"A1 Test Cases")," section below) to what will be tested at demo time (based on A1 requirements). More details of what should be in the project report. ",(0,r.kt)("a",{parentName:"li",href:"https://wiki.cdot.senecacollege.ca/w/imgs/19b-SRT210_a1.pdf"},"Download PDF"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"(Update: May 31 2019)"),": First draft. Additional edits will only clarify language and improve readability. You may consider these requirements complete for ",(0,r.kt)("strong",{parentName:"li"},"Assignment 1 in Summer 2019"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"(May 7 2019)"),": Additional requirements will be added at a later date.")),(0,r.kt)("p",null,"Late penalties: 10% per day, including weekends and holidays"),(0,r.kt)("h2",{id:"part-1-set-up-and-routing-10-marks"},"Part 1: Set up and routing (10 marks)"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Complete labs 1 through 4."),(0,r.kt)("li",{parentName:"ol"},"Create a new virtual network named asg1 with subnet 192.168.X where X is the first two digits of your Seneca student number. Do not use DHCP on this network."),(0,r.kt)("li",{parentName:"ol"},"Create a new virtual machine and install CentOS on it as a minimal install. Name this virtual machine lin1a1 but set its hostname to yourmysenecaid.lin1a1."),(0,r.kt)("li",{parentName:"ol"},"Setup lin1a1 to have two network interfaces where both network interfaces are virtio virtual devices. Next, setup one network interface with IP address 192.168.X.32 and to connect to the asg1 network while the other network interface has IP address 192.168.210.22 and it connects to the network1 network."),(0,r.kt)("li",{parentName:"ol"},"Keep in mind in any networked system you can have just one, and only one, default gateway. So configure the default gateway of lin1a1 to be c7host on the 192.168.210 subnet. Confirm lin1a1 can communicate with the Internet and with hosts on network1."),(0,r.kt)("li",{parentName:"ol"},"Create another minimal CentOS VM: name it lin2a1; set its hostname to yourmysenecaid.lin2a1; let it have one network interface and IP 192.168.X.33 (X being the first two digits of your student ID). By default, after the install, this second VM should be able to access machines on the asg1 network but it will not be able to communicate with any hosts on the network1 network."),(0,r.kt)("li",{parentName:"ol"},"Configure lin2a1, the second VM, to be able to access the Internet and the network1 network via lin1a1. You will need to enable IP forwarding and masquerading on the appropriate interface and the appropriate machine for that to happen."),(0,r.kt)("li",{parentName:"ol"},"Configure both VMs (lin1a1 and lin2a1) to be added to your DNS server. able to connect to c7host.yourmysenecaid.ops, lin1.yourmysenecaid.ops, and lin2.yourmysenecaid.ops by their hostnames (don't be tempted to set up another DNS server, use what you already have from your earlier lab)"),(0,r.kt)("li",{parentName:"ol"},"Ensure you start your firewall setup on each VM from the default iptables-services rules. You'll lose marks if you don't have a functional firewall on lin1a1 and on lin2a1.")),(0,r.kt)("h2",{id:"part-2-multiple-webserver-setup-10-marks"},"Part 2: Multiple WebServer Setup (10 marks)"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"(2 Marks) Install NGINX on lin1a1 and Caddy on lin2a2. Confirm that each works locally with thier VM and from c7host. Do the testing of NGINX and Caddy in two stages."),(0,r.kt)("li",{parentName:"ol"},"(3 Marks) From a browser running on c7host confirm connections using IP addresses:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://192.168.210.11"},"http://192.168.210.11")," connects to Apache (from the earlier lab)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://192.168.210.22"},"http://192.168.210.22")," connects to NGINX running on lin1a1"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://192.168.X.33"},"http://192.168.X.33")," connects to Caddy running on lin2a1."))),(0,r.kt)("li",{parentName:"ol"},"(3 Marks) From a browser running on c7host confirm connections using hostnames:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://lin1.yourmysenecaid.ops"},"http://lin1.yourmysenecaid.ops")," connects to Apache (from the earlier lab)"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://lin1a1.yourmysenecaid.ops"},"http://lin1a1.yourmysenecaid.ops")," connects to NGINX running on lin1a1"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://lin2a1.yourmysenecaid.ops"},"http://lin2a1.yourmysenecaid.ops")," connects to Caddy running on lin2a1."))),(0,r.kt)("li",{parentName:"ol"},"(1 Mark) From a browser running on lin2 show you can connect to all 3 webservers using their IP addresses and their hostnames."),(0,r.kt)("li",{parentName:"ol"},"(1 Mark) From a browser running on Windows show you can connect to each of the 3 webservers using the c7host IP address. NOTE: when doing this test, you will want to turn off the other two VMs.")),(0,r.kt)("h2",{id:"part-3-report-10-marks"},"Part 3: Report (10 marks)"),(0,r.kt)("p",null,"Write a report where you describe in your own words your learning experience of this assignment. Keep the tone of your writing such that your present self is teaching your future self (who might have forgotten) the learning experience you achieved while doing this assignment. Be sure to include all the major learning points you overcame to make this assignment work as described."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"The report must be in a PDF format otherwise it will be considered unreadable. The text part of the report can use a Serif or Sans-Serif font (such as Arial or DejaVu Sans) but the configuration file output must be in a fixed-width (such as Courier or MonoType)."),(0,r.kt)("li",{parentName:"ol"},"The very FIRST FEW LINES MUST CONTAIN: ",(0,r.kt)("strong",{parentName:"li"},"Full Name"),", your ",(0,r.kt)("strong",{parentName:"li"},"MySeneca username"),", and your ",(0,r.kt)("strong",{parentName:"li"},"student ID"),"."),(0,r.kt)("li",{parentName:"ol"},"The next FEW LINES MUST CONTAIN output from the command line (use a screen shots for doing this) showing:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"MAC and IP address of ",(0,r.kt)("inlineCode",{parentName:"li"},"eth0")," on ",(0,r.kt)("strong",{parentName:"li"},"lin1a1")),(0,r.kt)("li",{parentName:"ul"},"MAC and IP address of ",(0,r.kt)("inlineCode",{parentName:"li"},"eth1")," on ",(0,r.kt)("strong",{parentName:"li"},"lin1a1")),(0,r.kt)("li",{parentName:"ul"},"MAC and IP address of ",(0,r.kt)("inlineCode",{parentName:"li"},"eth0")," on ",(0,r.kt)("strong",{parentName:"li"},"lin2a1")),(0,r.kt)("li",{parentName:"ul"},"MAC and IP address of ",(0,r.kt)("inlineCode",{parentName:"li"},"eth0")," on ",(0,r.kt)("strong",{parentName:"li"},"lin1"),":"),(0,r.kt)("li",{parentName:"ul"},"MAC and IP address of ",(0,r.kt)("inlineCode",{parentName:"li"},"eth0")," on ",(0,r.kt)("strong",{parentName:"li"},"lin2"),":"))),(0,r.kt)("li",{parentName:"ol"},"What you had to do to set everything up (most important are the networking, routing, and firewall configurations). Screenshots of the configuration files are acceptable, however, the screenshot must be readable. If the font is too small (less than 12 pt) or the screenshot is blurry, you will lose marks. You may take multiple screenshots of a long configuration file provided they show the previous few lines to show continuation. Ideally, it is best (and probably fastest) to use scp to get the configurations out of the VMs and append them into your report."),(0,r.kt)("li",{parentName:"ol"},"Describe any challenges you ran into and how you solved them."),(0,r.kt)("li",{parentName:"ol"},"Screenshots are required for proof that your setup works. Each screenshot must:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Clearly be labelled the test you are proving, for example: Connect to ",(0,r.kt)("inlineCode",{parentName:"li"},"http://lin1a2.yourmysenecaid.ops")," from ",(0,r.kt)("strong",{parentName:"li"},"c7host"),"."),(0,r.kt)("li",{parentName:"ul"},"Cover ",(0,r.kt)("strong",{parentName:"li"},"ALL")," of the individual test cases described in ",(0,r.kt)("strong",{parentName:"li"},"A1 Test Case")," section below."),(0,r.kt)("li",{parentName:"ul"},"Show the interaction between ",(0,r.kt)("strong",{parentName:"li"},"c7host")," (or ",(0,r.kt)("strong",{parentName:"li"},"lin2"),") in a readable (12 pt) font."),(0,r.kt)("li",{parentName:"ul"},"The prompt on the terminal MUST show the logged in user and hostname of the VM so it captures what is happenning where."),(0,r.kt)("li",{parentName:"ul"},"Use ",(0,r.kt)("inlineCode",{parentName:"li"},"curl")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"ping")," to show connections to each server and the web. Pipe the output from ",(0,r.kt)("inlineCode",{parentName:"li"},"curl")," into ",(0,r.kt)("inlineCode",{parentName:"li"},"head")," to restrict output to 4 lines maximum."),(0,r.kt)("li",{parentName:"ul"},"Use ",(0,r.kt)("inlineCode",{parentName:"li"},"cat")," show contents of ",(0,r.kt)("inlineCode",{parentName:"li"},"/etc/resolv.conf")," on ",(0,r.kt)("inlineCode",{parentName:"li"},"lin1a1")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"lin2a1"),"."),(0,r.kt)("li",{parentName:"ul"},"Use ",(0,r.kt)("inlineCode",{parentName:"li"},"cat")," to show the contents of ",(0,r.kt)("inlineCode",{parentName:"li"},"/etc/sysconfig/iptables")," on ",(0,r.kt)("strong",{parentName:"li"},"lin1a1"),", and ",(0,r.kt)("strong",{parentName:"li"},"lin2a1"),". Show all the additional commands you ran on ",(0,r.kt)("strong",{parentName:"li"},"c7host")," after it booted up to test connectivity to Apache on ",(0,r.kt)("strong",{parentName:"li"},"lin1"),", NGINX on ",(0,r.kt)("strong",{parentName:"li"},"lin1a1"),", and Caddy on ",(0,r.kt)("strong",{parentName:"li"},"lin2a1"),"."),(0,r.kt)("li",{parentName:"ul"},"Use cat to show full configuration of these network cards:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"eth0")," on ",(0,r.kt)("strong",{parentName:"li"},"lin1a1")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"eth1")," on ",(0,r.kt)("strong",{parentName:"li"},"lin1a1")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"eth0")," on ",(0,r.kt)("strong",{parentName:"li"},"lin2a1")))))),(0,r.kt)("li",{parentName:"ol"},"Show the output of each of the Assignment 1 test cases (see the next section) in your report.")),(0,r.kt)("h2",{id:"a1-test-cases"},"A1 Test Cases"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Using ",(0,r.kt)("inlineCode",{parentName:"p"},"ping 1.1.1.1"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ssh root@hostname"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"curl http://centos.org")," show the following use cases:"),(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"From ",(0,r.kt)("strong",{parentName:"li"},"lin1a1"),": prove Internet connectivity of ",(0,r.kt)("strong",{parentName:"li"},"lin1a1")),(0,r.kt)("li",{parentName:"ol"},"From ",(0,r.kt)("strong",{parentName:"li"},"lin2a1"),": prove ",(0,r.kt)("strong",{parentName:"li"},"lin1a1")," acts as a router for lin2a1 and acts as a bridge between ",(0,r.kt)("strong",{parentName:"li"},"asg1")," and ",(0,r.kt)("strong",{parentName:"li"},"network1")," using the following 3 test cases.",(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"when ",(0,r.kt)("strong",{parentName:"li"},"lin1a1")," is shut down ",(0,r.kt)("strong",{parentName:"li"},"lin2a1")," no longer has Internet connectivity"),(0,r.kt)("li",{parentName:"ol"},"when ",(0,r.kt)("strong",{parentName:"li"},"lin1a1")," is turned on ",(0,r.kt)("strong",{parentName:"li"},"lin2a1")," has Internet connectivity"),(0,r.kt)("li",{parentName:"ol"},"use ",(0,r.kt)("inlineCode",{parentName:"li"},"ping")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"ssh")," from ",(0,r.kt)("strong",{parentName:"li"},"lin2a1")," to connect to ",(0,r.kt)("strong",{parentName:"li"},"lin1")," and ",(0,r.kt)("strong",{parentName:"li"},"lin2")))),(0,r.kt)("li",{parentName:"ol"},"From ",(0,r.kt)("strong",{parentName:"li"},"c7host"),":",(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"use ",(0,r.kt)("inlineCode",{parentName:"li"},"ping")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"ssh")," to prove connectivity to ",(0,r.kt)("strong",{parentName:"li"},"lin1a1")," and ",(0,r.kt)("strong",{parentName:"li"},"lin2a1")," using their IP numbers and their domain names. The domain names for both ",(0,r.kt)("strong",{parentName:"li"},"lin1a1")," and ",(0,r.kt)("strong",{parentName:"li"},"lin2a1")," should be resolved through ",(0,r.kt)("strong",{parentName:"li"},"lin2"),"."),(0,r.kt)("li",{parentName:"ol"},"use ",(0,r.kt)("inlineCode",{parentName:"li"},"curl")," to display the home pages of Apache running on ",(0,r.kt)("strong",{parentName:"li"},"lin1"),"; NGINX running on ",(0,r.kt)("strong",{parentName:"li"},"lin1a1"),", and Caddy running on ",(0,r.kt)("strong",{parentName:"li"},"lin2a1"),". Use both IP and friendly-names methods to demonstrate this: IP addresses of their respective hosts and the domain names of those respective hosts, for example ",(0,r.kt)("strong",{parentName:"li"},"yourMySeneca.host.ops"),". and ",(0,r.kt)("inlineCode",{parentName:"li"},"192.168.X.33")))))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"From Windows, using Internet Exporer or Edge, show home page contents of your website on that host using the webserver installed on that host, example: Apache on ",(0,r.kt)("strong",{parentName:"p"},"lin1"),", NGINX on ",(0,r.kt)("strong",{parentName:"p"},"lin1a1"),", and Caddy on ",(0,r.kt)("strong",{parentName:"p"},"lin2a1"),". You may have to edit iptables rules on ",(0,r.kt)("strong",{parentName:"p"},"c7host")," each time you want to access that particular VM so HTTP requests coming from port ",(0,r.kt)("inlineCode",{parentName:"p"},"80")," on Windows go directly to that VM."))),(0,r.kt)("h2",{id:"submit"},"Submit"),(0,r.kt)("p",null,"Submit the report on Blackboard."))}u.isMDXComponent=!0}}]);