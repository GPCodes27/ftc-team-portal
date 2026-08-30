const API_KEY = 'AIzaSyD-umZd1axooWwfjJRJm03TQfq8ugMoy9c';
const TEAM_PASSWORD_HASH = "683af9f25b5f0d48d28cce59a65b58c71e7644cf6765f25498e66f9e9c2dc016";
const ANNOUNCE_PASSWORD_HASH = "d8ccdf7dc72df93b31144b385eaea8594008abdd7e759f0dda8e21120df0f783";

async function checkPassword() {
    const stored = sessionStorage.getItem("auth");
    if (stored === TEAM_PASSWORD_HASH) return;

    while (true) {
        const entered = prompt("Enter Team Password");
        if (!entered) continue;

        const encoded = new TextEncoder().encode(entered);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

        if (hashHex === TEAM_PASSWORD_HASH) {
            sessionStorage.setItem("auth", hashHex);
            return;
        }
        alert("Incorrect password");
    }
}
// ================= NAV SETUP =================

const dashboardBtn = document.getElementById("dashboardBtn");
const calendarBtn = document.getElementById("calendarBtn");
const filesBtn = document.getElementById("filesBtn");
const portfolioBtn = document.getElementById("portfolioBtn");
const scriptBtn = document.getElementById("scriptBtn");
const ordersBtn = document.getElementById("ordersBtn");
const announceBtn = document.getElementById("announceBtn");

const navButtons = [dashboardBtn, calendarBtn, filesBtn, portfolioBtn, scriptBtn, ordersBtn, announceBtn];

const content = document.getElementById("content");

// ================= LOCATIONS ==================

const LOCATION_MAP = {
    0: {
        address: "7801 Woodmont Avenue, Bethesda, MD"
    }
};

// ================= COLOR MAPPING ==================

function getEventColor(title) {
    const lower = title.toLowerCase();

    if (lower.includes("full")) return "#00c0ce";
    if (lower.includes("code")) return "#00098e";
    if (lower.includes("build")) return "#4c8cd5";
    if (lower.includes("tournament") || lower.includes("championship")) return "#00cc47";
    if (lower.includes("drive")) return "#8400ff";
    if (lower.includes("outreach")) return "#ffb700";

    return "#6c6c6c";
}

// ================= PAGE RENDER FUNCTIONS =================

function createFileCard(title, description, link) {
    return `
        <div class="file-card">
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${link}" target="_blank" class="file-button">
                Open Folder
            </a>
        </div>
    `;
}

// ================= HELPER FUNCTIONS ==================

function renderDashboard() {
    return `
        <h2 id="page-title">Dashboard</h2>
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Week Coming Up</h3>
                <div id="upcomingEvents">Loading events...</div>
            </div>
            <div class="dashboard-card">
                <h3>Announcements</h3>
                <div id="dashAnnouncements">Loading...</div>
            </div>
        </div>
    `;
}

function checkPassword() {

    const entered = prompt("Enter Team Password");

    if (entered !== TEAM_PASSWORD) {
        alert("Incorrect password");
        checkPassword();
    }
}


function renderCalendar() {
    return `
        <h2 id="page-title">Calendar</h2>
        <div class="card">
            <div id="calendar"></div>
        </div>

        <div id="eventModal" class="modal hidden">
            <div class="modal-content">
                <span id="closeModal">&times;</span>
                <h3 id="modalTitle"></h3>
                <p id="modalTime"></p>
            </div>
        </div>
    `;
}

function renderFiles() {
    return `
        <h2 id="page-title">Team Files</h2>

        <div class="files-grid">
            ${createFileCard("Code Backups", "Upload robot code, configuration files, and zip backups.", "https://drive.google.com/drive/folders/1B8cSosZadzsbU6D_tnSVnWQwe7mK7Yey?usp=share_link")}
            ${createFileCard("CAD Files", "STEP files, exports, and mechanical designs.", "https://drive.google.com/drive/folders/177nFqM0VFN9i1jJphU3BGWyGrJACoJsP?usp=share_link")}
            ${createFileCard("Outreach Files", "Flyers, presentations, and sponsor materials.", "https://drive.google.com/drive/folders/1b-MEAWvLH4Hdw1HQ4t1Rqd1X7XLNpGnC?usp=share_link")}
            ${createFileCard("Photos + Videos", "Event photos, robot pictures, documentation, and match videos.", "https://drive.google.com/drive/folders/1x7mltQYSjQnjsxcYiflprPFzFxWgfMka?usp=share_link")}
        </div>

        <div class="dashboard-card" id="linksList" style="margin-top: 25px;">
            Loading links...
        </div>

        <div class="card" style="margin-top: 25px;">
            <h3 style="color:white; text-align:left; margin-top:0;">Add Link</h3>
            <div class="supply-form">
                <label>Title</label>
                <input type="text" id="linkTitle">
                <label>Description</label>
                <input type="text" id="linkDescription">
                <label>URL</label>
                <input type="url" id="linkURL" placeholder="https://">
                <button class="submit-button" id="linkSubmit">Add Link</button>
            </div>
        </div>
    `;
}

