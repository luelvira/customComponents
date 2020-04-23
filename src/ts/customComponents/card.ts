interface Card {
    title:string;
    description:string;
    summary:string;
    src:string;
    tags:string[];
}
class CardMenu extends HTMLElement {
    private psrc:string;
    private ptitle:string;
    private description:string;
    private summary:string;
    private h4:HTMLHeadingElement;
    private img:HTMLImageElement;
    private p:HTMLParagraphElement;
    private tags:string[];
    private visible:boolean;
    private availablesTags:string[];
    constructor() {
        super();
        this.availablesTags = [];
        this.tags = [];
        this.visible = true;
    }

    init(availablesTags:string[]) {
        this.availablesTags = [...availablesTags];
        this.psrc = this.getAttribute('psrc');
        this.ptitle = this.getAttribute('ptitle');
        this.h4 = document.createElement('h4');
        this.h4.innerHTML = this.ptitle;

        this.img = document.createElement('img');
        this.img.setAttribute('src', this.psrc);

        this.p = document.createElement('p');
        this.p.innerHTML = this.summary;

        this.appendChild(this.h4);
        this.appendChild(this.img);
        this.appendChild(this.p);

    }
    setSummary(s:string):void {
        this.summary = s;
        this.p.innerHTML = s;
        
    }
    setDescription(d:string):void {
        this.description = d;
    }

    isVisible() {
        return this.visible;
    }

    getTags():string[] {
        return this.tags;
    }

    getTag(t:string):boolean {
        return this.tags.includes(t);
    }
    setTags(tgs:string[]) {
        for (let tg of tgs) {
            if (this.availablesTags.includes(tg))
                this.tags.push(tg);
        }
    }

    toggle(visible?:boolean) {
        if (typeof visible !== 'undefined') {
            if (!visible) {
                this.visible = false;
                this.classList.add('hidden');
            } else {
                this.visible = true;
                this.classList.remove('hidden');
            }
        } else {
            this.visible = !this.visible;
            this.classList.toggle('hidden');
        }


    }
}

customElements.define('cards-menu', CardMenu);
