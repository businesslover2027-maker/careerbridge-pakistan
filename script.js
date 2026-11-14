
// CAREERBRIDGE PAKISTAN - SCRIPT.JS

document.addEventListener("DOMContentLoaded", function () {

    // MOBILE MENU
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }

    // JOB SEARCH
    const searchForm = document.getElementById("jobSearchForm");
    const jobSearch = document.getElementById("jobSearch");
    const locationSearch = document.getElementById("locationSearch");
    const jobType = document.getElementById("jobType");
    const jobCards = document.querySelectorAll(".job-card");

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const keyword = jobSearch.value.toLowerCase().trim();
            const location = locationSearch.value.toLowerCase().trim();
            const type = jobType.value.toLowerCase().trim();

            jobCards.forEach(card => {
                const text = card.textContent.toLowerCase();

                const matchesKeyword = !keyword || text.includes(keyword);
                const matchesLocation = !location || text.includes(location);
                const matchesType = !type || text.includes(type);

                card.style.display =
                    matchesKeyword && matchesLocation && matchesType
                    ? "block" : "none";
            });
        });
    }

    // CV BUILDER
    const cvForm = document.getElementById("cvForm");
    const cvPreview = document.getElementById("cvPreview");

    if (cvForm && cvPreview) {
        cvForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("cvName").value.trim();
            const email = document.getElementById("cvEmail").value.trim();
            const phone = document.getElementById("cvPhone").value.trim();
            const education = document.getElementById("cvEducation").value.trim();
            const skills = document.getElementById("cvSkills").value.trim();
            const experience = document.getElementById("cvExperience").value.trim();
            const summary = document.getElementById("cvSummary").value.trim();

            if (!name) {
                alert("Please enter your full name.");
                return;
            }

            // Use textContent to safely display user-entered information.
            cvPreview.replaceChildren();

            function addSection(tag, text) {
                const element = document.createElement(tag);
                element.textContent = text;
                cvPreview.appendChild(element);
            }

            addSection("h2", name);
            addSection("p", "Email: " + email);
            addSection("p", "Phone: " + phone);
            addSection("h3", "Professional Summary");
            addSection("p", summary || "Not provided");
            addSection("h3", "Education");
            addSection("p", education || "Not provided");
            addSection("h3", "Skills");
            addSection("p", skills || "Not provided");
            addSection("h3", "Experience");
            addSection("p", experience || "Not provided");

            alert("Your CV preview is ready!");
        });
    }

    // PRINT / SAVE CV AS PDF
    const printCV = document.getElementById("printCV");

    if (printCV) {
        printCV.addEventListener("click", function () {
            window.print();
        });
    }

    // JOB APPLICATION MODAL
    const applicationModal = document.getElementById("applicationModal");
    const selectedJob = document.getElementById("selectedJob");
    const closeModal = document.getElementById("closeModal");
    const applicationForm = document.getElementById("applicationForm");
    const applicationMessage = document.getElementById("applicationMessage");

    document.querySelectorAll(".apply-btn").forEach(button => {
        button.addEventListener("click", function () {
            selectedJob.textContent =
                "Position: " + button.dataset.job;

            applicationMessage.textContent = "";
            applicationModal.classList.add("active");
        });
    });

    if (closeModal) {
        closeModal.addEventListener("click", function () {
            applicationModal.classList.remove("active");
        });
    }

    if (applicationModal) {
        applicationModal.addEventListener("click", function (event) {
            if (event.target === applicationModal) {
                applicationModal.classList.remove("active");
            }
        });
    }

    if (applicationForm) {
        applicationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            applicationMessage.textContent =
                "Demo only: Your application was not sent to an employer.";

            applicationMessage.style.color = "#0D9488";
            applicationForm.reset();
        });
    }

    // CLOSE MODAL WITH ESCAPE KEY
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && applicationModal) {
            applicationModal.classList.remove("active");
        }
    });

});
