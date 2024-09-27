document.addEventListener("DOMContentLoaded", () => {
  console.log("Página Sobre Mim carregada com sucesso!");

  // Implementar scroll reveal
  ScrollReveal().reveal(".reveal", {
    delay: 200,
    distance: "50px",
    duration: 1000,
    easing: "ease-in-out",
    origin: "bottom",
    reset: true,
  });

  // Adicionar classe active aos elementos quando estiverem visíveis
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    }
  });

  for (const el of document.querySelectorAll(".reveal")) {
    observer.observe(el);
  }

  // Adicionar efeito de parallax ao scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    document.querySelector(".profile-photo").style.transform = `translateY(${
      scrollPosition * 0.1
    }px)`;
  });

  // Adicionar efeito de mudança de cor no header ao scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    } else {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("Página Sobre Mim carregada com sucesso!");

  // Implementar scroll reveal
  ScrollReveal().reveal(".reveal", {
    delay: 200,
    distance: "50px",
    duration: 1000,
    easing: "ease-in-out",
    origin: "bottom",
    reset: true,
  });

  // Adicionar classe active aos elementos quando estiverem visíveis
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    }
  });

  for (const el of document.querySelectorAll(".reveal")) {
    observer.observe(el);
  }

  // Adicionar efeito de parallax ao scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    document.querySelector(".profile-photo").style.transform = `translateY(${
      scrollPosition * 0.1
    }px)`;
  });

  // Adicionar efeito de mudança de cor no header ao scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    } else {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }
  });
});

// TEMAS
function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.style.setProperty("--bg-color", "#ffffff");
    document.documentElement.style.setProperty("--text-color", "#000000");
  } else {
    document.documentElement.style.setProperty("--bg-color", "#000000");
    document.documentElement.style.setProperty("--text-color", "#ffffff");
  }
}

// Detecta a preferência inicial
if (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

// Detecta alterações na preferência do sistema
window
  .matchMedia?.("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    applyTheme(event.matches ? "dark" : "light");
  });

// Função para definir o tema
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

// Função para alternar o tema
function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "light-theme";
  const newTheme =
    currentTheme === "light-theme" ? "dark-theme" : "light-theme";

  document.body.classList.remove(currentTheme);
  document.body.classList.add(newTheme);
  localStorage.setItem("theme", newTheme);

  // Animação do ícone
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.classList.add("rotate");
  setTimeout(() => {
    themeToggle.classList.remove("rotate");
  }, 300);

  // Atualizar ícone
  const moonIcon = themeToggle.querySelector(".fa-moon");
  const sunIcon = themeToggle.querySelector(".fa-sun");
  if (newTheme === "dark-theme") {
    moonIcon.style.display = "none";
    sunIcon.style.display = "inline-block";
  } else {
    moonIcon.style.display = "inline-block";
    sunIcon.style.display = "none";
  }
}

// Aplicar o tema salvo ou o tema padrão (light)
const savedTheme = localStorage.getItem("theme") || "light-theme";
document.body.classList.add(savedTheme);

// Configurar o ícone inicial
const themeToggle = document.getElementById("theme-toggle");
const moonIcon = themeToggle.querySelector(".fa-moon");
const sunIcon = themeToggle.querySelector(".fa-sun");
if (savedTheme === "dark-theme") {
  moonIcon.style.display = "none";
  sunIcon.style.display = "inline-block";
} else {
  moonIcon.style.display = "inline-block";
  sunIcon.style.display = "none";
}

// Adicionar evento de clique ao botão de alternar tema
themeToggle.addEventListener("click", toggleTheme);

// Observar mudanças na preferência de cor do sistema
if (window.matchMedia) {
  window.matchMedia?.("(prefers-color-scheme: dark)").addListener((e) => {
    if (
      localStorage.getItem("theme") === "system" ||
      !localStorage.getItem("theme")
    ) {
      if (e.matches) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
    }
  });
}
