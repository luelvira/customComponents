
class ListItems extends HTMLElement {
    public title:string;
    constructor() {
        super();
        console.log("Entro");
    }

    init(attrs:string[]) {
        this.title = attrs[0];
        let h1 = document.createElement('h1') as HTMLHeadingElement;
        h1.innerText = this.title;
        this.appendChild(h1);


    }

}

class Board extends HTMLElement {
    public title:string;
    private listItems:HTMLUListElement[];
    private button:HTMLButtonElement;
    private container:HTMLElement;
    constructor() {
        super();
        let setAddPanel = (e:Event) => this.addPanel.call(this, e);
        let wrapper:HTMLElement = document.createElement('div');
        this.container = document.createElement('div');
        wrapper.classList.add('wrap');

        try {
            this.title = this.getAttribute('title');
        } catch ( e) {
            console.log("Error not attribute title");
        }
        let h1 = <HTMLHeadingElement> document.createElement('h1');
        h1.classList.add('title-primary');
        h1.innerText = this.title;

        this.button = document.createElement('button');

        let div1:HTMLElement = document.createElement('div');
        let div2:HTMLElement = document.createElement('div');
        div1.classList.add('bar');
        div2.classList.add('bar-vertical');
        wrapper.appendChild(h1);
        wrapper.appendChild(this.container);

        this.button.appendChild(div1);
        this.button.appendChild(div2);
        this.button.classList.add('add-item');
        this.appendChild(this.button);
        this.button.addEventListener('click', setAddPanel);
        this.appendChild(wrapper);
    }

    private addPanel(event:Event) {
        let name = prompt("Cómo se llama la siguiente lista");
        let list =<ListItems> document.createElement('list-items');
        this.appendChild(list);
        list.init([name]);

    }

}
customElements.define('board-element', Board);
customElements.define('list-items', ListItems);
