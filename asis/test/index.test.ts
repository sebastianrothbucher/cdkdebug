import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { CommonjsStack } from '../lib';

expect.addSnapshotSerializer({
    test: (val) => typeof val === 'string',
    print: (val) =>
        `"${(val as string)
            .replace(/([A-Fa-f0-9]{64})\.(json|zip)|(SsrEdgeFunctionCurrentVersion[A-Fa-f0-9]{40})/, '[FILENAME REMOVED]')
            .replace(
                /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
                '[VERSION REMOVED]',
            )}"`,
});

test('Test mvp stack (dev)', async () => {
    const stack = new CommonjsStack(new App(), "stack", { env: { region: 'eu-central-1' } });
    expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});
