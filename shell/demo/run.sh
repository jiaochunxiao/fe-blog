!/bin/bash
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
greeting3='Hello, ${your_name} !' # 不能输出想要的数据

echo $greeting2 $greeting3

echo ${#your_name}

string="Hello World"
echo ${string:1:4}
# 指定shell类型

echo -n "Enter your name:"                   # 参数-n的作用是不换行，echo默认换行
read  name                                   # 把键盘输入放入变量name
echo "hello $name,welcome to my program"     # 显示输入信息
exit 0

currenDir=$PWD
echo $currenDir


echo -n "Enter your name:"                   # 参数-n的作用是不换行，echo默认换行
read  name                                   # 把键盘输入放入变量name
echo "hello $name,welcome to my program"     # 显示输入信息
echo -n "Enter your name:"
read  word
echo "hello $word,welcome to my program"
exit 0


