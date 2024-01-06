/* import ProductManager from "../../ProductManager.js";

const socket = io() */

/* const manager = new ProductManager("../../Products.json") */

/* const button = document.querySelector("#button");

socket.on("users_list", (data) => {
    console.log(data);

    const div = document.querySelector(".productList");

    div.innerHTML = `${data.map((i) =>
        `<h2 class="h2">Product ${i.title}</h2>
        <p class="p">price ${i.price} </p>`
    )}`;
    console.log('FUNCIONANDO');
});

button.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");
    const thumbanil = document.querySelector("#thumbanil");
    const code = document.querySelector("#code");
    const stock = document.querySelector("#stock");

    const product = {
        title: title.value,
        price: price.value,
        description: description.value,
        thumbanil: thumbanil.value,
        code: code.value,
        stock: stock.value,
    };

     manager.addProduct(product) 
    console.log(product);
    socket.emit("form_message", product);
}); */