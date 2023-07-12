---
id: lab5
title: Lab 5
sidebar_position: 6
description: Lab 5
---

# Lab 5

## Objectives

- Understand how DHCP works and set up a working server/client.
- Understand which types of traffic can be captured where, from the point of view of an attacker.
- Practice capturing traffic, and browsing it using Wireshark.

## Part 1: Prerequisites

- In order to do this lab and the ones to follow you need to make sure that you've completed assignment 1 successfully, which in turn requires that you've completed labs 1 through 4.
- Your c7host should have at least 8GB of RAM allocated to it. Your four nested VMs should be reconfigured to use no more than 1GB of memory (1024MB). That way when we create more nested VMs we won't run out of memory.
- If you've completed the labs correctly, this is what the iptables configuration should look like on your c7host (except the "35" which will be different for all of you):

```bash
[root@c7host ~]# iptables -L -v
Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         
   50  3260 ACCEPT     udp  --  virbr1 any     anywhere             anywhere             udp dpt:domain
    0     0 ACCEPT     tcp  --  virbr1 any     anywhere             anywhere             tcp dpt:domain
    0     0 ACCEPT     udp  --  virbr1 any     anywhere             anywhere             udp dpt:bootps
    0     0 ACCEPT     tcp  --  virbr1 any     anywhere             anywhere             tcp dpt:bootps
    0     0 ACCEPT     udp  --  virbr2 any     anywhere             anywhere             udp dpt:domain
    0     0 ACCEPT     tcp  --  virbr2 any     anywhere             anywhere             tcp dpt:domain
    0     0 ACCEPT     udp  --  virbr2 any     anywhere             anywhere             udp dpt:bootps
    0     0 ACCEPT     tcp  --  virbr2 any     anywhere             anywhere             tcp dpt:bootps
  294 31177 ACCEPT     all  --  any    any     anywhere             anywhere             state RELATED,ESTABLISHED
    0     0 ACCEPT     icmp --  any    any     anywhere             anywhere            
    7   469 ACCEPT     all  --  lo     any     anywhere             anywhere            
    0     0 ACCEPT     tcp  --  any    any     anywhere             anywhere             state NEW tcp dpt:ssh
  576 87997 REJECT     all  --  any    any     anywhere             anywhere             reject-with icmp-host-prohibited

Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         
  869 71173 ACCEPT     all  --  any    virbr1  anywhere             192.168.210.0/24     ctstate RELATED,ESTABLISHED
  885 66577 ACCEPT     all  --  virbr1 any     192.168.210.0/24     anywhere            
    0     0 ACCEPT     all  --  virbr1 virbr1  anywhere             anywhere            
    0     0 REJECT     all  --  any    virbr1  anywhere             anywhere             reject-with icmp-port-unreachable
    0     0 REJECT     all  --  virbr1 any     anywhere             anywhere             reject-with icmp-port-unreachable
    0     0 ACCEPT     all  --  virbr2 virbr2  anywhere             anywhere            
    0     0 REJECT     all  --  any    virbr2  anywhere             anywhere             reject-with icmp-port-unreachable
    0     0 REJECT     all  --  virbr2 any     anywhere             anywhere             reject-with icmp-port-unreachable
    0     0 REJECT     all  --  any    any     anywhere             anywhere             reject-with icmp-host-prohibited

Chain OUTPUT (policy ACCEPT 418 packets, 34375 bytes)
 pkts bytes target     prot opt in     out     source               destination         
    0     0 ACCEPT     udp  --  any    virbr1  anywhere             anywhere             udp dpt:bootpc
    0     0 ACCEPT     udp  --  any    virbr2  anywhere             anywhere             udp dpt:bootpc


[root@c7host ~]# iptables -L -v -t nat
Chain PREROUTING (policy ACCEPT 1448 packets, 149K bytes)
 pkts bytes target     prot opt in     out     source               destination         

Chain INPUT (policy ACCEPT 24 packets, 1671 bytes)
 pkts bytes target     prot opt in     out     source               destination         

Chain OUTPUT (policy ACCEPT 265 packets, 19649 bytes)
 pkts bytes target     prot opt in     out     source               destination         

Chain POSTROUTING (policy ACCEPT 265 packets, 19649 bytes)
 pkts bytes target     prot opt in     out     source               destination         
    3   336 RETURN     all  --  any    any     192.168.210.0/24     base-address.mcast.net/24 
    0     0 RETURN     all  --  any    any     192.168.210.0/24     255.255.255.255     
    0     0 MASQUERADE  tcp  --  any    any     192.168.210.0/24    !192.168.210.0/24     masq ports: 1024-65535
  883 66409 MASQUERADE  udp  --  any    any     192.168.210.0/24    !192.168.210.0/24     masq ports: 1024-65535
    1    84 MASQUERADE  all  --  any    any     192.168.210.0/24    !192.168.210.0/24
```

- The asg1 network must be an isolated network, with access to the network1 network and the internet via lin1a1 which is configured as a router.

## Part 2: DHCP

So far we've used either DHCP provided by the virtualisation systems (Vmware/KVM) or static IP addresses. In this lab we'll set up a DHCP server on the asg1 network.

