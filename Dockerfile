# Build stage
FROM ruby:3.2 AS builder

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .
RUN bundle exec jekyll build

# Serve stage
FROM nginx:alpine

# Copy built site
COPY --from=builder /app/_site /usr/share/nginx/html

# Copy nginx config as a template for env substitution
COPY nginx.conf /etc/nginx/templates/default.conf.template
