#! /bin/bash

cd /grafana

#check for running container
container="$(sudo docker ps --format '{{.Names}}')"

#remove images if not empty
if [ ! -z "$container" ]
then
    # stop running container
    sudo docker-compose down

    # get images to be removed
    images="$(sudo docker image ls -q)"
    imageStr=""
    for i in {1..3}
    do
        image="$(echo $images | cut -d' ' -f $i)"
        imageStr+="${image} "
    done
    
    echo $imageStr
    #remove first 3 images
    sudo docker image remove ${imageStr}
fi

# rebuild docker images (this will take about 10 minutes)
sudo docker build -t corewatts-grafana -f Dockerfile .
# run container after it is built
sudo docker-compose up -d