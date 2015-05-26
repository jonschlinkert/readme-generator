# <%= name %>

> <%= description %>

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i <%= name %> --save-dev
```

## Usage

```js
var <%= name %> = require('<%= name %>');
```

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](<%= bugs.url %>)

## Author

**<%= author.name %>**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright © <%= year() %> [<%= author.name %>](<%= author.url %>)
Licensed under the <%= license || licenses.join(', ') %> license.

***

<%= include("templates/footer.md") %>
