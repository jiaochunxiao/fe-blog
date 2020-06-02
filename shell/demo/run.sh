#!/bin/bash
echo "Hello World!"
your_name="helloworld"
unset your_name
echo $your_name
echo ${your_name}
for skill in Ada Coffee Action Java; do
  echo "I am goot at ${skill}Script"
done
