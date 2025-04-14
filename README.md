<p align="center">
  <a href="https://github.com/Celtian/ngx-update-app" target="blank"><img src="assets/logo.svg?sanitize=true" alt="" width="120"></a>
  <h1 align="center">NgxUpdateVersion</h1>
</p>

[![npm version](https://badge.fury.io/js/ngx-update-app.svg)](https://badge.fury.io/js/ngx-update-app)
[![Package License](https://img.shields.io/npm/l/ngx-update-app.svg)](https://www.npmjs.com/ngx-update-app)
[![NPM Downloads](https://img.shields.io/npm/dm/ngx-update-app.svg)](https://www.npmjs.com/ngx-update-app)
[![Snyk](https://snyk.io//advisor/npm-package/ngx-update-app/badge.svg)](https://snyk.io//advisor/npm-package/ngx-update-app)
[![stars](https://badgen.net/github/stars/celtian/ngx-update-app)](https://github.com/celtian/ngx-update-app/)
[![forks](https://badgen.net/github/forks/celtian/ngx-update-app)](https://github.com/celtian/ngx-update-app/)
[![HitCount](http://hits.dwyl.com/celtian/ngx-update-app.svg)](http://hits.dwyl.com/celtian/ngx-update-app)

> Angular directive for updating app via service workers

> ✓ _Angular 19 compatible_

Here's the [demo](http://celtian.github.io/ngx-update-app/)

- Lightweight
- No dependencies!
- Directive way
- Customizable [options](#options)...

## 🛠️ Install

```terminal
yarn add ngx-update-app
```

## 🚀 Quick start

1. Provide config

```typescript
import { provideUpdateApp } from 'ngx-update-app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideUpdateApp({
      interval: 1000 * 60, // check new version every minute
      dryRun: false, // set to true if you want to see alert on init
      onUpdateFactory: () => {
        // you can use inject() here
        return () => alert('Should update');
      }
    }),
    provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000' })
  ]
};
```

2. Use directive in root component

```typescript
import { NgxUpdateAppDirective } from 'ngx-update-app';

@Component({ standalone: true, hostDirectives: [NgxUpdateAppDirective] })
export class AppComponent {}
```

## 🛠️ Options

| Option              | Type     | Default   | Description                                   |
| ------------------- | -------- | --------- | --------------------------------------------- |
| **interval**        | number   | undefined | interval to check new version in milliseconds |
| **dryRun**          | boolean  | false     | force update action once on init              |
| **onUpdateFactory** | function | undefined | function which will be called on update       |

## 🔧 Compatibility

| Angular | ngx-fixed-footer | Install                     |
| ------- | ---------------- | --------------------------- |
| >= 18   | 1.x              | `yarn add ngx-update-app`   |
| >= 17   | 0.x              | `yarn add ngx-update-app@0` |

## 📦 Dependencies

_None_

## 🪪 License

Copyright &copy; 2023 - 2025 [Dominik Hladik](https://github.com/Celtian)

All contents are licensed under the [MIT license].

[mit license]: LICENSE
