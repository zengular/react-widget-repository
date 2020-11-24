import ReactDOM from "react-dom";
import React from "react";

const widget_attr = "is"

class ReactWidgetRepository {

	constructor() {
		this.registry = {};
		this.mutationObserver = null;
		this.widget_attr = widget_attr;
	}

	register(is, Component) {
		this.registry[is] = Component;
	}

	observe(){
		if(this.mutationObserver === null){
			this.mutationObserver = new MutationObserver((mutationsList) =>{
				mutationsList.forEach(mutation => {
					if(mutation.type === 'childList' && mutation.addedNodes.length){
						this.widgetify([...mutation.addedNodes].filter(node=> node.hasAttribute(this.widget_attr)));
					}
				});
			});
			this.mutationObserver.observe(document, {attributes: false, childList: true, subtree: true});
		}
	}

	run(observe = false){
		if(observe) this.observe();
		this.widgetify(document.querySelectorAll('['+this.widget_attr+']'));
	}

	widgetify(nodeList){
		nodeList.forEach(element => {
			let Component = this.registry[element.getAttribute(this.widget_attr)];
			if (typeof Component !== "undefined"){
				let attributes = Object.assign({innerHtml: element.innerHTML}, element.dataset);
				let component = React.createElement(Component, {...attributes});
				ReactDOM.render(component, element);
				element.removeAttribute(this.widget_attr)
			}
		});
	}
}

let repository = new ReactWidgetRepository();
export default repository;