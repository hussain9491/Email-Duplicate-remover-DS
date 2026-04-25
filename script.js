// Initialize Drag & Drop
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
        updateThumbnail(fileInput.files[0]);
    }
});

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drop-zone--over");
});

["dragleave", "dragend"].forEach((type) => {
    dropZone.addEventListener(type, () => {
        dropZone.classList.remove("drop-zone--over");
    });
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        updateThumbnail(e.dataTransfer.files[0]);
    }
    dropZone.classList.remove("drop-zone--over");
});

function updateThumbnail(file) {
    let prompt = dropZone.querySelector(".drop-zone__prompt");
    prompt.textContent = file.name;
}

// Email Processing Logic
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function processFile() {
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file!");
        return;
    }

    const fileName = file.name;
    const isTxt = fileName.endsWith('.txt');
    const isJson = fileName.endsWith('.json');

    // Explicit check for supported formats
    if (!isTxt && !isJson) {
        alert("Unsupported file format! Please upload a .txt or .json file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            let emails = [];
            if (isTxt) {
                emails = event.target.result.split(/\r?\n/).filter(line => line.trim() !== "");
            } else {
                const data = JSON.parse(event.target.result);
                emails = data.emails || [];
            }

            const uniqueEmailsSet = new Set();
            const duplicates = [];
            const invalidEmails = [];
            const finalUnique = [];

            emails.forEach(email => {
                const cleanEmail = email.trim();
                if (!isValidEmail(cleanEmail)) {
                    invalidEmails.push(cleanEmail);
                } else if (uniqueEmailsSet.has(cleanEmail)) {
                    duplicates.push(cleanEmail);
                } else {
                    uniqueEmailsSet.add(cleanEmail);
                    finalUnique.push(cleanEmail);
                }
            });

            displayResults(emails.length, finalUnique, duplicates, invalidEmails);

        } catch (error) {
            console.error(error);
            alert("Error processing file! Ensure it's valid JSON or TXT.");
        }
    };

    reader.readAsText(file);
}

function displayResults(total, unique, duplicates, invalid) {
    // Stats
    document.getElementById("stats").innerHTML = `
        <p><b>Total Emails:</b> ${total}</p>
        <p><b>Unique Emails:</b> ${unique.length}</p>
        <p><b>Duplicates:</b> ${duplicates.length}</p>
        <p><b>Invalid Emails:</b> ${invalid.length}</p>
        <button class="action-btn" style="margin-top:10px" onclick="downloadData(${JSON.stringify(unique).replace(/"/g, '&quot;')}, 'unique_emails.json')">Download Clean List</button>
    `;

    // Output
    const output = document.getElementById("output");
    output.innerHTML = "";

    output.appendChild(createResultBlock("Unique Emails", unique));
    output.appendChild(createResultBlock("Duplicates Found", duplicates));
    output.appendChild(createResultBlock("Invalid Emails", invalid));
}

function createResultBlock(title, data) {
    const div = document.createElement("div");
    div.className = "result-block";
    
    const header = document.createElement("div");
    header.className = "result-header";
    header.innerHTML = `<h4>${title} (${data.length})</h4>`;
    
    const copyBtn = document.createElement("button");
    copyBtn.className = "action-btn";
    copyBtn.textContent = "Copy";
    copyBtn.onclick = () => copyToClipboard(data.join("\n"));
    
    header.appendChild(copyBtn);
    div.appendChild(header);
    
    const pre = document.createElement("pre");
    pre.textContent = data.length > 0 ? data.join("\n") : "None";
    div.appendChild(pre);
    
    return div;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
}

function downloadData(data, filename) {
    const blob = new Blob([JSON.stringify({ emails: data }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
