// Votes object to keep track of current vote counts
const votes = {
    JavaScript: 0,
    Python: 0,
    Java: 0
};

// Vote function - called when a button is clicked
// eslint-disable-next-line no-unused-vars
function vote(language) {
    if (Object.prototype.hasOwnProperty.call(votes, language)) {
        votes[language]++;
        updateVotes();
        
        // Visual feedback for the vote
        const buttons = document.querySelectorAll('.vote-btn');
        buttons.forEach(btn => {
            if (btn.textContent === language) {
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
            }
        });
    }
}

// UpdateVotes function - updates the displayed vote counts
function updateVotes() {
    document.getElementById('javascript-votes').textContent = votes.JavaScript;
    document.getElementById('python-votes').textContent = votes.Python;
    document.getElementById('java-votes').textContent = votes.Java;
}

// Simulate real-time voting by randomly incrementing votes
function simulateRealTimeVoting() {
    const languages = ['JavaScript', 'Python', 'Java'];
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    
    votes[randomLanguage]++;
    updateVotes();
    
    // Add a subtle animation to show the update
    const elementId = randomLanguage.toLowerCase() + '-votes';
    const element = document.getElementById(elementId);
    element.style.backgroundColor = '#c8e6c9';
    element.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        element.style.backgroundColor = '#e8f5e8';
        element.style.transform = 'scale(1)';
    }, 300);
}

// Set interval to simulate real-time updates every 2 seconds
setInterval(simulateRealTimeVoting, 2000);

// Initialize the display when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateVotes();
    
    // Add some initial random votes to make it more interesting
    setTimeout(() => {
        votes.JavaScript = Math.floor(Math.random() * 20) + 10;
        votes.Python = Math.floor(Math.random() * 20) + 10;
        votes.Java = Math.floor(Math.random() * 20) + 10;
        updateVotes();
    }, 1000);
});