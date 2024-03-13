const User = require('../models/userModel');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("Admin e-posta veya şifre çevre değişkenleri tanımlanmamış!");
      return;
    }

    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: adminEmail,
        password: adminPassword, 
        pic: "https://slang.net/img/slang/lg/pp_4215.jpg", 
        role: "admin"
      });

      console.log("Admin kullanıcısı başarıyla oluşturuldu.");
    }
  } catch (error) {
    console.error("Admin kullanıcısı oluşturulurken hata:", error);
  }
} 

module.exports = createAdminUser;
