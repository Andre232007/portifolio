import { desafios } from "./desafios.js";
import { projetos } from "./projetos.js";

const navigation = document.querySelector("#navigation");
const backToTopButton = document.querySelector("#backToTopButton");
const toggle = document.querySelector("#sw-checkbox");
const projectsSection = document.querySelector("#projects .wrapper");

const notebook_1 = document.querySelector("#notebook-1");
const notebook_2 = document.querySelector("#notebook-2");
const notebook_2_white = document.querySelector("#notebook-2-white");
const vidro = document.querySelector("#vidro");

window.addEventListener("load", function begin() {
  projetos(projectsSection);
  const desafioBtn = document.querySelector("#desafio");

  desafioBtn.addEventListener("click", () => {
    desafios(projectsSection);
    document
      .querySelector("#backToProjectsBtn")
      .addEventListener("click", begin);
  });
});

window.addEventListener("scroll", onScroll);
onScroll();

window.onload = setTimeout(() => {
  notebook_1.style.opacity = 0;

  notebook_1.style.animation = "none";
  notebook_2.style.animation = "none";
  notebook_2_white.style.animation = "none";
  vidro.style.animation = "none";
}, 4000);

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(knowledge);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  menuElement.classList.remove("active");

  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

openMenu();
function openMenu() {
  const openBtns = document.querySelectorAll(".open");
  openBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.add("menu-expanded");
    });
  });
}

closeMenu();
function closeMenu() {
  const closeBtns = document.querySelectorAll(".close");
  closeBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.remove("menu-expanded");
    });
  });
}

ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
}).reveal(
  `#home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledg header,
  #knowledg .card,
  #contact,
  #contact header`
);

toggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});

document.addEventListener('DOMContentLoaded', () => {
  const reflectionContainer = document.querySelector('.reflection-container');
  const reflectionContent = document.querySelector('.reflection-content');
  const floating3dFrame = document.getElementById('floating-3d-frame');

  if (!reflectionContainer || !reflectionContent || !floating3dFrame) {
    console.error('Elementos do quadro 3D não encontrados. Verifique seu HTML.');
    return; // Sai se os elementos não existirem
  }

  // Define o número de células na grade (10x10 = 100 células)
  const numRows = 10;
  const numCols = 10;

  // Função para gerar as células da grade
  function createGridCells() {
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        const cell = document.createElement('a');
        cell.href = '#'; // Pode ser alterado para um link real se a célula precisar ser clicável
        cell.classList.add('reflection-grid-cell');
        // Calculamos o índice da célula para identificação, se necessário (r*numCols + c + 1)
        cell.classList.add(`reflection-grid-cell-${r * numCols + c + 1}`);

        // Posiciona a célula
        cell.style.top = `${r * 10}%`;
        cell.style.left = `${c * 10}%`;

        // Adiciona os event listeners para o efeito de hover
        cell.addEventListener('mouseenter', () => {
          // Calcula os valores de rotação e translação
          const rotateX = ((r * -5) + 25); // Adaptação da fórmula SCSS original
          const rotateY = ((-25) + (c * 5)); // Adaptação da fórmula SCSS original
          const translateYBefore = (25 - (5 * r)); // Adaptação da fórmula SCSS original

          reflectionContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          // Se você quiser o efeito de translação no ::before, precisaria de um elemento extra
          // ou manipular um atributo de dados no reflectionContent para o CSS usar.
          // Por simplicidade, estamos aplicando apenas a rotação ao content.
          // Se o gradiente precisar se mover, você precisaria de um elemento extra para ele.
        });

        // Adiciona a célula ao container
        reflectionContainer.insertBefore(cell, reflectionContent); // Insere antes do reflection-content
      }
    }

    // Adiciona um evento mouseleave para resetar a transformação quando o mouse sai do container
    reflectionContainer.addEventListener('mouseleave', () => {
      reflectionContent.style.transform = 'rotateX(0deg) rotateY(0deg)';
      // Resetar o ::before aqui também, se aplicável
    });

    // Mostra o quadro 3D após a criação das células
    floating3dFrame.style.display = 'block';
  }

  // Chama a função para criar as células
  createGridCells();
});