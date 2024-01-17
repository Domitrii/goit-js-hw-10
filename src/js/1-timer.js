import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputPlace = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const modal = document.querySelector(".visible-open-block"); // Corrected selector

let userSelectedDate;

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
        } else {
            const a = convertMs(selectedDate.getTime() - Date.now())
            console.log(a)
            
        }
    },
};

flatpickr("#datetime-picker", options);

class TimeToDate {
    constructor({ onTick }) {
        this.onTick = onTick;
        this.intervalId = null;
        this.isActive = false;

        this.initTimer();
    }

    initTimer() {
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }

    start() {
        if (this.isActive) {
            return;
        }

        this.initTimer();
        this.isActive = true;
        const startTime = Date.now();
    }

    pad(value) {
        return String(value).padStart(2, "0");
    }

    getTimeComponents(ms) {
        const seconds = Math.floor(ms / 1000) % 60;
        const minutes = Math.floor(ms / 1000 / 60) % 60;
        const hours = Math.floor(ms / 1000 / 60 / 60) % 24;
        const days = Math.floor(ms / 1000 / 60 / 60 / 24);

        return { days, hours, minutes, seconds };
    }
}

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
