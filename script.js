const codeInputs = document.querySelectorAll('.code');

        // Function to remove focused class from all inputs
        function removeFocusedClass() {
            codeInputs.forEach(input => {
                input.classList.remove('focused');
            });
        }

        codeInputs.forEach(function(input, index) {
            // Add focus event listener
            input.addEventListener('focus', function(e) {
                removeFocusedClass();
                e.target.classList.add('focused');
            });

            // Add blur event listener
            input.addEventListener('blur', function(e) {
                e.target.classList.remove('focused');
            });

            input.addEventListener('input', function(e) {
                if (e.target.value.length === 1) {
                    if (index < codeInputs.length - 1) {
                        removeFocusedClass();
                        codeInputs[index + 1].focus();
                        codeInputs[index + 1].classList.add('focused');
                    }
                }
            });

            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && !e.target.value) {
                    if (index > 0) {
                        e.preventDefault();
                        removeFocusedClass();
                        codeInputs[index - 1].focus();
                        codeInputs[index - 1].classList.add('focused');
                    }
                }
            });

            input.addEventListener('keypress', function(e) {
                if (isNaN(e.key)) {
                    e.preventDefault();
                }
            });
        });

        // Focus first input on load
        window.addEventListener('load', function() {
            codeInputs[0].focus();
            codeInputs[0].classList.add('focused');
        });

        document.querySelector('.code-container').addEventListener('paste', function(e) {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').slice(0, 6);
            
            for (let i = 0; i < pasteData.length; i++) {
                if (!isNaN(pasteData[i])) {
                    codeInputs[i].value = pasteData[i];
                    removeFocusedClass();
                    if (i < 5) {
                        codeInputs[i + 1].focus();
                        codeInputs[i + 1].classList.add('focused');
                    }
                }
            }
        });