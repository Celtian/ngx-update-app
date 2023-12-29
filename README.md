<p align="center">
  <a href="https://github.com/Celtian/ngx-update-app" target="blank"><img src="assets/logo.svg?sanitize=true" alt="" width="120"></a>
  <h1 align="center">NgxAppVersion</h1>
</p>

[![npm version](https://badge.fury.io/js/ngx-update-app.svg)](https://badge.fury.io/js/ngx-update-app)
[![Package License](https://img.shields.io/npm/l/ngx-update-app.svg)](https://www.npmjs.com/ngx-update-app)
[![NPM Downloads](https://img.shields.io/npm/dm/ngx-update-app.svg)](https://www.npmjs.com/ngx-update-app)
[![Snyk](https://snyk.io//advisor/npm-package/ngx-update-app/badge.svg)](https://snyk.io//advisor/npm-package/ngx-update-app)
[![stars](https://badgen.net/github/stars/celtian/ngx-update-app)](https://github.com/celtian/ngx-update-app/)
[![forks](https://badgen.net/github/forks/celtian/ngx-update-app)](https://github.com/celtian/ngx-update-app/)
[![HitCount](http://hits.dwyl.com/celtian/ngx-update-app.svg)](http://hits.dwyl.com/celtian/ngx-update-app)

> Angular directive for writing version into DOM

> ✓ _Angular 17 compatible_

Here's the [demo](http://celtian.github.io/ngx-update-app/)

- Lightweight
- No dependencies!
- Directive way
- Customizable [options](#options)...

## Install

```terminal
yarn add ngx-update-app
```

## Quick start

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideUpdateApp({
      interval: 1000 * 60, // check new version every minute
      onUpdateFactory: () => {
        return () => console.log('should update');
      }
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};

// and put directive in root component

@Component({
  standalone: true,
  hostDirectives: [NgxUpdateAppDirective]
})
export class AppComponent {}
```

## Options

| Option              | Type     | Default   | Description                                   |
| ------------------- | -------- | --------- | --------------------------------------------- |
| **interval**        | number   | undefined | interval to check new version in milliseconds |
| **onUpdateFactory** | function | undefined | function which will be called on update       |

## Dependencies

_None_

## License

Copyright &copy; 2023 [Dominik Hladik](https://github.com/Celtian)

All contents are licensed under the [MIT license].

[mit license]: LICENSE
