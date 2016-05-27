#!/bin/bash
for((i=0;i<1;));do

find  /var/www/* -type f -name "*" -ctime -1 -exec cp {} /tmp/ \;
find /var/www/* -type f -name "*" -ctime -1 -delete
done
