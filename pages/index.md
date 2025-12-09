---
layout: home
permalink: /
title: Welcome
description: Honest reviews of gear, campsites, and travel experiences—plus practical tips for dogs, motorhomes, and adventures across the UK, NZ, and beyond.
header_heading: Exploring Trusted Reviews
header_text: Honest insights for your next adventure
header_banner_pic: banner.avif
header_banner_pic_alt: Adventure Banner
---

# 📝 Terry's Trusted Reviews

Welcome! We write detailed, honest reviews of products and experiences. Here are the categories we currently cover:

## Subcategories
<ul>
  {% assign top_cats = site.pages | where: "category", "top" %}
  {% for page in top_cats %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>