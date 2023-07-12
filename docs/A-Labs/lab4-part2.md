---
id: lab4-part2
title: Lab 4 Part 2
sidebar_position: 5
description: Lab 4 Part 2
---

# Lab 4 Part 2

## Part 1: Review Of Last Week

### Record types

- Use dig to find the A, NS, MX, and TXT records for lin1.yoursenecaid.ops, senecacollege.ca , and google.ca

### DNS Authority

- Use nslookup to see whether you're getting authoritative responses for lin1.yoursenecaid.ops, senecacollege.ca , and google.ca
- For results that are not authoritative, use the 'server' command in nslookup to query the authoritative servers directly.

## Part 2: Reverse DNS

Here's a quick overview on [simpledns.com](https://simpledns.com/kb/153/what-is-reverse-dns-and-do-i-need-it). The important thing to understand is that the registrar for your domain can't do reverse DNS registration for you.

We'll set up reverse DNS in our Bind server for our three machines we have so far:

- Configure bind to do reverse lookups by adding this to its main configuration file:

```bash
zone "210.168.192.in-addr.arpa" IN {
          type master;
          file "reverse-mydb-for-yoursenecaid-ops";
};
```

- Create reverse lookup zone data in /var/named/:

```bash
$TTL 1D
@	IN SOA	lin2.yoursenecaid.ops. hostmaster.yoursenecaid.ops. (
					20140520; serial
					1D	; refresh
					1H	; retry
					1W	; expire
					3H )	; minimum
	IN NS	lin2.yoursenecaid.ops.
11	IN PTR	lin1.yoursenecaid.ops.
```

Set this up for all your hosts and test it with the host command.

## Part 3: DNS Important For Security

There are many types of attacks on DNS or using DNS. We won't have time to try any of them, but we can do something simple to illustrate the significance of reliable DNS, and the potential of exploiting it.

- Set up your lin2 Bind server to be an authoritative server for google.com
- Set up a record for www.google.com to point to your web server on lin1.
- Confirm that c7host is still using lin2 as the DNS server.
- Clear the history from Firefox in c7host.
- Go to http://www.google.com in your web browser on c7host.

## Lab Completion

- Make sure you understand what you've done in this lab, so that you're ready to answer questions about it.
- Have notes in your labbook from this lab.
- Show your work to the professor and have them sign your labbook.
