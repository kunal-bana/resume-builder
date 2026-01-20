const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const previewName = document.getElementById("previewName");
const previewContact = document.getElementById("previewContact");

nameInput.addEventListener("input", () => {
  previewName.textContent = nameInput.value || "Your Name";
});

emailInput.addEventListener("input", updateContact);
phoneInput.addEventListener("input", updateContact);

function updateContact() {
  let text = "";
  if (emailInput.value) text += emailInput.value;
  if (phoneInput.value) text += " | " + phoneInput.value;
  previewContact.textContent = text;
}

const profilePic = document.getElementById("profilePic");
const previewImage = document.getElementById("previewImage");

profilePic.addEventListener("change", () => {
  const file = profilePic.files[0];
  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = () => previewImage.src = reader.result;
  reader.readAsDataURL(file);
});

const summaryInput = document.getElementById("summary");
const previewSummary = document.getElementById("previewSummary");

summaryInput.addEventListener("input", () => {
  previewSummary.textContent = summaryInput.value;
});

const skillInput = document.getElementById("skillInput");
const previewSkills = document.getElementById("previewSkills");

document.getElementById("addSkill").addEventListener("click", () => {
  const skill = skillInput.value.trim();
  if (!skill) return;

  const li = document.createElement("li");
  li.textContent = skill;
  li.onclick = () => li.remove();

  previewSkills.appendChild(li);
  skillInput.value = "";
});

document.getElementById("addExperience").addEventListener("click", () => {
  const wrapper = document.createElement("div");

  wrapper.innerHTML = `
    <input class="role" placeholder="Role / Project">
    <input class="duration" placeholder="Duration">
    <textarea class="desc" placeholder="Description"></textarea>
    <button type="button" class="save">Save</button>
    <hr>
  `;

  wrapper.querySelector(".save").onclick = () => {
    const role = wrapper.querySelector(".role").value.trim();
    const duration = wrapper.querySelector(".duration").value.trim();
    const desc = wrapper.querySelector(".desc").value.trim();

    if (!role || !desc) return alert("Role & description required");

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${role}</td><td>${desc}</td><td>${duration}</td>`;
    document.getElementById("previewExperience").appendChild(tr);

    wrapper.remove();
  };

  document.getElementById("experienceFields").appendChild(wrapper);
});

const eduNameInput = document.getElementById("educationName");
const eduYearInput = document.getElementById("educationYear");

document.getElementById("addEducation").addEventListener("click", () => {
  if (!eduNameInput.value || !eduYearInput.value) return;

  const row = document.createElement("div");
  row.className = "education-row";
  row.innerHTML = `<span>${eduNameInput.value}</span><span>${eduYearInput.value}</span>`;
  row.onclick = () => row.remove();

  document.getElementById("previewEducationList").appendChild(row);

  eduNameInput.value = "";
  eduYearInput.value = "";
});

const printBtn = document.getElementById("printBtn");
const printModal = document.getElementById("printModal");
const modalPreview = document.getElementById("modalPreview");
const cancelPrint = document.getElementById("cancelPrint");

printBtn.addEventListener("click", () => {
  const clone = document.querySelector(".resume").cloneNode(true);
  const actions = clone.querySelector(".actions");
  if (actions) actions.remove();

  modalPreview.innerHTML = "";
  modalPreview.appendChild(clone);
  printModal.style.display = "block";
});

cancelPrint.addEventListener("click", () => {
  printModal.style.display = "none";
});

printModal.addEventListener("click", (e) => {
  if (e.target === printModal) {
    printModal.style.display = "none";
  }
});

document.getElementById("exportBtn").onclick = () => window.print();
