interface Card {
    title: string;
    description: string;
    summary: string;
    src: string;
    tags: string[];
}
declare function sleep(t: number): Promise<unknown>;
declare class filterMenu extends HTMLElement {
    private categories;
    private actives;
    private itemsmenu;
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
    getCards(): cardMenu[];
}
declare class itemsMenu extends HTMLElement {
    private column;
    private ul;
    private cards;
    constructor();
    push(c: Card): cardMenu;
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
    private visible;
    private availablesTags;
    constructor();
    init(availablesTags: string[]): void;
    setSummary(s: string): void;
    setDescription(d: string): void;
    isVisible(): boolean;
    getTags(): string[];
    getTag(t: string): boolean;
    setTags(tgs: string[]): void;
    toggle(visible?: boolean): Promise<void>;
}
