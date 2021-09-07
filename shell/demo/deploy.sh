#! /bin/bash

set -e

# rnBranch=$1
rnBranch='master'
# appBranch=$2
appBranch='dev'

cloneReactNative() {
  git clone -b $rnBranch  http://git.baijia.com/weishi-fe/weishi-app-rn.git
  cd weishi-app-rn/
  npm i
  npm run build-android
  cp -r -i package.json package-lock.json node_modules ../
  cd ../
}

cloneNative() {
  git clone -b $appBranch http://git.baijia.com/weishi/weishi-app-android.git
}

copyFiles() {
  cp -f weishi-app-rn/build/android/main.jsbundle android/weishi-app-android/app/src/main/assets/
  cp -r weishi-app-rn/build/android/ android/weishi-app-android/app/src/main/res/
}

# if [ ! -d "weishi-app-rn" ]
# then
#   echo 'weishi-app-rn folder is not existed'
#   cloneReactNative

#   if [ ! -d "android" ]
#   then
#     echo 'weishi-app-rn folder is not existed'
#     mkdir -p android
#     cd android/
#     cloneNative
#     cd ../
#   fi


# else
#   echo 'yes'
# fi
# osx
# Unlike Ubuntu, OS X requires the extension to be explicitly specified. The workaround is to set an empty string:

#
sed -i '' '20s/4.11.0/4.8.0/g' node_modules/react-native-fast-image/android/build.gradle

#
sed -i '' '4s/rootProject.ext.compileSdkVersion/29/g' node_modules/react-native-image-picker/android/build.gradle
sed -i '' '8s/rootProject.ext.targetSdkVersion/28/g' node_modules/react-native-image-picker/android/build.gradle

#
sed -i '' 's/android.content.annotation.NonNull/androidx.annotation.NonNull/g' node_modules/react-native-sentry/android/src/main/java/io/sentry/RNSentryModule.java