function renderPortfolio() {
    return `
        <h2 id="page-title">Portfolio</h2>

        <div class="card portfolio-card">
            <div class="portfolio-header">
                <p><strong>FTC Engineering Portfolio</strong></p>
                <p class="portfolio-note">
                    Team members: leave comments for suggested changes.
                </p>

                <a 
                    href="https://docs.google.com/presentation/d/19ct6RbYwrwColy2bmleiMFfgC0WrhxHGppSnsDRtFo0/edit"
                    target="_blank"
                    class="portfolio-button">
                    Open in Google Slides
                </a>
            </div>

            <div class="portfolio-slides-container">
                <iframe
                    src="https://docs.google.com/presentation/d/19ct6RbYwrwColy2bmleiMFfgC0WrhxHGppSnsDRtFo0/preview?slide=1&rm=minimal"
                    class="portfolio-frame">
                </iframe>
            </div>
        </div>
    `;
}

function renderOrders() {
    return `
        <h2 id="page-title">Orders</h2>

        <div class="dashboard-card" style="margin-bottom: 25px;">
            <h3>Supply Requests</h3>
            <div id="requestStatus">Loading requests...</div>
        </div>

        <div class="card request-card">
            <h3 style="color:white; text-align:left; margin-top:0;">Request Supplies</h3>
            <form id="supplyForm" class="supply-form">
                <label>Your Name</label>
                <input type="text" id="name" required>
                <label>Item Name</label>
                <input type="text" id="item" required>
                <label>Quantity</label>
                <input type="number" id="quantity" min="1" required>
                <label>SKU (if applicable)</label>
                <input type="text" id="sku">
                <label>Price ($)</label>
                <input type="number" step="0.01" id="price">
                <label>Reason for order</label>
                <textarea id="reason" rows="3"></textarea>
                <button type="submit" class="submit-button">Submit Request</button>
            </form>
        </div>

        <div id="successModal" class="modal hidden">
            <div class="modal-content success-content">
                <h3>Request Submitted ✅</h3>
                <p>Your supply request has been recorded.</p>
                <button id="closeSuccess">Close</button>
            </div>
        </div>
    `;
}

function renderAnnouncements() {
    return `
        <h2 id="page-title">Announcements</h2>

        <div class="dashboard-card" id="announceList" style="margin-bottom: 25px;">
            Loading announcements...
        </div>

        <div class="card">
            <h3 style="color:white; text-align:left; margin-top:0;">Post Announcement</h3>
            <div class="supply-form">
                <label>Title</label>
                <input type="text" id="announceTitle">
                <label>Message</label>
                <textarea id="announceBody" rows="4"></textarea>
                <button class="submit-button" id="announceSubmit">Post</button>
            </div>
        </div>
    `;
}

function renderScript() {
    return `
        <h2 id="page-title">Scripts</h2>

        <div class="card script-card">
            <div class="script-header">
                <p><strong>FTC Presentation Scripts</strong></p>
                <p class="script-note">
                    Team members: leave comments for suggested changes.
                </p>

                <a 
                    href="https://docs.google.com/document/d/1LU3FusB9f-m-Y18_x0LTjDgnjMr1BHf3maUC5GRoYTY/edit"
                    target="_blank"
                    class="script-button">
                    Open in Google Docs
                </a>
            </div>

            <iframe 
                src="https://docs.google.com/document/d/1LU3FusB9f-m-Y18_x0LTjDgnjMr1BHf3maUC5GRoYTY/preview"
                class="script-frame">
            </iframe>
        </div>
    `;
}


// ================= PAGE LOADER =================

