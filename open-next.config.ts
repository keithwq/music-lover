import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
    bundleDependencies: false,
    dependenciesToBundle: [
        "@prisma/client",
        "@supabase/*"
    ],
    externalDependencies: [
        "bcrypt",
        "@mapbox/node-pre-gyp",
        "mock-aws-s3",
        "aws-sdk",
        "nock"
    ]
});
