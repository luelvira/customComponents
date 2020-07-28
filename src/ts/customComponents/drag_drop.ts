window.onload = function() {
class ListItems extends HTMLElement {
    public title:string; 
    constructor() {
        super();
    }

    public init(attrs:string[]) {
        this.title = attrs[0];
        let h1 = document.createElement('h2') as HTMLHeadingElement;
	h1.classList.add("title-primary")
        h1.innerText = this.title;
        this.appendChild(h1);


    }

}

class Board extends HTMLElement {
    public title:string;
    //private listItems:HTMLUListElement[];
    private button:HTMLButtonElement;
    private container:HTMLElement;
    private setMaxColumn:HTMLElement;
    private maxColumn:number;
    private baseClass:string;


    private _getAttribute(n:string): string {
	   if (this.hasAttribute(n)) return this.getAttribute(n)!; 
	   else return "";
    }

    constructor() {
        super();
        let setAddPanel = (e:Event) => this.addPanel.call(this, e);
	let changeValue = (e:Event) => this.changeValue.call(this, e);
	let changeInputValue = (e:Event) => this.changeInputValue.call(this, e);
	// containers
        let wrapper:HTMLElement = document.createElement('div');
        this.container = document.createElement('div');
	this.container.classList.add('container');
        wrapper.classList.add('wrap');
	let options:HTMLElement = document.createElement('div');
	options.classList.add('options');
        wrapper.appendChild(this.container);

	//title
        this.title = this._getAttribute('title');
        this.maxColumn = parseInt(this._getAttribute('column')) || 3;
	this.baseClass = `col_${this.maxColumn}`;
	this.container.classList.add(`col_${this.maxColumn}`);

        let h1 = <HTMLHeadingElement> document.createElement('h1');
        h1.classList.add('title-primary');
        h1.innerText = this.title;
        this.appendChild(h1);


	//button to append
        let div1:HTMLElement = document.createElement('div');
        let div2:HTMLElement = document.createElement('div');
        div1.classList.add('bar');
        div2.classList.add('bar-vertical');
        this.button = document.createElement('button');
        this.button.appendChild(div1);
        this.button.appendChild(div2);
        this.button.classList.add('add-item');

	// input set max colum
	this.setMaxColumn = document.createElement('div');
	this.setMaxColumn.classList.add('maxColumn');
	let lessButton:HTMLButtonElement = document.createElement('button');
	lessButton.innerText = "-";
	lessButton.setAttribute('id', 'less');
	lessButton.addEventListener('click', changeValue);
	let moreButton:HTMLButtonElement = document.createElement('button');
	moreButton.innerText = "+";
	moreButton.setAttribute('id', 'more');
	moreButton.addEventListener('click', changeValue);
	let input:HTMLInputElement = document.createElement('input');
	input.setAttribute('type', 'number');
	input.value = this.maxColumn.toString();
	input.addEventListener('change', changeInputValue);
	this.setMaxColumn.appendChild(lessButton);
	this.setMaxColumn.appendChild(input);
	this.setMaxColumn.appendChild(moreButton);

        options.appendChild(this.button);
        options.appendChild(this.setMaxColumn);
	this.appendChild(options);
        this.button.addEventListener('click', setAddPanel);
        this.appendChild(wrapper);


    }

    private addPanel(event:Event):void {
        let name = prompt("Cómo se llama la siguiente lista");
	if (!name) return;
        let list:ListItems =<ListItems> document.createElement('list-items');
        this.container.appendChild(list);
        list.init([name]);

    }


    private changeValue(event:Event):void {
	  let elem:HTMLElement = <HTMLElement>event.target;
	  if (elem.hasAttribute('id'))
		if (elem.getAttribute('id') === "more") this.setValue(this.maxColumn+1);
     		else this.setValue(this.maxColumn-1);
	
    }

    private changeInputValue(event:Event):void {
	    let elem:HTMLInputElement = <HTMLInputElement>event.target;
	    this.setValue(parseInt(elem.value));
    }

    private setValue(n:number):void {
	    if (n == NaN) n = 3;
            else if (n > 8) n = 8;
	    this.container.classList.remove(`col_${this.maxColumn}`);
	    this.maxColumn = n;
	    this.setMaxColumn.getElementsByTagName('input')[0].value = this.maxColumn.toString();
	    this.container.classList.add(`col_${this.maxColumn}`);


    }

}
customElements.define('board-element', Board);
customElements.define('list-items', ListItems);
}
