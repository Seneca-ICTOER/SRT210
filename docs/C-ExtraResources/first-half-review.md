---
id: first-half-review
title: First Half Review
sidebar_position: 1
description: First Half Review
---

# First Half Review

This week we'll review everything we've done in the course so far, in order to prepare you for the test.

- Start by downloading [this KVM virtual machine disk image](https://scs.senecacollege.ca/~andrew.smith/srt210/review.qcow2).
- Create a new virtual machine, name it "review", and select the downloaded image to use as a virtual disk.
- Do at least all the BASIC exercises below. If you still have time, do the intermediate ones as well. The advanced ones are intended to be the biggest challenges.
- If you find any of the basic ones are challenging - spend more time on that material before the test.

## Offline access

- BASIC There are some documents in /home/hr on your image. Since you don't have the credentials to log in to the machine - use a different technique to retrieve them to your c7host.
- BASIC Reset the root password on the VM so that you can log into it as root.
- INTER Copy the shadow file from the VM's image and ron John the Ripper on it to see whether you can crack any of the users' passwords.
- ADV This VM has Wordpress set up on it. Get the password for the user andrew from the wordpress configuration.
- ADV Set up the system so that you will get an email whenever a user logs in (you decide whether any user or a specific user).
- CRA Find the mysql root password. It's there somewhere but not in an immediately obvious place.

## Networking

- BASIC Set up the VM to work on your network1, and using opendns directly (not via your Bind setup).
- BASIC Get MAC address of c7host, lin1, lin2 from the new VM without SSHing to those machines.
- BASIC Try to get the MAC address of the Seneca gateway from new VM. If you can't do it - you should be able to explain why.
- BASIC Use traceroute in the new VM to find the host's default gateway.
- INTER Spoof the MAC address of the network card in your VM.
- ADV Capture all network traffic on the new VM's default gateway on the virbr interface and save it in a file.

## Firewall

- BASIC Set up iptbles to serve as a useful firewall with just two rules.
- BASIC Allow DNS queries from internal subnet only.
- BASIC Run /root/iptables-dns-fail-setup.sh which will reconfigure your firewall and find what's causing DNS queries to fail.
- BASIC Run /root/iptables-ssh-fail-setup.sh which will reconfigure your firewall and find why SSH traffic is not allowed in.
- INTER List ports the VM is listening on and scan for whether they are exposed externally.
- ADV Set up a new chain in the filter table to allow only specific machines access to MySQL.

## SELinux

- BASIC Check whether it's enabled.
- BASIC Find the security context of several files, determine whether web server should be able to read them.
- INTER Modify security context for web server to be able to write to the wordpress upload directory.
- ADV Verify that the above worked.

## DNS

- BASIC Use host to find A records
- BASIC Use dig/nslookup to find A vs CNAME records
- BASIC Use dig to find authoritative name servers for gmail.com
- BASIC Use dig to get authoritative MX records for gmail.com
- BASIC Configure Bind on lin2 with reverse DNS records for senecacollege.ca, google.com, ietf.org and check that they work in firefox anyway
