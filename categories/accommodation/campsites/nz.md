---
layout: category
title: Nz
description: Explore New Zealand campsite reviews and guides—covering facilities, dog‑friendly options, and tips for comfortable, scenic camping adventures
header_heading: Nz
header_text: Everything about Nz
header_banner_pic: banner.avif
header_banner_pic_alt: Nz Banner
category: campsites
permalink: /accommodation/nz
---

## Subcategories
<ul>
  {% assign sub_pages = site.pages | where: "category", "nz" %}
  {% for page in sub_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
