import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputPlace = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const modal = document.querySelector(".visible-open-block");

startBtn.disable = true;

let userSelectedDate;
let a; 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate.getTime() < Date.now()) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.style.display = 'none'; 
            }, 1000);
        }
    },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

startBtn.addEventListener("click", () => {
    const selectedDate = flatpickr("#datetime-picker").selectedDates[0];

    if (selectedDate) {
        a = convertMs(selectedDate.getTime() - Date.now());
        console.log(a);
    } else {
        console.log("No date selected.");
    }
    
});
