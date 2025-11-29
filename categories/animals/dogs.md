---
layout: category
title: Dogs
description: Tips, gear, and walks for our four‑legged companions.
header_heading: Exploring Trusted Reviews
header_text: Everything Dogs
header_banner_pic: everything-dogs-banner.png
header_banner_pic_alt: Dog Banner
category: top

---

## Subcategories
<ul>
  {% assign travel_pages = site.pages | where: "category", "dog" %}
  {% for page in travel_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>

---

## Featured Articles
- *Best Harnesses for Outdoor Adventures*
- *Top Dog‑Friendly Campsites in NZ*
