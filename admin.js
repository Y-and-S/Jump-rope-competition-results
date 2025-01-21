// Firebase 초기화 및 구성
const firebaseConfig = {
    apiKey: "AIzaSyDxf3XoTZTW7WdhQ0ISYc08cfpqRns1ARk",
    authDomain: "jumprope-2c211.firebaseapp.com",
    projectId: "jumprope-2c211",
    storageBucket: "jumprope-2c211.appspot.com",
    messagingSenderId: "555320477245",
    appId: "1:555320477245:web:3055122f711ca4557bcc54",
    measurementId: "G-Q3K7XT7QMX"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// 업로드 버튼 동작
document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];

    if (!file) {
        document.getElementById('uploadStatus').textContent = '파일을 선택해주세요.';
        return;
    }

    const storageRef = storage.ref(`uploads/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById('uploadStatus').textContent = `업로드 진행률: ${progress.toFixed(2)}%`;
        },
        (error) => {
            document.getElementById('uploadStatus').textContent = `업로드 오류: ${error.message}`;
        },
        () => {
            document.getElementById('uploadStatus').textContent = '업로드 성공!';
        }
    );
});
