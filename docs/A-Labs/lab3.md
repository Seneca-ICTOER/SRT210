---
id: lab3
title: Lab 3
sidebar_position: 3
description: Lab 3
---

# Lab 3

## Objectives

- Understand how port forwarding works and how it relates to security.
- Set up port forwarding using iptables.
- Understand fundamental concepts that make up SELinux.
- Troubleshoot problems caused by SELinux.

## Part 1: Fix iptables Mistakes

Most of you will have experimented with iptables last week and have made mistakes, which should be fixed before you start this week's lab. Here are some tips:

- You should start with the default iptables setup which you got when you installed iptables-services. If you've lost that - you can get it back by by putting the default values into /etc/sysconfig/iptables:

```bash
# cat /etc/sysconfig/iptables
# sample configuration for iptables service
# you can edit this manually or use system-config-firewall
# please do not ask us to add additional ports/services to this default configuration
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -i lo -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibited
COMMIT
```

- Then re-add the rules you created last week, and make them persistent by running `service iptables save`

## Part 2: NAT

[This website](https://www.systutorials.com/816/port-forwarding-using-iptables/) has a decent overview of port forwarding.

- We'll set up your lin1 machine to be a web server accessible from the internet (in our case specifically that means accessible from the Seneca network).
- Create a text file on lin1 named index.html in the /var/www/html directory with the following contents (replace Andrew with your name):

```text
Hello, this is Andrew's web server on lin1.
```

- Feel free to add as much HTML in there as you like.
- Confirm that:
    - Apache on lin1 is running, and accessible from lin1.
    - It's accessible from c7host
- Notice that if you try to access 192.168.210.11 from outside your vmware environment - there will not be a route to get to it.
- Try to go to the Seneca IP address of your c7host using a web browser on your VMware host (Windows for lab machines). That should also not work but at least you should have a route to it.
    - Note that if you're using a laptop on wireless - you probably have your c7host network adapter set to NAT instead of bridged mode. If that's the case - you might need to modify some steps from this lab.
- Now we'll configure port forwarding so that any requests to TCP port 80 arriving at c7host will be forwarded to lin1:

```bash
# any inbound HTTP requests on ens33 are for Apache (running in linX)
iptables -A PREROUTING -t nat -i ens33 -p tcp --dport 80 -j DNAT --to 192.168.210.11:80

# any outbound HTTP requests on ens33 (originating from linX) are returned to same linX
iptables -A POSTROUTING -t nat -o ens33 -p tcp -s 192.168.210.11 --sport 80 -j SNAT --to 192.168.210.11

# let c7host forward packets otherwise they won't reach linX 
iptables -I FORWARD -p tcp -d 192.168.210.11 --dport 80 -j ACCEPT
```

- Don't just run those commands blindly - understand what they do. You can read more detail on the above rule set from [this website](https://wiki.archlinux.org/index.php/Simple_stateful_firewall)
- Try accessing your c7host from a web browser again. You should see the web page from your lin1 web server.

### NAT as a security tool

Note that there is plenty of nonsense on the internet, and lots of Google results will tell you that NAT is absolutely definitely not supposed to be used for securing systems online. Use your own brain to make your own decisions. I encourage you to ignore loud proclamations of fact that are missing any specific technical explanation and real-world examples.

A machine on a private subnet is not addressable from the internet. So out of the box you don't need to worry about port scans, brute force attacks, and services that were running by default that you didn't know about or didn't pay attention to.

In order to allow access to a machine on a private subnet you have to make a whitelist on the router, with every explicit service that's supposed to be accessible on your internal machine. All things being equal - a whitelist provides a greater level of security than a blacklist.

And at the end of the day if you screw up the setup of your router: the worst thing that will happen is that your internal service will be inaccessible. From a security point of view that is much better than a screwup with a firewall which can _make every system and service accessible_ to _everyone on the internet_.

## SELinux Basics

SELinux is a ridiculously complex topic. Very few people understand it fully, and you're not expected to either. But you need at least to have a grasp of the basics and be able to debug an SELinux-related problem when it's manifest.

We'll use an example as an exercise to help us learn the basic concepts. The example is based on the better illustrated "SELinux Practical Examples" section from [ComputerNetworkingNotes](https://www.computernetworkingnotes.com/rhce-study-guide/selinux-explained-with-examples-in-easy-language.html).

- You should already have Apache running on lin1, and serving your custom index.html file.
- If you run `ls -al /var/www/html` you'll find that only root has write access to that directory. Let's change that so it's more realistic.
- Use the chown command to change the ownership of the /var/www/html directory and its contents from root/root to youruser/yourgroup.
- Switch to your regular user in the terminal and go to your home directory.
- Create a file named copytest.html and another called movetest.html with some text inside.
- Run `ls -lZ` and save the output somewhere (you can write it down in your labbook for example).
- Copy copytest.html to /var/www/html and move movetest.html to the same directory.
- Try to access each file from a web browser. You should be able to access one but not the other.
- Check the web server error log (/var/log/httpd/error\_log) - it should tell you there's a problem with permissions.
- Check your permisions with `ls -l`, they should apear to allow acces for everyone to read movetest.html
    - This is a good bit of learning to absorb. When there's a permission denied error that makes no sense - it's quite likely that SELinux is at fault.
- Look for "movetest.html" in the SELinux log /var/log/audit/audit.log
- You should find a line in there with the word "denied" in it. Instead of giving yourself a headache trying to descipher that log line, go and check the SELinux context on the files involved:
    - Run `ls -lZ` on /var/www/html and compare the output to the one you saved earlier.
- The problem is the security context of the movetest.html file. Fix it using the chcon command (read [the tutorial](https://www.computernetworkingnotes.com/rhce-study-guide/selinux-explained-with-examples-in-easy-language.html)).

## Part 3: Your Tasks

Use what you learned so far and what you can learn online in order to set up the following:

1. Fix any problems with your firewall from last week.
2. Set up access to lin1's Apache from the Seneca network, and test it. Ideally test it with other students' help.
3. Set up lin2 (192.168.210.12) the same way you set up lin1. Make sure you have the firewall and networking tools installed, but you don't need Apache on it.
4. Set up IPTables on c7host to forward SSH requests to port 2221 to go to the SSH server on lin1, and port 2222 to go to the ssh server on lin2.
5. Complete the exercise in the SELinux section of the lab.

## Lab Completion

- Make sure you understand what you've done in this lab, so that you're ready to answer questions about it.
- Have notes in your labbook from this lab.
- Show your work to the professor and have them sign your labbook.
