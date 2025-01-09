// 페이지 이동 함수
function navigateTo(page) {
    // 입력값 확인
    const nameInput = document.getElementById('name');
    const yearInput = document.getElementById('dob-year');
    const monthInput = document.getElementById('dob-month');
    const dayInput = document.getElementById('dob-day');

    let isValid = true;

    // 성명 확인
    if (!nameInput.value.trim()) {
        showError(nameInput, "필수 입력사항입니다");
        isValid = false;
    } else {
        removeError(nameInput);
    }

    // 생년월일 확인
    if (!yearInput.value || !monthInput.value || !dayInput.value) {
        showError(yearInput.parentElement, "필수 입력사항입니다");
        isValid = false;
    } else {
        removeError(yearInput.parentElement);
    }

    // 모든 입력값이 유효하면 페이지 이동
    if (isValid) {
        window.location.href = page;
    }
}

// 오류 메시지 표시
function showError(element, message) {
    // 기존 오류 메시지 제거
    removeError(element);

    // 오류 메시지 추가
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    element.parentElement.appendChild(error);
}

// 오류 메시지 제거
function removeError(element) {
    const error = element.parentElement.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}

// 연도, 월, 일 드롭다운 생성
function populateDateFields() {
    const yearSelect = document.getElementById('dob-year');
    const monthSelect = document.getElementById('dob-month');
    const daySelect = document.getElementById('dob-day');
    const currentYear = new Date().getFullYear();

    // 연도 추가 (현재 연도부터 과거 100년까지)
    for (let y = currentYear; y >= currentYear - 100; y--) {
        const option = document.createElement('option');
        option.value = y;
        option.textContent = `${y}년`;
        yearSelect.appendChild(option);
    }

    // 월 추가
    for (let m = 1; m <= 12; m++) {
        const option = document.createElement('option');
        option.value = m;
        option.textContent = `${m}월`;
        monthSelect.appendChild(option);
    }

    // 월 변경 시 일 갱신
    monthSelect.addEventListener('change', () => updateDays(yearSelect.value, monthSelect.value, daySelect));
    yearSelect.addEventListener('change', () => updateDays(yearSelect.value, monthSelect.value, daySelect));
}

// 일 수 업데이트 함수
function updateDays(year, month, daySelect) {
    if (!year || !month) {
        daySelect.innerHTML = '<option value="">일</option>';
        return;
    }
    const daysInMonth = new Date(year, month, 0).getDate();
    daySelect.innerHTML = '<option value="">일</option>';
    for (let d = 1; d <= daysInMonth; d++) {
        const option = document.createElement('option');
        option.value = d;
        option.textContent = `${d}일`;
        daySelect.appendChild(option);
    }
}

// 초기화 실행
document.addEventListener('DOMContentLoaded', populateDateFields);

// BMI 계산 함수
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value); // 몸무게 (kg)
    const height = parseFloat(document.getElementById('height').value); // 키 (cm)

    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('올바른 몸무게와 키를 입력하세요.');
        return;
    }

    // 키를 미터로 변환 후 BMI 계산
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters ** 2)).toFixed(1);

    document.getElementById('bmi-score').textContent = `BMI 수치: ${bmi}`;
}


// 설문 제출 시 데이터 검증
document.getElementById('obesity-survey').addEventListener('submit', function (event) {
    const bmiScoreText = document.getElementById('bmi-score').textContent;
    if (bmiScoreText === "BMI 수치: -" || !bmiScoreText.includes("BMI 수치:")) {
        alert('BMI 수치를 계산해주세요.');
        event.preventDefault();
        return;
    }

    alert('설문이 제출되었습니다. 감사합니다!');
});
