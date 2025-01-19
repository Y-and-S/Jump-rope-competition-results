// Import the functions you need from the SDKs
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxf3XoTZTW7WdhQ0ISYc08cfpqRns1ARk",
    authDomain: "jumprope-2c211.firebaseapp.com",
    projectId: "jumprope-2c211",
    storageBucket: "jumprope-2c211.appspot.com",
    messagingSenderId: "555320477245",
    appId: "1:555320477245:web:3055122f711ca4557bcc54",
    measurementId: "G-Q3K7XT7QMX"
};

// Initialize Firebase only once
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// File upload logic
document.getElementById("uploadBtn").addEventListener("click", async () => {
    const fileInput = document.getElementById("fileInput");
    const statusMessage = document.getElementById("statusMessage");

    if (fileInput.files.length === 0) {
        statusMessage.textContent = "파일을 선택해주세요!";
        return;
    }

    const file = fileInput.files[0];
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`업로드 진행 중: ${progress}%`);
            statusMessage.textContent = `업로드 진행 중: ${progress.toFixed(2)}%`;
        },
        (error) => {
            console.error("업로드 실패:", error);
            statusMessage.textContent = `업로드 실패: ${error.message}`;
        },
        async () => {
            try {
                // 업로드 성공 시 다운로드 URL 가져오기
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log("업로드 성공! 다운로드 URL:", downloadURL);
                statusMessage.textContent = `업로드 성공! 다운로드 URL: ${downloadURL}`;

                // Firestore에 파일 메타데이터 저장
                await addDoc(collection(db, "files"), {
                    name: file.name,
                    url: downloadURL,
                    uploadedAt: new Date(),
                });
                statusMessage.textContent += " Firestore에 기록 저장 완료!";
            } catch (error) {
                console.error("Firestore 저장 실패:", error.message);
                statusMessage.textContent += ` Firestore 저장 실패: ${error.message}`;
            }
        }
    );
});