// Відображення дати придбання
function displayPurchaseInfo() {
    let purchaseDate = localStorage.getItem('purchaseDate');

    if (!purchaseDate) {
        const now = new Date();
        localStorage.setItem('purchaseDate', now.toISOString());
        purchaseDate = now.toISOString();
    }

    const formattedDate = new Date(purchaseDate).toLocaleString('uk-UA', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    document.getElementById('purchase-info').textContent = `Придбано ${formattedDate}`;
}

// Збільшення номера квитка
function incrementTicketNumber() {
    let ticketNumber = localStorage.getItem('ticketNumber');
    if (!ticketNumber) {
        ticketNumber = Math.floor(Math.random() * (400000- 286542+ 1)) + 286542;
    } else {
        ticketNumber = parseInt(ticketNumber) + 1;
    }
    localStorage.setItem('ticketNumber', ticketNumber);
    const formattedNumber = Number(ticketNumber).toLocaleString('uk-UA');
    document.getElementById('ticket-number').textContent = formattedNumber;
}

// Таймер дії квитка
function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    
    hours = Math.floor(timer / 3600);
        minutes = Math.floor((timer % 3600) / 60);
        seconds = timer % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = hours + ":" + minutes + ":" + seconds;
    
    const interval = setInterval(function () {
        hours = Math.floor(timer / 3600);
        minutes = Math.floor((timer % 3600) / 60);
        seconds = timer % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = hours + ":" + minutes + ":" + seconds;

       
        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "00:00:00";
            localStorage.removeItem('ticketEndTime'); // Очистити при завершенні
        }
    }, 1000);
}

window.onload = function () {
    
    displayPurchaseInfo();
    incrementTicketNumber();

    const display = document.querySelector('#timer');
    const durationInSeconds = 60 * 90; // 1 година 30 хвилин

    const storedEndTime = localStorage.getItem('ticketEndTime');
    const now = Date.now();

    let timeLeft;

    if (!storedEndTime) {
        const endTime = now + durationInSeconds * 1000;
        localStorage.setItem('ticketEndTime', endTime);
        timeLeft = durationInSeconds;

        // Також оновимо дату покупки
        const nowISO = new Date().toISOString();
        localStorage.setItem('purchaseDate', nowISO);
    } else {
        const endTime = parseInt(storedEndTime, 10);
        timeLeft = Math.floor((endTime - now) / 1000);
        if (timeLeft <= 0) {
            timeLeft = 0;
            localStorage.removeItem('ticketEndTime');
        }
    }

    startTimer(timeLeft, display);
    document.getElementById('restart').addEventListener('dblclick', function () {
    if (confirm("?")) {
        localStorage.removeItem('purchaseDate');
        localStorage.removeItem('ticketEndTime');
        location.reload();
    }
});


};



