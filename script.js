const internshipsData = [
  {
    id: 1,
    title: "Java Full Stack Developer Intern",
    company: "TechNova Solutions",
    domain: "Engineering",
    location: "Remote / Bengaluru",
    duration: "6 Months",
    stipend: "₹25,000 / month"
  },
  {
    id: 2,
    title: "UI/UX Product Designer",
    company: "Creative Studio",
    domain: "Design",
    location: "Hybrid / Chennai",
    duration: "3 Months",
    stipend: "₹18,000 / month"
  },
  {
    id: 3,
    title: "Associate Product Manager Intern",
    company: "NextGen Mobility",
    domain: "Product",
    location: "Remote",
    duration: "6 Months",
    stipend: "₹30,000 / month"
  },
  {
    id: 4,
    title: "Digital Marketing Specialist",
    company: "GrowthPulse",
    domain: "Marketing",
    location: "On-site / Hyderabad",
    duration: "4 Months",
    stipend: "₹15,000 / month"
  },
  {
    id: 5,
    title: "Backend Engineering Intern (Java/Spring)",
    company: "CloudScale Systems",
    domain: "Engineering",
    location: "Remote",
    duration: "6 Months",
    stipend: "₹28,000 / month"
  }
];

const container = document.getElementById("internships-container");
const searchInput = document.getElementById("search-input");
const domainSelect = document.getElementById("domain-select");
const emptyState = document.getElementById("empty-state");
const errorState = document.getElementById("error-state");
const statusMessage = document.getElementById("status-message");
const resetBtn = document.getElementById("reset-btn");
const retryBtn = document.getElementById("retry-btn");

function renderInternships(list) {
  container.innerHTML = "";

  if (list.length === 0) {
    emptyState.classList.remove("hidden");
    statusMessage.textContent = "No internships match your filter criteria.";
    return;
  }

  emptyState.classList.add("hidden");
  errorState.classList.add("hidden");
  statusMessage.textContent = `Showing ${list.length} internship opportunities.`;

  list.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div>
        <span class="badge">${escapeHTML(item.domain)}</span>
        <h2>${escapeHTML(item.title)}</h2>
        <p class="company">${escapeHTML(item.company)}</p>
        <div class="details">
          <span>📍 <strong>Location:</strong> ${escapeHTML(item.location)}</span>
          <span>⏱️ <strong>Duration:</strong> ${escapeHTML(item.duration)}</span>
          <span>💰 <strong>Stipend:</strong> ${escapeHTML(item.stipend)}</span>
        </div>
      </div>
      <a href="#" class="apply-btn" aria-label="Apply for ${escapeHTML(item.title)} at ${escapeHTML(item.company)}">Apply Now</a>
    `;

    container.appendChild(card);
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function filterInternships() {
  try {
    const query = searchInput.value.toLowerCase().trim();
    const selectedDomain = domainSelect.value;

    const filtered = internshipsData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.company.toLowerCase().includes(query);
      const matchesDomain =
        selectedDomain === "all" || item.domain === selectedDomain;

      return matchesSearch && matchesDomain;
    });

    renderInternships(filtered);
  } catch (err) {
    container.innerHTML = "";
    emptyState.classList.add("hidden");
    errorState.classList.remove("hidden");
    statusMessage.textContent = "An error occurred while filtering opportunities.";
  }
}

searchInput.addEventListener("input", filterInternships);
domainSelect.addEventListener("change", filterInternships);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  domainSelect.value = "all";
  filterInternships();
});

retryBtn.addEventListener("click", () => {
  errorState.classList.add("hidden");
  filterInternships();
});

document.addEventListener("DOMContentLoaded", () => {
  renderInternships(internshipsData);
});
