#!/bin/bash
# echo "Hello World!"
# your_name="helloworld"
# unset your_name
# echo $your_name
# echo ${your_name}
# for skill in Ada Coffee Action Java; do
#   echo "I am goot at ${skill}Script"
# done

# your_name="shell"
# # 使用双引号拼接
# greeting="Hello, "$your_name" !"
# greeting1="Hello, ${your_name} !"

# echo $greeting $greeting1

# # 使用单引号拼接
# greeting2='Hello, '$your_name' !'
# greeting3='Hello, ${your_name} !' # 不能输出想要的数据

# echo $greeting2 $greeting3

# echo ${#your_name}

# string="Hello World"
# echo ${string:1:4}
# # 指定shell类型

# echo -n "Enter your name:"                   # 参数-n的作用是不换行，echo默认换行
# read  name                                   # 把键盘输入放入变量name
# echo "hello $name,welcome to my program"     # 显示输入信息

# currenDir=$PWD
# echo $currenDir


# echo -n "Enter your name:"                   # 参数-n的作用是不换行，echo默认换行
# read  name                                   # 把键盘输入放入变量name
# echo "hello $name,welcome to my program"     # 显示输入信息
# echo -n "Enter your name:"
# read  word
# echo "hello $word,welcome to my program"

# echo "\$*"= $*
# echo "\"\$*\"=" "$*"

# echo "\$@"= $@
# echo "\"\$@\"=" "$@"

# echo "print each param from \$*"

# for var in $*
# do
#   echo "$var"
# done

# echo "print each param from \$@"

# for var in $@
# do
#   echo "$var"
# done

# echo "print each param from \"\$*\""

# for var in "$*"
# do
#   echo "$var"
# done

# echo "print each param from \"\$@\""

# for var in "$@"
# do
#   echo "$var"
# done


# sed -i '' '1s/^/\/\/\ /' test.txt
# sed -i '' '2s/\/\///' test.txt

# 删除整行
# sed -i '' '2d' test.txt

# # sed -i '' -e '1i\\
# # hahhah' test.txt

# # 某行下插入整行
# sed -i '' -e $"1 a\\
# xxx" test.txt

sed -i '' -e $'2 c\\
xxxx' test.txt
