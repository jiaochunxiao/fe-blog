#! /bin/bash

set -e

# rnBranch=$1
rnBranch='master'
# appBranch=$2
appBranch='dev'

cloneReactNative() {
  mkdir -p weishi-app/weishi-app-rn
  git clone -b $rnBranch  http://git.xxx.com/weishi-fe/weishi-app-rn.git ./weishi-app/weishi-app-rn/
  cd ./weishi-app/weishi-app-rn/
  npm i
  npm run build-android
  cd ../
}

cloneNative() {
  git clone -b $appBranch http://git.xxx.com/weishi/weishi-app-android.git
}

copyFiles() {
  cp -f weishi-app-rn/build/android/main.jsbundle android/weishi-app-android/app/src/main/assets/
  cp -r weishi-app-rn/build/android/ android/weishi-app-android/app/src/main/res/
}

# osx
# Unlike Ubuntu, OS X requires the extension to be explicitly specified. The workaround is to set an empty string:
sedFile() {
  sed -i '' '20s/4.11.0/4.8.0/g' node_modules/react-native-fast-image/android/build.gradle

  sed -i '' '4s/rootProject.ext.compileSdkVersion/29/g' node_modules/react-native-image-picker/android/build.gradle
  sed -i '' '8s/rootProject.ext.targetSdkVersion/28/g' node_modules/react-native-image-picker/android/build.gradle

  # sed -i '' 's/android.supo.annotation.NonNull/androidx.annotation.NonNull/g' node_modules/react-native-sentry/android/src/main/java/io/sentry/RNSentryModule.java

  # sed -i '' 's/android.content.annotation.NonNull/androidx.annotation.NonNull/g' node_modules/react-native-sentry/android/src/main/java/io/sentry/RNSentryModule.java
  # 整行替换
  sed -i '' -e $'6 c\\
  import androidx.annotation.NonNull;' node_modules/react-native-sentry/android/src/main/java/io/sentry/RNSentryModule.java

  sed -i '' '31s/^/\/\/\ /' node_modules/react-native-wechat-lib/android/build.gradle

  sed -i '' '32s/\/\/ //g' node_modules/react-native-wechat-lib/android/build.gradle

}

if [ -d "weishi-app" ]
then
  echo 'delete old files'
  rm -rf weishi-app
fi

if [ ! -d "weishi-app/weishi-app-rn" ]
then
  echo 'weishi-app-rn folder is not existed'
  cloneReactNative
  if [ ! -d "android" ]
  then
    echo 'android folder is not existed'
    mkdir -p android
    cd android/
    cloneNative
    cd ../weishi-app-rn
    cp -rf -i package.json package-lock.json node_modules ../
    cd ../
    copyFiles
    rm -rf weishi-app-rn/
  fi
else
  echo 'yes'
fi
sedFile




