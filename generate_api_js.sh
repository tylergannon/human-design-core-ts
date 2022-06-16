#!/usr/bin/env bash

#openapi-generator-cli \
java -jar ~/Downloads/openapi-generator-cli-7.0.0-20220526.055920-1.jar \
  generate \
  --generator-name typescript \
  --git-host github.com \
  --git-repo-id astroapi-ts \
  --git-user-id tylergannon \
  --input-spec https://astro.macdorfenburger.com/api/v1/openapi.json \
  --output ./src/astro \
  --minimal-update \
  --additional-properties npmName=human-design-core,supportsES6=false,npmVersion=0.1.2
