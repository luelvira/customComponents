interface Card {
    title: string;
    description: string;
    summary: string;
    src: string;
    tags: string[];
}
declare class filterMenu extends HTMLElement {
    private categories;
    private actives;
    private disable;
    private itemsmenu;
    private nav;
    constructor();
    private filter;
    setCategories(c: string[]): void;
    pushCategory(c: string): void;
    delCategory(c: string): boolean;
    sortCategories(f?: (a: string, b: string) => number): void;
    pushCard(c: Card): void;
    pushCards(cs: Card[]): void;
}
declare class itemsMenu extends HTMLElement {
    private column;
    private ul;
    private cards;
    constructor();
    push(c: Card): void;
}
declare class cardMenu extends HTMLElement {
    private psrc;
    private ptitle;
    private description;
    private summary;
    private h4;
    private img;
    private p;
    private tags;
    constructor();
    init(): void;
    setSummary(s: string): void;
    setDescription(d: string): void;
}
declare let categories: string[];
declare let mycard: Card;
declare let myCards: Card[];
declare let fm: filterMenu;
