import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
    externalDependencies: [
        "@mapbox/node-pre-gyp",
        "mock-aws-s3",
        "aws-sdk",
        "nock"
    ]
});
