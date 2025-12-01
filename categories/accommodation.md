---
layout: category
title: Accommodation
description: Explore our Accommodation reviews and guides.
header_heading: Accommodation
header_text: Everything about Accommodation
header_banner_pic: banner.avif
header_banner_pic_alt: Accommodation Banner
category: top
permalink: /accommodation
---

## Subcategories
<ul>
  {% assign sub_pages = site.pages | where: "category", "accommodation" %}
  {% for page in sub_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
