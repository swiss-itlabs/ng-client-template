# ng-client-template

Template to build an angular library with [nswag](https://github.com/RicoSuter/NSwag) generated services.

## Steps to build

1. Clone the master branch of the repository.
2. Run `npm ci`.
3. Run the initialization script. Example call: `npm run init -- -d "nswag/output/angular" --package-name "@itlabs/auth" --package-version "1.0.0" --api-name "IT Labs authentication"`.
4. Build the library with `npm run build`.

### init-script options

| Name              | Description                                             |
| ----------------- | ------------------------------------------------------- |
| --dir             | Directory with the generated services.                  |
| --package-name    | Name of the generated library (npm package name).       |
| --package-version | Version of the generated library (npm package version). |
| --api-name        | Name of the API for which the client was generated for. |

Run `npm run init -- -h` for further details.
