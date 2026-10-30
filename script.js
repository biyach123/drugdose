
"use strict";

// =======================================
// DRUGDOSE - STUDY & LEARNING PLATFORM
// =======================================

// PAGE NAVIGATION
function getElement(id) {
    return document.getElementById(id);
}

function showPage(pageId) {
    const pages = document.querySelectorAll("main .page");
    const target = getElement(pageId);

    if (!target) {
        console.warn("Page not found:", pageId);
        return;
    }

    pages.forEach(page => {
        page.classList.toggle("active", page.id === pageId);
    });

    document.querySelectorAll("#navigation a[data-page]").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === pageId
        );
    });

    closeMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// SIDE MENU
function toggleMenu() {
    const menu = getElement("navigation");
    const overlay = getElement("menuOverlay");
    const openButton = getElement("menuOpen");

    if (!menu) return;

    const isOpen = menu.classList.toggle("open");

    if (overlay) {
        overlay.classList.toggle("visible", isOpen);
    }

    if (openButton) {
        openButton.setAttribute("aria-expanded", String(isOpen));
    }
}

function closeMenu() {
    const menu = getElement("navigation");
    const overlay = getElement("menuOverlay");
    const openButton = getElement("menuOpen");

    if (menu) menu.classList.remove("open");
    if (overlay) overlay.classList.remove("visible");

    if (openButton) {
        openButton.setAttribute("aria-expanded", "false");
    }
}

// STUDY PROGRAM
let currentStudyTopic = "";

const studyCategories = {
    videos: {
        title: "Video Lectures",
        description: "Find topic-related educational videos and lectures.",
        links: [
            {
                name: "YouTube — Topic Videos",
                url: "https://www.youtube.com/results?search_query="
            },
            {
                name: "Khan Academy",
                url: "https://www.khanacademy.org/search?page_search_query="
            },
            {
                name: "MIT OpenCourseWare",
                url: "https://ocw.mit.edu/search/?q="
            }
        ]
    },

    research: {
        title: "Research Papers",
        description: "Explore academic papers and scholarly publications.",
        links: [
            {
                name: "Google Scholar",
                url: "https://scholar.google.com/scholar?q="
            },
            {
                name: "PubMed",
                url: "https://pubmed.ncbi.nlm.nih.gov/?term="
            },
            {
                name: "DOAJ Open Access Journals",
                url: "https://doaj.org/search/articles/"
            },
            {
                name: "CORE Research",
                url: "https://core.ac.uk/search?q="
            }
        ]
    },

    articles: {
        title: "Articles",
        description: "Discover explanations, educational articles and topic guides.",
        links: [
            {
                name: "Google Search — Educational Articles",
                url: "https://www.google.com/search?q="
            },
            {
                name: "Britannica",
                url: "https://www.britannica.com/search?query="
            },
            {
                name: "ScienceDaily",
                url: "https://www.sciencedaily.com/search/?keyword="
            }
        ]
    },

    notes: {
        title: "Notes & Summaries",
        description: "Find study notes, revision guides and topic summaries.",
        links: [
            {
                name: "Google Search — Study Notes",
                url: "https://www.google.com/search?q="
            },
            {
                name: "OpenStax Textbooks",
                url: "https://openstax.org/search?q="
            },
            {
                name: "Khan Academy Lessons",
                url: "https://www.khanacademy.org/search?page_search_query="
            }
        ]
    },

    questions: {
        title: "MCQs & Questions",
        description: "Explore practice questions, quizzes and multiple-choice questions.",
        links: [
            {
                name: "Google Search — MCQs",
                url: "https://www.google.com/search?q="
            },
            {
                name: "Quizizz",
                url: "https://quizizz.com/search/"
            },
            {
                name: "Khan Academy Practice",
                url: "https://www.khanacademy.org/search?page_search_query="
            }
        ]
    },

    experiments: {
        title: "Experiments & Practicals",
        description: "Explore demonstrations, simulations and practical learning.",
        links: [
            {
                name: "YouTube — Practical Demonstrations",
                url: "https://www.youtube.com/results?search_query="
            },
            {
                name: "PhET Interactive Simulations",
                url: "https://phet.colorado.edu/en/simulations/filter?subjects="
            },
            {
                name: "Science Buddies",
                url: "https://www.sciencebuddies.org/search?query="
            }
        ]
    },

    medicine: {
        title: "Medicine Education",
        description: "Find general medicine and health education resources. These links are for learning, not personal treatment decisions.",
        links: [
            {
                name: "MedlinePlus — Medicine Information",
                url: "https://medlineplus.gov/druginformation.html"
            },
            {
                name: "NHS — Medicines",
                url: "https://www.nhs.uk/medicines/"
            },
            {
                name: "DailyMed — Medicine Labels",
                url: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query="
            },
            {
                name: "WHO — Health Topics",
                url: "https://www.who.int/health-topics"
            },
            {
                name: "PubMed — Medical Research",
                url: "https://pubmed.ncbi.nlm.nih.gov/?term="
            }
        ]
    }
};

function searchStudyTopic() {
    const input = getElement("studyTopic");
    const message = getElement("studyMessage");

    if (!input) return;

    const topic = input.value.trim();

    if (!topic) {
        if (message) {
            message.textContent = "Please enter a topic first.";
            message.classList.remove("hidden");
        }
        input.focus();
        return;
    }

    currentStudyTopic = topic;

    if (message) {
        message.textContent =
            "Topic saved: " + topic +
            ". Now choose a learning category below.";
        message.classList.remove("hidden");
    }
}

