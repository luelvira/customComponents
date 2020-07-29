"use strict";
class CardMenu extends HTMLElement {
    constructor() {
        super();
        this.availablesTags = [];
        this.tags = [];
        this.visible = true;
        this.addEventListener('click', this.openCard);
        this.open = false;
        this.init();
    }
    init(availablesTags) {
        try {
            this.availablesTags = availablesTags ? [...availablesTags] : this.getAttribute("tags").split(/[, ]/);
            this.psrc = this.getAttribute('psrc');
            this.ptitle = this.getAttribute('ptitle');
            this.h4 = document.createElement('h4');
            this.h4.innerHTML = this.ptitle;
            this.img = document.createElement('img');
            this.img.setAttribute('src', this.psrc);
            this.p = document.createElement('p');
            this.p.innerHTML = this.summary;
            this.div = document.createElement('div');
            if (this.description)
                this.div.innerHTML = this.description;
            this.appendChild(this.h4);
            this.appendChild(this.img);
            this.appendChild(this.p);
            this.appendChild(this.div);
        }
        catch (Exception) {
            console.warn("Missing the atributes");
        }
    }
    setSummary(s) {
        this.summary = s;
        this.p.innerHTML = s;
    }
    setDescription(d) {
        this.description = d;
        this.div.innerHTML = d;
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
    openCard(ev) {
        if (this.open)
            return;
        let bk = this.managerBackground();
        this.classList.add(CardMenu.activeClass);
        this.open = true;
    }
    closeCard(e) {
        let activeCard = document.getElementsByClassName(CardMenu.activeClass);
        document.getElementsByClassName(CardMenu.activeBk)[0].classList.add('inactive');
        assert(activeCard.length === 1, "Error: there is more than one active card");
        for (var card of activeCard) {
            card.classList.remove(CardMenu.activeClass);
            card.setOpen(false);
        }
    }
    managerBackground() {
        let bks = document.getElementsByClassName(CardMenu.activeBk);
        let bk;
        if (document.getElementsByClassName(CardMenu.activeBk).length == 0) {
            bk = document.createElement('div');
            bk.classList.add(CardMenu.activeBk);
            document.getElementsByTagName('body')[0].appendChild(bk);
            bk.addEventListener('click', this.closeCard);
        }
        else
            bk = bks[0];
        bk.classList.remove('inactive');
        return bk;
    }
    setOpen(state) {
        this.open = state;
    }
}
CardMenu.activeClass = 'my-card-active';
CardMenu.activeBk = 'my-background';
customElements.define('cards-menu', CardMenu);
class ContextMenu extends HTMLElement {
    constructor() {
        super();
    }
    init(actions) {
        this.ul = document.createElement('ul');
        this.ul.classList.add('ul');
        this.appendChild(this.ul);
        if (!this.actions)
            this.actions = [];
        for (let action of actions)
            this.setAction(action);
    }
    setAction(action) {
        let li = document.createElement("li");
        li.innerText = action.title;
        li.classList.add('li');
        li.addEventListener("click", e => action.action.call(action.context, e));
        this.actions.push(action);
        this.ul.appendChild(li);
    }
    setPosition(x, y) {
        this.position = [x, y];
        this.style.left = x + 50 + 'px';
        this.style.top = y + 10 + 'px';
    }
}
customElements.define('context-menu', ContextMenu);
class ListItems extends HTMLElement {
    constructor() {
        super();
    }
    init(attrs) {
        let startContextMenu = (e) => (("which" in e && e.which === 3) || ("button" in e && e.button === 2)) ? this.startContextMenu.call(this, e) : null;
        this.title = attrs[0];
        let h1 = document.createElement('h2');
        h1.classList.add("title-primary");
        h1.innerText = this.title;
        this.appendChild(h1);
        this.addEventListener("click", startContextMenu);
        this.addEventListener("contextmenu", startContextMenu);
    }
    startContextMenu(e) {
        e.preventDefault();
        let contextMenu = document.createElement('context-menu');
        this.appendChild(contextMenu);
        contextMenu.init([
            { "title": "Cambiar titulo", "action": this.changeTitle, context: this },
            { "title": "Añadir pelicula", "action": this.addFilm, context: this },
            { "title": "Ordenar por", "action": this.displayOrder, context: this, "especialEvent": "hover" }
        ]);
        contextMenu.setPosition(e.pageX, e.pageY);
    }
    setTitle(newTitle) {
        this.getElementsByTagName('h2')[0].innerText = newTitle;
        this.title = newTitle;
    }
    changeTitle(e) {
        this.setTitle(prompt("Introduzca el nuevo titulo"));
    }
    addFilm() {
        console.error("This method is not implement");
    }
    displayOrder() {
        console.error("This method is not implement");
    }
}
class Board extends HTMLElement {
    constructor() {
        super();
        let setAddPanel = (e) => this.addPanel.call(this, e);
        let changeValue = (e) => this.changeValue.call(this, e);
        let changeInputValue = (e) => this.changeInputValue.call(this, e);
        let wrapper = document.createElement('div');
        this.container = document.createElement('div');
        this.container.classList.add('container');
        wrapper.classList.add('wrap');
        let options = document.createElement('div');
        options.classList.add('options');
        wrapper.appendChild(this.container);
        this.title = this._getAttribute('title');
        this.maxColumn = parseInt(this._getAttribute('column')) || 3;
        this.baseClass = `col_${this.maxColumn}`;
        this.container.classList.add(`col_${this.maxColumn}`);
        let h1 = document.createElement('h1');
        h1.classList.add('title-primary');
        h1.innerText = this.title;
        this.appendChild(h1);
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        div1.classList.add('bar');
        div2.classList.add('bar-vertical');
        this.button = document.createElement('button');
        this.button.appendChild(div1);
        this.button.appendChild(div2);
        this.button.classList.add('add-item');
        this.setMaxColumn = document.createElement('div');
        this.setMaxColumn.classList.add('maxColumn');
        let lessButton = document.createElement('button');
        lessButton.innerText = "-";
        lessButton.setAttribute('id', 'less');
        lessButton.addEventListener('click', changeValue);
        let moreButton = document.createElement('button');
        moreButton.innerText = "+";
        moreButton.setAttribute('id', 'more');
        moreButton.addEventListener('click', changeValue);
        let input = document.createElement('input');
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
    _getAttribute(n) {
        if (this.hasAttribute(n))
            return this.getAttribute(n);
        else
            return "";
    }
    addPanel(event) {
        let name = prompt("Cómo se llama la siguiente lista");
        if (!name)
            return;
        let list = document.createElement('list-items');
        this.container.appendChild(list);
        list.init([name]);
    }
    changeValue(event) {
        let elem = event.target;
        if (elem.hasAttribute('id'))
            if (elem.getAttribute('id') === "more")
                this.setValue(this.maxColumn + 1);
            else
                this.setValue(this.maxColumn - 1);
    }
    changeInputValue(event) {
        let elem = event.target;
        this.setValue(parseInt(elem.value));
    }
    setValue(n) {
        if (n == NaN)
            n = 3;
        else if (n > 8)
            n = 8;
        this.container.classList.remove(`col_${this.maxColumn}`);
        this.maxColumn = n;
        this.setMaxColumn.getElementsByTagName('input')[0].value = this.maxColumn.toString();
        this.container.classList.add(`col_${this.maxColumn}`);
    }
}
customElements.define('board-element', Board);
customElements.define('list-items', ListItems);
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
        if (!her)
            return;
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
        return true;
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
        card.setDescription(c.description);
        card.setTags(c.tags);
        return card;
    }
    setColumn(n) {
        if (n > 0 && n <= 8) {
            this.ul.classList.remove(`col_${this.column}`);
            this.column = n;
            this.ul.classList.add(`col_${this.column}`);
        }
    }
}
customElements.define('filter-menu', FilterMenu);
customElements.define('items-menu', ItemsMenu);
let sleep = (t) => new Promise((resolve, reject) => setTimeout(resolve, t));
function assert(cond, errorMessage) {
    if (!cond)
        throw errorMessage;
}
