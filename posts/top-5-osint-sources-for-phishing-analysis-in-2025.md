---
title: TOP 5 OSINT Sources for Phishing Analysis in 2025
date: 2025-05-24T15:24:00.000Z
author: Lorenzo Langeli
summary: Phishing represents a significant threat in cybersecurity, and
  preventing it requires the use of up-to-date OSINT sources to identify new
  indicators of compromise. Five free resources, including PhishTank and
  OpenPhish, provide valuable data for analysts and blue teamers to strengthen
  defenses and monitor ongoing attacks.
coverImage: /static/img/osint5en.png
tags:
  - selections
---
**Phishing remains one of the most pervasive threats in the cybersecurity landscape.**
In 2025, with increasingly targeted and sophisticated attacks, it becomes essential to have access to up-to-date OSINT sources to identify Indicators of Compromise (IOCs), malicious URLs, and ongoing campaigns.

We’ve selected 5 of the best free and accessible OSINT sources for analysts, researchers, and blue teamers who want to strengthen their defenses against phishing.

<br />
<br />


## 1. **PhishTank**

Founded by Cisco Talos, PhishTank is one of the longstanding platforms for collaborative collection of phishing URLs. Users can report, verify, and monitor suspicious links. Validation is community-based: the more users confirm the malicious nature of a link, the more reliable it becomes as an IOC.

* **URL: **[phishtank.org](https://phishtank.org/)


* **Data provided:** URL, verification status, submission date
* **Pros:** Active community, API available, useful for automation.

![PhishTank Homepage](/static/img/phish1.png "PhishTank Homepage")

<br />
<br />

## 2. **OpenPhish**

OpenPhish is a threat intelligence platform focused exclusively on phishing. Its free feeds contain active URLs and IOCs collected via proprietary automated analysis. It’s widely used to power SIEMs, firewalls, and EDR solutions.

* **URL:**[openphish.com](https://openphish.com/)


* **Data provided:** Malicious URLs, domains, timestamp
* **Pros:** Constantly updated feeds, machine-readable format

![OpenPhish Homepage](/static/img/phish2.png "OpenPhish Homepage")

<br />
<br />

## 3. **URLhaus (by Abuse.ch)**

Managed by Abuse.ch, URLhaus is one of the most trusted OSINT projects against the distribution of malware and phishing. Although initially created to track URLs related to botnets and banking trojans, it has become a goldmine for phishing data. All data is freely available and downloadable.

* **URL:** [urlhaus.abuse.ch](https://urlhaus.abuse.ch/)


* **Data provided:** Malicious URLs, IPs, ASNs, timestamps
* **Pros:** Free API, easy SIEM integration

![URLhaus Homepage](/static/img/phish3.png "URLhaus Homepage")

<br />
<br />

## 4. **OTX – AlienVault**

AlienVault’s Open Threat Exchange (OTX) is a collaborative platform where researchers from around the world share IOCs, including phishing URLs, IP addresses, hashes, and domains. Each “pulse” contains a structured set of indicators that can be exported and integrated into your tools.

* **URL:** [otx.alienvault.com](https://otx.alienvault.com/)


* **Data provided:** Complete IOCs, including phishing campaigns
* **Pros:** Broad coverage, highly customizable feeds

![OTX-AlienVault Homepage](/static/img/phish4.png "OTX-AlienVault Homepage")

<br />
<br />

## 5. **PhishStats**

Less known but very effective, PhishStats is a portal that aggregates phishing feeds from multiple sources and organizes them in real-time with graphical dashboards. Great for trend analysis, with a focus on impersonated brands, used TLDs, and malicious domain patterns.

* **URL:** [phishstats.info](https://phishstats.info/)


* **Data provided:** URL, domain, date, targeted brand
* **Pros:** Clear interface, useful filters for analysis

![PhishStats Homepage](/static/img/pish5.png "PhishStats Homepage")

<br />
<br />

## Conclusion

If you’re building a threat intelligence pipeline or simply want to improve your phishing defenses, these 5 OSINT sources are an essential starting point. Integrating them into your monitoring tools enables not only real-time threat detection but also more informed anticipation of attacks.

For a more advanced approach, check out our article on **How to Anticipate Phishing Campaigns by Monitoring the Real-Time Issuance of New Certificates!**
