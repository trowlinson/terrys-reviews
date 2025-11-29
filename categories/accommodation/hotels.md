---
layout: category
title: Hotels
description: Explore our Hotels reviews and guides.
header_heading: Hotels
header_text: Everything about Hotels
header_banner_pic: banner.avif
header_banner_pic_alt: Hotels Banner
category: accommodation
---

## Subcategories
<ul>
  {% assign sub_pages = site.pages | where: "category", "hotels" %}
  {% for page in sub_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
