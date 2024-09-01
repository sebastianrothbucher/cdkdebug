import {Construct} from "constructs";
import {AuthorizationType, Definition, GraphqlApi} from "aws-cdk-lib/aws-appsync";
import {Duration, Expiration} from "aws-cdk-lib";

export interface ApiProps {
    // (nth so far)
}

export class ApiConstruct extends Construct {
    constructor(scope: Construct, id: string, props: ApiProps = {}) {
        super(scope, id);
        const api = new GraphqlApi(this, 'SomeAPI', {
            name: 'SomeAPI',
            definition: Definition.fromFile(__dirname + "/../../schmu.graphqls"),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: AuthorizationType.API_KEY,
                },
            },
        });
    }
}