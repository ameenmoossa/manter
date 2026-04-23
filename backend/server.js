const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("updateValue", (data) => {
    console.log("Value updated manually:", data);
    io.emit("valueUpdated", data);
  });

  // Faster simulation: broadcast random updates every 2 seconds to make it feel "live"
  const autoUpdateInterval = setInterval(() => {
    const types = ['sales', 'revenue', 'inventory', 'financial', 'comparative'];
    const type = types[Math.floor(Math.random() * types.length)];
    const randomVal = () => Math.floor(Math.random() * 5000) + 100;
    const randomPercent = () => (Math.random() * 50).toFixed(2) + '%';
    
    let value;
    if (type === 'sales') {
      value = { 
        today: randomVal(), 
        yesterday: randomVal(),
        thisMonth: Math.floor(Math.random() * 1000000),
        lastMonth: Math.floor(Math.random() * 1000000)
      };
    } else if (type === 'revenue') {
      value = { 
        totalRevenue: randomVal(),
        netProfit: randomVal() / 2,
        totalOrder: Math.floor(Math.random() * 1000),
        avgOrderValue: Math.floor(Math.random() * 1000)
      };
    } else if (type === 'financial') {
      value = {
        cashFlow: randomVal(),
        pendingPayment: randomVal(),
        expenses: randomVal()
      };
    } else if (type === 'comparative') {
      value = {
        todayDelta: randomPercent(),
        weekDelta: randomPercent(),
        monthDelta: randomPercent()
      };
    } else {
      value = { 
        stockLevel: Math.floor(Math.random() * 100),
        nearReorder: Math.floor(Math.random() * 50),
        outOfStock: Math.floor(Math.random() * 30)
      };
    }

    io.emit("valueUpdated", { type, value });
  }, 2000);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    clearInterval(autoUpdateInterval);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
