/* ==================================================
   LOAD SITE
================================================== */

async function loadSite() {

    try {

        const response = await fetch("site.json", {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error("Could not load site.json");
        }

        const data = await response.json();

        buildSite(data);

    } catch (error) {

        console.error(error);

        document.body.innerHTML = `
            <div style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                background:#08090d;
                color:white;
                font-family:Arial, sans-serif;
                text-align:center;
                padding:30px;
            ">
                <div>
                    <h1>Unable to load website</h1>

                    <p style="
                        color:#999;
                        margin-top:10px;
                    ">
                        Please check that site.json is available.
                    </p>
                </div>
            </div>
        `;
    }
}


/* ==================================================
   MAIN SITE
================================================== */

function buildSite(data) {

    const studio = data.studio || {};
    const hero = data.hero || {};


    /* ==================================================
       BASIC INFORMATION
    ================================================== */

    document.title =
        studio.name || "Nova Labs Code";

    const navLogo =
        document.getElementById("navLogo");

    if (navLogo) {
        navLogo.textContent =
            studio.name || "Nova Labs Code";
    }

    const copyright =
        document.getElementById("copyright");

    if (copyright) {
        copyright.textContent =
            `© 2026 ${studio.name || "Nova Labs Code"}. All rights reserved.`;
    }


    /* ==================================================
       HERO
    ================================================== */

    const heroEyebrow =
        document.getElementById("heroEyebrow");

    if (heroEyebrow) {
        heroEyebrow.textContent =
            hero.eyebrow || "";
    }


    const heroTitle =
        document.getElementById("heroTitle");

    if (heroTitle) {

        heroTitle.innerHTML = "";

        if (Array.isArray(hero.title)) {

            hero.title.forEach(line => {

                const span =
                    document.createElement("span");

                span.textContent =
                    line;

                span.style.display =
                    "block";

                heroTitle.appendChild(span);

            });

        }
    }


    const heroDescription =
        document.getElementById("heroDescription");

    if (heroDescription) {
        heroDescription.textContent =
            hero.description || "";
    }


    const primary =
        document.getElementById("heroPrimary");

    if (primary && hero.primaryButton) {

        primary.textContent =
            hero.primaryButton.text || "";

        primary.href =
            hero.primaryButton.link || "#";
    }


    const secondary =
        document.getElementById("heroSecondary");

    if (secondary && hero.secondaryButton) {

        secondary.textContent =
            hero.secondaryButton.text || "";

        secondary.href =
            hero.secondaryButton.link || "#";
    }


    /* ==================================================
       GAMES
    ================================================== */

    const gamesGrid =
        document.getElementById("gamesGrid");

    if (gamesGrid) {

        gamesGrid.innerHTML = "";

        const games =
            Array.isArray(data.games)
                ? data.games
                : [];

        games.forEach(game => {

            const card =
                document.createElement("article");

            card.className =
                "game-card";

            card.innerHTML = `

                <div class="game-image">

                    ${
                        game.image
                        ? `
                            <img
                                src="${escapeHTML(game.image)}"
                                alt="${escapeHTML(game.name)}"
                                loading="lazy"
                            >
                        `
                        : `
                            GAME IMAGE
                        `
                    }

                </div>

                <div class="game-info">

                    <h3>
                        ${escapeHTML(game.name)}
                    </h3>

                    <p>
                        ${escapeHTML(game.description)}
                    </p>

                    <div class="platforms">

                        <span class="platform">
                            ${escapeHTML(game.platform)}
                        </span>

                    </div>

                    <a
                        href="${escapeHTML(game.link)}"
                        class="button primary"
                        ${isExternal(game.link)
                            ? `
                                target="_blank"
                                rel="noopener noreferrer"
                            `
                            : ""
                        }
                    >
                        Play on Roblox
                    </a>

                </div>
            `;

            gamesGrid.appendChild(card);

        });
    }


    /* ==================================================
       MODELS
    ================================================== */

    const modelsGrid =
        document.getElementById("modelsGrid");

    if (modelsGrid) {

        modelsGrid.innerHTML = "";

        const models =
            Array.isArray(data.models)
                ? data.models
                : [];

        models.forEach(model => {

            const card =
                document.createElement("article");

            card.className =
                "model-card";

            card.innerHTML = `

                <div class="model-preview">

                    ${
                        model.image
                        ? `
                            <img
                                src="${escapeHTML(model.image)}"
                                alt="${escapeHTML(model.name)}"
                                loading="lazy"
                            >
                        `
                        : `
                            MODEL PREVIEW
                        `
                    }

                </div>

                <div class="model-info">

                    <h3>
                        ${escapeHTML(model.name)}
                    </h3>

                    <p>
                        ${escapeHTML(model.description)}
                    </p>

                    <div class="model-meta">

                        <span class="model-type">
                            ${escapeHTML(model.platform)}
                        </span>

                        <span class="free">
                            ${escapeHTML(model.type)}
                        </span>

                    </div>

                    <a
                        href="${escapeHTML(model.link)}"
                        class="button primary"
                        ${isExternal(model.link)
                            ? `
                                target="_blank"
                                rel="noopener noreferrer"
                            `
                            : ""
                        }
                    >
                        Get Model
                    </a>

                </div>
            `;

            modelsGrid.appendChild(card);

        });
    }


    /* ==================================================
       STORE
    ================================================== */

    const storeGrid =
        document.getElementById("storeGrid");

    if (storeGrid) {

        storeGrid.innerHTML = "";

        const store =
            Array.isArray(data.store)
                ? data.store
                : [];

        store.forEach(item => {

            const card =
                document.createElement("article");

            card.className =
                "store-item";

            card.innerHTML = `

                <div class="store-image">

                    ${
                        item.image
                        ? `
                            <img
                                src="${escapeHTML(item.image)}"
                                alt="${escapeHTML(item.name)}"
                                loading="lazy"
                            >
                        `
                        : `
                            PRODUCT IMAGE
                        `
                    }

                </div>

                <h3>
                    ${escapeHTML(item.name)}
                </h3>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <div class="store-status">
                    ${escapeHTML(item.type)}
                </div>

                <br>

                <a
                    href="${escapeHTML(item.link)}"
                    class="button primary"
                    ${isExternal(item.link)
                        ? `
                            target="_blank"
                            rel="noopener noreferrer"
                        `
                        : ""
                    }
                >
                    Get It
                </a>

            `;

            storeGrid.appendChild(card);

        });
    }


    /* ==================================================
       PAGES
    ================================================== */

    const pagesContainer =
        document.getElementById("pagesContainer");

    if (pagesContainer) {

        pagesContainer.innerHTML = "";

        const pages =
            data.pages || {};

        Object.entries(pages).forEach(
            ([category, items]) => {

                if (!Array.isArray(items) ||
                    items.length === 0) {
                    return;
                }


                /* CATEGORY */

                const categorySection =
                    document.createElement("div");

                categorySection.className =
                    "page-category";


                /* CATEGORY HEADER */

                const header =
                    document.createElement("div");

                header.className =
                    "page-category-header";

                header.innerHTML = `

                    <h3 class="page-category-title">
                        ${escapeHTML(category)}
                    </h3>

                `;


                /* PAGE GRID */

                const grid =
                    document.createElement("div");

                /*
                    IMPORTANT:
                    This uses the same visual
                    card system as the rest
                    of the website.
                */

                grid.className =
                    "pages-grid";


                items.forEach(page => {

                    const card =
                        document.createElement("a");

                    card.className =
                        "page-card";

                    card.href =
                        page.url || "#";


                    /*
                        Internal rdir links stay
                        in the same tab.

                        Actual external URLs open
                        in a new tab.
                    */

                    if (isExternal(page.url)) {

                        card.target =
                            "_blank";

                        card.rel =
                            "noopener noreferrer";
                    }


                    card.innerHTML = `

                        <div class="page-card-content">

                            <div class="page-card-title">
                                ${escapeHTML(page.name)}
                            </div>

                            <div class="page-card-arrow">
                                →
                            </div>

                        </div>

                    `;

                    grid.appendChild(card);

                });


                categorySection.appendChild(
                    header
                );

                categorySection.appendChild(
                    grid
                );

                pagesContainer.appendChild(
                    categorySection
                );

            }
        );
    }


    /* ==================================================
       UPDATES
    ================================================== */

    const updatesContainer =
        document.getElementById("updatesContainer");

    if (updatesContainer) {

        updatesContainer.innerHTML = "";

        const updates =
            Array.isArray(data.updates)
                ? data.updates
                : [];

        updates.forEach(update => {

            const box =
                document.createElement("div");

            box.className =
                "update-box";

            box.innerHTML = `

                <div class="update-date">
                    ${escapeHTML(update.date)}
                </div>

                <h3>
                    ${escapeHTML(update.title)}
                </h3>

                <p>
                    ${escapeHTML(update.description)}
                </p>

            `;

            updatesContainer.appendChild(box);

        });
    }


    /* ==================================================
       FAQ
    ================================================== */

    const faqContainer =
        document.getElementById("faqContainer");

    if (faqContainer) {

        faqContainer.innerHTML = "";

        const faq =
            Array.isArray(data.faq)
                ? data.faq
                : [];

        faq.forEach(item => {

            const details =
                document.createElement("details");

            details.innerHTML = `

                <summary>
                    ${escapeHTML(item.question)}
                </summary>

                <p>
                    ${escapeHTML(item.answer)}
                </p>

            `;

            faqContainer.appendChild(
                details
            );

        });
    }


    /* ==================================================
       PLATFORM LINKS
    ================================================== */

    setLink(
        "robloxLink",
        studio.roblox
    );

    setLink(
        "youtubeLink",
        studio.youtube
    );

    setLink(
        "footerRoblox",
        studio.roblox
    );

    setLink(
        "footerYoutube",
        studio.youtube
    );
}


/* ==================================================
   SET LINK
================================================== */

function setLink(id, url) {

    const element =
        document.getElementById(id);

    if (!element || !url) {
        return;
    }

    element.href =
        url;

    if (isExternal(url)) {

        element.target =
            "_blank";

        element.rel =
            "noopener noreferrer";
    }
}


/* ==================================================
   EXTERNAL LINK CHECK
================================================== */

function isExternal(url) {

    if (!url) {
        return false;
    }

    /*
        rdir links are internal links.
    */

    if (
        url.startsWith("rdir?") ||
        url.startsWith("./") ||
        url.startsWith("../") ||
        url.startsWith("/") ||
        url.startsWith("#")
    ) {
        return false;
    }

    return /^https?:\/\//i.test(url);
}


/* ==================================================
   HTML ESCAPING
================================================== */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;
}


/* ==================================================
   START
================================================== */

loadSite();