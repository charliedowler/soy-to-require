# soy-to-require

A simple grunt task to wrap compiled soy templates with require.

## Getting Started

This plugin requires Grunt '~0.4.x'

Soy must be included in your require config. Example:

	require.config({
  		baseUrl: 'js/',
  		paths: {
    		"soy": "https://closure-templates.googlecode.com/svn-history/r9/trunk/javascript/soyutils"
  		},
  		shim: {
    		"soy": {
    			exports: "soy"
    		}
  		}
	});

```shell
npm install soy-to-require --save-dev
```

## Usage

To use this task add this config to the Gruntfile

	'soy-to-require': {
		namespace: 'TemplateNamespace',
		templates: 'path/to/compiled/templates'
	}		

For this to work the template file name has to be the same as the template name. For example:

	{namespace HelloWorld}
	/**
	* Some random template
	* @param world
	*/
	{template .exampleTemplate}
		Hello {$world}
	{/template}

The filename would be 'exampleTemplate.soy'.

Any questions? tweet me [@charliedowler](https://twitter.com/charliedowler)