function startHomeSearch() {
    const input = getElement("homeTopic");

    if (!input) return;

    const topic = input.value.trim();

    if (!topic) {
        input.focus();
        return;
    }

    currentStudyTopic = topic;

    const studyInput = getElement("studyTopic");
    if (studyInput) studyInput.value = topic;

    showPage("study");

    const message = getElement("studyMessage");

    if (message) {
        message.textContent =
            "Your topic is ready. Select a category to explore resources.";
        message.classList.remove("hidden");
    }
}

function openStudyCategory(categoryKey) {
    const category = studyCategories[categoryKey];

    if (!category) return;

    const input = getElement("studyTopic");

    if (input && input.value.trim()) {
        currentStudyTopic = input.value.trim();
    }

    if (!currentStudyTopic) {
        const message = getElement("studyMessage");

        if (message) {
            message.textContent =
                "First enter a topic, then choose a category.";
            message.classList.remove("hidden");
        }

        showPage("study");
        if (input) input.focus();
        return;
    }

    getElement("categoryTitle").textContent = category.title;
    getElement("categoryDescription").textContent = category.description;
    getElement("categoryTopicHeading").textContent = "Topic: " + currentStudyTopic;
    getElement("categoryTopic").textContent =
        "Explore resources related to: " + currentStudyTopic;

    const container = getElement("categoryLinks");
    container.replaceChildren();

    category.links.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "link-card";

        const number = document.createElement("span");
        number.className = "link-number";
        number.textContent = String(index + 1).padStart(2, "0");

        const details = document.createElement("div");
        details.className = "link-details";

        const heading = document.createElement("h3");
        heading.textContent = item.name;

        const description = document.createElement("p");
        description.textContent =
            "Search for " + currentStudyTopic + " on " + item.name + ".";

        details.append(heading, description);

        const link = document.createElement("a");
        link.className = "open-link";
        link.href = item.url + encodeURIComponent(currentStudyTopic);
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Open Resource ↗";

        card.append(number, details, link);
        container.appendChild(card);
    });

    showPage("category-page");
}

// GENERAL CALCULATOR
function getCalculatorDisplay() {
    return getElement("calcDisplay");
}

function appendCalculator(value) {
    const display = getCalculatorDisplay();

    if (!display) return;

    display.value += value;

    const message = getElement("calcMessage");
    if (message) message.textContent = "";
}

function clearCalculator() {
    const display = getCalculatorDisplay();
    if (display) display.value = "";

    const message = getElement("calcMessage");
    if (message) message.textContent = "";
}

function deleteCalculator() {
    const display = getCalculatorDisplay();
    if (display) {
        display.value = display.value.slice(0, -1);
    }
}

function calculateResult() {
    const display = getCalculatorDisplay();
    const message = getElement("calcMessage");

    if (!display || !display.value.trim()) {
        if (message) message.textContent = "Enter a calculation first.";
        return;
    }

    const expression = display.value;

    // Only allow basic arithmetic characters.
    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
        if (message) message.textContent = "Invalid calculation.";
        return;
    }

    try {
        // Parse using a restricted arithmetic expression.
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        display.value = String(Number(result.toPrecision(12)));

        if (message) message.textContent = "Calculation completed.";
    } catch (error) {
        if (message) message.textContent = "Please check your calculation.";
    }
}

// GENERAL MASS CONVERSION
function showResult(id, text) {
    const output = getElement(id);
    if (!output) return;

    output.textContent = text;
    output.classList.remove("hidden");
}

function convertMass() {
    const input = getElement("massValue");
    const unit = getElement("massUnit");

    if (!input || !unit) return;

    const raw = input.value.trim();
    const value = Number(raw);

    if (raw === "" || !Number.isFinite(value) || value < 0) {
        showResult("massResult", "Enter a valid non-negative number.");
        return;
    }

    const gramsPerUnit = {
        mcg: 0.000001,
        mg: 0.001,
        g: 1,
        kg: 1000
    };

    const grams = value * gramsPerUnit[unit.value];

    const output = [
        "Micrograms: " + formatNumber(grams * 1000000) + " mcg",
        "Milligrams: " + formatNumber(grams * 1000) + " mg",
        "Grams: " + formatNumber(grams) + " g",
        "Kilograms: " + formatNumber(grams / 1000) + " kg"
    ];

    showResult("massResult", output.join(" | "));
}

// GENERAL VOLUME CONVERSION
function convertVolume() {
    const input = getElement("volumeValue");
    const unit = getElement("volumeUnit");

    if (!input || !unit) return;

    const raw = input.value.trim();
    const value = Number(raw);

    if (raw === "" || !Number.isFinite(value) || value < 0) {
        showResult("volumeResult", "Enter a valid non-negative number.");
        return;
    }

    const millilitres = unit.value === "l"
        ? value * 1000
        : value;

    showResult(
        "volumeResult",
        formatNumber(millilitres) + " mL = " +
        formatNumber(millilitres / 1000) + " L"
    );
}

function formatNumber(number) {
    return Number(number.toPrecision(10)).toLocaleString("en-US", {
        maximumFractionDigits: 10
    });
}

// KEYBOARD SUPPORT
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// INITIALIZATION
document.addEventListener("DOMContentLoaded", function () {
    showPage("home");

    const intro = getElement("intro");

    if (intro) {
        window.setTimeout(function () {
            intro.classList.add("intro-finished");
        }, 3200);
    }

    console.log("DrugDose Study Platform loaded successfully.");
});
