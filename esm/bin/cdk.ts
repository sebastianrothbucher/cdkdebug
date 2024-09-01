#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CommonjsStack } from '../lib/index.js';

const app = new cdk.App();
new CommonjsStack(app, 'CommonjsStack', {
  env: { account: '123456789012', region: 'eu-central-1' },
});