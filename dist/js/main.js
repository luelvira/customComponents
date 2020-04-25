let categories = ["uno", "dos", "tres", "cuatro", "cinco"];
let mycard = {
    title: 'Prueba 1',
    description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
    summary: "pequeñita descripción de la carta",
    src: "dist/media/img/img1.webp",
    alt: "image of paisage",
    tags: ["uno"]
};
let myCards = [{
        title: 'Prueba 2',
        description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
        summary: "pequeñita descripción de la carta",
        src: "dist/media/img/img2.webp",
        tags: ["dos"]
    },
    {
        title: 'Prueba 3',
        description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
        summary: "pequeñita descripción de la carta",
        src: "dist/media/img/img3.jpg",
        tags: ["tres"]
    }, {
        title: 'Prueba 4',
        description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
        summary: "pequeñita descripción de la carta",
        src: "dist/media/img/img4.jpg",
        tags: ["cuatro"]
    },
    {
        title: 'Prueba 5',
        description: "una pequeña descripción más o menos larga que permita conocer de que va todo esta mierda",
        summary: "pequeñita descripción de la carta",
        src: "dist/media/img/img5.png",
        tags: ["cinco"]
    }
];
let fm = document.getElementsByTagName('filter-menu')[0];
fm.setCategories(categories);
fm.pushCard(mycard);
fm.pushCards(myCards);
