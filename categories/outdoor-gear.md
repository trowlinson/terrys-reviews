---
layout: category
title: Outdoor Gear
description: Guides, reviews, and resources for outdoor adventures — from hiking and camping to cycling and climbing.
nav_active: outdoor-gear
header_heading: Outdoor Gear Reviews
header_text: Checking Outdoor Gear Doesn't Suck
header_banner_pic: banner.avif
header_banner_pic_alt: Tech Banner
category: top
---



<section class="category-intro">
  <h1>Outdoor Gear</h1>
  <p>Explore practical guides, gear reviews, and tips for making the most of your time outdoors. Whether you’re hiking, camping, cycling, or climbing, we’ve got resources to help you choose the right equipment and enjoy your adventures safely.</p>
</section>

## Subcategories

<ul>
  {% assign travel_pages = site.pages | where: "category", "outdoor-gear" %}
  {% for page in travel_pages %}
    <li><a href="{{ page.url | relative_url }}">{{ page.title }}</a></li>
  {% endfor %}
</ul>

<section class="featured">
  <h2>Featured Guides</h2>
  {% assign outdoor_posts = site.categories.outdoor-gear | slice: 0, 3 %}
  <ul class="featured-list">
    {% for post in outdoor_posts %}
      <li>
        <a href="{{ post.url | relative_url }}">
          <h3>{{ post.title }}</h3>
          <p>{{ post.description | default: post.excerpt }}</p>
        </a>
      </li>
    {% endfor %}
  </ul>
</section>