function loadPage(renderFunction, activeButton) {
    content.innerHTML = renderFunction();
    navButtons.forEach(button => button.classList.remove("active"));
    activeButton.classList.add("active");

    if (renderFunction === renderDashboard) {
        loadUpcomingEvents();
        loadDashAnnouncements();
    }
    if (renderFunction === renderOrders) {
        loadSupplyRequests();
    }
    if (renderFunction === renderFiles) {
        loadLinks();
    }
}


// ================= EVENT LISTENERS =================

dashboardBtn.addEventListener("click", () => {
    loadPage(renderDashboard, dashboardBtn);
});

calendarBtn.addEventListener("click", () => {
    loadPage(renderCalendar, calendarBtn);

    setTimeout(() => {
        const calendarEl = document.getElementById('calendar');

        const isMobile = window.innerWidth < 700;
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: isMobile ? 'listWeek' : 'dayGridMonth',

            headerToolbar: isMobile
            ? {
                left: 'prev,next',
                center: 'title',
                right: 'listWeek'
            }
            : {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },

            buttonText: {
                today: 'Today',
                month: 'Month',
                week: 'Week',
            },

            googleCalendarApiKey: API_KEY,

            events: {
                googleCalendarId: '61cdcccee7a2174e5eb954440422208b0b09fee21209b49ad064c9821ac1ae20@group.calendar.google.com'
            },

            eventClick: function(info) {
                info.jsEvent.preventDefault();

                const modal = document.getElementById("eventModal");
                const title = document.getElementById("modalTitle");
                const time = document.getElementById("modalTime");
                const modalContent = document.querySelector(".modal-content");

                title.textContent = info.event.title;
                time.textContent = info.event.start.toLocaleString();

                const color = getEventColor(info.event.title);
                modalContent.style.borderTop = `8px solid ${color}`;

                // --- Parse LOCATION:X from description ---
                const description = info.event.extendedProps.description || "";
                const match = description.match(/LOCATION:(\d+)/);

                let locationText = "";

                if (match) {
                    const locationId = match[1];
                    const locationData = LOCATION_MAP[locationId];

                    if (locationData) {
                        locationText = `${locationData.address}`;
                    }
                }

                // Create or update location paragraph
                let locationEl = document.getElementById("modalLocation");

                if (!locationEl) {
                    locationEl = document.createElement("p");
                    locationEl.id = "modalLocation";
                    modalContent.appendChild(locationEl);
                }

                locationEl.textContent = locationText;

                modal.classList.remove("hidden");

                
            },

            eventDidMount: function(info) {
                const color = getEventColor(info.event.title);

                info.el.style.backgroundColor = color;
                info.el.style.color = "#ffffff";
                info.el.style.border = "none";
            }
        });

        calendar.render();
        document.getElementById("closeModal").addEventListener("click", function() {
        document.getElementById("eventModal").classList.add("hidden");
        
    });
    }, 0);
});

filesBtn.addEventListener("click", () => {
    loadPage(renderFiles, filesBtn);
});

portfolioBtn.addEventListener("click", () => {
    loadPage(renderPortfolio, portfolioBtn);
});

ordersBtn.addEventListener("click", () => {
    loadPage(renderOrders, ordersBtn);
});

announceBtn.addEventListener("click", () => {
    loadPage(renderAnnouncements, announceBtn);
    loadAnnouncements();
});



scriptBtn.addEventListener("click", () => {
    loadPage(renderScript, scriptBtn);
});

//google form stuff
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwTrtODCvtsPKR8AVfnW3NolPz7X4859uvMc3HnJ4fre19cyz5B5ny4ehpZ7iO-kPst/exec";

document.addEventListener("submit", function(e) {
    if (e.target && e.target.id === "supplyForm") {

        e.preventDefault();

        const data = {
            name: document.getElementById("name").value,
            item: document.getElementById("item").value,
            quantity: document.getElementById("quantity").value,
            sku: document.getElementById("sku").value,
            price: document.getElementById("price").value,
            reason: document.getElementById("reason").value
        };

        fetch(WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            document.getElementById("successModal").classList.remove("hidden");
            document.getElementById("supplyForm").reset();
        })
        .catch(error => {
            alert("There was an error submitting the request.");
        });
    }
});

document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "closeSuccess") {
        document.getElementById("successModal").classList.add("hidden");
    }
});

