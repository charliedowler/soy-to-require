# soy-to-require [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> Wrap your closure templates in a require js define block

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install soy-to-require --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('soy-to-require');
```

## The "soy_to_require" task

### Overview
In your project's Gruntfile, add a section named `soy_to_require` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  soy_to_require: {
    options: {
      // Task-specific options go here.
    },
    files: {
        'nameOfFileCollection': ['files.soy.js']
    }
  }
})
```

### Options

#### options.namespace
Type: `String`

Default value: `null`

The Soy namespace.

#### options.output
Type: `String`

Optional: `true`

Default value: `{input_file_path}`

Allows you to override the output directory,

#### options.prefix
Type: `String`

Default value: ""

The prefix used for resolving other Soy modules. This gets appended to
`options.output` to form the location of the AMD module.

### Usage Examples
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  soy_to_require: {
      TestTask: {
        options: {
            namespace: 'Testing',
            prefix: 'templates/',
            output: 'dist/js'
        },
        files: {
          'test/fixtures': ['templates/MyView.soy.js', 'test/fixtures/MyView.soy.js']
        }
      }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 charliedowler. Licensed under the MIT license.

[npm-url]: https://npmjs.org/package/soy-to-require
[npm-image]: https://badge.fury.io/js/soy-to-require.png
[travis-url]: http://travis-ci.org/charliedowler/soy-to-require
[travis-image]: https://secure.travis-ci.org/charliedowler/soy-to-require.png?branch=master
[depstat-url]: https://david-dm.org/charliedowler/soy-to-require
[depstat-image]: https://david-dm.org/charliedowler/soy-to-require.png
