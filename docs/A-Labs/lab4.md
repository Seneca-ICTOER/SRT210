---
id: lab4
title: Lab 4
sidebar_position: 4
description: Lab 4
---

# Lab 4

## Objectives

- Understand the principles of how DNS works.
- Set up an authoritative DNS server.
- Test your DNS server to confirm that it works as expected.
- Configure an operating system to use a specific DNS server.

## Part 1: Prerequisites

You should have completed all the previous labs to date. That means before starting this lab you'll have:

- c7host set up and running, with the default firewall modified to allow incoming SSH connections from the 192.168.210.0/24 network.
- lin1 with a static IP address, running a web server, and the default firewall modified to allow access to that web server.
- lin2 with a static IP address.
- All your machines should have iptables services installed and firewalld uninstaled (or at least disabled and stopped).

If any of that is not working for you already - you will struggle more than needed while debugging configuration issues in this lab.

## Part 2: DNS Overview

DNS is technically not a required part of the internet, but effectively it's indispensable for nearly all services of every sort on the internet. We'll spend a couple of weeks on topics related to DNS.

Read sections 1-13 from the [Wikibooks DNS page](https://en.wikibooks.org/wiki/Communication_Networks/DNS).

## Part 3: Your Own DNS Server

Each of you will set up your own DNS server. We'll set up Bind on lin2 to do the work. The domains you configure will work for you or anyone who explicitly sets up their systems to use your DNS server. They will not work on the internet, because you'd have to pay a registrar to have your domain/server globally registered.

Install Bind on your **lin2**.

An [authoritative](https://en.wikipedia.org/wiki/Domain_Name_System#Authoritative_name_server) Bind server has a global configuration file (named.conf) and at least one zone file for the zone it's authoritative for.

### Set up /etc/named.conf

When you install Bind you'll get a default **/etc/named.conf**. Copy this file over to a backup location and empty the original (do not delete or move it as that will cause SELinux not to trust it). We will be writing one from scratch with only the following contents, but use your own X value where applicable.

```bash
options {
        directory "/var/named/";
        allow-query {any;};
        forwarders { 208.67.222.222; };
};

logging {
        channel default_debug {
                file "data/named.run";
                severity dynamic;
        };
	channel my_queries_channel {
		file "queries/log.txt";
		severity info;
	};
	category queries {
		my_queries_channel;
	};
};

zone "localhost" {
        type master;
        file "named.localhost";
};
zone "yoursenecaid.ops" {
        type master;
        file "mydb-for-yoursenecaid-ops";
};
```

You need to understand all the options in this file except the localhost zone, so that in the future (for example in a test) you can quickly set up a DNS server for a new zone. So look up in [the reference](http://www.zytrax.com/books/dns/ch7/statements.html) these things and write down what they do:

- **directory**
- **allow-query**
- **forwarders**
- **type**
- **file**

Create the directory and the log file for logging queries:

```bash
mkdir /var/named/queries
touch /var/named/queries/log.txt
chown root:named /var/named/queries
chown named:named /var/named/queries/log.txt
chmod 770 /var/named/queries 
chmod 644 /var/named/queries/log.txt
```

If you have SELinux enabled, you need to set the proper file context for the direcotry and the log file using the following two commands:

```bash
chcon system_u:object_r:named_cache_t:s0 /var/named/queries
chcon system_u:object_r:named_cache_t:s0 /var/named/queries/log.txt
```

The "ls -lZ" command lists the file context.

### Set up the zone file

Now edit **/var/named/mydb-for-yoursenecaid-ops** and enter the following:

```bash
$TTL    3D
@       IN      SOA     lin2.yoursenecaid.ops.      hostmaster.yoursenecaid.ops.(
                2018042901       ; Serial
                8H      ; Refresh
                2H      ; Retry
                1W      ; Expire
                1D      ; Negative Cache TTL
);
@       IN      NS      lin2.yoursenecaid.ops.
c7host  IN      A       192.168.210.1
```

Again, here's the [reference documentation](http://www.zytrax.com/books/dns/ch8/) for records in this file. Specifically pay attention to:

- **A** records
- **NS** records
- **SOA** records

Now that your DNS server (bind, a.k.a. named) is configured:

1. Start the **named** service with the **systemctl** command.
2. Check that the _named_ service is running using the **ps ax** command (perhaps combined with **grep**), and separately, the **systemctl** command (if necessary), or check the **/var/log/messages** file for troubleshooting purposes.
3. Once you are certain that the _named_ service had started and runs without errors, then set it to **start automatically** (i.e. enable the named service) when this virtual machine boots.
4. Now that you know the service works, **add the resource records necessary for it to provide forward lookups of the other machines in your virtual network** (hint: You should only need two more records) and restart the service.
5. Test the server on lin2 using the dig command, for example:

```bash
dig c7host.andrew.ops @192.168.210.12
```

### Configure the firewall

The DNS server on lin2 won't be accessible by default even if it's working perfectly because the firewall will not allow access to it.

Add a rule to the appropriate chain to allow access to the service. You'll need to first figure out the protocol and port that is used by DNS queries.

### DNS Client Configuration

- Configure c7host to use lin2 as the DNS server. You can always change that back if you need internet access and your DNS server is broken:
    - Edit the ifcfg file for your interface on c7host (/etc/sysconfig/network-scripts/ifcfg-ens33) and add `PEERDNS=NO` and `DNS1=192.168.210.12`
    - Bring your interface down and back up using the ifdown and ifup commands.
- Try this to verify that you set-up your DNS server correctly:

```bash
host c7host.yoursenecaid.ops
host lin1.yoursenecaid.ops
host lin2.yoursenecaid.ops
host google.ca
```

## Lab Completion

- Make sure you understand what you've done in this lab, so that you're ready to answer questions about it.
- Have notes in your labbook from this lab.
- Show your work to the professor and have them sign your labbook.
