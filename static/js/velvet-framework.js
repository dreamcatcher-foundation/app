class Component {
    constructor() {
        this.element;
        this.css = {};
    }

    syncToElement(selector, position = 0) {
        let elements = document.querySelectorAll(selector);
        if (position < 0 || position > elements.length) {
            throw new Error("Component: position is out of bounds");
        }
        this.element = elements[position];
        return;
    }

    syncToNewElement(tag) {
        this.element = document.createElement(tag);
        return;
    }

    onEvent(trigger, callback) {
        this._onlyIfElementHasBeenAssigned();
        this.element.addEventListener(trigger, callback);
        return;
    }

    onEnteringView(
        callback,
        options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        }
    ) {
        this._onlyIfElementHasBeenAssigned();
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                    observer.unobserve(entry.target);
                }
            })
        }, options);
        observer.observe(this.element);
        return;
    }

    onEveryInterval(callback, interval) {
        this._onlyIfElementHasBeenAssigned();
        setInterval(callback, interval);
        return;
    }

    updateContent(content) {
        this._onlyIfElementHasBeenAssigned();
        this.element.textContent = content;
        return;
    }

    updateStyle(stylesheet = {}) {
        this._onlyIfElementHasBeenAssigned();
        Object.assign(this.element.style, stylesheet);
        return;
    }

    updateStyleTemplate(template, stylesheet) {
        if (!this.css[template]) {
            this.css[template] = {};
        }
        Object.assign(this.css[template], stylesheet);
        return;
    }

    overrideStyleTemplate(template, stylesheet = {}) {
        this.css[template] = stylesheet;
        return;
    }

    applyStyleTemplate(template) {
        this.updateStyle(this.css[template]);
        return;
    }

    overrideInnerHTML(source) {
        this.element.innerHTML = source;
        return;
    }

    inject(components) {
        if (components.length === 0) {
            return;
        }
        for (let i = 0; i < components.length; i++) {
            let component = components[i];
            this.element.appendChild(component.element);
        }
        return;
    }

    _onlyIfElementHasBeenAssigned() {
        if (!this.element) {
            throw new Error("Component: element has not been assigned");
        }
    }
}

class Template {
    staticAny({element="div", content="", stylesheet={}, components=[]}) {
        let component = new Component();
        component.syncToNewElement(element);
        component.updateContent(content);
        component.updateStyle(stylesheet);
        component.inject(components);
        return component;
    }

    staticColumn({element="div", width="auto", height="auto", stylesheet={}, components=[]}) {
        let component = new Component();
        component.syncToNewElement(element);
        component.updateStyle({
            width: width,
            height: height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        });
        component.updateStyle(stylesheet);
        component.inject(components);
        return component;
    }

    staticRow({element="div", width="auto", height="auto", stylesheet={}, components=[]}) {
        let component = new Component();
        component.syncToNewElement(element);
        component.updateStyle({
            width: width,
            height: height,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        });
        component.updateStyle(stylesheet);
        component.inject(components);
        return component;
    }

    staticSection({stylesheet={}, components=[]}) {
        let component = new Component();
        component.syncToNewElement("section");
        component.updateStyle({
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        });
        component.updateStyle(stylesheet);
        component.inject(components);
        return component;
    }

    shortStaticSection({stylesheet={}, components=[]}) {
        let component = new Component();
        component.syncToNewElement("section");
        component.updateStyle({
            width: "100%",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        });
        component.updateStyle(stylesheet);
        component.inject(components);
        return component;
    }

    staticText({element="div", content="", stylesheet={}, components=[]}) {
        let component = new Component();
        component.syncToNewElement(element);
        component.updateContent(content);
        component.updateStyle(stylesheet);
        component.inject(components);
        return component;
    }

    clickableText({element="div", callbackOnClick=()=>{}, content="", stylesheet={}, components=[]}) {
        let component = new Component();
        component.syncToNewElement(element);
        component.updateContent(content);
        component.updateStyle(stylesheet);
        component.onEvent("click", callbackOnClick);
        component.inject(components);
        return component;
    }

    staticImage({url, stylesheet={}, components=[]}) {
        let component = new Component();
        component.syncToNewElement("img");
        component.updateStyle(stylesheet);
        component.element.src = url;
        component.inject(components);
        return component;
    }

    clickableImage({url, callbackOnClick=()=>{}, stylesheet={}, components=[]}) {
        let component = new Component();
        component.syncToNewElement("img");
        component.updateStyle(stylesheet);
        component.element.src = url;
        component.onEvent("click", callbackOnClick);
        component.inject(components);
        return component;
    }

