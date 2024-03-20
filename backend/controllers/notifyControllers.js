const asyncHandler = require("express-async-handler");
const Notify = require("../models/notifyModel");

const createNotify = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Boş bir istek gönderilemez" });
  }

  const { chatName, isGroupChat, _id, createdAt, latestMessage, users } =
    req.body;

  try {
    for (const user of users) {
      if (latestMessage.sender._id !== user._id) {
        const notify = new Notify({
          chatName,
          createdAt,
          isGroupChat,
          latestMessage,
          messageId: _id,
          users: user, // Her bir kullanıcıyı ayrı ayrı gönderin
        });

        await notify.save();
      }
    }

    res.status(201).json({ message: "Bildirimler başarıyla oluşturuldu" });
  } catch (error) {
    console.error(`Hata: ${error}`);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

const deleteNotify = asyncHandler(async (req, res) => {
  const { messageId, userId } = req.body;

  try {
    // Belirli koşullara uygun bildirimleri bul
    const deletedNotify = await Notify.deleteMany({
      messageId: messageId,
      "users._id": userId,
    });

    if (deletedNotify.deletedCount > 0) {
      return res.status(200).json({ message: "Bildirimler başarıyla silindi" });
    } 
  } catch (error) {
    console.error(`Hata: ${error}`);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

const getNotifies = asyncHandler(async (req, res) => {
  try {
    const  userId  = req.params.userId; // req.body'den userId alınır

    // Veritabanında users._id ile gelen userId eşleşen bildirimleri getir
    const notifies = await Notify.find({ "users._id": userId });

    res.json(notifies);
  } catch (error) {
    console.error(`Hata: ${error}`);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});


module.exports = { createNotify, deleteNotify, getNotifies };
