const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const chats = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const quickRoutes = require("./routes/quickRoutes");
const notifyRoutes = require("./routes/notifyRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const createAdminUser = require("./config/createAdminUser");
 
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json()); 

createAdminUser();


app.get("/", (req, res) => {
  res.send("API is runnning");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/quick", quickRoutes);
app.use("/api/notify", notifyRoutes);    


/////////////

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname);
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 15} });

app.post('/upload', upload.single('file'), (req, res, next) => {
  // Dosya başarıyla yüklendiyse
  if (req.file) {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    return res.status(200).json({ message: 'Dosya başarıyla yüklendi', file: { fileName: req.file.filename, fileUrl: fileUrl } });
  }
  
  // Dosya yüklenmediyse (Multer hata oluşturmadıysa)
  return res.status(400).send({ message: 'Dosya yüklenemedi' });
}, (error, req, res, next) => {
  // Multer hata işleme
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'Dosya çok büyük. Maksimum boyut sınırını aştınız.' });
  }
  
  // Diğer hatalar
  console.error("Dosya yükleme sırasında hata oluştu: ", error);
  return res.status(500).send({ message: 'Dosya yüklenirken bir hata oluştu.' });
});

////////////////
app.use('/uploads', express.static('uploads'));
app.use(notFound);
app.use(errorHandler);

const PORT = 5000;
const server = app.listen(
  PORT,
  console.log(`Server is running on port: ${PORT}`.yellow.bold)
  );
  
  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: ["http://www.arifburakcavas.com.tr", "http://localhost:5173","http://localhost:4173","http://2.59.117.152:4173"],
    },
  });
  
  io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    if (!userData || !userData._id) {
      console.log("Invalid user data");
      return;
    } 
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
  // Dosya bilgisi geldiğinde işleme
  socket.on('sendFile', (fileInfo) => {
    // Dosya bilgisini odadaki diğer kullanıcılara gönder
    io.to('some room').emit('fileReceived', fileInfo);
});
////
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    if (!newMessageRecieved || !newMessageRecieved.chat || !newMessageRecieved.chat.users) {
      console.log("Geçersiz mesaj veya sohbet alındı");
      return;
    }
  
    newMessageRecieved.chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      
      socket.to(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  

  // socket.off("setup", () => {
  //   console.log("USER DISCONNECTED");
  //   socket.leave(userData._id);
  // });
});
