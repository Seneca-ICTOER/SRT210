---
id: assignment2
title: Assignment 2
sidebar_position: 2
description: Assignment 2
---

# Assignment 2

**Due date**: 2nd of august

**Late penalties**: 10% per day, including weekends and holidays. Must be submitted before the exam week starts.

In this assignment you will set up automatic, incremental backups of all the important data from your nested virtual machines.

## Machines to Back Up

Create a shell script named yourusername-backup.sh in c7host that will make backups of all the custom data from:

- lin1
- lin2
- lin3
- lin1a1
- lin2a1

In order to have this script run automatically, you'll need to enable the root user from c7host to SSH to each nested VM using ssh keys for authentication. How to do this is described in Lab 8.

## Data to Back Up

What you back up will be different for each machine, since they are running different services. As a minimum, you need to back up:

- The users, groups, and passwords,
- The users' home directories (don't forget about the root user),
- The network configuration,
- Your firewall settings,
- The SSH server configuration,
- The Apache configuration and data,
- All the log files,
- The DNS server configuration,
- The LDAP server configuration,
- Whatever file(s) make your router work,
- The DHCP server configuration.

You'll need to do a little bit of research to figure out what files and directories need to be backed up for the list above, though most of them you've seen in this course.

## Incremental Backups

Note: make a Vmware snapshot of your c7host before you start running rsync commands, since it's not that difficult to ruin your systems if you craft a bad command and run it as root. You may also want to use the rsync --dry-run and -v arguments to check what the command thinks you want it to do.

When your script runs, it will use rsync to make incremental backups of all the files. The backups should be stored in the /root/vm-backups/ directory. Each machine backed up will have a subdirectory there.

Inside each machine's backup directory there should be a maximum of five subdirectories holding incremental backups. That means even though you have five directories, there will only be 1 times the space used, not 5 times. Use the rsync --link-dest parameter as described in [Mike Rubel's guide](http://www.mikerubel.org/computers/rsync_snapshots/).

Don't forget to remove the oldest backup after the new backup is completed. You can use a bash **if** statement to check the **$?** variable.

When it's all working, the backup directory should look something like this:

```bash
/root
  /vm-backups
    /lin1
      /backup.0
      /backup.1
      /backup.2
      /backup.3
      /backup.4
    /lin2
      /backup.0
      /backup.1
      /backup.2
      /backup.3
      /backup.4
    ...
```

## Other Notes

Set up the backup script to run automatically on c7host once an hour.

You may use code you find on the internet (but not from another student) in your assignment. If you do - make sure you add a comment next to the copied code, stating where you got it from.

## Submission

Submit your shell script on Blackboard. Keep your assignment functioning on your machine until you get your grade, in case I need to see it.
