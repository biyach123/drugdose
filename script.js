
"use strict";

// =============================================
// DRUGDOSE - CORRECTED EDUCATIONAL SCRIPT
// =============================================

// 1. BASIC HELPERS
// ---------------------------------------------

function getElement(id) {
    return document.getElementById(id);
}

function readValue(id) {
    const element = getElement(id);
    return element ? String(element.value || "").trim() : "";
}

function showMessage(element, message) {
    if (!element) return;

    element.textContent = message;
    element.classList.remove("hidden");
}

function createTextElement(tag, text, parent) {
    const element = document.createElement(tag);
    element.textContent = text;
    parent.appendChild(element);
    return element;
}

function addList(parent, items) {
    const list = document.createElement("ul");

    items.forEach(item => {
        createTextElement("li", item, list);
    });

    parent.appendChild(list);
    return list;
}

function showNotice(element, message) {
    if (!element) return;

    element.textContent = message;
    element.classList.remove("hidden");
}

// 2. PAGE NAVIGATION
// ---------------------------------------------

function showPage(pageId) {
    const pages = document.querySelectorAll("main .page");
    const target = getElement(pageId);

    if (!target || !target.classList.contains("page")) {
        console.warn("Page not found:", pageId);
        return;
    }

    pages.forEach(page => {
        page.classList.toggle("active", page.id === pageId);
    });

    document.querySelectorAll("#navigation a").forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("data-page") === pageId
        );
    });

    const navigation = getElement("navigation");

    if (navigation) {
        navigation.classList.remove("open");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function toggleMenu() {
    const navigation = getElement("navigation");

    if (navigation) {
        navigation.classList.toggle("open");
    }
}

// 3. CATEGORY SELECTION
// ---------------------------------------------

let currentDoseCategory = "adult";

function selectCategory(category) {
    currentDoseCategory =
        category === "child" ? "pediatric" : "adult";

    const learningCategory = getElement("learningCategory");
    const adultTab = getElement("adultTab");
    const childTab = getElement("childTab");

    if (learningCategory) {
        learningCategory.value = currentDoseCategory;
    }

    if (adultTab) {
        adultTab.classList.toggle(
            "selected",
            currentDoseCategory === "adult"
        );
    }

    if (childTab) {
        childTab.classList.toggle(
            "selected",
            currentDoseCategory === "pediatric"
        );
    }
}

function selectDoseCategory(category) {
    selectCategory(category);
}

// 4. LEARNING TOPICS
// ---------------------------------------------

function initializeLearningTopics() {
    const topic = getElement("learningTopic");

    if (!topic) return;

    topic.addEventListener("change", function () {
        if (topic.value) {
            console.log("Selected topic:", topic.value);
        }
    });
}

function showDoseLesson() {
    const topic = getElement("doseTopic");
    const result = getElement("doseLessonResult");

    if (!topic || !result) return;

    const lessons = {
        units: {
            title: "Dose Units Explained",
            text:
                "mg means milligram, mcg means microgram, " +
                "g means gram and mL means millilitre. " +
                "Mass and volume are different measurements."
        },

        measurements: {
            title: "Medicine Measurements",
            text:
                "Liquid medicines have a labelled concentration. " +
                "Concentration information is necessary for " +
                "understanding medicine measurements."
        },

        labels: {
            title: "Understanding Medicine Labels",
            text:
                "Medicine labels contain the active ingredient, " +
                "strength, formulation, expiry date and warnings."
        },

        frequency: {
            title: "Understanding Dose Frequency",
            text:
                "Frequency describes how often a medicine is used. " +
                "Follow the instructions of a qualified professional."
        },

        safety: {
            title: "Medication Safety Checks",
            text:
                "Check medicine identity, expiry date, allergies, " +
                "warnings and storage instructions."
        },

        professional: {
            title: "Professional Dose Verification",
            text:
                "Healthcare professionals verify medication instructions " +
                "using authoritative clinical references."
        }
    };

    const lesson = lessons[topic.value];

    result.replaceChildren();

    createTextElement(
        "h3",
        lesson ? lesson.title : "Select a topic first",
        result
    );

    createTextElement(
        "p",
        lesson
            ? lesson.text
            : "Please select an educational topic.",
        result
    );

    if (lesson) {
        createTextElement(
            "p",
            "Category: " +
            (currentDoseCategory === "adult"
                ? "Adult Health Education"
                : "Pediatric Health Education"),
            result
        );
    }

    result.classList.remove("hidden");
}

// 5. DRUG LIBRARY
// ---------------------------------------------

function selectLibraryCategory(category) {
    const selected = getElement("selectedCategory");

    if (!selected) return;

    const topics = {
        "General Information":
            "General medicine and health information.",

        "Uses & Purposes":
            "Educational information about medicine uses.",

        "Warnings & Precautions":
            "Medicine warnings and safety precautions.",

        "Side Effects":
            "General medicine side-effect information.",

        "Interactions":
            "Why healthcare professionals check medicine interactions.",

        "Storage Information":
            "General medicine storage information."
    };

    selected.textContent =
        topics[category] ||
        "Explore educational medicine resources.";
}

// 6. PATIENT INFORMATION
// ---------------------------------------------

function getPatientInformation() {
    return {
        name: readValue("patientName"),
        sex: readValue("patientSex"),
        category: readValue("patientCategory"),
        age: readValue("patientAge"),
        ageUnit: readValue("ageUnit"),
        weight: readValue("weight"),
        height: readValue("height"),
        condition: readValue("condition"),
        symptoms: readValue("symptoms"),
        medicalHistory: readValue("medicalHistory"),
        drug: readValue("drug"),
        strength: readValue("drugStrength"),
        form: readValue("drugForm"),
        allergy: readValue("allergy"),
        kidney: readValue("kidney"),
        liver: readValue("liver"),
        otherMeds: readValue("otherMeds")
    };
}

// 7. PATIENT VALIDATION
// ---------------------------------------------

function validatePatient(patient) {
    const errors = [];

    const age = Number(patient.age);
    const weight = Number(patient.weight);
    const height = Number(patient.height);

    if (!patient.category) {
        errors.push("Select patient category.");
    }

    if (
        !patient.age ||
        !Number.isFinite(age) ||
        age <= 0
    ) {
        errors.push("Enter a valid age.");
    }

    if (!patient.ageUnit) {
        errors.push("Select age unit.");
    }

    if (
        !patient.weight ||
        !Number.isFinite(weight) ||
        weight <= 0
    ) {
        errors.push("Enter a valid weight in kg.");
    }

    if (
        patient.height &&
        (!Number.isFinite(height) || height <= 0)
    ) {
        errors.push("Enter a valid height.");
    }

    if (!patient.drug) {
        errors.push("Enter medicine name.");
    }

    if (!patient.sex) {
        errors.push("Select patient sex.");
    }

    if (!patient.allergy) {
        errors.push("Select allergy status.");
    }

    if (!patient.kidney) {
        errors.push("Select kidney function status.");
    }

    if (!patient.liver) {
        errors.push("Select liver function status.");
    }

    return errors;
}

// 8. AGE CATEGORY CHECK
// ---------------------------------------------

function getAgeInYears(patient) {
    const age = Number(patient.age);
    const unit = patient.ageUnit.toLowerCase();

    if (unit.includes("month")) {
        return age / 12;
    }

    if (unit.includes("day")) {
        return age / 365.25;
    }

    return age;
}

function checkAgeCategory(patient) {
    const age = getAgeInYears(patient);
    const category = patient.category.toLowerCase();

    if (
        category === "adult" &&
        age < 18
    ) {
        return "Age/category mismatch: professional verification required.";
    }

    if (
        (category === "pediatric" || category === "child") &&
        age >= 18
    ) {
        return "Age/category mismatch: professional verification required.";
    }

    return "Age/category information recorded; this does not confirm dose eligibility.";
}

// 9. CLINICAL SAFETY REVIEW
// ---------------------------------------------

function runDrugSafetyReview(patient) {
    const issues = [];
    const checks = [];

    if (!patient.condition) {
        issues.push("Medical condition is missing.");
    } else {
        checks.push("Medical condition has been entered.");
    }

    if (!patient.medicalHistory) {
        issues.push("Medical history is missing.");
    } else {
        checks.push("Medical history has been entered.");
    }

    if (!patient.strength) {
        issues.push("Medicine strength is missing.");
    } else {
        checks.push("Medicine strength has been entered.");
    }

    if (!patient.form) {
        issues.push("Medicine formulation is missing.");
    } else {
        checks.push("Medicine formulation has been entered.");
    }

    if (patient.allergy !== "None known") {
        issues.push("Allergy status requires professional review.");
    } else {
        checks.push("No known allergy has been reported; this is not independent verification.");
    }

    if (patient.kidney !== "Documented normal") {
        issues.push("Kidney function requires professional review.");
    } else {
        checks.push("Kidney status is recorded as normal; verify supporting clinical records.");
    }

    if (patient.liver !== "Documented normal") {
        issues.push("Liver function requires professional review.");
    } else {
        checks.push("Liver status is recorded as normal; verify supporting clinical records.");
    }

    if (patient.otherMeds) {
        issues.push("Other medicines must be checked for possible interactions.");
    } else {
        issues.push("Other medicine information is missing; interaction review is incomplete.");
    }

    const ageCheck = checkAgeCategory(patient);

    if (ageCheck.startsWith("Age/category mismatch")) {
        issues.push(ageCheck);
    } else {
        checks.push(ageCheck);
    }

    return {
        status: issues.length > 0
            ? "Professional review required"
            : "Information checklist completed — clinical approval not established",

        issues,
        checks
    };
}

// 10. DOSE CALCULATION STATUS
// ---------------------------------------------

function calculateDrugDose(patient, drugName) {
    if (!patient || !drugName) {
        return {
            success: false,
            message: "Patient information and medicine name are required."
        };
    }

    return {
        success: false,
        message:
            "No validated medicine-specific clinical rules are connected. " +
            "No patient-specific dose or medicine suitability can be established."
    };
}

function displayDrugDoseResult(patient, drugName, output) {
    const section = document.createElement("section");
    section.className = "result";

    createTextElement(
        "h3",
        "Dose Calculation Status",
        section
    );

    const calculation = calculateDrugDose(patient, drugName);

    createTextElement(
        "p",
        calculation.message,
        section
    );

    createTextElement(
        "p",
        "Dose suitability: Not established.",
        section
    );

    createTextElement(
        "p",
        "A qualified healthcare professional must verify any treatment instructions.",
        section
    );

    output.appendChild(section);
}

// 11. MEDICINE REFERENCES
// ---------------------------------------------

function addMedicineReferences(drugName, output) {
    createTextElement(
        "h3",
        "Medicine Information References",
        output
    );

    const query = encodeURIComponent(drugName);

    const references = [
        {
            label: "DailyMed — Search medicine labels",
            url:
                "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=" +
                query
        },
        {
            label: "MedlinePlus — Drug information",
            url: "https://medlineplus.gov/druginformation.html"
        },
        {
            label: "NHS — Medicines",
            url: "https://www.nhs.uk/medicines/"
        }
    ];

    references.forEach(reference => {
        const paragraph = document.createElement("p");
        const link = document.createElement("a");

        link.href = reference.url;
        link.textContent = reference.label;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        paragraph.appendChild(link);
        output.appendChild(paragraph);
    });
}

// 12. MAIN PATIENT REVIEW
// ---------------------------------------------

function reviewPatientInfo(event) {
    if (event) {
        event.preventDefault();
    }

    const form = getElement("patientForm");
    const result = getElement("result");

    if (!form || !result) return;

    if (!form.reportValidity()) return;

    const patient = getPatientInformation();
    const errors = validatePatient(patient);

    result.replaceChildren();

    if (errors.length > 0) {
        createTextElement(
            "h3",
            "Please correct these details:",
            result
        );

        addList(result, errors);
        result.classList.remove("hidden");
        return;
    }

    const safetyReview = runDrugSafetyReview(patient);

    createTextElement(
        "h2",
        "DrugDose Medication Safety Report",
        result
    );

    createTextElement(
        "p",
        "Educational prototype — not a prescribing system.",
        result
    );

    createTextElement(
        "h3",
        "Patient Information",
        result
    );

    addList(result, [
        "Patient identifier: " + (patient.name || "Not provided"),
        "Sex: " + patient.sex,
        "Category: " + patient.category,
        "Age: " + patient.age + " " + patient.ageUnit,
        "Weight: " + patient.weight + " kg",
        "Height: " + (patient.height || "Not provided"),
        "Condition: " + (patient.condition || "Not provided"),
        "Symptoms: " + (patient.symptoms || "Not provided"),
        "Medical history: " +
            (patient.medicalHistory || "Not provided")
    ]);

    createTextElement(
        "h3",
        "Medicine Information",
        result
    );

    addList(result, [
        "Medicine: " + patient.drug,
        "Strength: " + (patient.strength || "Not provided"),
        "Form: " + (patient.form || "Not provided")
    ]);

    createTextElement(
        "h3",
        "Clinical Safety Review",
        result
    );

    addList(result, [
        "Allergy status: " + patient.allergy,
        "Kidney function: " + patient.kidney,
        "Liver function: " + patient.liver,
        "Other medicines: " + (patient.otherMeds || "Not provided")
    ]);

    createTextElement(
        "h3",
        "Completed Information Checks",
        result
    );

    if (safetyReview.checks.length > 0) {
        addList(result, safetyReview.checks);
    } else {
        createTextElement(
            "p",
            "No checks could be completed.",
            result
        );
    }

    createTextElement(
        "h3",
        "Warnings Requiring Review",
        result
    );

    if (safetyReview.issues.length > 0) {
        addList(result, safetyReview.issues);
    } else {
        createTextElement(
            "p",
            "No missing checklist items were detected. This does not mean the medicine is safe or approved.",
            result
        );
    }

    createTextElement(
        "p",
        "Checklist status: " + safetyReview.status,
        result
    );

    displayDrugDoseResult(
        patient,
        patient.drug,
        result
    );

    addMedicineReferences(patient.drug, result);

    createTextElement(
        "p",
        "DEMO ONLY: Do not enter real patient information. " +
        "This educational prototype does not diagnose, prescribe, " +
        "calculate or approve treatment.",
        result
    );

    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// 13. MEDICINE UNIT CONVERTER
// ---------------------------------------------

function convertMedicineUnits() {
    const input =
        getElement("conversionValue") ||
        getElement("unitAmount");

    const unit =
        getElement("conversionUnit") ||
        getElement("fromUnit");

    const output =
        getElement("conversionResult") ||
        getElement("unitResult");

    if (!input || !unit || !output) return;

    const raw = input.value.trim();
    const value = Number(raw);

    if (
        raw === "" ||
        !Number.isFinite(value) ||
        value < 0
    ) {
        showNotice(
            output,
            "Enter a valid non-negative number."
        );
        return;
    }

    const factors = {
        mcg: 0.000001,
        mg: 0.001,
        g: 1
    };

    const selectedUnit = unit.value;

    if (!Object.prototype.hasOwnProperty.call(
        factors,
        selectedUnit
    )) {
        showNotice(output, "Select mg, mcg or g.");
        return;
    }

    const grams = value * factors[selectedUnit];
    const milligrams = grams * 1000;
    const micrograms = milligrams * 1000;

    output.textContent =
        value + " " + selectedUnit +
        " = " + Number(milligrams.toPrecision(8)) + " mg" +
        " = " + Number(micrograms.toPrecision(8)) + " mcg" +
        " = " + Number(grams.toPrecision(8)) + " g. " +
        "Mass conversion only; not a patient dose.";

    output.classList.remove("hidden");
}

// 14. PRESCRIPTION VALUE REVIEW
// ---------------------------------------------

function verifyPrescription() {
    const doseInput = getElement("prescribedDose");
    const unitInput = getElement("prescribedUnit");
    const result = getElement("prescriptionResult");

    if (!doseInput || !unitInput || !result) return;

    const raw = doseInput.value.trim();
    const dose = Number(raw);

    if (
        raw === "" ||
        !Number.isFinite(dose) ||
        dose <= 0
    ) {
        showNotice(
            result,
            "Enter a valid positive amount."
        );
        return;
    }

    result.replaceChildren();

    createTextElement(
        "h3",
        "Entered Prescription Value",
        result
    );

    createTextElement(
        "p",
        dose + " " + unitInput.value,
        result
    );

    createTextElement(
        "p",
        "This value is displayed only. Clinical suitability, accuracy and safety have not been verified.",
        result
    );

    result.classList.remove("hidden");
}

// 15. WEBSITE INITIALIZATION
// ---------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    showPage("home");
    initializeLearningTopics();

    console.log(
        "DrugDose educational script loaded successfully."
    );
});

// =============================================
// END OF SCRIPT
// =============================================
