
// SpendWise Application Variables

let budget = 0;
let expenses = 0;
let remainingBalance = 0;

// Function to calculate the remaining balance

function calculateBalance(budget, expenses) {
    return budget - expenses;
}

// Function to format money in Kenyan Shillings

function formatMoney(amount) {
    return "KES " + amount.toLocaleString("en-KE");
}

// Function to collect information using JavaScript prompts

function getBudgetInformation() {
    const budgetInput = prompt("Enter your total budget in KES:");

    if (budgetInput === null || budgetInput.trim() === "") {
        alert("Please enter a valid budget.");
        return;
    }

    const expensesInput = prompt("Enter your total expenses in KES:");

    if (expensesInput === null || expensesInput.trim() === "") {
        alert("Please enter valid expenses.");
        return;
    }

    budget = Number(budgetInput);
    expenses = Number(expensesInput);

    // Validate user input

    if (
        !Number.isFinite(budget) ||
        !Number.isFinite(expenses) ||
        budget < 0 ||
        expenses < 0
    ) {
        alert("Please enter valid positive numbers.");
        return;
    }

    // Calculate remaining balance

    remainingBalance = calculateBalance(budget, expenses);

    // Display results on the webpage

    document.getElementById("budget").textContent =
        formatMoney(budget);

    document.getElementById("expenses").textContent =
        formatMoney(expenses);

    document.getElementById("balance").textContent =
        formatMoney(remainingBalance);

    // Display a message

    if (remainingBalance < 0) {
        document.getElementById("message").textContent =
            "Warning! Your expenses are greater than your budget.";
    } else {
        document.getElementById("message").textContent =
            "Your budget has been calculated successfully!";
    }

    // Display results in the browser console

    console.log("SPENDWISE BUDGET SUMMARY");
    console.log("Total Budget: " + formatMoney(budget));
    console.log("Total Expenses: " + formatMoney(expenses));
    console.log("Remaining Balance: " + formatMoney(remainingBalance));
}

// Event listener for the button

document.getElementById("startButton").addEventListener(
    "click",
    getBudgetInformation
);
