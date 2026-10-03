/* PHONE 229 — scripts communs à toutes les pages */

const GARANTIE = { Neuf: "12 mois", "Reconditionné": "6 mois", Occasion: "3 mois" };

function fcfa(n) {
  return n.toLocaleString("fr-FR").replace(/[\s ]/g, " ");
}

function lienWhatsApp(message) {
  return `https://wa.me/${BOUTIQUE.whatsapp}?text=${encodeURIComponent(message)}`;
}

function messageProduit(p) {
  const specs = p.stockage ? ` ${p.stockage}` : "";
  return `Bonjour PHONE 229, je suis intéressé(e) par : ${p.nom}${specs} (${p.etat}) à ${fcfa(p.prix)} FCFA. Est-il disponible ?`;
}

function lienProduit(p) {
  return `produit.html?id=${encodeURIComponent(p.id)}`;
}

function specsCourtes(p) {
  const s = [];
  if (p.stockage) s.push(p.stockage);
  if (p.ram) s.push(`${p.ram} RAM`);
  return s.join(" · ") || p.categorie;
}

function classeEtat(etat) {
  return "etat-" + etat.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/* ---------- Visuels provisoires (remplacés par p.image dès qu'une photo existe) ---------- */

let compteurVisuel = 0;

function visuel(p) {
  if (p.image) {
    return `<img src="${p.image}" alt="${p.nom}" loading="lazy">`;
  }
  const id = `g${compteurVisuel++}`;
  const c = p.teinte || "#2B3A48";
  const ecran = `
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c}"/>
        <stop offset="1" stop-color="#0F1B26"/>
      </linearGradient>
    </defs>`;
  const titre = `<text x="100" y="128" text-anchor="middle" class="v-marque">${p.marque.toUpperCase()}</text>`;
  let forme = "";

  switch (p.categorie) {
    case "Tablette":
      forme = `
        <rect x="34" y="34" width="132" height="172" rx="14" fill="#0F1B26"/>
        <rect x="41" y="41" width="118" height="158" rx="8" fill="url(#${id})"/>
        ${titre}`;
      break;
    case "Ordinateur":
      forme = `
        <rect x="26" y="52" width="148" height="98" rx="8" fill="#0F1B26"/>
        <rect x="32" y="58" width="136" height="86" rx="4" fill="url(#${id})"/>
        <path d="M14 152 H186 L178 164 H22 Z" fill="${c}"/>
        <text x="100" y="106" text-anchor="middle" class="v-marque">${p.marque.toUpperCase()}</text>`;
      break;
    case "Accessoire":
      forme = `
        <rect x="58" y="62" width="84" height="104" rx="30" fill="${c}"/>
        <rect x="58" y="62" width="84" height="104" rx="30" fill="url(#${id})" opacity=".35"/>
        <line x1="62" y1="96" x2="138" y2="96" stroke="#0F1B26" stroke-opacity=".35" stroke-width="2"/>
        <circle cx="100" cy="130" r="4" fill="#0F1B26" fill-opacity=".45"/>`;
      break;
    default:
      forme = `
        <rect x="62" y="22" width="76" height="196" rx="18" fill="#0F1B26"/>
        <rect x="68" y="28" width="64" height="184" rx="13" fill="url(#${id})"/>
        <rect x="88" y="34" width="24" height="7" rx="3.5" fill="#0F1B26"/>
        ${titre}`;
  }

  return `<svg viewBox="0 0 200 240" role="img" aria-label="${p.nom} — visuel provisoire">${ecran}${forme}</svg>`;
}

/* ---------- Carte produit ---------- */

function carteProduit(p) {
  return `
    <article class="carte">
      <div class="carte-visuel">
        ${visuel(p)}
        <span class="badge-etat ${classeEtat(p.etat)}">${p.etat}</span>
      </div>
      <div class="carte-corps">
        <p class="carte-marque">${p.marque} · ${p.categorie}</p>
        <h3 class="carte-titre"><a href="${lienProduit(p)}">${p.nom}</a></h3>
        <p class="carte-specs">${specsCourtes(p)}</p>
        <div class="carte-bas">
          <span class="etiquette">${fcfa(p.prix)}<small>FCFA</small></span>
          <a class="lien-wa" href="${lienWhatsApp(messageProduit(p))}" target="_blank" rel="noopener"
             aria-label="Commander ${p.nom} sur WhatsApp">${ICONE_WA}</a>
        </div>
      </div>
    </article>`;
}

const ICONE_WA = `<svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/></svg>`;

/* ---------- Éléments communs ---------- */

function initCommun() {
  // Coordonnées
  document.querySelectorAll("[data-info]").forEach((el) => {
    const v = BOUTIQUE[el.dataset.info];
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-lien='tel']").forEach((a) => (a.href = `tel:${BOUTIQUE.telephoneLien}`));
  document.querySelectorAll("[data-lien='mail']").forEach((a) => (a.href = `mailto:${BOUTIQUE.email}`));
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = lienWhatsApp(a.dataset.wa || "Bonjour PHONE 229, j'ai une question.");
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-horaires]").forEach((ul) => {
    ul.innerHTML = BOUTIQUE.horaires.map(([j, h]) => `<li><span>${j}</span><span>${h}</span></li>`).join("");
  });
  document.querySelectorAll("[data-reseaux]").forEach((ul) => {
    ul.innerHTML = Object.entries(BOUTIQUE.reseaux)
      .map(([nom, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${nom}</a></li>`)
      .join("");
  });
  document.querySelectorAll("[data-annee]").forEach((el) => (el.textContent = new Date().getFullYear()));

  // Menu mobile
  const bouton = document.querySelector(".menu-bouton");
  const nav = document.querySelector(".site-nav");
  if (bouton && nav) {
    bouton.addEventListener("click", () => {
      const ouvert = bouton.getAttribute("aria-expanded") === "true";
      bouton.setAttribute("aria-expanded", String(!ouvert));
      nav.classList.toggle("ouverte", !ouvert);
    });
  }
}

/* ---------- Accueil ---------- */

function initAccueil() {
  const telephones = PRODUITS.filter((p) => p.categorie === "Téléphone");
  const prixMin = Math.min(...telephones.map((p) => p.prix));
  const vitrine = PRODUITS.find((p) => p.vedette && p.categorie === "Téléphone") || PRODUITS[0];

  const heroVisuel = document.getElementById("hero-visuel");
  if (heroVisuel) heroVisuel.innerHTML = visuel(vitrine);
  const heroPrix = document.getElementById("hero-prix");
  if (heroPrix) heroPrix.textContent = fcfa(prixMin);

  const vedettes = document.getElementById("vedettes");
  if (vedettes) vedettes.innerHTML = PRODUITS.filter((p) => p.vedette).slice(0, 4).map(carteProduit).join("");

  const marques = document.getElementById("marques");
  if (marques) {
    const liste = [...new Set(PRODUITS.map((p) => p.marque))];
    marques.innerHTML = liste
      .map((m) => {
        const n = PRODUITS.filter((p) => p.marque === m).length;
        return `<li><a href="catalogue.html?marque=${encodeURIComponent(m)}"><strong>${m}</strong><span>${n} produit${n > 1 ? "s" : ""}</span></a></li>`;
      })
      .join("");
  }
}

/* ---------- Catalogue ---------- */

function initCatalogue() {
  const params = new URLSearchParams(location.search);
  const etat = {
    recherche: params.get("q") || "",
    marque: params.get("marque") || "Toutes",
    categorie: params.get("categorie") || "Toutes",
  };

  const champ = document.getElementById("recherche");
  const puces = document.getElementById("filtre-marques");
  const selectCat = document.getElementById("filtre-categorie");
  const grille = document.getElementById("grille");
  const compteur = document.getElementById("compteur");

  const marques = ["Toutes", ...new Set(PRODUITS.map((p) => p.marque))];
  const categories = ["Toutes", ...new Set(PRODUITS.map((p) => p.categorie))];

  champ.value = etat.recherche;
  selectCat.innerHTML = categories
    .map((c) => `<option value="${c}">${c === "Toutes" ? "Toutes les catégories" : c + "s"}</option>`)
    .join("");
  selectCat.value = categories.includes(etat.categorie) ? etat.categorie : "Toutes";

  function dessinerPuces() {
    puces.innerHTML = marques
      .map(
        (m) =>
          `<button type="button" class="puce" aria-pressed="${m === etat.marque}" data-marque="${m}">${m}</button>`
      )
      .join("");
  }

  function normaliser(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function afficher() {
    const q = normaliser(etat.recherche.trim());
    const resultats = PRODUITS.filter((p) => {
      if (etat.marque !== "Toutes" && p.marque !== etat.marque) return false;
      if (etat.categorie !== "Toutes" && p.categorie !== etat.categorie) return false;
      if (!q) return true;
      return normaliser(`${p.nom} ${p.marque} ${p.categorie} ${p.stockage} ${p.etat}`).includes(q);
    });

    compteur.textContent = `${resultats.length} produit${resultats.length > 1 ? "s" : ""}`;

    if (resultats.length) {
      grille.innerHTML = resultats.map(carteProduit).join("");
    } else {
      const quoi = etat.recherche.trim() ? `« ${etat.recherche.trim()} »` : "ces filtres";
      grille.innerHTML = `
        <div class="vide">
          <p class="vide-titre">Aucun produit pour ${quoi}.</p>
          <p>Essayez une autre marque, ou demandez-nous directement : nous l'avons peut-être en boutique.</p>
          <div class="vide-actions">
            <button type="button" class="btn btn-contour" id="reinitialiser">Voir tous les produits</button>
            <a class="btn btn-wa" href="${lienWhatsApp(`Bonjour PHONE 229, je cherche : ${etat.recherche.trim() || "un produit"}. L'avez-vous ?`)}" target="_blank" rel="noopener">${ICONE_WA}Demander sur WhatsApp</a>
          </div>
        </div>`;
      document.getElementById("reinitialiser").addEventListener("click", () => {
        etat.recherche = "";
        etat.marque = "Toutes";
        etat.categorie = "Toutes";
        champ.value = "";
        selectCat.value = "Toutes";
        dessinerPuces();
        afficher();
      });
    }

    const p = new URLSearchParams();
    if (etat.recherche.trim()) p.set("q", etat.recherche.trim());
    if (etat.marque !== "Toutes") p.set("marque", etat.marque);
    if (etat.categorie !== "Toutes") p.set("categorie", etat.categorie);
    history.replaceState(null, "", p.toString() ? `?${p}` : location.pathname);
  }

  champ.addEventListener("input", () => {
    etat.recherche = champ.value;
    afficher();
  });
  puces.addEventListener("click", (e) => {
    const b = e.target.closest(".puce");
    if (!b) return;
    etat.marque = b.dataset.marque;
    dessinerPuces();
    afficher();
  });
  selectCat.addEventListener("change", () => {
    etat.categorie = selectCat.value;
    afficher();
  });
  document.getElementById("form-recherche").addEventListener("submit", (e) => e.preventDefault());

  if (!marques.includes(etat.marque)) etat.marque = "Toutes";
  dessinerPuces();
  afficher();
}

/* ---------- Fiche produit ---------- */

function initProduit() {
  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUITS.find((x) => x.id === id);
  const zone = document.getElementById("fiche");

  if (!p) {
    zone.innerHTML = `
      <div class="vide">
        <p class="vide-titre">Ce produit n'est plus en ligne.</p>
        <p>Il a peut-être été vendu. Parcourez le catalogue ou écrivez-nous pour savoir ce qui est disponible.</p>
        <div class="vide-actions">
          <a class="btn btn-plein" href="catalogue.html">Voir le catalogue</a>
          <a class="btn btn-wa" href="${lienWhatsApp("Bonjour PHONE 229, quels produits avez-vous en ce moment ?")}" target="_blank" rel="noopener">${ICONE_WA}Écrire sur WhatsApp</a>
        </div>
      </div>`;
    return;
  }

  document.title = `${p.nom} — ${fcfa(p.prix)} FCFA · PHONE 229`;
  document.getElementById("fil-nom").textContent = p.nom;

  const lignes = [
    ["Marque", p.marque],
    ["Catégorie", p.categorie],
    p.stockage && ["Stockage", p.stockage],
    p.ram && ["Mémoire vive (RAM)", p.ram],
    ["État", p.etat],
    ["Garantie boutique", GARANTIE[p.etat] || "—"],
  ].filter(Boolean);

  zone.innerHTML = `
    <div class="fiche-visuel">
      ${visuel(p)}
      <span class="badge-etat ${classeEtat(p.etat)}">${p.etat}</span>
    </div>
    <div class="fiche-infos">
      <p class="eyebrow">${p.marque} · ${p.categorie}</p>
      <h1 class="fiche-titre">${p.nom}</h1>
      <p class="fiche-specs">${specsCourtes(p)}</p>
      <div class="fiche-prix">
        <span class="etiquette etiquette-grande">${fcfa(p.prix)}<small>FCFA</small></span>
        <p class="fiche-prix-note">Prix affiché = prix payé en boutique.</p>
      </div>
      <p class="fiche-description">${p.description}</p>
      <div class="fiche-actions">
        <a class="btn btn-wa btn-large" href="${lienWhatsApp(messageProduit(p))}" target="_blank" rel="noopener">${ICONE_WA}Commander sur WhatsApp</a>
        <a class="btn btn-contour btn-large" href="tel:${BOUTIQUE.telephoneLien}">Appeler la boutique</a>
      </div>
      <h2 class="fiche-sous-titre">Caractéristiques</h2>
      <dl class="fiche-table">
        ${lignes.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
      </dl>
      <h2 class="fiche-sous-titre">Points clés</h2>
      <ul class="fiche-points">${p.points.map((x) => `<li>${x}</li>`).join("")}</ul>
    </div>`;

  const similaires = PRODUITS.filter((x) => x.id !== p.id && (x.marque === p.marque || x.categorie === p.categorie))
    .sort((a, b) => (b.categorie === p.categorie) - (a.categorie === p.categorie))
    .slice(0, 4);
  const blocSim = document.getElementById("similaires");
  if (similaires.length) {
    document.getElementById("grille-similaires").innerHTML = similaires.map(carteProduit).join("");
  } else {
    blocSim.hidden = true;
  }
}

/* ---------- Contact ---------- */

function initContact() {
  const carte = document.getElementById("carte");
  if (carte) {
    carte.src = `https://www.google.com/maps?q=${encodeURIComponent(BOUTIQUE.recherchePlan)}&output=embed`;
  }
}

/* ---------- Démarrage ---------- */

document.addEventListener("DOMContentLoaded", () => {
  initCommun();
  const page = document.body.dataset.page;
  if (page === "accueil") initAccueil();
  if (page === "catalogue") initCatalogue();
  if (page === "produit") initProduit();
  if (page === "contact") initContact();
});
