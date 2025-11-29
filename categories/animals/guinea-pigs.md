---
layout: category
title: Guinea Pigs
description: Explore our Guinea Pigs reviews and guides.
header_heading: Guinea Pigs
header_text: Everything about Guinea Pigs
header_banner_pic: banner.avif
header_banner_pic_alt: Guinea Pigs Banner
category: animals
---

## Subcategories
<ul>
  {% assign sub_pages = site.pages | where: "category", "guinea-pigs" %}
  {% for page in sub_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
