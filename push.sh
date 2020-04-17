#!/bin/bash

node scripts/lib/build
rm -r release
mkdir release
cp index.html release/index.html
cp README.txt release/README.txt
~/Applications/butler push ~/Repositories/Hundredrabbits/Paradise/release hundredrabbits/paradise:main
~/Applications/butler status hundredrabbits/paradise
rm -r release