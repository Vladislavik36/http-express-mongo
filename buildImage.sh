#!/usr/bin/env bash

docker build -t http-node-server:latest .
docker image prune -f