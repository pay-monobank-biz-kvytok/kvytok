function updateTimer(timer) {
      let percent = (timer / 5400) * 100; // 5400 seconds (90 minutes)
      const circle = document.getElementById("timerCircle");
      const circlePath = circle.querySelectorAll('circle')[1]; // Get the second circle for the animated stroke
      const dashoffset = (62.83 * (100 - percent)) / 100; // 62.83 is the circumference of the circle (2 * π * r, with r=10)
      circlePath.style.strokeDashoffset = 0-dashoffset;
}
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
        ticketNumber = Math.floor(Math.random() * (500000- 186542+ 1)) + 186542;
    }
    localStorage.setItem('ticketNumber', ticketNumber);
    const formattedNumber = Number(ticketNumber).toLocaleString('uk-UA');
    document.getElementById('ticket-number').textContent = formattedNumber;
}

// Таймер дії квитка
function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    
        timer--;
        hours = Math.floor((timer+1) / 3600);
        minutes = Math.floor(((timer+1) % 3600) / 60);
        seconds = (timer+1) % 60;
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

          
        updateTimer(timer);
        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "0:00:00";
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
        }
    }
    updateTimer(timeLeft);  
    startTimer(timeLeft, display);
    document.getElementById('restart').addEventListener('dblclick', function () {
    if (confirm("?")) {
        localStorage.removeItem('ticketNumber');
        localStorage.removeItem('purchaseDate');
        localStorage.removeItem('ticketEndTime');
        location.reload();
    }
});


};













