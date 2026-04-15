document.addEventListener("DOMContentLoaded", function () {

    const numero = "5521876786789"; 

    
    document.querySelectorAll(".btn-whatsapp, .btn-primary").forEach(btn => {
        btn.addEventListener("click", function () {
            const msg = "Ola, quero um orcamento";
            window.open(`https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(msg)}`, "_blank");
        });
    });

   
    const btnEnviar = document.querySelector(".btn-submit");

    if (btnEnviar) {
        btnEnviar.addEventListener("click", function () {

            const nome = document.querySelector('input[placeholder="Seu nome"]').value;
            const email = document.querySelector('input[type="email"]').value;
            const telefone = document.querySelector('input[type="tel"]').value;
            const empresa = document.querySelector('input[placeholder="Nome da empresa"]').value;
            const mensagem = document.querySelector("textarea").value;

            const texto = `Olá, quero um orçamento:

👤 Nome: ${nome}
📧 Email: ${email}
📱 WhatsApp: ${telefone}
🏢 Empresa: ${empresa}

📝 Mensagem:
${mensagem}`;

            window.open(`https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(texto)}`, "_blank");
        });
    }

});



document.addEventListener("DOMContentLoaded", function () {

    const numero = "5521768886868"; 

    const chatFloat = document.querySelector(".chat-float");

    if (chatFloat) {
        chatFloat.addEventListener("click", function () {
            window.open(
                `https://api.whatsapp.com/send?phone=${numero}&text=Ola%20quero%20um%20orcamento`,
                "_blank"
            );
        });
    }

});