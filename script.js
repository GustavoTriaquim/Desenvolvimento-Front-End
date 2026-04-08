const movieGrid = document.getElementById("movieGrid");
const statusMessage = document.getElementById("statusMessage");
const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");
const featuredButton = document.getElementById("featuredButton");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");
const movieModal = document.getElementById("movieModal");
const modalBody = document.getElementById("modalBody");
const closeModalButton = document.getElementById("closeModalButton");

let featuredOnly = false;

const allMovies = [
  {
    id: 1,
    title: "Interestelar",
    genre: "Ficção científica",
    year: 2014,
    duration: "169 min",
    rating: 8.7,
    cover:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    description:
      "Após ver a Terra consumindo boa parte de suas reservas naturais, um grupo de astronatuas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie.",
  },
  {
    id: 2,
    title: "Vingadores: Ultimato",
    genre: "Ação",
    year: 2019,
    duration: "181 min",
    rating: 8.4,
    cover:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Em Vingadores: Ultimato, após Thanos eliminar metade das criaturas vivas em Vingadores: Guerra Infinita, os heróis precisam lidar com a dor da perda de amigos e seus entes queridos.",
  },
  {
    id: 3,
    title: "It: A coisa",
    genre: "Terror",
    year: 2017,
    duration: "135 min",
    rating: 7.3,
    cover:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
    description:
      "Um grupo de crianças se une para investigar o misterioso desaparecimento de vários jovens em sua cidade. Eles descobrem que o culpado é Pennywise, um palhaço curel que se alimenta de seus medos e cuja violência teve origem há vários séculos.",
  },
  {
    id: 4,
    title: "A Viagem de Chihiro",
    genre: "Fantasia",
    year: 2001,
    duration: "125 min",
    rating: 8.6,
    featured: false,
    cover:
      "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=1200&q=80",
    description:
      "Chihiro é uma garota de 10 anos que acredita que todo o universo deve atender aos seus caprichos. Ao descobrir que vai se mudar, ela fica furiosa. Na viagem, Chihiro percebe que seu pai se perdeu no caminho para a nova cidade, indo parar defronte um túnel aparentemente sem fim, guardado por uma estátua. É o início da jornada de Chihiro por um mundo fantasma, povoado por seres fantásticos, no qual humanos não são bem-vindos.",
  },
  {
    id: 5,
    title: "Whiplash",
    genre: "Drama",
    year: 2014,
    duration: "107 min",
    rating: 8.5,
    featured: false,
    cover:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
    description:
      "Andrew sonha em ser o melhor baterista de sua geração. Ele chama a atenção do impiedoso mestre do jazz Terence Fletcher, que ultrapassa os limites e transforma o seu sonho em uma obsessão, colocando em risco a saúde física e mental do jovem músico.",
  },
  {
    id: 6,
    title: "Homem-Aranha no Aranhaverso",
    genre: "Animação",
    year: 2018,
    duration: "117 min",
    rating: 8.4,
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=1200&q=80",
    description:
      "Miles Morales, um adolescnete do Brooklyn que ganha superpoderes após ser picado por uma aranha radioativa. Após a morte do Peter Parker de seu universo, Mileas precisa assumir o manto. Ele se une a outras versões do herói vindas de multiversos para impedir o Rei do Crime.",
  },
];

function populateGenres(movies) {
  const genres = [...new Set(movies.map((movie) => movie.genre))].sort();
  genreSelect.innerHTML = '<option value="">Todos</option>';

  for (const genre of genres) {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  }
}

