document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('darkModeToggle');
    const body = document.body;

    const loadTheme = () => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            // Default to light theme if no theme is set or if it's explicitly 'light'
            body.classList.remove('dark-mode');
        }
    };

    const saveTheme = (theme) => {
        localStorage.setItem('theme', theme);
    };

    const toggleTheme = () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            saveTheme('light');
        } else {
            body.classList.add('dark-mode');
            saveTheme('dark');
        }
    };

    // Ensure the button exists before adding the event listener
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    // Apply the saved theme on initial load
    loadTheme();
});