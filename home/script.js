async function loadSite() {

    try {

        const response =
            await fetch("site.json");

        if (!response.ok) {
            throw new Error(
                "Could not load site.json"
            );
        }

        const data =
            await response.json();

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
                font-family:Arial;
                text-align:center;
                padding:30px;
            ">
                <div>
                    <h1>
                        Unable to load website
                    </h1>

                    <p style="
                        color:#999;
                        margin-top:10px;
                    ">
                        Please check that site.json
                        is available and valid.
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

    const studio =
        data.studio;

    const hero =
        data.hero;


    /* ==================================================
       BASIC INFORMATION
    ================================================== */

    document.title =
        studio.name;

    document.getElementById(
        "navLogo"
    ).textContent =
        studio.name;

    document.getElementById(
        "copyright"
    ).textContent =
        `© 2026 ${studio.name}. All rights reserved.`;


    /* ==================================================
       HERO
    ================================================== */

    document.getElementById(
        "heroEyebrow"
    ).textContent =
        hero.eyebrow;


    const heroTitle =
        document.getElementById(
            "heroTitle"
        );

    heroTitle.innerHTML = "";


    hero.title.forEach(line => {

        const span =
            document.createElement(
                "span"
            );

        span.textContent =
            line;

        span.style.display =
            "block";

        heroTitle.appendChild(
            span
        );

    });


    document.getElementById(
        "heroDescription"
    ).textContent =
        hero.description;


    const primary =
        document.getElementById(
            "heroPrimary"
        );

    primary.textContent =
        hero.primaryButton.text;

    primary.href =
        hero.primaryButton.link;


    const secondary =
        document.getElementById(
            "heroSecondary"
        );

    secondary.textContent =
        hero.secondaryButton.text;

    secondary.href =
        hero.secondaryButton.link;


    /* ==================================================
       GAMES
    ================================================== */

    const gamesGrid =
        document.getElementById(
            "gamesGrid"
        );

    gamesGrid.innerHTML = "";


    if (Array.isArray(data.games)) {

        data.games.forEach(game => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "game-card";


            const imageHTML =
                game.image
                ? `
                    <img
                        src="${escapeHTML(game.image)}"
                        alt="${escapeHTML(game.name)}"
                        loading="lazy"
                    >
                `
                : "GAME IMAGE";


            card.innerHTML = `

                <div class="game-image">
                    ${imageHTML}
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
                    >
                        Play on Roblox
                    </a>

                </div>

            `;


            gamesGrid.appendChild(
                card
            );

        });

    }


    /* ==================================================
       MODELS
    ================================================== */

    const modelsGrid =
        document.getElementById(
            "modelsGrid"
        );

    modelsGrid.innerHTML = "";


    if (Array.isArray(data.models)) {

        data.models.forEach(model => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "model-card";


            const imageHTML =
                model.image
                ? `
                    <img
                        src="${escapeHTML(model.image)}"
                        alt="${escapeHTML(model.name)}"
                        loading="lazy"
                    >
                `
                : "MODEL PREVIEW";


            card.innerHTML = `

                <div class="model-preview">
                    ${imageHTML}
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
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Get Model
                    </a>

                </div>

            `;


            modelsGrid.appendChild(
                card
            );

        });

    }


    /* ==================================================
       STORE
    ================================================== */

    const storeGrid =
        document.getElementById(
            "storeGrid"
        );

    storeGrid.innerHTML = "";


    if (Array.isArray(data.store)) {

        data.store.forEach(item => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "store-item";


            const imageHTML =
                item.image
                ? `
                    <img
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.name)}"
                        loading="lazy"
                    >
                `
                : "PRODUCT IMAGE";


            card.innerHTML = `

                <div class="store-image">
                    ${imageHTML}
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
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Get It
                </a>

            `;


            storeGrid.appendChild(
                card
            );

        });

    }


    /* ==================================================
       PAGES
    ================================================== */

    const pagesContainer =
        document.getElementById(
            "pagesContainer"
        );

    pagesContainer.innerHTML = "";


    if (
        data.pages &&
        typeof data.pages === "object"
    ) {

        Object.entries(
            data.pages
        ).forEach(
            ([category, pages]) => {

                if (
                    !Array.isArray(pages) ||
                    pages.length === 0
                ) {
                    return;
                }


                /* CATEGORY */

                const categoryElement =
                    document.createElement(
                        "div"
                    );

                categoryElement.className =
                    "page-category";


                /* CATEGORY TITLE */

                const title =
                    document.createElement(
                        "h3"
                    );

                title.className =
                    "page-category-title";

                title.textContent =
                    category;


                /* GRID */

                const grid =
                    document.createElement(
                        "div"
                    );

                grid.className =
                    "pages-grid";


                /* PAGE CARDS */

                pages.forEach(page => {

                    if (
                        !page ||
                        !page.name ||
                        !page.url
                    ) {
                        return;
                    }


                    const card =
                        document.createElement(
                            "a"
                        );

                    card.className =
                        "page-card";

                    card.href =
                        page.url;


                    /*
                        Only real external URLs
                        open in a new tab.

                        rdir?CODE stays in the
                        current tab.
                    */

                    if (
                        /^https?:\/\//i.test(
                            page.url
                        )
                    ) {

                        card.target =
                            "_blank";

                        card.rel =
                            "noopener noreferrer";

                    }


                    const cardTitle =
                        document.createElement(
                            "div"
                        );

                    cardTitle.className =
                        "page-card-title";

                    cardTitle.textContent =
                        page.name;


                    card.appendChild(
                        cardTitle
                    );

                    grid.appendChild(
                        card
                    );

                });


                categoryElement.appendChild(
                    title
                );

                categoryElement.appendChild(
                    grid
                );

                pagesContainer.appendChild(
                    categoryElement
                );

            }
        );

    }


    /* ==================================================
       UPDATES
    ================================================== */

    const updatesContainer =
        document.getElementById(
            "updatesContainer"
        );

    updatesContainer.innerHTML = "";


    if (Array.isArray(data.updates)) {

        data.updates.forEach(update => {

            const box =
                document.createElement(
                    "div"
                );

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


            updatesContainer.appendChild(
                box
            );

        });

    }


    /* ==================================================
       FAQ
    ================================================== */

    const faqContainer =
        document.getElementById(
            "faqContainer"
        );

    faqContainer.innerHTML = "";


    if (Array.isArray(data.faq)) {

        data.faq.forEach(item => {

            const details =
                document.createElement(
                    "details"
                );


            const summary =
                document.createElement(
                    "summary"
                );

            summary.textContent =
                item.question;


            const answer =
                document.createElement(
                    "p"
                );

            answer.textContent =
                item.answer;


            details.appendChild(
                summary
            );

            details.appendChild(
                answer
            );

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
   LINK HELPER
================================================== */

function setLink(
    elementId,
    url
) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element || !url) {
        return;
    }


    element.href =
        url;


    /*
        rdir?CODE links stay in the
        current tab.

        Actual external URLs open
        in a new tab.
    */

    if (
        /^https?:\/\//i.test(url)
    ) {

        element.target =
            "_blank";

        element.rel =
            "noopener noreferrer";

    } else {

        element.removeAttribute(
            "target"
        );

        element.removeAttribute(
            "rel"
        );

    }

}


/* ==================================================
   SECURITY
================================================== */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


/* ==================================================
   START
================================================== */

loadSite();