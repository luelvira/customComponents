let sleep = (t:number) =>new Promise((resolve, reject) => setTimeout(resolve, t));
function assert(cond:boolean, errorMessage: string) {
	if (!cond) throw errorMessage;
	
}