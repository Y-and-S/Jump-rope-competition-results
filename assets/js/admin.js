import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const storage = getStorage();
const db = getFirestore();

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
            statusMessage.textContent = `업로드 진행 중: ${progress.toFixed(2)}%`;
        },
        (error) => {
            statusMessage.textContent = `업로드 실패: ${error.message}`;
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            statusMessage.textContent = "업로드 성공!";

            try {
                await addDoc(collection(db, "files"), {
                    name: file.name,
                    url: downloadURL,
                    uploadedAt: new Date(),
                });
                statusMessage.textContent += " Firestore에 기록 저장 완료!";
            } catch (error) {
                statusMessage.textContent += ` Firestore 저장 실패: ${error.message}`;
            }
        }
    );
});