#!/bin/bash
echo "Hello World!"
your_name="helloworld"
unset your_name
echo $your_name
echo ${your_name}
for skill in Ada Coffee Action Java; do
  echo "I am goot at ${skill}Script"
done

your_name="shell"
# 使用双引号拼接
greeting="Hello, "$your_name" !"
greeting1="Hello, ${your_name} !"

echo $greeting $greeting1

# 使用单引号拼接
greeting2='Hello, '$your_name' !'
greeting3='Hello, ${your_name} !'

echo $greeting2 $greeting3

echo ${#your_name}

string="Hello World"
echo ${string:1:4}