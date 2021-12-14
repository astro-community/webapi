# WebAPI

**WebAPI** lets you use Web APIs in Node.

```shell
npm install @astropub/webapi
```



## Usage

**WebAPI** lets you use Web APIs in Node.

As individual exports.

```js
import { AbortController, Blob, Event, EventTarget, File, fetch, Response } from '@astropub/webapi'
```

Polyfilling `globalThis`.

```js
import { polyfill } from '@astropub/webapi'

polyfill(globalThis)
```

---



## License

Licensed under the CC0-1.0 License.
