const socket = io()
/* import ProductManager from "../../ProductManager";

const manager = new ProductManager("./Products.json")
 */
const button = document.querySelector("#button");

socket.on("users_list", (data) => {
    console.log(data);

    const div = document.querySelector(".productList");

    div.innerHTML = `${data.map((i) =>
        `<h2 class="h2">Product ${i.title}</h2>
        <p class="p">price ${i.price} </p>`
    )}`;
});

button.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title");
    const price = document.querySelector("#price");

    const product = {
        title: title.value,
        price: price.value,
    };
    console.log(product);
    socket.emit("form_message", product);
});