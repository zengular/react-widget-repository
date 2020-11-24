# React Widget Repository

Makes it easy to work with react widgets rendered by the server.

## Install

`npm install --save react-widget-repository`

## Basic usage

Suppose you have a hello-world (`HelloWorld`) react component, called `Hello`

put in your html:

```html
<div is="hello-world" data-name="Elvis Presley">Hi</div>
```

put in your js:

```js
import repository from "react-widget-repository";
import HelloWorld from "components/hello-world";

repository.register("hello-world", HelloWorld);
repository.run();
```

It will render your component into the div, which has the `is="hello"` attribute. 

### Props

Repository will pass all `data-attributes` as props to your component, including the `innerHTML` as `innerHtml` to work with. Therefore you can pass compex data to the widget within innerHTML as JSON.

```json
{
	"name": "Elvis Presley",
	"innerHTML": "Hi"
}
```

### Hide not-yet-rendered components

You can hide your not-yet-rendered componets, with css. Because the repository manager removes the `is` attribute from the widget tag, it's easy.

```css
// hide every or specific widgets before rendering
[is]{display:none;}
[is="hello-world"]{display:none;}
```

## Turn on DOM observer

You can initialize the repository with the observer. This way it listens to dom changes, and looks for new widgets added.

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