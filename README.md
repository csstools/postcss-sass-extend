# PostCSS Sass Extend [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[PostCSS Sass Extend] is a [PostCSS] plugin that allows you to use @extend and placeholder classes like you do in Sass.

```css
/* before */

%placeholder {
	color: blue;
}

%unused-placeholder {
	color: yellow;
}

.a {
	@extend %placeholder;

	background-color: black;
}

.b {
	color: red;
}

.c {
	background-color: white;

	@extend %placeholder;
}

.d {
	color: green;
}

/* after */

.a, .c {
	color: blue;
}

.a {

	background-color: black;
}

.b {
	color: red;
}

.c {
	background-color: white;
}

.d {
	color: green;
}
```

## Usage

You just need to follow these two steps to use [PostCSS Sass Extend]:

1. Add [PostCSS] to your build tool.
2. Add [PostCSS Sass Extend] as a PostCSS process.

```sh
npm install postcss-sass-extend --save-dev
```

### Node

```js
postcss([ require('postcss-sass-extend')({ /* options */ }) ])
```

### Grunt

Add [Grunt PostCSS] to your build tool:

```sh
npm install postcss-sass-extend --save-dev
```

Enable [PostCSS Sass Extend] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			processors: [
				require('postcss-sass-extend')({ /* options */ })
			]
		},
		dist: {
			src: 'css/*.css'
		}
	}
});
```

[ci]: https://travis-ci.org/jonathantneal/postcss-sass-extend
[ci-img]: https://travis-ci.org/jonathantneal/postcss-sass-extend.svg
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Sass Extend]: https://github.com/jonathantneal/postcss-sass-extend
