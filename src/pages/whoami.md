---
title: Who am I
author: valotas
---
I am an easy going person from Greece enjoying writing code. I live and work in Zurich, Switzerland as
a Software engineer (or any other kind of title variations this description can have). On my spare time
I enjoy writing code, going skiing or windserfing and eating good food in Greece.

## Feb 2017 - Today
#### Senior frontend software engineer at [Julius Baer][jb], CH

Seeking some new chalenges after almost 3 years with Swisscom, took a position in a bank concetrating on
frontend development.

### Mar 2014 - Jan 2017
#### Senior consultant at [Atos Consulting][atos-consulting], CH

As a remark here, the initial name of the company was Cambridge Technology Parterns. Atos took over in mid 2014
and the company has been rebranded to the current (Mar 2017) name.

Being a consultant, I had to work mostly with other clients. During these years my main engagement was
[Swisscom][swisscom] where I had the chance to work for the NEO and M@P projects which was an ordering
system and a product's dashboard respectively. Although the role was fullstack development, my interest
on the latest frontend technologies made me more frontend centric, becoming one of the guys to ask for
anything related to javascript.

Durinng my time at Cambridge Technology Partners, I also had the chance to run an
[angular workshop][angular-workshop] at ch/open.

### Mar 2012 - Jan 2014
#### Senior fullstack developer at Wuala, CH

Worked on the frontend and the accounting part of the backend. Had to integrate Paypal for purchase and automatic
subscription renewal. That means that I got exposed to a variaty of technologies meaning javascript for the
frontend, php for the website, apache thrift for the communication with the java backend systems and a couple
of java frameworks/products for accounting purpuses, mostly berkeley db and a custom serialiazation protocol
used for java services communication. Some of the areas worth mentioning:

- Paypal integration (introduced 2 different kinds of recurring payments)
- Webservers refactoring/optimization (introduced spring framework for di)
- Introduced new integration tests and a build/deployment process using Gradle and Teamcity
- Website improvements: introduced a git/grundle based build system
- Designed and implemented Wuala's sharing page. A single based application based on jQuery and mustache

Unfortunatelly the new owner of Wuala, [Seagate][seagate] decided not to proceed with the project, and wuala
shut down arround the summer of 2015.

### Aug 2011 - Feb 2012
#### Software engineer at Netmedia, CH

Although I did not stay with the company a long time due to a cultural misfit, still had the chance and pleasure
to improve the code base. Worth mentioned was the introduction of CDI and JPA to a modelless J2EE application. That
gave me the chance to also introduce tests and document some parts of the code.

Since the company was supporting IBM's career portal (backend and frontend), I had also the chance to work on
introducing JSF and CDI to it, replacing some custom jQuery/jsp pages.

### 2006 - Jul 2011
#### Senior applications engineer at [Gloman SA][gloman], GR

This job started very early as an intership from my university but ended up being a full time job after
fullfilling my military obligations. Despint the size (small), the company is running a variaty of interesting
projects. While serving as a web agency for one of the largest sport's portals in Greece, it's main focus is
live streaming. Started with audio, supporting many radio stations across Greece, expanded to video supporting
one of the biggest news portal.

During my stay there I had the chance to make heavy use of J2SE tecnologies including my favorites Hibernate
and Guice to engineer live24.gr to handle more than 30k requests per minute or sport-fm.gr serving more than
1800k unique visitors or 65000k per month.

Part of our infrastructore was MSSQL server 2008 but we also tried to offload stuff to webservices adopting
quite early and making heavy use of amazon webservices.

For the audio and video streaming, a custom cdn had been implemented with a mix of Wowza Media Servers,
Windows Media Servers and xxx. For the load balancing a custom DNS/SNMP based system had been developed
which ended up delivering more than 40k concurrent streams.


### May 2006 - May 2007
#### Private at 1st Aviation Brigade of Greek Army, GR

Fullfield my mandatory service to the Greek Army.

### 1999 - 2005
#### National Technical University of Athens, GR

I got a **Diploma of Applied Mathematics and Physics** with a grade of *7.23* (on a scale of 10) focusing on
the two majors of "Informatics mathematics" and "Statistics". The subject of my thesis was *"Dynamic load
Balancing: finding the best server in the internet"* which I got with a grade of *10* (on a scale of 10).
It looks like I chose a field to work on early on, as I've been working for web applications from day 1 of
my career.

## Contributions

As I said, on my spare time I like experimenting with code. Since I'm heavily relying on open source software
for my job and hobbies, I feel obligated to give back whenever I can. Except from small bug fixes or feature
implementations of various projects I also implemented a [mustache implementation][mustache4dart] for dart.

Another notable improvement was that of Hibernate's MSSQL 2008 dialect where I introduced proper limits to the
query.

[jb]: http://www.juliusbaer.com/
[gloman]: http://www.gloman.gr/
[atos-consulting]: http://atos.com/
[swisscom]: http://www.swisscom.com/
[angular-workshop]: ch-open-angularjs-workshop
[seagate]: http://www.seagate.com/
[mustache4dart]: http://github.com/valotas/mustache4dart
