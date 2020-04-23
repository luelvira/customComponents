
let categories:string[] = ["uno", "dos", "tres", "cuatro","cinco"];
let mycard:Card = {
    title: 'Prueba 1',
    description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
    summary: "pequeñita descripción de la carta",
    src: "media/myimg.jpg",
    tags:["dos", "cinco"]
}

let myCards:Card[] = [{
    title: 'Prueba 2',
    description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
    summary: "pequeñita descripción de la carta",
    src: "media/myimg.jpg",
    tags: ["uno", "tres", "cinco"]
},
{
    title: 'Prueba 3',
    description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
    summary: "pequeñita descripción de la carta",
    src: "media/myimg.jpg",
    tags: ["uno", "dos", "cuatro"]
},{
    title: 'Prueba 4',
    description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
    summary: "pequeñita descripción de la carta",
    src: "media/myimg.jpg",
    tags: ["uno", "dow", "cinco"]
},
{
    title: 'Prueba 5',
    description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
    summary: "pequeñita descripción de la carta",
    src: "media/myimg.jpg",
    tags: ["uno",  "cuatro"]
}
]


let fm:FilterMenu = <FilterMenu>document.getElementsByTagName('filter-menu')[0];

fm.setCategories(categories);
fm.pushCard(mycard);
fm.pushCards(myCards);