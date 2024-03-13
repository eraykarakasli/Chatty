const asyncHandler = require("express-async-handler");
const Quick = require("../models/quickModel");

const quickChat = asyncHandler(async (req, res) => {
    const { userId, content } = req.body;

    // Gelen verilerin doğruluğunu kontrol et
    if (!userId || !content) {
        console.log("UserId veya content parametreleri eksik");
        return res.status(400).json({ message: "UserId ve content gerekli" });
    }

    try {
        // Yeni Quick mesajı oluştur
        const quickMessage = new Quick({
            userId,
            content
        });

        // Veritabanına kaydet
        await quickMessage.save();

        // Başarılı yanıt gönder
        res.status(201).json(quickMessage);
    } catch (error) {
        console.error(`Hata: ${error}`);
        res.status(500).json({ message: "Sunucu hatası" });
    }
});



const deleteQuickChat = asyncHandler(async (req, res) => {
    const { id } = req.body; // ID'yi body'den al

    if (!id) {
        return res.status(400).json({ message: "ID parametresi gerekli" });
    }

    try {
        const result = await Quick.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Mesaj bulunamadı veya zaten silinmiş" });
        }

        res.status(200).json({ message: "Mesaj başarıyla silindi" });
    } catch (error) {
        console.error(`Hata: ${error}`);
        res.status(500).json({ message: "Sunucu hatası" });
    }
});


const getQuickMessages = asyncHandler(async (req, res) => {
    try {
        const quickMessages = await Quick.find({});
        res.json(quickMessages);
    } catch (error) {
        console.error(`Hata: ${error}`);
        res.status(500).json({ message: "Server error" });
    }
});




module.exports = {quickChat, deleteQuickChat, getQuickMessages};
