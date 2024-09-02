#!/bin/bash
echo "preparing debugging"
projectdir=$PWD
cd ..
if [ ! -d aws-cdk ]; then
  git clone https://github.com/aws/aws-cdk.git --branch main
  cd aws-cdk
  yarn install --frozen-lockfile
  npx lerna run build --scope="aws-cdk" --skip-nx-cache || true  # ignore errors long after we're done
fi
cd $projectdir/node_modules
rm -rf aws-cdk-lib
ln -s ../../aws-cdk/packages/aws-cdk-lib .
gsed -i 's/\.js"/.ts"/g' aws-cdk-lib/package.json
cd aws-cdk/bin/
rm -f cdk.ts
ln -s ../../../../aws-cdk/packages/aws-cdk/bin/cdk.ts .
echo "ready for debugging"