document.addEventListener("click", async function(e) {
    if (e.target && e.target.id === "announceSubmit") {
        const title = document.getElementById("announceTitle").value.trim();
        const body = document.getElementById("announceBody").value.trim();
        if (!title || !body) { alert("Please fill in both fields."); return; }

        const entered = prompt("Captain password required:");
        if (!entered) return;

        const encoded = new TextEncoder().encode(entered);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

        if (hashHex !== ANNOUNCE_PASSWORD_HASH) {
            alert("Incorrect password.");
            return;
        }

        fetch(WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify({ sheet: "announcements", title, body })
        })
        .then(res => res.json())
        .then(() => {
            document.getElementById("announceTitle").value = "";
            document.getElementById("announceBody").value = "";
            loadAnnouncements();
        })
        .catch(() => alert("Error posting announcement."));
    }
});

document.addEventListener("click", async function(e) {
    if (e.target && e.target.id === "linkSubmit") {
        const title = document.getElementById("linkTitle").value.trim();
        const description = document.getElementById("linkDescription").value.trim();
        const url = document.getElementById("linkURL").value.trim();

        if (!title || !url) { alert("Title and URL are required."); return; }

        const entered = prompt("Captain password required:");
        if (!entered) return;

        const encoded = new TextEncoder().encode(entered);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

        if (hashHex !== ANNOUNCE_PASSWORD_HASH) {
            alert("Incorrect password.");
            return;
        }

        fetch(WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify({ sheet: "links", title, description, url })
        })
        .then(res => res.json())
        .then(() => {
            document.getElementById("linkTitle").value = "";
            document.getElementById("linkDescription").value = "";
            document.getElementById("linkURL").value = "";
            loadLinks();
        })
        .catch(() => alert("Error adding link."));
    }
});