    button({element="div", content="", width="auto", height="auto", stylesheet={}, callbackOnClick=()=>{}, components=[]}) {
        let component = new Component();
        component.syncToNewElement(element);
        component.updateContent(content);
        component.updateStyleTemplate("default", {
            width: width,
            height: height,
            alignItems: "center",
            appearance: "none",
            backgroundColor: "#FCFCFD",
            borderRadius: "4px",
            borderWidth: "0",
            boxShadow:
              "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset",
            boxSizing: "border-box",
            color: "#36395A",
            cursor: "pointer",
            display: "inline-flex",
            fontFamily: "'JetBrains Mono', monospace",
            justifyContent: "center",
            lineHeight: "1",
            listStyle: "none",
            overflow: "hidden",
            paddingLeft: "16px",
            paddingRight: "16px",
            position: "relative",
            textAlign: "left",
            textDecoration: "none",
            transition: "box-shadow .15s, transform .15s",
            userSelect: "none",
            webkitUserSelect: "none",
            touchAction: "manipulation",
            whiteSpace: "nowrap",
            willChange: "box-shadow, transform",
            fontSize: "18px",
            transform: "translate(0px)"
        });
        component.updateStyleTemplate("default", stylesheet);
        component.updateStyleTemplate("focus", {
            boxShadow:
              "#D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset"
          });
        component.updateStyleTemplate("hover", {
        boxShadow:
            "rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset",
        transform: "translateY(-2px)"
        });
        component.updateStyleTemplate("active", {
            boxShadow: "#D6D6E7 0 3px 7px inset",
            transform: "translateY(2px)"
        });
        component.onEvent("mouseenter", () => {
            component.applyStyleTemplate("hover");
            component.applyStyleTemplate("focus");
        });
            component.onEvent("mouseleave", () => {
            component.applyStyleTemplate("default");
        });
            component.onEvent("mousedown", () => {
            component.applyStyleTemplate("active");
        });
        component.onEvent("mouseup", () => {
            component.applyStyleTemplate("hover");
            component.applyStyleTemplate("focus");
        });
        component.onEvent("click", callbackOnClick);
        component.applyStyleTemplate("default");
        component.inject(components);
        return component;
    }

    gradientButton(element="div", content="", width="auto", height="auto", callbackOnClick=()=>{}, components=[]) {
        let component = new Component();
        component.syncToNewElement(element);
        component.updateContent(content);
        component.updateStyleTemplate("default", {
            width: width,
            height: height,
            alignItems: "center",
            appearance: "none",
            backgroundImage:
              "radial-gradient(100% 100% at 100% 0, #705aff 0, #d454ff 100%)",
            border: "0",
            borderRadius: "6px",
            boxShadow:
              "rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset",
            boxSizing: "border-box",
            color: "#fff",
            cursor: "pointer",
            display: "inline-flex",
            fontFamily: "'JetBrains Mono', monospace",
            justifyContent: "center",
            lineHeight: "1",
            overflow: "hidden",
            paddingLeft: "16px",
            paddingRight: "16px",
            position: "relative",
            textAlign: "left",
            textDecoration: "none",
            transition: "box-shadow .15s, transform .15s",
            userSelect: "none",
            webkitUserSelect: "none",
            touchAction: "manipulation",
            whiteSpace: "nowrap",
            willChange: "box-shadow, transform",
            fontSize: "18px",
            transform: "translate(0px)"
        });
        component.updateStyleTemplate("focus", {
            boxShadow:
              "#3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset"
        });
        component.updateStyleTemplate("hover", {
            boxShadow:
              "rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset",
            transform: "translateY(-2px)"
        });
        component.updateStyleTemplate("active", {
            boxShadow: "#3c4fe0 0 3px 7px inset",
            transform: "translateY(2px)"
        });
        component.onEvent("mouseenter", () => {
            component.applyStyleTemplate("hover");
            component.applyStyleTemplate("focus");
        });
        component.onEvent("mouseleave", () => {
            component.applyStyleTemplate("default");
        });
        component.onEvent("mousedown", () => {
            component.applyStyleTemplate("active");
        });
        component.onEvent("mouseup", () => {
            component.applyStyleTemplate("hover");
            component.applyStyleTemplate("focus");
        });
        component.onEvent("click", () => {
            callbackOnClick();
        });
        component.onEvent("click", callbackOnClick);
        component.applyStyleTemplate("default");
        component.inject(components);
        return component;
    }
}

export default class Velvet {
    /** note that velvet will expect the document to be structured in a certain way */
    constructor() {
        this.routes = [];
        this.Template = new Template();
        let reset = {
            margin: "0", 
            padding: "0"
        };
        this.everything = this.Component();
        this.everything.syncToElement("*");
        this.everything.updateStyle(reset);
        this.html = this.Component();
        this.html.syncToElement("html");
        this.html.updateStyle(reset);
        this.head = this.Component();
        this.head.syncToElement("head");
        this.body = this.Component();
        this.body.syncToElement("body");
        this.body.updateStyle(reset);
        this.body.updateStyle({
            width: "100vw",
            height: "auto"
        });
        this.header = this.Component();
        this.header.syncToElement("header");
        this.header.updateStyle({
            position: "fixed",
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: "100"
        });
        this.content = this.Component();
        this.content.syncToElement("content");
        this.content.updateStyle(reset);
        this.content.updateStyle({
            position: "absolute",
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column"
        });
    }

    Component() {
        return new Component();
    }

    wipeHeader() {
        this.header.overrideInnerHTML("");
        return;
    }

    wipeContent() {
        this.content.overrideInnerHTML("");
        return;
    }

    addRoute(callback) {
        this.routes.push(callback);
        return;
    }

    removeRoute(callback) {
        let routeIndex = this.routes.indexOf(callback);
        this.routes.splice(routeIndex, 1);
        return;
    }

    goto(route) {
        if (route > this.routes.length || this.routes.length === 0) {
            throw new Error("Velvet: route is out of bounds");
        }
        this.wipeHeader();
        this.wipeContent();
        this.routes[route]();
        return;
    }
}