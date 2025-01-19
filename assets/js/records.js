import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const db = getFirestore();

document.getElementById("fetchRecordsBtn").addEventListener("click", async () => {
    const recordsList = document.getElementById("recordsList");

    try {
        const querySnapshot = await getDocs(collection(db, "files"));
        let html = "<ul>";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            html += `<li><a href="${data.url}" target="_blank">${data.name}</a> (업로드 날짜: ${data.uploadedAt.toDate()})</li>`;
        });
        html += "</ul>";
        recordsList.innerHTML = html;
    } catch (error) {
        recordsList.textContent = `기록 불러오기 실패: ${error.message}`;
    }
});