function loadUpcomingEvents() {

    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    const calendarId = '61cdcccee7a2174e5eb954440422208b0b09fee21209b49ad064c9821ac1ae20@group.calendar.google.com';

    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}&timeMin=${now.toISOString()}&timeMax=${nextWeek.toISOString()}&singleEvents=true&orderBy=startTime`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("upcomingEvents");
            container.innerHTML = "";

            if (!data.items || data.items.length === 0) {
                container.innerHTML = "<p>No upcoming events.</p>";
                return;
            }

            data.items.forEach(event => {

                const date = new Date(event.start.dateTime || event.start.date);

                const color = getEventColor(event.summary);

                const div = document.createElement("div");
                div.className = "dashboard-item";

                div.innerHTML = `
                    <strong style="color:${color}">
                        ${event.summary}
                    </strong><br>
                    ${date.toLocaleString()}
                `;

                container.appendChild(div);
            });
        });
}
function loadSupplyRequests() {

    fetch(WEB_APP_URL)
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById("requestStatus");
            container.innerHTML = "";

            if (!data.length) {
                container.innerHTML = "<p>No requests right now.</p>";
                return;
            }

            const threeWeeks = 21 * 24 * 60 * 60 * 1000;
            const now = new Date();

            data.reverse().forEach(req => {

                const status = (req.Status || "").toLowerCase();
                const requestDate = new Date(req.Timestamp || req.Date || req[""]); 

                // Hide delivered items older than 3 weeks
                if (status.includes("delivered") && (now - requestDate > threeWeeks)) {
                    return;
                }

                let statusClass = "";

                if (status.includes("pending")) statusClass = "status-pending";
                else if (status.includes("ordered")) statusClass = "status-ordered";
                else if (status.includes("received")) statusClass = "status-received";
                else if (status.includes("delivered")) statusClass = "status-delivered";

                const div = document.createElement("div");
                div.className = "dashboard-item";

                div.innerHTML = `
                    <strong>${req.Item}</strong><br>
                    ${req.Quantity} requested by ${req.Name}<br>
                    <span class="${statusClass}">${req.Status}</span>
                `;

                container.appendChild(div);
            });
        });
}

function loadAnnouncements() {
    fetch(WEB_APP_URL + "?sheet=announcements")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("announceList");
            container.innerHTML = "<h3 style='margin-top:0;'>Announcements</h3>";

            const now = new Date();
            const twoDays = 2 * 24 * 60 * 60 * 1000;
            const tenDays = 10 * 24 * 60 * 60 * 1000;
            const twoMonths = 60 * 24 * 60 * 60 * 1000;

            const recent = [];
            const older = [];

            data.forEach(a => {
                const age = now - new Date(a.Timestamp);
                if (age <= twoMonths) {
                    if (age <= twoDays) a._badge = "NEW";
                    else if (age <= tenDays) a._badge = "RECENT";
                    recent.push(a);
                } else {
                    older.push(a);
                }
            });

            if (recent.length === 0 && older.length === 0) {
                container.innerHTML += "<p>No announcements yet.</p>";
                return;
            }

            recent.forEach(a => {
                const date = new Date(a.Timestamp);
                const div = document.createElement("div");
                div.className = "dashboard-item";
                div.innerHTML = `
                    ${a._badge ? `<span class="announce-badge${a._badge === 'RECENT' ? ' recent' : ''}">${a._badge}</span> ` : ''}
                    <strong>${a.Title}</strong><br>
                    <span style="font-size:13px; color:#555;">${date.toLocaleDateString()}</span>
                    <p style="margin: 6px 0 0;">${a.Body}</p>
                `;
                container.appendChild(div);
            });

            if (older.length > 0) {
                const toggle = document.createElement("button");
                toggle.className = "older-toggle";
                toggle.textContent = `Show ${older.length} older announcement${older.length > 1 ? 's' : ''}`;

                const olderDiv = document.createElement("div");
                olderDiv.style.display = "none";
                olderDiv.style.marginTop = "10px";

                older.forEach(a => {
                    const date = new Date(a.Timestamp);
                    const div = document.createElement("div");
                    div.className = "dashboard-item";
                    div.innerHTML = `
                        <strong>${a.Title}</strong><br>
                        <span style="font-size:13px; color:#555;">${date.toLocaleDateString()}</span>
                        <p style="margin: 6px 0 0;">${a.Body}</p>
                    `;
                    olderDiv.appendChild(div);
                });

                toggle.addEventListener("click", () => {
                    const hidden = olderDiv.style.display === "none";
                    olderDiv.style.display = hidden ? "block" : "none";
                    toggle.textContent = hidden
                        ? "Hide older announcements"
                        : `Show ${older.length} older announcement${older.length > 1 ? 's' : ''}`;
                });

                container.appendChild(toggle);
                container.appendChild(olderDiv);
            }
        });
}

function loadLinks() {
    fetch(WEB_APP_URL + "?sheet=links")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("linksList");
            container.innerHTML = "<h3 style='margin-top:0;'>Team Links</h3>";

            if (!data.length) {
                container.innerHTML += "<p>No links yet.</p>";
                return;
            }

            data.forEach(link => {
                const div = document.createElement("div");
                div.className = "dashboard-item";
                div.innerHTML = `
                    <strong><a href="${link.URL}" target="_blank" style="color:#4c8cd5;">${link.Title}</a></strong><br>
                    <span style="font-size:13px; color:#555;">${link.Description}</span>
                `;
                container.appendChild(div);
            });
        });
}

function loadDashAnnouncements() {
    fetch(WEB_APP_URL + "?sheet=announcements")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("dashAnnouncements");
            container.innerHTML = "";

            const now = new Date();
            const twoDays = 2 * 24 * 60 * 60 * 1000;
            const tenDays = 10 * 24 * 60 * 60 * 1000;

            const visible = data.filter(a => (now - new Date(a.Timestamp)) <= tenDays);

            if (visible.length === 0) {
                container.innerHTML = "<p>No recent announcements.</p>";
                return;
            }

            const shown = visible.slice(0, 2);
            const remaining = visible.length - 2;

            shown.forEach(a => {
                const date = new Date(a.Timestamp);
                const age = now - date;
                const badge = age <= twoDays ? "NEW" : "RECENT";
                const div = document.createElement("div");
                div.className = "dashboard-item";
                div.innerHTML = `
                    <span class="announce-badge${badge === 'RECENT' ? ' recent' : ''}">${badge}</span>
                    <strong>${a.Title}</strong><br>
                    <span style="font-size:13px; color:#555;">${date.toLocaleDateString()}</span>
                    <p style="margin: 6px 0 0;">${a.Body}</p>
                `;
                container.appendChild(div);
            });

            if (remaining > 0) {
                const div = document.createElement("div");
                div.style.marginTop = "10px";
                div.style.fontSize = "13px";
                div.style.cursor = "pointer";
                div.style.paddingTop = "10px";
                div.style.borderTop = "1px solid #eee";
                div.innerHTML = `<a style="color:#4c8cd5;">+${remaining} more announcement${remaining > 1 ? 's' : ''}</a>`;
                div.addEventListener("click", () => {
                    loadPage(renderAnnouncements, announceBtn);
                    loadAnnouncements();
                });
                container.appendChild(div);
            }
        });
}

// Default page on load
loadPage(renderDashboard, dashboardBtn);
checkPassword();
