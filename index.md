---
layout: home
title: Welcome
description: Real-world advice, gear reviews, campsite tips, and travel stories from the road.
header_heading: Exploring Trusted Reviews
header_text: Honest insights for your next adventure
header_banner_pic: banner.avif
header_banner_pic_alt: Adventure Banner
---

# 📝 Terry's Trusted Reviews

Welcome! We write detailed, honest reviews of products and experience. Here are the categories we cover:

## Subcategories
<ul>
  {% assign top_cats = site.pages | where: "category", "top" %}
  {% for page in top_cats %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>