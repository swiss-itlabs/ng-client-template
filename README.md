# ng-client-template

Template to build an angular library with [nswag](https://github.com/RicoSuter/NSwag) generated services.

## Placeholder to replace

| Name           | Description                                             |
| -------------- | ------------------------------------------------------- |
| #api-name#     | Name of the API for which the client was generated for. |
| #package-name# | Name of the generated library (npm package name).       |
| #version#      | Version of the generated library (npm package version). |

## Steps to build

1. Clone the master branch of the repository.
2. Copy the generated service file to `/projects/service/src/lib`.
3. Export the services in the `projects/service/src/public-api.ts` file.
4. Replace the `#api-name#`-placeholder in `projects/service/package.json` and `projects/service/README.md` for example with `authentication`.
5. Replace the `#package-name#`-placeholder in `projects/service/package.json` for example with `@itlabs/auth-service`.
6. Replace the `#version#`-placeholder in `projects/service/package.json` for example with `1.0.1`.
