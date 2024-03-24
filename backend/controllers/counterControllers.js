const asyncHandler = require("express-async-handler");
const Counter = require("../models/counterModel");


const createCounter = asyncHandler(async (req, res) => {
  const { userId, counterValue } = req.body;

  try {
    let counter = await Counter.findOne({ userId });

    if (counter) {
      // Counter zaten varsa güncelle
      counter.counter = counterValue;
    } else {
      // Yeni bir counter oluştur
      counter = new Counter({
        userId,
        counter: counterValue,
      });
    }

    // Veritabanına kaydet
    await counter.save();

    res.status(201).json({ message: "Counter başarıyla oluşturuldu" });
  } catch (error) {
    console.error(`Hata: ${error}`);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// Belirli bir userId'ye ait counter'ı getirme
const getCounterByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const counter = await Counter.findOne({ userId });

    if (!counter) {
      return res.status(404).json({ message: "Counter bulunamadı" });
    }

    res.json(counter);
  } catch (error) {
    console.error(`Hata: ${error}`);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = { createCounter, getCounterByUserId };
