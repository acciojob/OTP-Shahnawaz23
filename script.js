//your JS code here. If required.
const codeInputs = document.querySelectorAll('.code');

        codeInputs.forEach(function(input, index) {
            input.addEventListener('input', function(e) {
                if (e.target.value.length === 1) {
                    if (index < codeInputs.length - 1) {
                        codeInputs[index + 1].focus();
                    }
                }
            });

            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && !e.target.value) {
                    if (index > 0) {
                        e.preventDefault();
                        codeInputs[index - 1].focus();
                        codeInputs[index - 1].value = '';
                    }
                }
            });

            input.addEventListener('keypress', function(e) {
                if (isNaN(e.key)) {
                    e.preventDefault();
                }
            });
        });

        document.querySelector('.code-container').addEventListener('paste', function(e) {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').slice(0, 6);
            
            for (let i = 0; i < pasteData.length; i++) {
                if (!isNaN(pasteData[i])) {
                    codeInputs[i].value = pasteData[i];
                    if (i < 5) {
                        codeInputs[i + 1].focus();
                    }
                }
            }
        });