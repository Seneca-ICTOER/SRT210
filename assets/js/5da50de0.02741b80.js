"use strict";(self.webpackChunkSRT210=self.webpackChunkSRT210||[]).push([[403],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(r),m=a,f=d["".concat(s,".").concat(m)]||d[m]||c[m]||o;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3370:function(e,t,r){r.r(t),r.d(t,{assets:function(){return s},contentTitle:function(){return i},default:function(){return c},frontMatter:function(){return o},metadata:function(){return l},toc:function(){return u}});var n=r(3117),a=(r(7294),r(3905));const o={id:"lab4-part2",title:"Lab 4 Part 2",sidebar_position:5,description:"Lab 4 Part 2"},i="Lab 4 Part 2",l={unversionedId:"A-Labs/lab4-part2",id:"A-Labs/lab4-part2",title:"Lab 4 Part 2",description:"Lab 4 Part 2",source:"@site/docs/A-Labs/lab4-part2.md",sourceDirName:"A-Labs",slug:"/A-Labs/lab4-part2",permalink:"/SRT210/A-Labs/lab4-part2",draft:!1,editUrl:"https://github.com/Seneca-ICTOER/SRT210/tree/main/docs/A-Labs/lab4-part2.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{id:"lab4-part2",title:"Lab 4 Part 2",sidebar_position:5,description:"Lab 4 Part 2"},sidebar:"courseNotesSidebar",previous:{title:"Lab 4",permalink:"/SRT210/A-Labs/lab4"},next:{title:"Lab 5",permalink:"/SRT210/A-Labs/lab5"}},s={},u=[{value:"Part 1: Review Of Last Week",id:"part-1-review-of-last-week",level:2},{value:"Record types",id:"record-types",level:3},{value:"DNS Authority",id:"dns-authority",level:3},{value:"Part 2: Reverse DNS",id:"part-2-reverse-dns",level:2},{value:"Part 3: DNS Important For Security",id:"part-3-dns-important-for-security",level:2},{value:"Lab Completion",id:"lab-completion",level:2}],p={toc:u};function c(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"lab-4-part-2"},"Lab 4 Part 2"),(0,a.kt)("h2",{id:"part-1-review-of-last-week"},"Part 1: Review Of Last Week"),(0,a.kt)("h3",{id:"record-types"},"Record types"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Use dig to find the A, NS, MX, and TXT records for lin1.yoursenecaid.ops, senecacollege.ca , and google.ca")),(0,a.kt)("h3",{id:"dns-authority"},"DNS Authority"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Use nslookup to see whether you're getting authoritative responses for lin1.yoursenecaid.ops, senecacollege.ca , and google.ca"),(0,a.kt)("li",{parentName:"ul"},"For results that are not authoritative, use the 'server' command in nslookup to query the authoritative servers directly.")),(0,a.kt)("h2",{id:"part-2-reverse-dns"},"Part 2: Reverse DNS"),(0,a.kt)("p",null,"Here's a quick overview on ",(0,a.kt)("a",{parentName:"p",href:"https://simpledns.com/kb/153/what-is-reverse-dns-and-do-i-need-it"},"simpledns.com"),". The important thing to understand is that the registrar for your domain can't do reverse DNS registration for you."),(0,a.kt)("p",null,"We'll set up reverse DNS in our Bind server for our three machines we have so far:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Configure bind to do reverse lookups by adding this to its main configuration file:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'zone "210.168.192.in-addr.arpa" IN {\n          type master;\n          file "reverse-mydb-for-yoursenecaid-ops";\n};\n')),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Create reverse lookup zone data in /var/named/:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"$TTL 1D\n@   IN SOA  lin2.yoursenecaid.ops. hostmaster.yoursenecaid.ops. (\n                    20140520; serial\n                    1D  ; refresh\n                    1H  ; retry\n                    1W  ; expire\n                    3H )    ; minimum\n    IN NS   lin2.yoursenecaid.ops.\n11  IN PTR  lin1.yoursenecaid.ops.\n")),(0,a.kt)("p",null,"Set this up for all your hosts and test it with the host command."),(0,a.kt)("h2",{id:"part-3-dns-important-for-security"},"Part 3: DNS Important For Security"),(0,a.kt)("p",null,"There are many types of attacks on DNS or using DNS. We won't have time to try any of them, but we can do something simple to illustrate the significance of reliable DNS, and the potential of exploiting it."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Set up your lin2 Bind server to be an authoritative server for google.com"),(0,a.kt)("li",{parentName:"ul"},"Set up a record for ",(0,a.kt)("a",{parentName:"li",href:"http://www.google.com"},"www.google.com")," to point to your web server on lin1."),(0,a.kt)("li",{parentName:"ul"},"Confirm that c7host is still using lin2 as the DNS server."),(0,a.kt)("li",{parentName:"ul"},"Clear the history from Firefox in c7host."),(0,a.kt)("li",{parentName:"ul"},"Go to ",(0,a.kt)("a",{parentName:"li",href:"http://www.google.com"},"http://www.google.com")," in your web browser on c7host.")),(0,a.kt)("h2",{id:"lab-completion"},"Lab Completion"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Make sure you understand what you've done in this lab, so that you're ready to answer questions about it."),(0,a.kt)("li",{parentName:"ul"},"Have notes in your labbook from this lab."),(0,a.kt)("li",{parentName:"ul"},"Show your work to the professor and have them sign your labbook.")))}c.isMDXComponent=!0}}]);