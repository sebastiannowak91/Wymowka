function showText(event) {
    const readBtn = event.currentTarget;
    const text = event.currentTarget.previousElementSibling;
    if (text.hasAttribute("hidden")) {
        text.removeAttribute("hidden");
        readBtn.textContent = "Zamknij artykuł";
    } else {
        text.setAttribute("hidden", true);
        readBtn.textContent = "Przeczytane!";
    }
};

export default showText;