---
id: lab8
title: Lab 8
sidebar_position: 9
description: Lab 8
---

# Lab 8

## Objectives

- Semi-automated host fingerprint distribution using /etc/skel/
- Use assymetric encryption (with SSH keys) for password-less SSH authentication.
- Ditribute SSH public keys manually.
- Backup using rsync.

## Part 1: Host Fingerprints

- Before you start work on this section, delete all the files in your c7host's ~/.ssh directory.
- Now ssh to root@lin1.yoursenecaid.ops. You should get a prompt like this:

```text
The authenticity of host 'centos3 (192.168.235.13)' can't be established.
RSA key fingerprint is 53:b4:ad:c8:51:17:99:4b:c9:08:ac:c1:b6:05:71:9b.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'lin1.yoursenecaid.ops' (RSA) to the list of known hosts.
```

- That fingerprint is a hash of lin1's public key. You get a warning because SSH doesn't use certificate authorities, therefore there's no way for your SSH client to know whether it's connecting securely to the real lin1 or a man-in-the-middle attacker.
- When you anwer "yes" above, the fingerprint of the key will be stored in your user's ~/.ssh/known_hosts file, and from that point on your SSH client will be confident that it's connecting to the correct host, unless the keys on the destination host change, in which case you'll get a warning like this:

![Spoof](/img/Spoof.png)

- SSH to every one of your nested VMs and save their fingerints and check the contents of your ~/.ssh/known_hosts file to make sure they're there.
- Then create a new user on c7host, switch to that user (in a terminal, using the "su" command), and try to ssh to one of those hosts again. Notice that the new user needs to confirm that fingerprints are correct again. Delete the new user, including their home directory.

The security of your encrypted SSH tunnels therefore relies on making sure that you have the fingerprints of the hosts you're connecting to. We'll use a simple way to make distributing these fingerprints a little bit easier for all the new users on a system.

- On your c7host have a look at the /etc/skel/ directory. It will contain all the files that are inserted into a new user's home directory when it is being created. You can add any other files and directories you like into there.
- Create the /etc/skel/.ssh/ directory, and copy your user's ~/.ssh/known_hosts into there.
- Then again create a new user on c7host, switch to that user (in a terminal, using the "su" command), and check that user's ~/.ssh/known_hosts file.
- SSH to all of your hosts to confirm that you don't need to verify that host's fingerprint.

## Part 2: SSH Keys

In the last lab we looked at how we can use public key encryption to secure network traffic from many kinds of attacks. SSH traffic is always encrypted, but this week we will:

- Look more closely at how that works.
- Set up password-less authentication using the same assymetric encryption concepts.

The principle is the same as all public key encryption but in this case its use is in a way backwards. Instead of the server holding the private key to allow clients to open an encrypted connection, in this case the client holds the private key as proof that it really is the client. Therefor the private key on the client serves the same purpose as a password normally does.

- As root on your c7host, use ssh-keygen to generate a keypair. Leave the filename as the default and input an empty passphrase.
    - A passphrase would normally be a good thing but for this lab it will be less work to not have it.
- Now you should have an ~/.ssh/id\_rsa file (your private key) and an ~/.ssh/id\_rsa.pub file (your public key).
- Copy the public key to the user's home directory on the machine which you want to ssh to using this key, start with lin1:

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub root@lin1.youruserid.ops
```

- Now the root user on c7host can ssh as root to lin1 without using a password.
- Repeat these steps for the root user on c7host and the root user on every one of your nested VMs.

## Part 3: Backups Using Rsync

Rsync is an old tool that currently works over SSH, which makes it very convenient to copy files around, and specifically - to make backups.

- The difference between just copying files using scp and mirroring directories using rsync is that rsync will only transfer files that have been changes since the last sync. That can save a lot of bandwidth and time for making backups.
- Now that you have password-less ssh set up between c7host and all its nested VMs: set up backups for all your nested VMs. For demonstration purposes we'll just back up the /etc/ directory of each vm.
- Use a command such as `rsync -axv root@lin1.youruserid.ops:/etc /root/vm-backups/lin1/` for each VM to make backups of all of them.
- Try to run that command twice, and notice that the second time it will only transfer files that have changed.
- If you're bored: create a shell script to do all the backups automatically, and set up cron to run that script every hour.

## Lab Completion

- Make sure you understand what you've done in this lab, so that you're ready to answer questions about it.
- Have notes in your labbook from this lab.
- Show your work to the professor and have them sign your labbook.
