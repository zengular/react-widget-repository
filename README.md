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

Repository will pass all `data-attributes` as props to your component, including the tag's content as `innerHtml` to work with. Therefore you can pass compex data to the widget within innerHTML as JSON.

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