---
layout: category
title: Travel
description: Cities and Places aorund the world.
header_heading: Exploring The World One Place at a Time
header_text: Honest insights for your next adventure
header_banner_pic: banner.avif
header_banner_pic_alt: Travel Banner
category: top
---

## Subcategories

<ul>
  {% assign travel_pages = site.pages | where: "category", "travel" %}
  {% for page in travel_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>


---

## Featured Articles
- *Best Harnesses for Outdoor Adventures*
- *Top Dog‑Friendly Campsites in NZ*