There are many websites that describe the operation of DHCP, [here is a good one](https://www.netmanias.com/en/post/techdocs/5998/dhcp-network-protocol/understanding-the-basic-operations-of-dhcp). You're not expected to understand the details of the contents of every packet, but you should understand the overall process of requesting and assigning an IP address in a DHCP environment.

- Install the DHCP server on lin2a1. The package is named dhcp.
- It doesn't come with a working configuration file. You'll need to put in your own configuration into /etc/dhcpd.conf. You can start with something like this (note that your subnet will be different from this one):

![DHCP Config Pic](/img/Dhcpd.conf.png)

- You should understand what all these parameters mean. In the screenshot the DHCP server will assign IP addresses in the range 192.168.35.100 - 192.168.35.200, and each client will receive the appropriate default gateway and DHS server.
- To test this you'll need a DHCP client on the asg1 network.
- Start the DHCP service (named dhcpd) and once it starts without errors - configure it to start automatically on boot.

## DHCP Clients

- Create a new nested VM on the asg1 network. Same minimal installation, but leave its network interface configured as a DHCP client.
- It should have the hostname `alice`. For various scenarios later we'll treat different machines as `bob` and `charlie`.
- Boot up alice (or bring eth0 down and back up) and confirm that it's been configured as expected based on your DHCP server's configuration.
- You should be able to use the internet on the new machine without any extra configuration, which is the whole point of DHCP.
- Check the logs (/var/log/messages) on your DHCP server. You should see the expected four steps of the communication (discover, offer, request, and ack).
- Notice also that the communication is made of broadcast messages targeted using the MAC address of the DHCP server and DHCP client, since for an obvious reason they cannot communicate using IP addresses.

## Part 3: Packet Capture

We'll do some packet capturing to better help you understand routing and how it applies to security topics. To do this we'll use the tcpdump command to capture traffic, and Wireshark to view it.

### Wireshark

- Wireshark can do many things, we'll just use it as a GUI to display the traffic we captured. Since we only have one machine with a graphical interface (c7host) - install it in there. The package is called wireshark-gnome.
- You can run it now, but we won't use it until we have something to display, in the next section.

### DHCP traffic

- You should already have a DHCP server and client on the asg1 network. Install tcpdump on the server, and run it like this:

```bash
tcpdump -i eth0
```

- The tool will print a bit of information about the traffic that it sees (not all the details, but enough for now).
- Leave this window visible and switch to the alice VM. Bring its network interface down and back up. Since it's configured to be a DHCP client - this will result in a DHCP request.
- Back in the DHCP server window you should have noticed some extra output when you did the step above. You can kill it now with Ctrl+c and look at that output. You should notice at least a couple of BOOTP/DHCP lines related to what you just did.
- Now rerun tcpdump, but this time save the traffic in a Wireshark-compatible format:

```bash
tcpdump -i eth0 -w dhcpserver.pcap
```

- Bring your interface down and back up in the alice VM, and kill tcpdump.
- The dhcpserver.pcap file will not be human-readable, it's intended to be viewed with Wireshark. So copy the file to c7host using the scp command.
- Open dhcpserver.pcap in Wireshark, and browse through the DHCP packets, looking specifically for MAC and IP addresses.

### Apache traffic

- It is generally accepted that no website using authentication should run over plain-text (http://) but many do, and in this section we'll see why that's a bad idea.
- There are quite a few steps to set everything up, but essentially you'll be doing the same thing here as you did for the DHCP traffic above.
- First reconfigure your website on lin1 to require authentication. To do that:
    + Edit /etc/httpd/conf/httpd.conf, and find the section for the /var/www/html directory. In that section replace

```bash
AllowOverride None
```

   + with

```bash
AllowOverride All
```

   + Then restart Apache.

- Go to the /var/www/html directory and create a couple of files. The first one (.htaccess) will require credentials when visitors access the webpage:

```bash
AuthUserFile /var/www/html/.htpasswd
AuthGroupFile /dev/null
AuthName "Please Enter Password"
AuthType Basic
Require valid-user
```

   + And the second one (.htpasswd) will have the credentials (andrew/test):

```bash
andrew:PGwvUbWUtmzqE
```

- Test that your changes worked by accessing lin1.yourusername.ops using Firefox on c7host. It should prompt for credentials and let you see your page when you give it the username andrew and password test.
- Now we'll need to install a GUI on the alice machine so that we can do our packet capture on the router:

```bash
yum groupinstall "GNOME Desktop"
```

- Then make it start automatically

```bash
ln -sf /lib/systemd/system/runlevel5.target /etc/systemd/system/default.target
```

   + and reboot.

- This time the traffic will be between alice and lin1, and we'll do the packet capture on lin1a1, which is the gateway out of the asg1 network:

```bash
tcpdump -i eth1 tcp -w gatewaytcp.pcap
```

- Which will capture all TCP traffic going through the gateway, including the communication we want to sniff.
- Open Firefox in the alice machine, close the extra tabs, and go to lin1.yourusername.ops. Type in the username and password to see your webpage.
- Stop the packet capturing on the gateway, scp the gatewaytcp.pcap file to c7host, and open it with wireshark.
- Look for a line with GET / HTTP/1.1 in the info column, and an "Authorization" line in the Hypretext Transfer Protocol section of that packet.
- With just a bit of browsing you should be able to find the username and password you've typed in when you logged in. Notice that no cracking of brute-forcing was needed.

## Lab Completion

- Make sure you understand what you've done in this lab, so that you're ready to answer questions about it.
- Have notes in your labbook from this lab.
- Show your work to the professor and have them sign your labbook.
