---
id: lab6
title: Lab 6
sidebar_position: 7
description: Lab 6
---

# Lab 6

## Objectives

- Learn some fundamental concepts and terminology used with LDAP.
- Practice creating users in OpenLDAP.
- Set up linux machines to authenticate against an OpenLDAP server.

## Part 1: LDAP Concepts

We'll use OpenLDAP in this course.

The purpose of LDAP the way it's used most of the time is relatively intuitive, but the implementation details will take longer to understand.

LDAP is a generic directory access protocol, but we'll look at it specifically as a server containing user credentials that can be used for authorization on multiple machines.

You should read as much of the [OpenLDAP Administration Guide](https://www.openldap.org/doc/admin24/) as you can handle. You'll find that parts of it make no sense at first, but as you get more practice with the software and the concepts they become easier to understand. As a minimum, read:

- The introduction.
- The quick start guide.
- The configuration layout part of "Configuring slapd".
- There is a glossary at the end of the guide. It's not complete and it doesn't have any details, but it's a good place to look when you get confused by weird-looking shorthands like dc, dn, or cn.

## Part 2: Using OpenLDAP

You won't be asked to set up an OpenLDAP server from scratch, we don't have time for that. So you can start with a VM I made for you.

Download [the disk image here](https://scs.senecacollege.ca/~andrew.smith/srt210/lin3.qcow2) and set it up the same way you've set up the midterm test review. You only need 512MB of RAM. Connect it to your network1 network.

The machine doesn't have any regular users, only root. Use whatever technique works for you to reset the root password so that you can log in.

OpenLDAP has been set up on it using [this itzgeek guide](https://www.itzgeek.com/how-tos/linux/centos-how-tos/step-step-openldap-server-configuration-centos-7-rhel-7.html). You should read that guide even though you don't need to perform all those steps yourself.

My OpenLDAP server (lin3) has been set up with:

- The Domain Components dc=andrew.dc=ops.
- The admin username `ldaproot` and the password `seneca99ldap`
- An Organisation Unit named People, for regular users.
- With one regular user `john`, whose password you should change using the ldappasswd command.

The rest of your tasks for this section of the lab are:

- Set up all your nested VMs to authenticate also against LDAP in lin3. (not including alice, which won't let you authenticate via a plain-text channel)
- Create three more users:
    - yoursenecausername with the UID 10000 and full name Your Full Name (replace with your actual username/name)
    - jane with the UID 10001 and full name Jane Greystoke
    - guest with the uid 10002 and full name Andrew's Guests
- Confirm that you can log in using all three usernames on all your nested VMs (except lin3).

## Part 3: Sniffing LDAP Traffic

- Set up tcpdump on your asg1-\>network1 gateway to capture TCP traffic (LDAP works over TCP) in wireshark format.
- Start the packet capture, and log in to lin2a1 using one of the usernames in LDAP.
- Stop the packet capture, and copy the resulting file to c7host.
- Open the file with Wireshark, and examine the contents.
- Look for the password you typed into lin2a1. It should be in an LDAP bindRequest packet.

## Lab Completion

- Make sure you understand what you've done in this lab, so that you're ready to answer questions about it.
- Have notes in your labbook from this lab.
- Show your work to the professor and have them sign your labbook.
