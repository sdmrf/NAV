// Data List
const data = "128,129,120,130,140,123,124,125,126,127,13,138,139,149,159,150,160,134,135,136,146,147,148,158,168,169,179,170,180,145,236,156,157,167,230,178,250,189,234,190,245,237,238,239,249,240,269,260,270,235,290,246,247,248,258,259,278,279,289,280,380,345,256,257,267,268,340,350,360,370,470,390,346,347,348,349,359,369,379,389,489,480,490,356,357,358,368,378,450,460,560,570,580,590,456,367,458,459,469,479,579,589,670,680,690,457,467,468,478,569,678,679,689,789,780,790,890,567,568,578,100,110,166,112,113,114,115,116,117,118,119,200,229,220,122,277,133,224,144,226,155,228,300,266,177,330,188,233,199,244,227,255,337,338,339,448,223,288,225,299,335,336,355,400,366,466,377,440,388,334,344,499,445,446,447,556,449,477,559,488,399,660,599,455,500,600,557,558,577,550,588,688,779,699,799,880,566,800,667,668,669,778,788,770,889,899,700,990,900,677,777,444,111,888,555,222,999,666,333,000".split(",");

// DOM Ready Function
document.addEventListener("DOMContentLoaded", () => {
    initNumberBoxes();
    displayCurrentDate();
    updateTotalAmountAndUsers();

    // Attach button event listeners
    document.getElementById("submitButton").addEventListener("click", submitNumbers);
    document.getElementById("resetButton").addEventListener("click", resetData);
    document.getElementById("clearButton").addEventListener("click", clearInput);
    document.getElementById("printButton").addEventListener("click", printPage);
});

// Helper Functions
const createElement = (tag, className = '', innerHTML = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
};

// Initialize Number Boxes
const initNumberBoxes = () => {
    const numberBoxesContainer = document.getElementById('numberBoxes');
    data.forEach(number => {
        const numberBox = createElement('div', 'numberBox', `
            <div class="number">${number}</div>
            <div class="amount">Amt: ${getStoredAmount(number)}</div>
            <div class="users">Users: ${getStoredUsers(number)}</div>
        `);
        numberBoxesContainer.appendChild(numberBox);
    });
};

// Display Current Date
const displayCurrentDate = () => {
    document.getElementById('currentDate').textContent = new Date().toDateString();
};

// Get stored data
const getStoredAmount = (number) => localStorage.getItem(`amount${number}`) || 0;
const getStoredUsers = (number) => localStorage.getItem(`users${number}`) || 0;

// Update list
const updateList = (number, amount, users) => {
    const listContent = document.getElementById('listContent');
    const newItem = createElement('div', 'list-item', `
        <span>${listContent.childElementCount + 1}</span>
        <span>${number}</span>
        <span>${amount}</span>
        <span>${users}</span>
    `);
    listContent.appendChild(newItem);
};

// Update total amount and users
const updateTotalAmountAndUsers = () => {
    let totalAmount = 0, totalUsers = 0;

    data.forEach(number => {
        totalAmount += parseInt(getStoredAmount(number));
        totalUsers += parseInt(getStoredUsers(number));
    });

    document.getElementById('totalAmount').textContent = totalAmount;
    document.getElementById('totalUsers').textContent = totalUsers;
};

// Submit input
const submitNumbers = () => {
    const input = document.getElementById('numberInput').value.trim();
    const inputs = input.split(/\r?\n/);

    inputs.forEach((input, index) => {
        setTimeout(() => {
            const match = input.match(/(\d+)[\W_]+(\d+)$/);
            if (match) {
                const amount = parseInt(match[1]);
                const number = match[2];
                if (data.includes(number)) {
                    processInput(number, amount);
                } else {
                    alert(`Invalid Number: ${number}`);
                }
            } else {
                alert(`Invalid Input: ${input}`);
            }
        }, index * 1000);
    });
};

// Process valid input
const processInput = (number, amount) => {
    const currentAmount = parseInt(getStoredAmount(number)) + amount;
    const currentUsers = parseInt(getStoredUsers(number)) + 1;

    localStorage.setItem(`amount${number}`, currentAmount);
    localStorage.setItem(`users${number}`, currentUsers);

    document.querySelector(`#numberBoxes .numberBox:nth-child(${data.indexOf(number) + 1}) .amount`).textContent = `Amt: ${currentAmount}`;
    document.querySelector(`#numberBoxes .numberBox:nth-child(${data.indexOf(number) + 1}) .users`).textContent = `Users: ${currentUsers}`;

    updateList(number, currentAmount, currentUsers);
    updateTotalAmountAndUsers();
    highlightBox(number);
};

// Highlight box animation
const highlightBox = (number) => {
    const box = document.querySelector(`#numberBoxes .numberBox:nth-child(${data.indexOf(number) + 1})`);
    box.classList.add('highlight');
    setTimeout(() => box.classList.remove('highlight'), 1000);
};

// Reset data
const resetData = () => {
    localStorage.clear();
    location.reload();
};

// Clear input
const clearInput = () => document.getElementById('numberInput').value = '';

// Print page
const printPage = () => window.print();
