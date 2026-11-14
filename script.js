
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
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });
    }

    // SEARCH JOBS, INTERNSHIPS AND SCHOLARSHIPS
    const searchForm = document.getElementById("jobSearchForm");
    const jobSearch = document.getElementById("jobSearch");
    const locationSearch = document.getElementById("locationSearch");
    const jobType = document.getElementById("jobType");

    const opportunityCards = document.querySelectorAll(
        ".job-card, .internship-card, .scholarship-card"
    );

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const keyword = jobSearch
                ? jobSearch.value.toLowerCase().trim()
                : "";

            const location = locationSearch
                ? locationSearch.value.toLowerCase().trim()
                : "";

            const type = jobType
                ? jobType.value.toLowerCase().trim()
                : "";

            opportunityCards.forEach(card => {
                const text = card.textContent.toLowerCase();

                const isJob = card.classList.contains("job-card");
                const isInternship = card.classList.contains("internship-card");
                const isScholarship = card.classList.contains("scholarship-card");

                let matchesType = true;

                if (type && type !== "all") {
                    if (type.includes("internship")) {
                        matchesType = isInternship;
                    } else if (type.includes("scholarship")) {
                        matchesType = isScholarship;
                    } else if (
                        type === "job" ||
                        type === "jobs" ||
                        type === "full-time" ||
                        type === "part-time"
                    ) {
                        matchesType = isJob && text.includes(type.replace("s", ""));
                        
                        if (type === "job" || type === "jobs") {
                            matchesType = isJob;
                        }
                    } else {
                        matchesType = text.includes(type);
                    }
                }

                const matchesKeyword = !keyword || text.includes(keyword);
                const matchesLocation = !location || text.includes(location);

                card.style.display =
                    matchesKeyword && matchesLocation && matchesType
                        ? ""
                        : "none";
            });

            // Show results section
            const firstVisibleCard = Array.from(opportunityCards).find(
                card => card.style.display !== "none"
            );

            if (firstVisibleCard) {
                firstVisibleCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            } else {
                alert("No matching opportunities found. Try different search words.");
            }
        });
    }

    // CV BUILDER
    const cvForm = document.getElementById("cvForm");
    const cvPreview = document.getElementById("cvPreview");

    if (cvForm && cvPreview) {
        cvForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const getValue = id => {
                const field = document.getElementById(id);
                return field ? field.value.trim() : "";
            };

            const name = getValue("cvName");
            const email = getValue("cvEmail");
            const phone = getValue("cvPhone");
            const education = getValue("cvEducation");
            const skills = getValue("cvSkills");
            const experience = getValue("cvExperience");
            const summary = getValue("cvSummary");

            if (!name) {
                alert("Please enter your full name.");
                return;
            }

            cvPreview.replaceChildren();

            function addSection(tag, content) {
                const element = document.createElement(tag);
                element.textContent = content;
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
            if (!applicationModal || !selectedJob) return;

            selectedJob.textContent = "Position: " + (button.dataset.job || "Selected job");

            if (applicationMessage) {
                applicationMessage.textContent = "";
            }

            applicationModal.classList.add("active");
        });
    });

    if (closeModal && applicationModal) {
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

            if (applicationMessage) {
                applicationMessage.textContent =
                    "Demo only: Your application was not sent to an employer.";

                applicationMessage.style.color = "#0D9488";
            }

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