function renderMovies(movies) {
  movieGrid.innerHTML = "";

  if (movies.length === 0) {
    movieGrid.innerHTML = '<p class="empty-state">Nenhum filme encontrado.</p>';
    return;
  }

  for (const movie of movies) {
    const article = document.createElement("article");
    article.className = "movie-card";
    article.innerHTML = `
      <img src="${movie.cover}" alt="Capa do filme ${movie.title}" />
      <div class="movie-card-content">
        <span class="tag">${movie.genre}</span>
        <h3>${movie.title}</h3>
        <div class="movie-meta">
          <span>Ano: ${movie.year}</span>
          <span>Duração: ${movie.duration}</span>
          <span>Nota: ${movie.rating}</span>
        </div>
        <p class="movie-description>${movie.description}"</p>
        <button class="button primary details-button" data-id="${movie.id}">Ver detalhes</button>
      </div>
    `;
    movieGrid.appendChild(article);
  }

  document.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", () =>
      openMovieDetails(Number(button.dataset.id)),
    );
  });
}

function applyFilters() {
  const search = searchInput.value.trim().toLowerCase();
  const selectedGenre = genreSelect.value;
  let filtered = [...allMovies];

  if (search) {
    filtered = filtered.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(search) ||
        movie.genre.toLowerCase().includes(search) ||
        movie.description.toLowerCase().includes(search)
      );
    });
  }

  if (selectedGenre) {
    filtered = filtered.filter((movie) => movie.genre === selectedGenre);
  }

  if (featuredOnly) {
    filtered = filtered.filter((movie) => movie.featured === true);
  }

  renderMovies(filtered);
  statusMessage.textContent = `${filtered.length} filme(s) cencontrado(s).`;
}

function openMovieDetails(movieId) {
  const movie = allMovies.find((item) => item.id === movieId);
  if (!movie) return;
  console.log("Abrir modal");

  modalBody.innerHTML = `
    <img class="modal-image" src="${movie.cover}" alt="Capa do filme ${movie.title}" />
    <div class="modal-text">
      <span class="tag">${movie.genre}</span>
      <h3>${movie.title}</h3>
      <p class="movie-meta">
        <span>Ano: ${movie.year}</span>
        <span>Duração: ${movie.curation}</span>
        <span>Nota: ${movie.rating}</span>
      </p>
      <p>${movie.description}</p>
    </div>
  `;

  movieModal.classList.remove("hidden");
  movieModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  movieModal.classList.add("hidden");
  movieModal.setAttribute("aria-hidden", "true");
}

function clearErrors() {
  document.querySelectorAll(".field-error").forEach((item) => {
    item.textContent = "";
  });
  formFeedback.textContent = "";
  formFeedback.className = "form-feedback";
}

function validateForm(data) {
  const errors = {};
  if (data.name.trim().length < 3) {
    errors.name = "Informe um nome com pelo menos 3 caracteres.";
  }
  if (!data.email.includes("@") || !data.email.includes(".")) {
    errors.email = "Informe um e-mail válido.";
  }

  if (data.movie.trim().length === 0) {
    errors.movie = "Informe um filme de interesse.";
  }

  if (data.message.trim().length < 10) {
    errors.message = "A mensagem deve ter pelo menos 10 caracteres.";
  }

  return errors;
}

function showErrors(errors) {
  for (const [field, message] of Object.entries(errors)) {
    const element = document.getElementById(`${field}Error`);

    if (element) {
      element.textContent = message;
    }
  }
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());
  const errors = validateForm(data);

  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    formFeedback.textContent = "Corrija os campos destacados.";
    formFeedback.classList.add("error");
    return;
  }

  formFeedback.textContent =
    "Validação concluída. Na aula 07 o formulário será enviado ao Flask.";
  formFeedback.classList.add("success");
  contactForm.reset();
});

searchInput.addEventListener("input", applyFilters);
genreSelect.addEventListener("change", applyFilters);

featuredButton.addEventListener("click", () => {
  featuredOnly = !featuredOnly;
  featuredButton.textContent = featuredOnly
    ? "Mostrar todos os filmes"
    : "Mostrar apenas destaques";
  applyFilters();
});

closeModalButton.addEventListener("click", closeModal);

movieModal.addEventListener("click", (event) => {
  if (event.target === movieModal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !movieModal.classList.contains("hidden")) {
    closeModal();
  }
});

populateGenres(allMovies);
renderMovies(allMovies);
statusMessage.textContent = `${allMovies.length} filme(s) carregado(s)`;
