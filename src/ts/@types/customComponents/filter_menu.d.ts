interface Card {
    title: string;
    description: string;
    summary: string;
    src: string;
    tags: string[];
}
declare let sleep: (t: number) => Promise<unknown>;
declare class FilterMenu extends HTMLElement {
    private categories;
    private actives;
    private ItemsMenu;
    private nav;
    private cards;
    constructor();
    private filter;
    setCategories(c: string[]): void;
    pushCategory(c: string): void;
    delCategory(c: string): boolean;
    getCategories(): string[];
    sortCategories(f?: (a: string, b: string) => number): void;
    pushCard(c: Card): void;
    pushCards(cs: Card[]): void;
    getCards(): CardMenu[];
}
declare class ItemsMenu extends HTMLElement {
    private column;
    private ul;
    private cards;
    constructor();
    push(c: Card): CardMenu;
}
