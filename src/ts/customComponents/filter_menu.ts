
class FilterMenu extends HTMLElement {
    private categories:string[];
    private actives:string[];
    private ItemsMenu:ItemsMenu;
    private nav:HTMLElement;
    private cards:CardMenu[];
    constructor() {
        super();
        this.categories = [];
        this.actives = [];
        //creation of the struct that allow to view the elements
        this.ItemsMenu =<ItemsMenu> document.createElement('items-menu');
        this.nav = document.createElement('nav');
        this.nav.classList.add('filter-menu-nav');
        this.appendChild(this.ItemsMenu);
        this.insertBefore(this.nav, this.ItemsMenu);
        this.cards = [];
    }



    private toggleFilter(cat:string, state?:boolean) {
        let lis:HTMLCollectionOf<HTMLLIElement> = this.getElementsByTagName('li');


        if (typeof state === 'undefined') state = (this.actives.indexOf(cat) == -1);
        let p:number = this.categories.indexOf(cat);
        if (state) {
            lis[p].classList.add('active');
            this.actives.push(cat)
        } else {
          lis[p].classList.remove('active');  
          this.actives = this.actives.filter(c => c!=cat);
        } 
    }


    private  filter(e:Event) {
        let her:HTMLLIElement = <HTMLLIElement> e.currentTarget;
        let tag:string = her.children[0].innerHTML;
        let parent:FilterMenu = <FilterMenu>her.parentElement.parentElement;
        let index:number = parent.actives.indexOf(tag); 
        // if the element is not curren visible
        let state:boolean = index === -1
        parent.toggleFilter(tag, state);
        parent.getCards().forEach(async (card:CardMenu) => {
            card.toggle(parent.actives.map((t:string) => card.getTag(t)).indexOf(true) !== -1);
            await sleep(500);
       });
    }

    setCategories(c:string[]):void {
        // creation of the nav menu
        this.categories = [ ...c];
        this.actives = [...c];
        this.nav.innerHTML = '';
        for (let i of this.categories) {
            this.pushCategory(i);
        }
    }

    pushCategory(c:string):void {
        let li:HTMLLIElement = document.createElement('li');
        li.classList.add("filter-menu-li");
        let span:HTMLSpanElement = document.createElement('span');
        span.innerHTML = c;
        if (this.actives.includes(c)) li.classList.add('active');
        li.appendChild(span);
        li.addEventListener('click', this.filter);
        this.nav.appendChild(li);
    }

    delCategory(c:string):boolean {
        let i:number = this.categories.indexOf(c);
        if (i<0) return false;
        this.categories = this.categories.splice(i, 1);
    }

    getCategories():string[] {
        return [...this.categories];
    }

    sortCategories(f?:(a:string, b:string)=>number ):void {
        this.categories = f ? this.categories.sort(f): this.categories.sort();
    }

    pushCard(c:Card):void {
        this.cards.push(this.ItemsMenu.push(c));
    }

    pushCards(cs:Card[]):void {
        for (let c of cs){
            this.cards.push(this.ItemsMenu.push(c));
        }
    }

    getCards():CardMenu[] {
        return [...this.cards];
    }
}

class ItemsMenu extends HTMLElement {
    
    private column:number;
    private ul:HTMLUListElement; 
    private cards:Card[];
    
    constructor() {
        super();
        this.column = 3;
        this.ul = document.createElement('ul');
        this.ul.classList.add('items-menu');
        this.ul.classList.add(`col_${this.column}`);

        this.appendChild(this.ul);
        this.cards = [];

    }

    push(c:Card) {
        this.cards.push(c);        
        let card:CardMenu = <CardMenu>document.createElement('cards-menu');
        this.ul.appendChild(card);
        card.setAttribute('ptitle', c.title);
        card.setAttribute('psrc', c.src);
        card.init((<FilterMenu>this.parentNode).getCategories());
        card.setSummary(c.summary);
        card.setDescription(c.description);
        card.setTags(c.tags);
        return card;
        
    }
}

customElements.define('filter-menu', FilterMenu);
customElements.define('items-menu', ItemsMenu);


