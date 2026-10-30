
// ===================================
// DRUGDOSE - EDUCATIONAL WEBSITE
// ===================================

// SAFE ELEMENT SELECTOR
function getElement(id) {
    return document.getElementById(id);
}

// PAGE NAVIGATION
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = getElement(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    document.querySelectorAll("#navigation a").forEach(link => {
        link.classList.remove("active");
    });

    const activeLink = document.querySelector(
        `#navigation a[data-page="${pageId}"]`
    );

    if (activeLink) {
        activeLink.classList.add("active");
    }

    const navigation = getElement("navigation");

    if (navigation) {
        navigation.classList.remove("open");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// MOBILE MENU
function toggleMenu() {
    const navigation = getElement("navigation");

    if (navigation) {
        navigation.classList.toggle("open");
    }
}

// EDUCATIONAL CATEGORY SELECTION

function selectCategory(category) {
    const learningCategory = getElement("learningCategory");
    const adultTab = getElement("adultTab");
    const childTab = getElement("childTab");

    if (!learningCategory) return;

    if (category === "adult") {
        learningCategory.value = "adult";
    } else if (category === "child") {
        learningCategory.value = "pediatric";
    } else {
        return;
    }

    if (adultTab) {
        adultTab.classList.toggle("selected", category === "adult");
    }

    if (childTab) {
        childTab.classList.toggle("selected", category === "child");
    }
}

// PREVENT OLD PATIENT FORM SUBMISSION
function initializeEducationalForm() {
    const patientForm = getElement("patientForm");

    if (!patientForm) return;

    patientForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });
}

// EDUCATIONAL TOPIC MESSAGE
function initializeLearningTopics() {
    const topic = getElement("learningTopic");

    if (!topic) return;

    topic.addEventListener("change", function() {
        const selectedTopic = topic.options[topic.selectedIndex].text;

        if (!topic.value) return;

        console.log("Selected educational topic:", selectedTopic);
    });
}

// INITIALIZE WEBSITE
document.addEventListener("DOMContentLoaded", function() {
    showPage("home");
    initializeEducationalForm();
    initializeLearningTopics();
});

// DRUG LIBRARY CATEGORY BUTTONS
function selectLibraryCategory(category) {
    const selected = getElement("selectedCategory");

    if (!selected) return;

    const topics = {
        "General Information": "Learn general health and medication safety concepts.",
        "Uses & Purposes": "Learn how healthcare professionals evaluate treatment purposes.",
        "Warnings & Precautions": "Explore general medication safety precautions.",
        "Side Effects": "Learn general information about medicine safety monitoring.",
        "Interactions": "Understand why healthcare professionals review medicines together.",
        "Storage Information": "Learn general principles of safe medicine storage."
    };

    selected.textContent = topics[category] ||
        "Explore general health education resources.";
}
