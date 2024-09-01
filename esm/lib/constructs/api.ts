import {Construct} from "constructs";
import {
    AuthorizationType,
    BaseDataSource, Code,
    Definition,
    FunctionRuntime,
    GraphqlApi,
    NoneDataSource
} from "aws-cdk-lib/aws-appsync";

export interface ApiProps {
    // (nth so far)
}

const __dirname = new URL(".", import.meta.url).pathname;

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
        const ds = new NoneDataSource(this, "NoneDs", {
            api,
        });
        const createAppSyncResolver = (ds: BaseDataSource, typeName: 'Query' | 'Mutation', fieldName: string) => {
            ds.createResolver(typeName + '-' + fieldName + '-res', {
                typeName,
                fieldName,
                runtime: FunctionRuntime.JS_1_0_0,
                code: Code.fromInline(`
        export function request(ctx) {
          return {};
        }
        export function response(ctx) {
          return 42;
        }`),
            });
        };
        createAppSyncResolver(ds, 'Query', 'test');
    }
}