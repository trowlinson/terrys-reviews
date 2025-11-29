---
layout: category
title: Gear
description: Explore our Gear reviews and guides.
header_heading: Gear
header_text: Everything about Gear
header_banner_pic: banner.avif
header_banner_pic_alt: Gear Banner
category: top
---

## Subcategories
<ul>
  {% assign sub_pages = site.pages | where: "category", "gear" %}
  {% for page in sub_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
