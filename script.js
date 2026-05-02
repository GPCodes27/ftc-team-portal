const API_KEY = 'AIzaSyD-umZd1axooWwfjJRJm03TQfq8ugMoy9c';
const TEAM_PASSWORD = "foxbots25657";
// ================= NAV SETUP =================

const dashboardBtn = document.getElementById("dashboardBtn");
const calendarBtn = document.getElementById("calendarBtn");
const filesBtn = document.getElementById("filesBtn");
const portfolioBtn = document.getElementById("portfolioBtn");
const scriptBtn = document.getElementById("scriptBtn");
const ordersBtn = document.getElementById("ordersBtn");

const navButtons = [dashboardBtn, calendarBtn, filesBtn, portfolioBtn, scriptBtn, ordersBtn];

const content = document.getElementById("content");

// Attendance nav button (added)
const attendanceBtn = document.getElementById("attendanceBtn");
// Add it to the existing navButtons array without changing the original line
navButtons.push(attendanceBtn);


// ================= LOCATIONS ==================

const LOCATION_MAP = {
    0: {
        name: "Build Space",
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
                <div id="upcomingEvents">
                    Loading events...
                </div>
            </div>

            <div class="dashboard-card">
                <h3>Supply Requests</h3>
                <div id="requestStatus">
                    Loading requests...
                </div>
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

            ${createFileCard(
                "Code Backups",
                "Upload robot code, configuration files, and zip backups.",
                "https://drive.google.com/drive/folders/1B8cSosZadzsbU6D_tnSVnWQwe7mK7Yey?usp=share_link"
            )}

            ${createFileCard(
                "CAD Files",
                "STEP files, exports, and mechanical designs.",
                "https://drive.google.com/drive/folders/177nFqM0VFN9i1jJphU3BGWyGrJACoJsP?usp=share_link"
            )}

            ${createFileCard(
                "Outreach Files",
                "Flyers, presentations, and sponsor materials.",
                "https://drive.google.com/drive/folders/1b-MEAWvLH4Hdw1HQ4t1Rqd1X7XLNpGnC?usp=share_link"
            )}

            ${createFileCard(
                "Photos + Videos",
                "Event photos, robot pictures, documentation, and match videos.",
                "https://drive.google.com/drive/folders/1x7mltQYSjQnjsxcYiflprPFzFxWgfMka?usp=share_link"
            )}

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
                    href="https://docs.google.com/document/d/1g64aMpLBgv07UIz9rs7Km--LGRjVMawZTHpbmrVjAz0/edit"
                    target="_blank"
                    class="portfolio-button">
                    Open in Google Docs
                </a>
            </div>

            <iframe 
                src="https://docs.google.com/document/d/1g64aMpLBgv07UIz9rs7Km--LGRjVMawZTHpbmrVjAz0/preview"
                class="portfolio-frame">
            </iframe>
        </div>
    `;
}

function renderOrders() {
    return `
        <h2 id="page-title">Request Supplies</h2>

        <div class="card request-card">
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

                <button type="submit" class="submit-button">
                    Submit Request
                </button>
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

function renderAttendance() {
    return `
        <h2 id="page-title">Attendance</h2>

        <div class="attendance-layout">

            <div class="attendance-section">
                <h3>Meetings</h3>
                <p class="attendance-section-desc">
                    Team meetings: everyone is marked <strong>Present</strong> by default. Switch to Absent and give a reason if you miss a meeting.
                </p>
                <div id="attendanceMeetingsContainer">
                    <p class="attendance-empty">Loading meetings...</p>
                </div>
            </div>

            <div class="attendance-section">
                <h3>Events</h3>
                <p class="attendance-section-desc">
                    Outreach, tournaments, and other events: everyone is marked <strong>Absent</strong> by default. Switch to Present if you attend.
                </p>
                <div id="attendanceEventsContainer">
                    <p class="attendance-empty">Loading events...</p>
                </div>
            </div>

        </div>
    `;
}



// ================= PAGE LOADER =================

function loadPage(renderFunction, activeButton) {

    content.innerHTML = renderFunction();

    navButtons.forEach(button => {
        button.classList.remove("active");
    });

    activeButton.classList.add("active");

    // If dashboard is loaded, fetch data
    if (renderFunction === renderDashboard) {
        loadUpcomingEvents();
        loadSupplyRequests();
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
                        locationText = `${locationData.name}\n${locationData.address}`;
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

scriptBtn.addEventListener("click", () => {
    loadPage(renderScript, scriptBtn);
});

attendanceBtn.addEventListener("click", () => {
    loadPage(renderAttendance, attendanceBtn);
    initAttendancePage();
});


//google form stuff
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyXhX-_u0j2Nq5sJk2HGRCIhxSxiM1Wryr9uKYLhJRK4cTHGj4KSn74dao_RA1nkjZe2w/exec";

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
                container.innerHTML = "<p>No requests yet.</p>";
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
// ===== Attendance Helpers =====

// Fetch team members from Google Sheets via Apps Script
function fetchTeamMembers() {
    // We reuse the same WEB_APP_URL, but ask for mode=members
    return fetch(WEB_APP_URL + "?mode=members")
        .then(res => res.json())
        .then(data => {
            // Expecting an array of objects with at least { Name }
            if (!Array.isArray(data)) return [];
            return data
                .map(row => row.Name)
                .filter(name => !!name);
        })
        .catch(() => []);
}

// Fetch upcoming events from Google Calendar for attendance
function fetchAttendanceEvents() {
    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(now.getDate() + 30);

    const calendarId = '61cdcccee7a2174e5eb954440422208b0b09fee21209b49ad064c9821ac1ae20@group.calendar.google.com';

    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}&timeMin=${now.toISOString()}&timeMax=${nextMonth.toISOString()}&singleEvents=true&orderBy=startTime`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.items) return [];
            return data.items
                .filter(ev => ev.status !== "cancelled")
                .map(ev => {
                    const start = new Date(ev.start.dateTime || ev.start.date);
                    return {
                        title: ev.summary || "(No title)",
                        start: start
                    };
                });
        })
        .catch(() => []);
}

// Render attendance UI once data is loaded
function initAttendancePage() {
    const meetingsContainer = document.getElementById("attendanceMeetingsContainer");
    const eventsContainer = document.getElementById("attendanceEventsContainer");

    if (!meetingsContainer || !eventsContainer) return;

    Promise.all([fetchTeamMembers(), fetchAttendanceEvents()])
        .then(([members, events]) => {
            // If no members, use placeholders
            if (!members || members.length === 0) {
                members = ["Member 1", "Member 2", "Member 3"];
            }

            const meetings = [];
            const otherEvents = [];

            events.forEach(ev => {
                const lower = ev.title.toLowerCase();
                if (lower.includes("team meeting")) {
                    meetings.push(ev);
                } else {
                    otherEvents.push(ev);
                }
            });

            // Render meetings
            meetingsContainer.innerHTML = "";
            if (meetings.length === 0) {
                meetingsContainer.innerHTML = `<p class="attendance-empty">No upcoming team meetings.</p>`;
            } else {
                meetings.forEach(ev => {
                    const card = createAttendanceEventCard(ev, members, "Meeting");
                    meetingsContainer.appendChild(card);
                });
            }

            // Render events
            eventsContainer.innerHTML = "";
            if (otherEvents.length === 0) {
                eventsContainer.innerHTML = `<p class="attendance-empty">No upcoming events.</p>`;
            } else {
                otherEvents.forEach(ev => {
                    const card = createAttendanceEventCard(ev, members, "Event");
                    eventsContainer.appendChild(card);
                });
            }
        });
}

// Create a DOM card for one event with member rows
function createAttendanceEventCard(event, members, eventType) {
    const card = document.createElement("div");
    card.className = "attendance-event-card";

    const titleEl = document.createElement("div");
    titleEl.className = "attendance-event-title";
    titleEl.textContent = event.title;

    const timeEl = document.createElement("div");
    timeEl.className = "attendance-event-time";
    timeEl.textContent = event.start.toLocaleString();

    const membersContainer = document.createElement("div");
    membersContainer.className = "attendance-members";

    members.forEach(memberName => {
        const row = document.createElement("div");
        row.className = "attendance-member-row";

        const nameEl = document.createElement("span");
        nameEl.className = "attendance-member-name";
        nameEl.textContent = memberName;

        const statusLabel = document.createElement("span");
        statusLabel.className = "attendance-status-label";

        const statusValue = document.createElement("span");

        const toggleBtn = document.createElement("button");
        toggleBtn.className = "attendance-status-btn";

        // Default status: meetings -> Present, events -> Absent
        let status = (eventType === "Meeting") ? "Present" : "Absent";

        function updateUI() {
            if (status === "Present") {
                statusValue.textContent = "Present";
                statusValue.className = "attendance-status-present";
                toggleBtn.textContent = "Mark Absent";
                toggleBtn.className = "attendance-status-btn attendance-btn-absent";
            } else {
                statusValue.textContent = "Absent";
                statusValue.className = "attendance-status-absent";
                toggleBtn.textContent = "Mark Present";
                toggleBtn.className = "attendance-status-btn attendance-btn-present";
            }
        }

        updateUI();

        toggleBtn.addEventListener("click", () => {
            if (status === "Present") {
                const reason = prompt("Reason for absence?");
                if (!reason) return;
                status = "Absent";
                updateUI();
                submitAttendance(event, eventType, memberName, status, reason);
            } else {
                status = "Present";
                updateUI();
                submitAttendance(event, eventType, memberName, status, "");
            }
        });

        statusLabel.textContent = "Status: ";

        row.appendChild(nameEl);
        row.appendChild(statusLabel);
        row.appendChild(statusValue);
        row.appendChild(toggleBtn);

        membersContainer.appendChild(row);
    });

    card.appendChild(titleEl);
    card.appendChild(timeEl);
    card.appendChild(membersContainer);

    return card;
}

// Send attendance record to Google Sheets via Apps Script
function submitAttendance(event, eventType, memberName, status, reason) {
    const payload = {
        formType: "attendance",
        eventName: event.title,
        eventType: eventType,
        memberName: memberName,
        status: status,
        reason: reason,
        timestamp: new Date().toISOString()
    };

    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(payload)
    }).catch(() => {
        // Silent fail; you can add alert if you want
    });
}

// Default page on load
checkPassword();
loadPage(renderDashboard, dashboardBtn);

