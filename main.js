document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial Load Reveal (Hero Section)
    setTimeout(() => {
        const preReveals = document.querySelectorAll('.hero-content, .hero-visual');
        preReveals.forEach(el => el.classList.add('active'));
    }, 100);

    // 2. Premium Scroll Animations (IntersectionObserver)
    const revealElements = document.querySelectorAll('.reveal:not(.hero-content):not(.hero-visual)');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 3. Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 19, 43, 0.95)'; // Navy match
            navbar.style.boxShadow = '0 10px 40px -10px rgba(0, 0, 0, 0.8)';
            navbar.style.padding = '8px 0';
        } else {
            navbar.style.background = 'rgba(11, 19, 43, 0.85)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '0';
        }
    });

    // 4. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 5. Flawless Conversational Chatbot
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatOptionsArea = document.getElementById('chatOptionsArea');
    const chatInputArea = document.getElementById('chatInputArea');

    let chatStep = 0;
    let userName = '';

    const scrollToBottom = () => {
        setTimeout(() => {
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 50);
    };

    const appendUserMsg = (text) => {
        const div = document.createElement('div');
        div.className = 'msg user';
        div.textContent = text;
        chatBody.appendChild(div);
        scrollToBottom();
    };

    const appendBotMsg = (text) => {
        const div = document.createElement('div');
        div.className = 'msg bot';
        div.innerHTML = text; 
        chatBody.appendChild(div);
        scrollToBottom();
        
        // Add click listener to links in bot msg to close chat
        const links = div.querySelectorAll('a');
        links.forEach(l => l.addEventListener('click', () => {
            if(chatClose) chatClose.click();
        }));
    };

    if (chatToggle && chatWindow && chatClose) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.remove('hidden');
            chatToggle.style.transform = 'scale(0)';
            setTimeout(() => { chatToggle.style.display = 'none'; }, 300);
            
            // Focus input after animation
            setTimeout(() => {
                if(chatStep === 0 && chatInput) chatInput.focus();
            }, 450);
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
            chatToggle.style.display = 'flex';
            setTimeout(() => { chatToggle.style.transform = 'scale(1)'; }, 10);
        });

        const handleChatSubmission = () => {
            const val = chatInput.value.trim();
            if (!val) return;

            appendUserMsg(val);
            chatInput.value = '';

            if (chatStep === 0) {
                // Step 0: Name entered
                userName = val;
                chatStep = 1;
                
                setTimeout(() => {
                    appendBotMsg(`Nice to meet you, ${userName}! What kind of business do you run?`);
                }, 600);
                
            } else if (chatStep === 1) {
                // Step 1: Business entered
                chatStep = 2;
                
                setTimeout(() => {
                    appendBotMsg(`Awesome! And what is your main goal right now?`);
                    
                    // Show predefined options
                    setTimeout(() => {
                        chatInputArea.style.display = 'none';
                        chatOptionsArea.style.display = 'flex';
                        chatOptionsArea.innerHTML = `
                            <button class="chat-op" data-goal="More Sales & Leads">More Sales & Leads</button>
                            <button class="chat-op" data-goal="Grow Audience">Grow Audience</button>
                            <button class="chat-op" data-goal="Better Branding">Better Branding</button>
                        `;

                        // Bind events to new option buttons
                        const optionBtns = document.querySelectorAll('.chat-op');
                        optionBtns.forEach(btn => {
                            btn.addEventListener('click', function() {
                                const selectedGoal = this.getAttribute('data-goal');
                                appendUserMsg(selectedGoal);
                                chatOptionsArea.style.display = 'none';
                                
                                setTimeout(() => {
                                    appendBotMsg(`Got it, ${userName}. Let's get you on a free strategy call to achieve that. <br><br><a href="#contact" style="color:#10B981; font-weight:700; text-decoration:none;">Click to Book Your Call &rarr;</a>`);
                                }, 800);
                            });
                        });
                    }, 400);
                }, 600);
            }
        };

        if(chatSend) chatSend.addEventListener('click', handleChatSubmission);
        if(chatInput) chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSubmission();
        });
    }

    // 6. Contact Form Submission - Real Integration
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            if(!btn) return;
            
            const originalText = btn.textContent;
            const formData = new FormData(contactForm);
            
            btn.textContent = 'Sending...';
            btn.disabled = true;

            try {
                // Using Formspree (will require email verification on first submission)
                const response = await fetch("https://formspree.io/f/mqakoqyl", { 
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    btn.textContent = 'Details Sent Successfully!';
                    btn.style.background = '#10B981'; // accent green
                    btn.style.color = '#000';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = ''; 
                        btn.style.color = '';
                        btn.disabled = false;
                    }, 5000);
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        throw new Error(data.errors.map(error => error.message).join(", "));
                    } else {
                        throw new Error('Form submission failed');
                    }
                }
            } catch (error) {
                console.error("Submission error:", error);
                btn.textContent = 'Error! Try Again';
                btn.style.background = '#FC8181'; // error red
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }
        });
    }

});
