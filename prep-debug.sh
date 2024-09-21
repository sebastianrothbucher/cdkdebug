#!/bin/bash
echo "preparing debugging"
projectdir=$PWD
cd ..
if [ ! -d aws-cdk ]; then
  git clone https://github.com/aws/aws-cdk.git --single-branch --branch main
  cd aws-cdk
  yarn install --frozen-lockfile
  #npx lerna run build --skip-nx-cache || true  # ignore errors long after we're done
  npx nx run-many --target build --all --skipNxCache || true  # ignore errors long after we're done
  gsed -i 's/clearTimeout(this.tickTimer)/clearTimeout(this.tickTimer as any)/' packages/aws-cdk/lib/api/util/cloudformation/stack-activity-monitor.ts
fi
cd $projectdir/node_modules
rm -rf aws-cdk-lib
ln -s ../../aws-cdk/packages/aws-cdk-lib .
gsed -i 's/\.js"/.ts"/g' aws-cdk-lib/package.json
cd aws-cdk/bin/
rm -f cdk.ts
ln -s ../../../../aws-cdk/packages/aws-cdk/bin/cdk.ts .
echo "ready for debugging"