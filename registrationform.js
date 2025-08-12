
  
    const form = document.getElementById('regForm');
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const phoneEl = document.getElementById('phone');
    const pwEl = document.getElementById('password');
    const pw2El = document.getElementById('password2');
    const submitBtn = document.getElementById('submitBtn');
    const formMsg = document.getElementById('formMsg');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const pwError = document.getElementById('pwError');
    const pw2Error = document.getElementById('pw2Error');
    const pwBar = document.getElementById('pwBar');

    function showError(el, msg){ el.textContent = msg; el.hidden = false; }
    function clearError(el){ el.textContent = ''; el.hidden = true; }

    function validateName(){
      const v = nameEl.value.trim();
      if(!v){ showError(nameError, 'Please enter your full name'); return false; }
      clearError(nameError); return true;
    }
    function validateEmail(){
      const v = emailEl.value.trim();
      if(!v){ showError(emailError, 'Email is required'); return false; }
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if(!ok){ showError(emailError, 'Enter a valid email address'); return false; }
      clearError(emailError); return true;
    }
    function validatePhone(){
      const v = phoneEl.value.trim();
      if(!v){ clearError(phoneError); return true; }
      const ok = /^\+?[0-9\s-]{7,20}$/.test(v);
      if(!ok){ showError(phoneError, 'Enter a valid phone number (include country code)'); return false; }
      clearError(phoneError); return true;
    }
    function passwordStrength(pw){
      let score = 0;
      if(pw.length >= 8) score++;
      if(/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
      if(/[0-9]/.test(pw)) score++;
      if(/[^A-Za-z0-9]/.test(pw)) score++;
      return Math.min(4, score);
    }
    function updatePwMeter(){
      const s = passwordStrength(pwEl.value);
      const pct = (s/4)*100;
      pwBar.style.width = pct + '%';
    }
    function validatePassword(){
      const v = pwEl.value;
      if(!v || v.length < 8){ showError(pwError, 'Password must be at least 8 characters'); return false; }
      clearError(pwError); return true;
    }
    function validatePasswordMatch(){
      if(pwEl.value !== pw2El.value){ showError(pw2Error, 'Passwords do not match'); return false; }
      clearError(pw2Error); return true;
    }

    nameEl.addEventListener('blur', validateName);
    emailEl.addEventListener('blur', validateEmail);
    phoneEl.addEventListener('blur', validatePhone);
    pwEl.addEventListener('input', ()=>{ updatePwMeter(); validatePassword(); validatePasswordMatch(); });
    pw2El.addEventListener('input', validatePasswordMatch);

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      formMsg.textContent = '';
      const ok = [validateName(), validateEmail(), validatePhone(), validatePassword(), validatePasswordMatch()].every(Boolean);
      if(!ok){ formMsg.innerHTML = '<div class="error">Please fix the errors above and try again.</div>'; return; }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating...';
      setTimeout(()=>{
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create account';
        form.reset();
        pwBar.style.width = '0%';
        formMsg.innerHTML = '<div class="success">Account created! Check your email for confirmation.</div>';
      }, 900);
    });
    document.getElementById("regForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  window.location.href = "frutableslogin.html"; 
});

  
