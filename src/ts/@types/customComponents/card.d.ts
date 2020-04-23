declare class CardMenu extends HTMLElement {
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
    toggle(visible?: boolean): void;
}
