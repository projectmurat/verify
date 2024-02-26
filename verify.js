// verify.js

// URL'den token'i al
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const token = urlParams.get('token');

// Sunucuya doğrulama isteği gönder ve sonucu ekrana yazdır
if (token) {
    fetch(`http://localhost:3000/verify?token=${token}`)
        .then(response => response.json())
        .then(data => {
            const verificationStatus = document.getElementById('verification-status');
            if (data.success) {
                verificationStatus.textContent = 'Email doğrulandı. Artık giriş yapabilirsiniz.';
            } else {
                verificationStatus.textContent = 'Email doğrulanamadı. Lütfen tekrar deneyin.';
            }
        })
        .catch(error => {
            console.error('Doğrulama hatası:', error);
            const verificationStatus = document.getElementById('verification-status');
            verificationStatus.textContent = 'Doğrulama sırasında bir hata oluştu. Lütfen tekrar deneyin.';
        });
} else {
    console.error('Token bulunamadı.');
    const verificationStatus = document.getElementById('verification-status');
    verificationStatus.textContent = 'Doğrulama için gerekli bilgi bulunamadı.';
}
