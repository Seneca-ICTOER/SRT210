---
id: lab7
title: Lab 7
sidebar_position: 8
description: Lab 7
---

# Lab 7

## Objectives

- Understand the basics of public key encryption from a practical point of view.
- Set up a Certificate Authority.
- Create certificate+key pairs for servers, signed by your own CA.
- Set up Apache to serve pages over HTTPS.

## Part 1: Encryption For Network Services

We've seen in several labs how open to attack unencrypted traffic is. In this lab we'll look at what's involved in securing communications using encryption.

Crypto by Steven Levy is my favourite introductory book to cryptography. It's not required reading for this course, but I strongly recommend that all of you read it at some point (perhaps over the summer). The Toronto Public Library has some copies of it.

### Symmetric vs Asymmetric (Public Key) encryption

Symmetric encryption is much faster than assymmetric encryption, but it has the key exchange problem which makes it unusable on its own. Therefore public key encryption is used to do the initial handshake and exchange of symmetric keys, which are then used to encrypt the communication efficiently. The internet could not function at its current scale without public key encryption.

For public key cryptography to work efficiently it requires a central storage of public keys, and strangers are expected to trust the certificates listed in that cetral storage location. That central storage is called a Certificate Authority, or CA.

Since we don't want to pay a yearly fee for every certificate we create in this course, we're going to set up our own certificate authority. The only catch is that noone will trust that CA except ourselves.

### Setting up a Certificate Authority (CA)

We'll do it graphically, using an application called TinyCA. It's available in the EPEL repositories for CentOS 7.

The questions you need to answer to create a CA are a little strange, but don't worry - practically noone pays attention to them. All that matters is that the correct keys are in the correct places. Everything else is just a distraction.

Set up your own CA like this, using your own name where appropriate:

![TinyCA Create CA Part 1 Pic](/img/TinyCACreateCApart1.png)

Note that the country name is CA which is short for Canada, not Certificate Authority.

![TinyCA Create CA Part 2 Pic](/img/TinyCACreateCApart2.png)

### Obtaining a Certificate

In the real world if you wanted to obtain a certificate - the process would looks like this:

1. **You**: Create a certificate request (often abbreviated as CSR). You don't need to do it on the server that requires the certificate. Typically this is done on a commandline with the openssl command.
2. **You**: Send the certificate request and your payment to a good CA. There are various factors that affect what makes it "good", most commonly people care about how well it's trusted, and how much it costs.
3. **CA**: Receives your request and payment, creates a set of keys, and signs your certificate with their own private key (the certificate is your public key). The CA then sends you the files it generated for you.
4. **You**: Configure your server to use the private and public keys you got from the CA. This looks different for every type of server.
5. **Clients**: When someone connects to your server using a secure mechanism, they first ask your server for a copy of your certificate (public key). Then they verify that a CA they trust signed that certificate and it's not expired. Following that they can encrypt messages they send to your server using the public key it gave them.

In our case each of you will be all three of the above: **You**, the **CA**, and the **clients**. That will allow us to do all this stuff in one lab. Follow these steps in the TinyCA application:

1. Acting as **you**: generate a new certificate request in the Requests tab. The common name is particularly important, it has to match the name of the server where you'll use the certificate. You'll need to put in a password here but eventually we'll get rid of it.

![TinyCA Create CSR](/img/TinyCACreateCSR.png)

2. Acting as the **CA**: sign the request.

![TinyCA Sign CSR](/img/TinyCASignCSR.png)

3. Again acting as the **CA**: export the certificate and key (i.e. the public key and the private key) as .pem files. The extension .pem doesn't imply what the contents are, it's just a format that is typically used to store keys. You want to export the key without a passphrase, unless you want to type in a password every time your server reboots:

![TinyCA Export Cert](/img/TinyCAExportCert.png)

![TinyCA Export Key](/img/TinyCAExportKey.png)

4. That key pair (private + public key) is what you'll need to use to set up your servers. These specific ones you generated here aren't particularly useful because they're for the server yourusername.ops, and you don't have a server with that hostname. But the process is identical for every keypair you'll need to generate in this lab.
5. You don't normally need to configure your web browsers because they come with a collection of tusted CAs but since we created our own, we'll need to save the CA certificate also, so that later we can manually add it to Firefox:

![TinyCA Export CA Cert](/img/TinyCAExportCACert.png)

## Part 2: Encryption For Apache (HTTPS)

In one of the labs we've set up the Apache web server on lin1. In another lab we've set up simple authentication for our simple webpage, and we intercepted the username and password that was sent from a web browser to the web server.

In this lab we're going to upgrade the same web server to serve pages using encrypted HTTPS instead of the plain-text HTTP.

- Use the steps in the previous section to create a certificate and key for lin1.yourusername.ops.
- By default Apache on CentOS doesn't come with the SSL modules installed, so you'll have to install mod_ssl using yum.
- After installing that package you'll have a new configuration file on your system: `/etc/httpd/conf.d/ssl.conf`
- Edit that file and look for two lines: `SSLCertificateFile` and `SSLCertificateKeyFile`. Those are the two files that you generated. Make sure the filenames are correct.
- In the same file, uncomment the `ServerName` setting and set it to lin1.yourusername.ops
- Copy the two files to lin1 into the appropriate directories.
- Restart Apache and check in /var/log/httpd/ssl_error_log that there are no errors related to your changes.
- Use nmap on lin1 and on c7host to confirm that the port used for HTTPS is open.
- If all of the above worked, use Firefox on c7host to go to https://lin1.yourusername.ops. You should see a security warning. Do not click through it, we'll fix it in another way.

![Connection Not Secure](/img/ConnectionNotSecure.png)

- Go to the Firefox Preferences, and add a root authority certificate, like so:

![Firefox Add CA](/img/FirefoxAddCA.png)

- Now you should be able to go to https://lin1.yourusername.ops without any warnings. Furthermore, if you had more web servers: you could use your new CA to create keys for many of your own servers, and you could use those keys not just for web servers but for mail servers, LDAP servers, etc.

## Part 3: Sniffing HTTPS Traffic

- Go through the exercise again of sniffing the traffic between `alice` and `lin1` using tcpdump while you log in to your webpage in Firefox.
- Open the resulting file in Wireshark and see if you can still find your password there.

## Lab Completion

- Make sure you understand what you've done in this lab, so that you're ready to answer questions about it.
- Have notes in your labbook from this lab.
- Show your work to the professor and have them sign your labbook.
