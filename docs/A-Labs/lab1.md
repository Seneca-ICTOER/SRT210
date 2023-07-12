---
id: lab1
title: Lab 1
sidebar_position: 1
description: Lab 1
---

# Lab 1

## Objectives

- Get an overview of the course, faculty, and expectations.
- Set up host virtual machine to use in the course.
- Understand offline file access security
- Understand and modify passwd and shadow files

## Introduction

- The course is made primarily of labs. It will contain traditional instruction but only enough to get you started. Use the rest of the time to practice what you're supposed to be learning and ask questions when you get stuck or when something doesn't make sense.
- We'll typically have one week for each lab. The lab is due in class, and needs to be checked by the professor before class is over. That means you should plan to have everything done by the middle of the class.
- Make the best out of your labbook. Not only is it a record of your progress (and your marks for the labs) but it's a large set of notes you'll be able to use at all the assessments.
- Everything in the labbook must be hand-written (by you) and every page must have your name on it. If I catch you using someone else's notes during an assessment - that will be treated as plagiarism.
- Speaking of plagiarism - it will not be tolerated in this course. You're encouraged to discuss and help each other (within reason) during labs, but all other assessed work must be completed independently.
- The lab instructions are written for the lab environment at school, but ask your professor if you can use your own host for the coursework and assessments. Generally speaking it should be possible.
- You do not need the following items which are listed in the course outline: USB stick; raspberry pi, case, cable, and power supply; network cable; SD card; and wireless adapter.

## Part 1: Host Virtual Machine

### Overview

You'll use the VMware on our lab machines as a hypervisor for your host. Typically you have one hypervisor running a bunch of VMs, but for securitty reasons in our lab environment we'll need to use nested virtualisation.

That means the VMware hypervisor will run on the real hardware (the lab machine) and we'll set up a second hypervisor in one VMware VM, which will host several other VMs.

### Create Host VM

Make sure your SSD drive has a single NTFS partition taking up the whole space.

Start VMware workstation and create a new virtual machine, with the following specifications:

- Install from the CentOS 7 iso.
- Set the hostname to matrixusernameVMhost (notice that VM is in capitals but everything else is lowercase).
- Store the virtual machine files on your SSD drive.
- Set up the virtual disk to be up to 180GB in size, a single file.
- Set up the network adapter to be in bridged mode.

### Install CentOS

During the CentOS installation, make sure to follow these instructions:

- Set the software selection to Gnome Desktop
- Configure the "partition" layout by starting from the defaults:
    - 20GB for /
    - 40GB for /home
    - The rest (about 117GB) for /var/lib/libvirt/images
- Set the hostname to c7host.
- The network should be connected on boot, as a dhcp client for now.
- Set the root password to something different from your regular user password.
- Create a regular user with the same username as your matrix (MySeneca) username. Set the password to anything you like, as long as it's different from the root password.

Once the installation is complete your andrewVMhost virtual machine should boot into CentOS when it's powered on, you should be able to log in with your username, and browse the internet using Firefox.

### Create "secret" files

Create a simple text file in your user's home directory called secrets.txt and put some text in that file.

Create another file secrets-root.txt in the root's home directory and put some text in that file as well.

Notice how it appears that you need your user's password in order to log in and access the user's secrets.txt and the root password to access secrets-root.txt

## Part 2: Offline Access Security

The short version of this section is that with access to the physical machine (or the virtual disk images in our case) there is practically nothing you can do to secure a system. We'll look at a couple of simple examples to illustrate this point.

Download the latest SystemRescueCd ISO file on windows and configure your host virtual machine to boot from that file.

### Access to files

- Notice that when the machine boots from the systemrescuecd it does not ask for a password. You just press enter a few times and you are logged in as root, with full control over the system.
- If you can figure out the device file associated with the filesystems in your c7host, you can easily access (read or write) any files in there. Run `blkid` and see which block devices ring a bell.
- Then create a couple of directories under /mnt: centos-root and centos-home.
- Then mount the two filesystems you found into those directories.
- At this point you'll have unrestricted access to all the files inside the root and home logical volumes you created when you installed CentOS.
- Find the secrets.txt and secrets-root.txt files and read their contents. Modify those files to include the line "Please secure your system!"
- Shut down your VM (properly), disconnect the DVD drive, and boot back into c7host. Check your secret files. Notice that you can't get to them until you log in with a password.

Practice the above by looking for other files that might be of interest. Configuration files, databases, .htaccess files, etc.

### Resetting the root password

A variation of the file access above is a specific example of changing a file which contains the root password.

- Boot from SystemRescueCd again and mount your c7host root filesystem.
- Have a look at the etc/passwd file. That has a list of all the users on c7host.
- Have a look at the etc/shadow file. This file has the salted and hashed passwords for all the users that have a password.
- You should understand the structure of both files, epecially:
    - username
    - UID
    - GID
    - home directory
    - shell
    - hashed password
- Replace the hashed password field for the root user with nothing. After editing the line for `root` should look like this:`root:::::::`
- Reboot into CentOS and try to log in.

**The same using CentOS ISO**

You can accomplish the same thing you did above by using the CentOS ISO instead of SystemRescueCd. It will be easier because you won't need to reset the SELinux context on the shadow file.

- Set up your VM to boot from the CentOS installation ISO.
- At the boot prompt choose Troubleshooting/Rescue a CentOS system.
- When it boots up, choose option 1.
- Notice that the VM's root filesystem has been mounted for you automatically.
- Remove your regular user's password from the shadow file.
- Disconnect the DVD drive, reboot, and log in.

After you're done with this section - reset both your root's and regular user's passwords to something reasonable.

## Lab Completion

- Make sure you understand what you've done in this lab, so that you're ready to answer questions about it.
- Have notes in your labbook from this lab.
- Show your work to the professor and have them sign your labbook.
