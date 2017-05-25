---
title: Quickstart: moving to systemd
date: 2017-05-25
---

I do not know if it is better or easier than a simple crontab but it looks like
[systemd][systemd] is the way to go for services on linux, so I tried to use it.


[systemd]: https://www.freedesktop.org/wiki/Software/systemd/

## Quickstart

So, services now are simple text files ending with `.service`. You can find a
few examples by having a look at allready installed services with a
`ls -al /lib/systemd/system`.

### `.service`
So let's try to create our own `simple.service`:

```
[Unit]
Description=Simple service

[Service]
Type=simple
ExecStart=/bin/echo "This is simple"
```

And in order to test it:

```bash
$ sudo systemctl start simple
$ sudo cat /var/log/syslog
May 25 21:38:00 pi3 echo[10692]: This is simple
```

### `.timer`
Whil a service is everything that you need in order to have real services
running, it is not enough for recursive tasks. For the we need a timer. A
timer is bound to a specific service based one the name. So let's create next
to our service the following `simple.timer`

```
[Unit]
Description=Simple service timer

[Timer]
OnCalendar=*:0/5

[Install]
WantedBy=timers.target
```

Now we need to start our timer and we do that just like the regular services:

```sh
$ sudo systemctl simple.timer
```

### `systemctl`
As you saw, we make use of the systemctl tool in order to control our services.
A couple of command that you need are the following:

- `systemctl list-timers --all` to give you informations regarding your timers
- `systemctl -l` to have a list of our available services
