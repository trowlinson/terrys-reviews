---
layout: category
title: Animals
description: Explore our Animals reviews and guides.
header_heading: Animals
header_text: Everything about Animals
header_banner_pic: banner.avif
header_banner_pic_alt: Animals Banner
category: top
permalink: /animals
---

## Subcategories
<ul>
  {% assign sub_pages = site.pages | where: "category", "animals" %}
  {% for page in sub_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>
