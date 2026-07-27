# Repository Guidelines

This file applies to the entire repository.

## Project Overview

- This is an Angular 22 workspace containing the publishable `ngx-update-app` library and a demo application.
- Library source lives in `projects/ngx-update-app/src`; its public entry point is
  `projects/ngx-update-app/src/public-api.ts`.
- Demo source lives in `projects/demo/src` and exercises the library with Angular service workers.
- Repository automation lives in `scripts`, `.github/actions`, and `.github/workflows`.

## Toolchain

- Use the Node.js version declared in `.nvmrc`. Run `nvm install` and `nvm use` before project commands.
- Use Yarn Classic; the exact package-manager version is declared in `package.json`.
- Install dependencies with `yarn install --frozen-lockfile`.
- In GitHub Actions, configure `actions/setup-node` with `node-version-file: '.nvmrc'`; do not duplicate the
  Node.js version in workflow files.

## Common Commands

- Start the demo: `yarn start`
- Lint the workspace: `yarn lint`
- Check circular dependencies: `yarn check-circular-dependencies`
- Test the library: `yarn test ngx-update-app`
- Test the demo: `yarn test demo`
- Build the library: `yarn build`
- Build the demo: `yarn build:demo`
- Synchronize package metadata and the library README: `yarn script:sync-projects`

Run the narrowest relevant checks while developing. Before handing off a source change, run lint and the
affected tests. For packaging or public API changes, also build the library. Documentation-only changes do not
require a build unless they change executable examples or project commands.

## TypeScript and Angular Conventions

- Follow the repository Prettier and ESLint configurations. TypeScript and Angular templates are strict.
- Prefer inferred types when they are obvious. Avoid `any`; use `unknown` and narrow it when a value is uncertain.
- Use standalone Angular APIs, `inject()`, signals for local state, and `computed()` for derived state.
- Use `ChangeDetectionStrategy.OnPush` for components, matching the workspace schematics and existing code.
- Prefer `input()` and `output()` over decorator-based inputs and outputs.
- Use native template control flow (`@if`, `@for`, and `@switch`) instead of structural directives.
- Use class and style bindings instead of `ngClass` and `ngStyle`.
- Put host bindings and listeners in the decorator's `host` object rather than using `@HostBinding` or
  `@HostListener`.
- Keep templates accessible and satisfy the configured Angular template accessibility rules.
- Library selectors use the `ngx` prefix; demo selectors use the `app` prefix.

## Public API and Tests

- Keep library implementation in `projects/ngx-update-app/src/lib`; do not make it depend on the demo.
- Export every intended public symbol through `projects/ngx-update-app/src/public-api.ts`.
- Preserve the directive selector, provider behavior, and public API compatibility unless a breaking change is
  explicitly requested.
- Preserve compatibility with the Angular peer dependency range in `projects/ngx-update-app/package.json`.
- Place tests beside their source files as `*.spec.ts`. Tests use Vitest through Angular's unit-test builder.
- Add or update tests for behavior changes and regressions; assert observable behavior rather than implementation
  details.

## Generated and Synchronized Files

- Do not manually edit or commit `projects/demo/src/environments/version.ts`; `scripts/create-version.ts`
  generates it during `postinstall`.
- Do not edit or commit generated build output under `dist`.
- The root `README.md` is copied to `projects/ngx-update-app/README.md` by `yarn script:sync-projects`. Update the
  root documentation first when installation, configuration, behavior, or the public API changes.
- Use the existing synchronization script for package versions and publish metadata instead of duplicating manual
  edits.
- Do not run release, version, publish, or vulnerability-fix scripts unless the task explicitly requests them.

## Change Hygiene

- Inspect `git status` before editing and preserve unrelated or already-staged user changes.
- Keep changes scoped to the request.
- Follow the Angular commit convention configured in `.commitlintrc.json`, using an allowed type such as `feat`,
  `fix`, `docs`, `refactor`, `style`, or `chore`.
- Do not change package versions, changelogs, tags, or release artifacts unless explicitly requested.
- Before handoff, run `git diff --check` and report the validation commands that were executed.
