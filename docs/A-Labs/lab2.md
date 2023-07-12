---
id: lab2
title: Lab 2
sidebar_position: 2
description: Lab 2
---

# Lab 2

## Objectives

- Set up a nested virtual machine
- Get familiar with basic networking setup and utilities used on Linux
- Understand how the IPtables firewall works and use it to make simple rules

## Part 1: Nested Virtual Machine

Since we're forced to use a Windows machine as the main VM host, we're going to have to set up nested virtualisation. Luckily that's not too difficult.

- Change the settings for your c7host to have at least 4GB of RAM (8 would be better), and enable "Virtual Intel VT-X/EPT or AMD-V/RVI" under VM/Settings/Processors.
- Install the following packages: qemu-kvm qemu-img virt-manager libvirt libvirt-python libvirt-client virt-install virt-viewer bridge-utils
- Make sure (using `systemctl status`) that the libvirtd service starts at boot.
- Those will include both the KVM hypervisor and Virt Manager, which is a graphical tool used to administer it.
- Create a new virtual machine with the following settings:
    - Will be installed from the network: https://mirror.senecacollege.ca/centos/7/os/x86_64/ or http://mirror.netflash.net/centos/7/os/x86_64/
    - 2GB of RAM (needed for installation, you should change it to 512MB after the install is done)
    - 10GB of disk
    - NAT for networking
    - hostname lin1
    - Minimal install

After you're done - you'll have a command-line-only CentOS machine (lin1) running inside a graphical CentOS desktop (c7host).

## Part 2: Basic Networking

### Simple commands

Use these commands to check the curent network settings on lin1:

