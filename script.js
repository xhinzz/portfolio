const IMG_EXT = "webp";

function photoSrc(file) {
  return `imgs/${file}.${IMG_EXT}`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderProjects() {
  const mount = document.querySelector("[data-projects-mount]");
  if (!mount || !window.PROJECTS) return;

  mount.innerHTML = window.PROJECTS.map((p, i) => {
    const heading = i === 0 ? "h1" : "h2";
    const files = p.files.map((f) => `<span>${escapeHtml(f)}</span>`).join("");
    const paragraphs = p.paragraphs.map((t) => `<p>${escapeHtml(t)}</p>`).join("");

    return `
      <article class="github-project">
        <a class="github-embed github-embed--${escapeHtml(p.theme)}" href="${escapeHtml(p.url)}" target="_blank" rel="noreferrer" aria-label="Abrir ${escapeHtml(p.name)} no GitHub">
          <div class="embed-topbar">
            <span class="embed-dot"></span>
            <div class="embed-heading">
              <strong>${escapeHtml(p.user)} / ${escapeHtml(p.repo)}</strong>
              <span>GitHub Repository</span>
            </div>
          </div>
          <div class="embed-window">
            <div class="embed-code">${files}</div>
            <div class="embed-cta">Open on GitHub</div>
          </div>
        </a>
        <div class="github-copy">
          <${heading}>${escapeHtml(p.name)}</${heading}>
          <p class="project-year">GitHub</p>
          ${paragraphs}
          <a class="inline-link" href="${escapeHtml(p.url)}" target="_blank" rel="noreferrer">${escapeHtml(p.cta)}</a>
        </div>
      </article>
    `;
  }).join("");
}

function renderPhotos() {
  const grid = document.querySelector(".photo-grid");
  if (!grid || !window.PHOTOS) return;

  grid.innerHTML = window.PHOTOS.map((photo, i) => {
    const src = photoSrc(photo.file);
    const spanAttrs = [
      photo.colSpan ? `data-col-span="${photo.colSpan}"` : "",
      photo.rowSpan ? `data-row-span="${photo.rowSpan}"` : ""
    ]
      .filter(Boolean)
      .join(" ");

    return `<button type="button" class="photo" data-photo-index="${i}" data-photo-src="${escapeHtml(src)}" data-photo-title="${escapeHtml(photo.title)}" style="background-image: url('${src}')" ${spanAttrs}></button>`;
  }).join("");
}

renderProjects();
renderPhotos();

const sectionLinks = document.querySelectorAll("[data-section-link]");
const sections = document.querySelectorAll("[data-section]");
const photoButtons = document.querySelectorAll("[data-photo-index]");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const lightboxThumbs = document.querySelector(".lightbox-thumbs");

const photos = Array.from(photoButtons).map((button) => ({
  src: button.dataset.photoSrc,
  title: button.dataset.photoTitle
}));

let currentPhotoIndex = 0;

function setActiveSection(sectionId) {
  sections.forEach((section) => {
    section.classList.toggle("is-active", section.dataset.section === sectionId);
  });

  sectionLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.sectionLink === sectionId);
  });
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const { sectionLink } = link.dataset;
    setActiveSection(sectionLink);
    window.history.replaceState(null, "", `#${sectionLink}`);
  });
});

const initialSection = window.location.hash.replace("#", "");
if (initialSection) {
  setActiveSection(initialSection);
}

function renderLightboxThumbs() {
  lightboxThumbs.innerHTML = "";

  photos.forEach((photo, index) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "lightbox-thumb";
    thumb.style.backgroundImage = `url("${photo.src}")`;
    thumb.setAttribute("aria-label", `Abrir ${photo.title}`);
    thumb.addEventListener("click", () => openLightbox(index));
    lightboxThumbs.appendChild(thumb);
  });
}

function updateLightbox() {
  const currentPhoto = photos[currentPhotoIndex];

  lightboxImage.src = currentPhoto.src;
  lightboxImage.alt = currentPhoto.title;
  lightboxCaption.textContent = currentPhoto.title;

  const thumbs = lightboxThumbs.querySelectorAll(".lightbox-thumb");
  thumbs.forEach((thumb, index) => {
    thumb.classList.toggle("is-active", index === currentPhotoIndex);
  });
}

function openLightbox(index) {
  currentPhotoIndex = index;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  updateLightbox();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function stepLightbox(direction) {
  currentPhotoIndex = (currentPhotoIndex + direction + photos.length) % photos.length;
  updateLightbox();
}

photoButtons.forEach((button, index) => {
  button.addEventListener("click", () => openLightbox(index));
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => stepLightbox(-1));
lightboxNext.addEventListener("click", () => stepLightbox(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    stepLightbox(-1);
  }

  if (event.key === "ArrowRight") {
    stepLightbox(1);
  }
});

renderLightboxThumbs();

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  const status = contactForm.querySelector(".form-status");
  const submitBtn = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);

    submitBtn.disabled = true;
    status.textContent = "Enviando...";
    status.className = "form-status";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        status.textContent = "Mensagem enviada! Obrigado.";
        status.classList.add("is-success");
        contactForm.reset();
      } else {
        throw new Error("Falha no envio");
      }
    } catch (err) {
      status.textContent = "Erro ao enviar. Tente novamente ou mande direto pelo email.";
      status.classList.add("is-error");
    } finally {
      submitBtn.disabled = false;
    }
  });
}
