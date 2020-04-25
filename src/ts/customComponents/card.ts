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
	private div:HTMLDivElement;
	private tags:string[];
	private visible:boolean;
	private availablesTags:string[];
	private open:boolean;
	public static activeClass:string = 'my-card-active';
	public static activeBk:string = 'my-background';
	constructor() {
		super();
		this.availablesTags = [];
		this.tags = [];
		this.visible = true;
		this.addEventListener('click', this.openCard)
		this.open = false;

		this.init();


	}

	init(availablesTags?:string[]) {
		
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
			if (this.description) this.div.innerHTML = this.description;
			

			this.appendChild(this.h4);
			this.appendChild(this.img);
			this.appendChild(this.p);
			this.appendChild(this.div);
		} catch (Exception) {
			console.warn("Missing the atributes");
		} 


	}

	setSummary(s:string):void {
		this.summary = s;
		this.p.innerHTML = s;
		
	}
	setDescription(d:string):void {
		this.description = d;
		this.div.innerHTML = d;

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
	openCard(ev:Event){
		if (this.open) return;
	   let bk = this.managerBackground();
	   this.classList.add(CardMenu.activeClass);
	   this.open = true;
	}

	closeCard(e:Event) {
		let activeCard:HTMLCollectionOf<CardMenu> =  <HTMLCollectionOf<CardMenu>>document.getElementsByClassName(CardMenu.activeClass);
		document.getElementsByClassName(CardMenu.activeBk)[0].classList.add('inactive');
		assert(activeCard.length ===1, "Error: there is more than one active card");
		for (var card of activeCard) {
			card.classList.remove(CardMenu.activeClass)
			card.setOpen(false)
		}
	}

	private managerBackground():HTMLDivElement {
	   let bks:HTMLCollectionOf<HTMLDivElement> = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName(CardMenu.activeBk);
	   let bk:HTMLDivElement;
	   if (document.getElementsByClassName(CardMenu.activeBk).length == 0) {
		   bk = document.createElement('div');
		   bk.classList.add(CardMenu.activeBk);
		   document.getElementsByTagName('body')[0].appendChild(bk);
		   bk.addEventListener('click', this.closeCard)
	   } else bk = bks[0];

	   bk.classList.remove('inactive');
	   return bk; 
	}

	public setOpen(state:boolean) {
		this.open = state;
	}
}

customElements.define('cards-menu', CardMenu);
