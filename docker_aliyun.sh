#!/bin/bash

echo "start npm install & npm run build"

npm install & npm run build

container=$(docker container ls -a | grep pvue)
if [ -n "$container" ]; then
    echo "container is existed, restart container"
    docker stop pvue
    docker start pvue
else
    echo "container not exist , create & start container success"
    docker run \
    -p 3004:80 \
    -d --name pvue \
    --mount type=bind,source=/root/fang/pvue/nginx,target=/etc/nginx/conf.d \
    --mount type=bind,source=/root/fang/pvue/dist,target=/usr/share/nginx/html \
    nginx
fi