- ip link (show interfaces)
- ip address (the MAC address, IP address, and subnet mask for every interface)
- ip route (the routing table)
- cat /etc/resolv.conf (the DNS server you're configured to query)
- arp -n (the ARP table)

Note if you're missing a command - you can figure out what package contains in by using `yum whatprovides`

### New virtual network

By default a KVM setup has a NAT network with a DHCP server. That works nicely out of the box but won't work for us because we'll need to configure network settings manually.

1. Power off lin1
2. In the **Connection Details** dialog box, select the **Virtual Networks** tab
3. Click to de-select the **Autostart (on boot)** check-box options and click the **Apply** button.
4. Stop the default network by clicking on the **stop** button at the bottom left-side of the dialog box.
5. Click the **add** button to add a new network configuration.
6. Leave the default network name **network1**.
7. In the next screen, enter the **new network IP address space** called: **192.168.210.0/24**
8. Disable **DHCPv4**
9. Enable Network Forwarding by Selecting **Forwarding to physical network**, the destination should be **Any physical device** and the mode should be **NAT**

### Network settings on lin1

- Now if you try to start lin1 - it will tell you that the network "default" is unavailable. Go into the lin1 VM settings and configure the NIC to use "network1" instead.
- After starting the VM you'll find that your network interface is not configured (try all the commands above again to see their output).
- Configure your wired interface by editing the file as described in the steps below.
- Change to the **/etc/sysconfig/network-scripts** directory.
- List the contents of this directory. You should see 2 different types of files, network config scripts and network configuration files.
- Look for the configuration file for your interface. It should have the name of the interface in the filename and the interface's MAC address in its contents.
- Edit that file and give it the following settings:

```bash
DEVICE=eth0
IPADDR=192.168.210.11
NETMASK=255.255.255.0
GATEWAY=192.168.210.1
HWADDR=xx:xx:xx:xx:xx:xx # Make sure it's the right MAC address
DNS1=192.168.210.1
BOOTPROTO=static
ONBOOT=yes
NM_CONTROLLED=yes
IPV6INIT=no
```

- Ask yourself where did the IP address 192.168.210.1 come from and why it's your default gateway and DNS server.

## Part 3: iptables

CentOS comes with firewalld installed by default. We will not be using that, instead we'll do all our firewall work with iptables. Therefore we'll need to uninstall firewalld and install iptables management tools:

- Use **systemctl** to stop **firewalld** and disable it from starting on boot.
- Use **yum** to uninstall **firewalld** and **install iptables-services**
- Use **systemctl** to start the **iptables service** and configure it to be started on boot.
- Run `iptables -L`. We will be learning how to read that mess in the next section.

IPtables is a complex system, and there's a lot of material this week to cover it. Keep in mind as you're going through the lab that you're trying to learn three things:

- **How iptables works**
- **How to understand the current state of the firewall**
- **How to make useful changes to the firewall**

### IPtables overview

We will use an example of setting up a firewall on a web server.

![iptables](/img/Iptables.png)

**There are some important things to be aware of in terms of this diagram:**

- There are **two sets of IPtables rules (chains) that apply: OUTPUT/INPUT on the client** and **INPUT/OUTPUT on the server**. It is important to think about trafic from the perspective from the client as well as the server.
- **Outbound traffic is rarely blocked unless there is a security policy to prevent some kind of traffic.** Even in that case, that security policy is usually performed on a router.
- **Inbound traffic is of two distinct types**. Our diagram shows:
    1. **New incoming connections** (what you normally think of as **inbound traffic**): the web server receives a **new incoming connection**.
    2. **Incoming data that client receives as a response from the server**: the web page that the server sent back in the diagram above.
        + The analogy would be like making a **telephone call**:
            + A **NEW** packet is like the phone ringing
            + An **ESTABLISHED** packet is the connection and the packet says "hello", along with any further communication.
            + A **RELATED** packet would be the same person calling on a second line. (eg. a second connection that is made because of something that happened in the first, like an ftp transfer).
        + We normally don't want to do anything special for the response. It is safe to assume that **a connection that was allowed to be established should be allowed to receive a response**. This is accomplished with the following **INPUT chain rule** that should be there by default on your machines:

```bash
ACCEPT     all  --  anywhere             anywhere             state RELATED,ESTABLISHED
```

- **Rules are applied to: chains** (e.g. _input/output_) and contain information regarding the type of traffic they apply to. For example, **protocols** such as _tcp/udp/icmp_, **port numbers** such as _22 (SSH)_, _80 (HTTP)_, _443 (HTTPS)_, **addresses**, and many other things.
  + Let's look at how these rules would apply to a simple web connection (HTTP - port 80):
      1. For the _request_ (originating from browser on local machine), the **source port (sport) for the example in the above diagram is 40112 (browser on local machine)** and the **destination port (dport) is 80 (webserver on remote machine)**
      2. For the _response_ (originating from server on remote machine), the **source port (sport) is 80 (webserver on remote machine)** and the **destination port (dport) is 40112 (browser on local machine)**
      3. Since the **RELATED**,**ESTABLISHED** rule already exists, we are only concerned about **controlling** the **incoming traffic on the server**, which in our example, the **chain is: INPUT**, the **protocol is: tcp**, and the **destination is: port 80.**
- Most other services work in a similar way as discussed above.

### Adding a rule

```bash
iptables -I OUTPUT  -p tcp -s0/0 -d 0/0 --dport 80 -j DROP
```

Can be read like this: _Insert a rule into the iptables OUTPUT chain that will match any tcp packet, with any a source address, any destination address, and a deistination port of 80. Any packet that matches will be dropped._

Let's break down the command displayed above to see how it works:

| Command | Breakdown |
| --- | --- |
| **-I**	| Tells iptables to INSERT this line into the OUTPUT policy. This means it will be the first line in the policy. If we used a **-A** switch it would have appended the line and it would be the last line of the policy. If you are writing complex iptables rules where multiple matches can occur, it is important that the lines go in the right order. If you follow the -I with a number, the new rule will be inserted at that location in the chain (for example, `-I 3 OUTPUT` will insert the rule into the 3rd position in the OUTPUT chain, moving the existing rules down as necessary (the old rule #3 will become the new rule #4, for example) |
| **-p tcp**	| Tells iptables to only match TCP packets. Alternately, the protocol could be set to **udp**, **icmp**, or **all** |
| **-s0/0**	| Specifies the source IP address. 0/0 means a source address of “anywhere.” this has been put into the lab because your ip address will change because it is dynamically assigned. You can change this value if you want to the IP address that has been specifically assigned to your PC |
| **-d0/0**	| Specifies the destination address. It makes sense that this address is set to “anywhere” because if we want to block all requests to the WWW, we will never know the specific IP address of web server that is trying to be accessed |
| **--dport 80**	| Tells iptables to look at the destination port in the packet and see if it is equal to 80. Alternately, you can filter based on source addresses using the `--sport` switch |
| **-j**	| Means when condition is met, then jump to a particular target – Basic targets are **ACCEPT**, **DROP**, **REJECT**, and **LOG**. The available targets depend on which table contains the chain |
| **DROP**	| Means drop the packet – make it disappear - and do not continue processing rules. **REJECT** is similar, but causes an error packet to be sent back to the source host. **ACCEPT** causes the packet to be processed. LOG causes an entry to be made in the system logs showing that the packet was processed. Note that the **LOG** target is the only one that does not stop rule-checking in the chain - so you can log a packet with one rule, and then use a later rule in the chain to DROP, REJECT, or ACCEPT it |

To play with this:

- Install the Apache web server on lin1 (the package is called httpd).
- Enable and start that service.
- Install elinks (a command-line web browser) and see if you can connect to http://localhost (it should work by default).
- Using Firefox on c7host, check whether you can view the same webpage in lin1 (by default you wont).
- Next, check the iptables rules in lin1 and try to figure out why Firefox could not connect from c7host by reading the output of `iptables -L` on lin1 carefully looking for clues whether lin1 is letting inbound http traffic (TCP port 80) through.
- If the output of `iptables -L` on lin1 isn't letting HTTP traffic through, which by default it does not, add a rule to the iptables in lin1 to allow inbound traffic to pass through to Apache (TCP port 80).
- Go back to c7host after verifing lin1 permits http traffic and once again test whether Firefox on c7host displays the webpage (you may need to give Firefox the IP address of lin1 to view the webpage). Now it should.

If you make such a mess that you don't know what you did any longer, there are a couple of things that can help you get back to normal:

- iptables --flush will erase all the rules
- Restarting the iptables service will revert all the rules to the defaults.

## Part 4: Your Tasks

Use what you learned so far and what you can learn online in order to set up the following:

1. lin1 will allow access to Apache from any source.
2. c7host will allow access to SSH from hosts on the 192.168.210.\* subnet and deny it from any other source.

## Lab Completion

- Make sure you understand what you've done in this lab, so that you're ready to answer questions about it.
- Have notes in your labbook from this lab.
- Show your work to the professor and have them sign your labbook.
