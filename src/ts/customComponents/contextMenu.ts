interface MenuAction {
	title:string;
	action:Function;
	context:HTMLElement;
	especialEvent?:string;
}
class ContextMenu extends HTMLElement {
	private actions:MenuAction[];
	private ul:HTMLUListElement;
	private position:number[];
	constructor() {
		super();
	}

	init(actions:MenuAction[]) {
		this.ul = document.createElement('ul');
		this.ul.classList.add('ul');
		this.appendChild(this.ul);
		if (!this.actions) this.actions = [];
		for (let action of actions)
			this.setAction(action);
	}
	setAction(action:MenuAction) {
		let li:HTMLLIElement = document.createElement("li");
		li.innerText = action.title;
		li.classList.add('li');
		li.addEventListener("click", e => action.action.call(action.context, e));
		this.actions.push(action);
		this.ul.appendChild(li);
		
	}
	public setPosition(x:number, y:number) {
		this.position = [x, y];
		this.style.left = x+50+ 'px';
		this.style.top = y+10+'px';
		
	}
}

customElements.define('context-menu', ContextMenu);
