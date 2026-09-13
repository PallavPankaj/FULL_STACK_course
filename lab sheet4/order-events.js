const EventEmitter = require("events").EventEmitter;

const orderEmitter = new EventEmitter();

orderEmitter.on("orderPlaced", (order) => {
    console.log("\n========== ORDER RECEIPT ==========");
    console.log("Order ID :", order.id);
    console.log("Item     :", order.item);
    console.log("Amount   : ₹" + order.amount);
    console.log("===================================");
});

orderEmitter.emit("orderPlaced", { id: 101, item: "Keyboard", amount: 1200 });
orderEmitter.emit("orderPlaced", { id: 102, item: "Mouse", amount: 700 });
orderEmitter.emit("orderPlaced", { id: 103, item: "Headphones", amount: 1800 });
