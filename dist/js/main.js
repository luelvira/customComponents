let categories = ["uno", "dos", "tres", "cuatro", "cinco"];
let mycard = {
    title: 'Prueba 1',
    description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
    summary: "pequeñita descripción de la carta",
    src: "media/myimg.jpg",
    tags: ["uno"]
};
let myCards = [{
        title: 'Prueba 2',
        description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
        summary: "pequeñita descripción de la carta",
        src: "media/myimg.jpg",
        tags: ["dos"]
    },
    {
        title: 'Prueba 3',
        description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
        summary: "pequeñita descripción de la carta",
        src: "media/myimg.jpg",
        tags: ["tres"]
    }, {
        title: 'Prueba 4',
        description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
        summary: "pequeñita descripción de la carta",
        src: "media/myimg.jpg",
        tags: ["cuatro"]
    },
    {
        title: 'Prueba 5',
        description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
        summary: "pequeñita descripción de la carta",
        src: "media/myimg.jpg",
        tags: ["cinco"]
    }
];
let fm = document.getElementsByTagName('filter-menu')[0];
fm.setCategories(categories);
fm.pushCard(mycard);
fm.pushCards(myCards);
