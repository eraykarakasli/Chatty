// authService.js
import axios from 'axios';

const logout = async () => {
  try {
    // Backend'e çıkış isteği gönder
    const response = await axios.get('http://localhost:4000/logout');

    // Token'ı ve kullanıcı bilgilerini sıfırla
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return response.data;
  } catch (error) {
    console.error('Çıkış işlemi sırasında bir hata oluştu:', error);
    throw error; // Hata durumunda tekrar fırlat
  }
};

export default { logout };
