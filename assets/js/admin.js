import { storage, db } from "./firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

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

    // 업로드 상태 추적
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`업로드 진행 중: ${progress}%`);
            statusMessage.textContent = `업로드 진행 중: ${progress.toFixed(2)}%`;
        },
        (error) => {
            console.error("업로드 실패:", error.message);
            statusMessage.textContent = `업로드 실패: ${error.message}`;
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("업로드 성공! 다운로드 URL:", downloadURL);
            statusMessage.textContent = `업로드 성공! 다운로드 URL: ${downloadURL}`;

            try {
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