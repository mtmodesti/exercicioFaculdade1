// Seleciona o elemento onde o conteúdo será exibido
const conteudo = document.getElementById('conteudo');

// Função assíncrona para carregar uma página HTML externa
async function carregarPagina(url) {
  try {
    // Usuário clica na página inicial do site
    if (url === "home") {
      conteudo.innerHTML = `
    <h1>Olá! Seja muito bem-vindo ao meu espaço na web.</h1>
    <p>Aqui você vai conhecer um pouco da minha trajetória, meus projetos e o que me motiva todos os dias.</p>
    <p>Explore as seções no menu acima para saber mais!</p>
  `;
      return;
    }

    const resposta = await fetch(url); // Faz a requisição do arquivo
    if (!resposta.ok) throw new Error('Erro ao carregar a página');

    const html = await resposta.text(); // Converte a resposta para texto
    conteudo.innerHTML = html; // Insere o conteúdo no elemento <main>
  } catch (erro) {
    conteudo.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
    console.error(erro); // Mostra o erro no console
  }
}

document.querySelectorAll('a[data-pagina]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    // Remove a classe 'ativo' de todos os links
    document.querySelectorAll('a[data-pagina]').forEach(l => l.classList.remove('ativo'));

    // Adiciona a classe 'ativo' ao link clicado
    e.target.classList.add('ativo');

    const pagina = e.target.getAttribute('data-pagina');
    carregarPagina(pagina);
  });
});


// Abre/fecha o menu no mobile
const botaoMenu = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');

botaoMenu.addEventListener('click', () => {
  menu.classList.toggle('aberto');
});

// Fecha o menu após clicar em algum link (apenas em mobile)
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    // Só fecha se o menu estiver aberto (útil para telas mobile)
    if (menu.classList.contains('aberto')) {
      menu.classList.remove('aberto');
    }
  });
});