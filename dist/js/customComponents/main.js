"use strict";
class CardMenu extends HTMLElement {
    constructor() {
        super();
        this.availablesTags = [];
        this.tags = [];
        this.visible = true;
    }
    init(availablesTags) {
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
    setSummary(s) {
        this.summary = s;
        this.p.innerHTML = s;
    }
    setDescription(d) {
        this.description = d;
    }
    isVisible() {
        return this.visible;
    }
    getTags() {
        return this.tags;
    }
    getTag(t) {
        return this.tags.includes(t);
    }
    setTags(tgs) {
        for (let tg of tgs) {
            if (this.availablesTags.includes(tg))
                this.tags.push(tg);
        }
    }
    toggle(visible) {
        if (typeof visible !== 'undefined') {
            if (!visible) {
                this.visible = false;
                this.classList.add('hidden');
            }
            else {
                this.visible = true;
                this.classList.remove('hidden');
            }
        }
        else {
            this.visible = !this.visible;
            this.classList.toggle('hidden');
        }
    }
}
customElements.define('cards-menu', CardMenu);
let sleep = (t) => new Promise((resolve, reject) => setTimeout(resolve, t));
class FilterMenu extends HTMLElement {
    constructor() {
        super();
        this.categories = [];
        this.actives = [];
        this.ItemsMenu = document.createElement('items-menu');
        this.nav = document.createElement('nav');
        this.nav.classList.add('filter-menu-nav');
        this.appendChild(this.ItemsMenu);
        this.insertBefore(this.nav, this.ItemsMenu);
        this.cards = [];
    }
    toggleFilter(cat, state) {
        let lis = this.getElementsByTagName('li');
        if (typeof state === 'undefined')
            state = (this.actives.indexOf(cat) == -1);
        let p = this.categories.indexOf(cat);
        if (state) {
            lis[p].classList.add('active');
            this.actives.push(cat);
        }
        else {
            lis[p].classList.remove('active');
            this.actives = this.actives.filter(c => c != cat);
        }
    }
    filter(e) {
        let her = e.currentTarget;
        let tag = her.children[0].innerHTML;
        let parent = her.parentElement.parentElement;
        let index = parent.actives.indexOf(tag);
        let state = index === -1;
        parent.toggleFilter(tag, state);
        parent.getCards().forEach(async (card) => {
            card.toggle(parent.actives.map((t) => card.getTag(t)).indexOf(true) !== -1);
            await sleep(500);
        });
    }
    setCategories(c) {
        this.categories = [...c];
        this.actives = [...c];
        this.nav.innerHTML = '';
        for (let i of this.categories) {
            this.pushCategory(i);
        }
    }
    pushCategory(c) {
        let li = document.createElement('li');
        li.classList.add("filter-menu-li");
        let span = document.createElement('span');
        span.innerHTML = c;
        if (this.actives.includes(c))
            li.classList.add('active');
        li.appendChild(span);
        li.addEventListener('click', this.filter);
        this.nav.appendChild(li);
    }
    delCategory(c) {
        let i = this.categories.indexOf(c);
        if (i < 0)
            return false;
        this.categories = this.categories.splice(i, 1);
    }
    getCategories() {
        return [...this.categories];
    }
    sortCategories(f) {
        this.categories = f ? this.categories.sort(f) : this.categories.sort();
    }
    pushCard(c) {
        this.cards.push(this.ItemsMenu.push(c));
    }
    pushCards(cs) {
        for (let c of cs) {
            this.cards.push(this.ItemsMenu.push(c));
        }
    }
    getCards() {
        return [...this.cards];
    }
}
class ItemsMenu extends HTMLElement {
    constructor() {
        super();
        this.column = 3;
        this.ul = document.createElement('ul');
        this.ul.classList.add('items-menu');
        this.ul.classList.add(`col_${this.column}`);
        this.appendChild(this.ul);
        this.cards = [];
    }
    push(c) {
        this.cards.push(c);
        let card = document.createElement('cards-menu');
        this.ul.appendChild(card);
        card.setAttribute('ptitle', c.title);
        card.setAttribute('psrc', c.src);
        card.init(this.parentNode.getCategories());
        card.setSummary(c.summary);
        card.setTags(c.tags);
        return card;
    }
}
customElements.define('filter-menu', FilterMenu);
customElements.define('items-menu', ItemsMenu);
