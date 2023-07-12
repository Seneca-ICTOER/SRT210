---
id: assignment1
title: Assignment 1
sidebar_position: 1
description: Assignment 1
---

# Assignment 1

Due date: 12th of June

- **(Update: June 13 2019)**: Final version. Added clarity (See the **A1 Test Cases** section below) to what will be tested at demo time (based on A1 requirements). More details of what should be in the project report. [Download PDF](https://wiki.cdot.senecacollege.ca/w/imgs/19b-SRT210_a1.pdf).
- **(Update: May 31 2019)**: First draft. Additional edits will only clarify language and improve readability. You may consider these requirements complete for **Assignment 1 in Summer 2019**.
- **(May 7 2019)**: Additional requirements will be added at a later date.

Late penalties: 10% per day, including weekends and holidays

## Part 1: Set up and routing (10 marks)

1. Complete labs 1 through 4.
2. Create a new virtual network named asg1 with subnet 192.168.X where X is the first two digits of your Seneca student number. Do not use DHCP on this network.
3. Create a new virtual machine and install CentOS on it as a minimal install. Name this virtual machine lin1a1 but set its hostname to yourmysenecaid.lin1a1.
4. Setup lin1a1 to have two network interfaces where both network interfaces are virtio virtual devices. Next, setup one network interface with IP address 192.168.X.32 and to connect to the asg1 network while the other network interface has IP address 192.168.210.22 and it connects to the network1 network.
5. Keep in mind in any networked system you can have just one, and only one, default gateway. So configure the default gateway of lin1a1 to be c7host on the 192.168.210 subnet. Confirm lin1a1 can communicate with the Internet and with hosts on network1.
6. Create another minimal CentOS VM: name it lin2a1; set its hostname to yourmysenecaid.lin2a1; let it have one network interface and IP 192.168.X.33 (X being the first two digits of your student ID). By default, after the install, this second VM should be able to access machines on the asg1 network but it will not be able to communicate with any hosts on the network1 network.
7. Configure lin2a1, the second VM, to be able to access the Internet and the network1 network via lin1a1. You will need to enable IP forwarding and masquerading on the appropriate interface and the appropriate machine for that to happen.
8. Configure both VMs (lin1a1 and lin2a1) to be added to your DNS server. able to connect to c7host.yourmysenecaid.ops, lin1.yourmysenecaid.ops, and lin2.yourmysenecaid.ops by their hostnames (don't be tempted to set up another DNS server, use what you already have from your earlier lab)
9. Ensure you start your firewall setup on each VM from the default iptables-services rules. You'll lose marks if you don't have a functional firewall on lin1a1 and on lin2a1.

## Part 2: Multiple WebServer Setup (10 marks)

1. (2 Marks) Install NGINX on lin1a1 and Caddy on lin2a2. Confirm that each works locally with thier VM and from c7host. Do the testing of NGINX and Caddy in two stages.
2. (3 Marks) From a browser running on c7host confirm connections using IP addresses:
    * http://192.168.210.11 connects to Apache (from the earlier lab)
    * http://192.168.210.22 connects to NGINX running on lin1a1
    * http://192.168.X.33 connects to Caddy running on lin2a1.
3. (3 Marks) From a browser running on c7host confirm connections using hostnames:
    * http://lin1.yourmysenecaid.ops connects to Apache (from the earlier lab)
    * http://lin1a1.yourmysenecaid.ops connects to NGINX running on lin1a1
    * http://lin2a1.yourmysenecaid.ops connects to Caddy running on lin2a1.
4. (1 Mark) From a browser running on lin2 show you can connect to all 3 webservers using their IP addresses and their hostnames.
5. (1 Mark) From a browser running on Windows show you can connect to each of the 3 webservers using the c7host IP address. NOTE: when doing this test, you will want to turn off the other two VMs.

## Part 3: Report (10 marks)

Write a report where you describe in your own words your learning experience of this assignment. Keep the tone of your writing such that your present self is teaching your future self (who might have forgotten) the learning experience you achieved while doing this assignment. Be sure to include all the major learning points you overcame to make this assignment work as described.

1. The report must be in a PDF format otherwise it will be considered unreadable. The text part of the report can use a Serif or Sans-Serif font (such as Arial or DejaVu Sans) but the configuration file output must be in a fixed-width (such as Courier or MonoType).
2. The very FIRST FEW LINES MUST CONTAIN: **Full Name**, your **MySeneca username**, and your **student ID**.
3. The next FEW LINES MUST CONTAIN output from the command line (use a screen shots for doing this) showing:
    + MAC and IP address of `eth0` on **lin1a1**
    + MAC and IP address of `eth1` on **lin1a1**
    + MAC and IP address of `eth0` on **lin2a1**
    + MAC and IP address of `eth0` on **lin1**:
    + MAC and IP address of `eth0` on **lin2**:
4. What you had to do to set everything up (most important are the networking, routing, and firewall configurations). Screenshots of the configuration files are acceptable, however, the screenshot must be readable. If the font is too small (less than 12 pt) or the screenshot is blurry, you will lose marks. You may take multiple screenshots of a long configuration file provided they show the previous few lines to show continuation. Ideally, it is best (and probably fastest) to use scp to get the configurations out of the VMs and append them into your report.
5. Describe any challenges you ran into and how you solved them.
6. Screenshots are required for proof that your setup works. Each screenshot must:
    + Clearly be labelled the test you are proving, for example: Connect to `http://lin1a2.yourmysenecaid.ops` from **c7host**.
    + Cover **ALL** of the individual test cases described in **A1 Test Case** section below.
    + Show the interaction between **c7host** (or **lin2**) in a readable (12 pt) font.
    + The prompt on the terminal MUST show the logged in user and hostname of the VM so it captures what is happenning where.
    + Use `curl` and `ping` to show connections to each server and the web. Pipe the output from `curl` into `head` to restrict output to 4 lines maximum.
    + Use `cat` show contents of `/etc/resolv.conf` on `lin1a1` and `lin2a1`.
    + Use `cat` to show the contents of `/etc/sysconfig/iptables` on **lin1a1**, and **lin2a1**. Show all the additional commands you ran on **c7host** after it booted up to test connectivity to Apache on **lin1**, NGINX on **lin1a1**, and Caddy on **lin2a1**.
    + Use cat to show full configuration of these network cards:
        + `eth0` on **lin1a1**
        + `eth1` on **lin1a1**
        + `eth0` on **lin2a1**
7. Show the output of each of the Assignment 1 test cases (see the next section) in your report.

## A1 Test Cases

1. Using `ping 1.1.1.1`, `ssh root@hostname`, and `curl http://centos.org` show the following use cases:

    1. From **lin1a1**: prove Internet connectivity of **lin1a1**
    2. From **lin2a1**: prove **lin1a1** acts as a router for lin2a1 and acts as a bridge between **asg1** and **network1** using the following 3 test cases.
        1. when **lin1a1** is shut down **lin2a1** no longer has Internet connectivity
        2. when **lin1a1** is turned on **lin2a1** has Internet connectivity
        3. use `ping` and `ssh` from **lin2a1** to connect to **lin1** and **lin2**
    3. From **c7host**:
        1. use `ping` and `ssh` to prove connectivity to **lin1a1** and **lin2a1** using their IP numbers and their domain names. The domain names for both **lin1a1** and **lin2a1** should be resolved through **lin2**.
        2. use `curl` to display the home pages of Apache running on **lin1**; NGINX running on **lin1a1**, and Caddy running on **lin2a1**. Use both IP and friendly-names methods to demonstrate this: IP addresses of their respective hosts and the domain names of those respective hosts, for example **yourMySeneca.host.ops**. and `192.168.X.33`

2. From Windows, using Internet Exporer or Edge, show home page contents of your website on that host using the webserver installed on that host, example: Apache on **lin1**, NGINX on **lin1a1**, and Caddy on **lin2a1**. You may have to edit iptables rules on **c7host** each time you want to access that particular VM so HTTP requests coming from port `80` on Windows go directly to that VM.

## Submit

Submit the report on Blackboard.
