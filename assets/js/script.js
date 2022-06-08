window.addEventListener("DOMContentLoaded", function (e) {
    const orderButtons = document.querySelectorAll("button[data-order]");
    orderButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            const button = e.currentTarget;
            const container = button.parentNode;
            const order = {
                id: button.getAttribute("data-order"),
                title: container.querySelector(".title").innerText,
                price: container.querySelector(".price").innerText,
                desc: container.querySelector(".desc").innerText,
            };
            localStorage.setItem("order", JSON.stringify(order));
            const url = window.location.href.replace("pies.html", "order.html");
            window.location.href = url;
        });
    });
});
window.addEventListener("DOMContentLoaded", function (e) {
    let locationBox = document.getElementById("location");
    let location = {
        latitude: "unknown",
        longitude: "unknown",
    };
    window.navigator.geolocation.getCurrentPosition(
        function (position) {
            location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            locationBox.value = JSON.stringify(location);
            console.log(location);
        },
        function (error) {
            locationBox.value = JSON.stringify(location);
        }
    );
    const order = localStorage.getItem("order");
    if (order) {
        const orderPie = JSON.parse(order);
        const orderInput = document.querySelector("#order-pie");
        orderInput.value = order;
        const pie = document.querySelector(".pie");
        const title = pie.querySelector(".title");
        const price = pie.querySelector(".price");
        const desc = pie.querySelector(".desc");

        title.innerText = orderPie.title;
        price.innerText = orderPie.price;
        desc.innerText = orderPie.desc;
        const img = pie.querySelector("img");
        img.setAttribute("src", `assets/images/${orderPie.id}.jpg`);
    }
});
