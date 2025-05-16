// Animação suave ao clicar nos links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });


  // Carrossel
  function scrollCarousel(id, direction) {
    const track = document.querySelector(`#${id} .carousel-track`);
    const items = Array.from(track.children);
    const itemWidth = items[0].offsetWidth + 20;
  
    if (direction === 1) {
      // Roda para a direita
      const first = items[0];
      track.appendChild(first.cloneNode(true));
      track.style.transition = 'transform 0.3s ease-in-out';
      track.style.transform = `translateX(-${itemWidth}px)`;
      setTimeout(() => {
        track.style.transition = 'none';
        track.removeChild(first);
        track.style.transform = `translateX(0)`;
      }, 300);
    } else {
      // Roda para a esquerda
      const last = items[items.length - 1];
      track.insertBefore(last.cloneNode(true), items[0]);
      track.style.transition = 'none';
      track.style.transform = `translateX(-${itemWidth}px)`;
      setTimeout(() => {
        track.style.transition = 'transform 0.3s ease-in-out';
        track.style.transform = `translateX(0)`;
        setTimeout(() => {
          track.removeChild(track.children[track.children.length - 1]);
        }, 300);
      }, 10);
    }
  }
  
  // Mostrar carrinho ao rolar
  window.addEventListener('scroll', () => {
    const carrinho = document.getElementById('carrinho');
    const banner = document.querySelector('.banner');
    if (window.scrollY > banner.offsetHeight - 50) {
      carrinho.classList.add('visible');
    } else {
      carrinho.classList.remove('visible');
    }
  });

  const inputQtd = document.getElementById('quantidade');
  const btnCarrinho = document.getElementById('btn-carrinho');
  const precoUnitario = 0.56;

  function atualizarPreco() {
    const quantidade = parseInt(inputQtd.value) || 1;
    const total = (quantidade * precoUnitario).toFixed(2).replace('.', ',');
    btnCarrinho.textContent = `Adicionar ao carrinho - R$ ${total}`;
  }

  // Atualiza ao alterar valor
  inputQtd.addEventListener('input', atualizarPreco);

  // Botões de incremento
  document.querySelectorAll('.incremento').forEach(btn => {
    btn.addEventListener('click', () => {
      const incremento = parseInt(btn.dataset.inc);
      inputQtd.value = parseInt(inputQtd.value) + incremento;
      atualizarPreco();
    });
  });

  // Inicializa o valor ao carregar
  atualizarPreco();
  