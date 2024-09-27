document.addEventListener("DOMContentLoaded", () => {
  // Animação de fade-in para o cabeçalho
  const header = document.querySelector("header");
  header.classList.add("fade-in");

  // Animação de scroll para as seções
  const sections = document.querySelectorAll("section");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }
  }, options);

  for (const section of sections) {
    observer.observe(section);
  }

  // Scroll suave para links internos
  for (const anchor of document.querySelectorAll('a[href^="#"]')) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  // Animação de digitação para o título
  const titulo = document.querySelector("h1");
  const texto = titulo.textContent;
  titulo.textContent = "";
  let index = 0;

  function digitarTitulo() {
    if (index < texto.length) {
      titulo.textContent += texto.charAt(index);
      index++;
      setTimeout(digitarTitulo, 100);
    }
  }

  digitarTitulo();

  // Animação para os links sociais
  const socialLinks = document.querySelectorAll(".social-links a");
  for (const link of socialLinks) {
    link.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
  }

  // Adicionar efeito de clique aos links sociais
  for (const link of socialLinks) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remover a classe 'clicked' de todos os links
      for (const l of socialLinks) {
        l.classList.remove("clicked");
      }

      // Adicionar a classe 'clicked' ao link clicado
      this.classList.add("clicked");

      // Remover a classe após 300ms para criar um efeito temporário
      setTimeout(() => {
        this.classList.remove("clicked");
      }, 300);

      // Abrir o link em uma nova aba após o efeito
      setTimeout(() => {
        window.open(this.href, "_blank");
      }, 300);
    });
  }

  // Animação para os projetos
  const projetos = document.querySelectorAll(".projeto");
  projetos.forEach((projeto, index) => {
    projeto.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
  });

  // Função para aplicar o tema
  function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }

  // Função para alternar o tema
  function toggleTheme() {
    const currentTheme = document.body.className;
    const newTheme =
      currentTheme === "light-theme" ? "dark-theme" : "light-theme";
    applyTheme(newTheme);
  }

  // Detectar preferência do sistema e aplicar tema inicial
  function setInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches) {
      applyTheme("dark-theme");
    } else {
      applyTheme("light-theme");
    }
  }

  // Aplicar tema inicial
  setInitialTheme();

  // Adicionar evento de clique ao botão de alternar tema
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", toggleTheme);

  // Observar mudanças na preferência de cor do sistema
  if (window.matchMedia) {
    window.matchMedia?.("(prefers-color-scheme: dark)")?.addListener((e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark-theme" : "light-theme");
      }
    });
  }

  // Animação para a seção "Sobre Mim"
  const sobreMimSection = document.getElementById("sobre-mim");
  const sobreMimObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          sobreMimSection.classList.add("visible");
          sobreMimObserver.unobserve(sobreMimSection);
        }
      }
    },
    { threshold: 0.1 }
  );

  sobreMimObserver.observe(sobreMimSection);
});
