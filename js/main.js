// Form submission
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const empresa = document.getElementById('empresa').value;
        const telefone = document.getElementById('telefone').value;
        const servico = document.getElementById('servico').value;
        const mensagem = document.getElementById('mensagem').value;
        
        let whatsappMsg = "*Nova Solicitação de Contato*%0A%0A";
        whatsappMsg += `*Nome:* ${nome}%0A`;
        whatsappMsg += `*E-mail:* ${email}%0A`;
        if (empresa) whatsappMsg += `*Empresa:* ${empresa}%0A`;
        if (telefone) whatsappMsg += `*Telefone:* ${telefone}%0A`;
        if (servico) whatsappMsg += `*Serviço:* ${servico}%0A`;
        whatsappMsg += `*Mensagem:* ${mensagem}%0A`;
        
        const whatsappUrl = `https://wa.me/5511920816426?text=${whatsappMsg}`;
        window.open(whatsappUrl, '_blank');
        
        const statusDiv = document.getElementById('formStatus');
        statusDiv.innerHTML = '<div style="background: #10b981; padding: 0.5rem; border-radius: 8px; margin-top: 1rem;">✓ Redirecionando para o WhatsApp...</div>';
        
        setTimeout(() => {
            form.reset();
            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 5000);
        }, 2000);
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 15, 0.98)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
        header.style.padding = '1rem 0';
    }
});
