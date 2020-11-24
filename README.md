# React Widget Repository

Makes it easy to work with react widgets rendered by the server.

## Install

`npm install --save react-widget-repository`

## Basic usage

Suppose you have a `HelloWorld` react component, which should be a `hello-world` widget.

in your html:

```html
<div is="hello-world" data-name="Elvis Presley">Hi</div>
```

in your js:

```js
// import the repository singleton
import repository from "react-widget-repository";
// import your component
import HelloWorld from "components/hello-world";

// register the component (register all your widget like components)
repository.register("hello-world", HelloWorld);
// and run it
repository.run();
```

It will render your component into the div, which has the `is="hello-world"` attribute. 

### Props

Repository will pass all `data-attributes` as props to your component, including the tag's content as `innerHtml` to work with. Therefore you can pass complex data to the widget within innerHTML as JSON.

```json
{
	"name": "Elvis Presley",
	"innerHTML": "Hi"
}
```

### Hide not-yet-rendered widgets

You can hide your not-yet-rendered widgets, with css. Because the repository manager removes the `is` attribute from the widget tag, it's easy.

```css
// hide every or specific widgets before rendering
[is]{display:none;}
[is="hello-world"]{display:none;}
```

## Turn on DOM observer

You can initialize the repository with observer (just pass `true` to the run method, or call the `observe()` method). From this, it listens to DOM changes, and handles every dynamycally added widgets.

```js
repository.run(true);
```

## Modify the `is` attribute

You don't need to use the `is` attribute to work with widgets.

```html
<div widget="hello-world" data-name="Elvis Presley">Hi</div>
```

```js
repository.register("hello-world", HelloWorld);
repository.widget_attr = "widget";
repository.run();
```

## Self registering component

You can create self registering components. You don't need to collect every component on every page to register manually.
Just import what you need, and your components will do the rest. (don't forget to call the `repository.run()` method!)

```js
import React from "react"
import repository from "react-widget-repository";

export default class HelloWorld extends React.Component {
	// ...
}

repository.register("hello-world", HelloWorld);
```

## debug()

The repository has a `debug()` method. It will print out the list of the registered **widgets** and **warnings** to the console.

Warning types are:

- `duplicate` - the same component is already registeredwith the same widget name
- `overwrite` - you are registering an already registered widget, but with an other component
- `not-found` - you mention an unregistered widget

You can call this method whenever you want to. 

You may register it globally and call it from the console:

```js
window.rwr = repository;
```

in the console: `rwr.debug()`