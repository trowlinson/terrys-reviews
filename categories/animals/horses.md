---
layout: category
title: Horses
description: Explore horse care and travel guides—covering gear, training, and destinations for equestrian adventures across the UK, NZ, and beyond.
header_heading: Horses
header_text: Everything about Horses
header_banner_pic: banner.avif
header_banner_pic_alt: Horses Banner
category: animals
---

## Subcategories
<ul>
  {% assign sub_pages = site.pages | where: "category", "horses" %}
  {% for page in sub_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
