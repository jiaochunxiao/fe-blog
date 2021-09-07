## shell

Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。Shell 既是一种命令语言，又是一种程序设计语言。

Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

Shell 脚本（shell script），是一种为 shell 编写的脚本程序。

业界所说的 shell 通常都是指 shell 脚本，但读者朋友要知道，shell 和 shell script 是两个不同的概念。

由于习惯的原因，简洁起见，本文出现的 "shell编程" 都是指 shell 脚本编程，不是指开发 shell 自身。

### 变量

命名规则遵守：
+ 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
+ 中间不能有空格，可以使用下划线（_）。
+ 不能使用标点符号。
+ 不能使用bash里的关键字（可用help命令查看保留关键字）。

```sh
first_world="Hello World"
echo $first_world

# 只读变量
your_name="Max"
readonly your_name

# 删除变量
unset your_name
```

#### 变量类型

运行shell时，会同时存在三种变量：

1) 局部变量 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
2) 环境变量 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
3) shell变量 shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

#### 特殊变量

|变量|含义|
|:---|:---|
|$0|当前脚本的名称|
|$n|传递给脚本或函数的参数，n是一个数字，表示第几个参数。例如，第一个参数就是$1, 第二个参数是$2|
|$#|传递给脚本或函数的参数个数|
|$*|传递给脚本或函数的所有参数|
|$@|传递给脚本或函数的所有参数。被双引号（""）包含时， 与$* 稍有不同|
|$?|上个命令的退出状态或函数的返回值，0 表示没有错误，其他任何值表示有错误|
|$$|当前shell进程ID，对于shell脚本，就是这些脚本所在的进程ID|
|$!|后台运行的最后一个进程的ID号|

*tips*
>$* 和 $@ 都表示传递给函数或脚本的所有参数，不被双引号(" ")包含时，都以"$1" "$2" … "$n" 的形式输出所有参数。
>但是当它们被双引号(" ")包含时，"$*" 会将所有的参数作为一个整体，以"$1 $2 … $n"的形式输出所有参数；"$@" 会将各个参数分开，以"$1" "$2" … "$n" 的形式输出所有参数。

```bash
echo "\$*"= $*
echo "\"\$*\"=" "$*"

echo "\$@"= $@
echo "\"\$@\"=" "$@"

echo "print each param from \$*"

for var in $*
do
  echo "$var"
done

echo "print each param from \$@"

for var in $@
do
  echo "$var"
done

echo "print each param from \"\$*\""

for var in "$*"
do
  echo "$var"
done

echo "print each param from \"\$@\""

for var in "$@"
do
  echo "$var"
done
# 输出
# $*= a b c d
# "$*"= a b c d
# $@= a b c d
# "$@"= a b c d
# print each param from $*
# a
# b
# c
# d
# print each param from $@
# a
# b
# c
# d
# print each param from "$*"
# a b c d
# print each param from "$@"
# a
# b
# c
# d
```

### Shell字符串

字符串是shell编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了），字符串可以用单引号，也可以用双引号，也可以不用引号。

#### 单引号

```sh
str='this is a string'
```

单引号字符串的限制：

+ 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
+ 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。


#### 双引号

```sh
for skill in Ada Coffee Action Java; do
  echo "I am goot at ${skill}Script"
done
```

双引号的优点：
+ 双引号里可以有变量
+ 双引号里可以出现转义字符

##### 拼接字符串

```sh
your_name="shell"
# 使用双引号拼接
greeting="Hello, "$your_name" !"
greeting1="Hello, ${your_name} !"

echo $greeting $greeting1

# 使用单引号拼接
greeting2='Hello, '$your_name' !'
greeting3='Hello, ${your_name} !'

echo $greeting2 $greeting3

# 输出
# Hello, shell ! Hello, shell !
# Hello, shell ! Hello, ${your_name} !
```

##### 获取字符串长度

```sh
string='shell'
echo ${#string}
```

##### 提取字符串

```sh
string="Hello World"
echo ${string:1:4} #输出 ello
```

#### sed

