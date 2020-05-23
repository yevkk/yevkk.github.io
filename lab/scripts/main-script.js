window.addEventListener('load', () => {
    //if there is no content enough to fill page, footer is displayed at bottom
    if (document.documentElement.clientHeight > document.getElementById('root').clientHeight) {
        let footer = document.getElementById('main-footer');
        footer.style.position = 'fixed';
        footer.style.bottom = '0';
    }

    //open feedback form
    document.getElementById('feedback-form-link').onclick = () => {
        document.body.style.overflow = 'hidden';
        document.getElementById('feedback-form-overlay').style.display = 'block';
        document.getElementById('feedback-form-overlay').style.zIndex = '5';
        document.getElementById('feedback-form-overlay').style.animationName = 'showForm';
    };


    //close feedback form
    document.getElementById('feedback-form-close-btn').onclick = () => {
        document.body.style.overflow = '';
        document.getElementById('feedback-form-overlay').style.animationName = 'hideForm';
    };

    //feedback form submit simulation
    document.getElementById('feedback-form-submit-btn').onclick = () => {
        let name = document.getElementById('feedback-form-name-input').value;
        let phone = document.getElementById('feedback-form-phone-input').value;
        let email = document.getElementById('feedback-form-email-input').value;
        let text = document.getElementById('feedback-form-message-input').value;

        let message = {
            name,
            phone,
            email,
            text,
            [Symbol.toPrimitive](hint) {
                if (hint === 'string') {
                    return `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nText: ${text}\n`;
                }
                return null;
            }
        };

        alert(`Sent message:\n${message}`);
    };
});

window.addEventListener('load', initiateSlider);

window.addEventListener('load', initiateCatalogue);

window.addEventListener('load', initiateCollapsibleCategories);

