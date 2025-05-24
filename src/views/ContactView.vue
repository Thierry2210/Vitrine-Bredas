<template>
    <div class="container mx-auto p-4">
        <header class="text-center mb-6">
            <div class="flex justify-center mb-4">
                <img src="@/assets/img/IMG-20241117-WA0016.png" alt="Imagem de Matheus Thierry Santos da Silva"
                    class="rounded-full w-32 h-32 object-cover" />
            </div>
            <h1 class="text-3xl font-bold">Entre em contato!</h1>
        </header>

        <form class="contact-form max-w-md mx-auto flex flex-col gap-4"
            action="https://formsubmit.co/info@adrianasaty.com" method="POST">
            <div>
                <label for="email" class="block mb-1">E-mail</label>
                <input type="email" name="email" id="email" required class="w-full border rounded px-3 py-2" />
            </div>
            <div>
                <label for="message" class="block mb-1">Mensagem</label>
                <input type="text" id="message" name="message" required class="w-full border rounded px-3 py-2" />
            </div>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enviar</button>
            <input type="hidden" name="_next" value="https://adrianasaty.github.io/easy-portfolio/thanks.html" />
            <input type="hidden" name="_subject" value="New submission!" />
        </form>
    </div>
</template>