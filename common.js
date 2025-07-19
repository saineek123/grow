<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Login - Lottery Game</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #121212;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .login-container {
      background: #222;
      padding: 30px;
      border-radius: 8px;
      width: 320px;
      box-shadow: 0 0 10px #000;
    }
    h2 {
      margin-bottom: 20px;
      text-align: center;
    }
    input[type="email"], input[type="password"] {
      width: 100%;
      padding: 12px;
      margin: 8px 0 15px 0;
      border: none;
      border-radius: 4px;
      background: #333;
      color: white;
      font-size: 1rem;
    }
    button {
      width: 100%;
      padding: 12px;
      border: none;
      background: #0a74da;
      color: white;
      font-size: 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #065a9c;
    }
    .message {
      text-align: center;
      margin-top: 15px;
      font-size: 0.9rem;
      color: #f88;
    }
    .switch-link {
      margin-top: 15px;
      text-align: center;
      font-size: 0.9rem;
      cursor: pointer;
      color: #0a74da;
    }
  </style>
</head>
<body>

  <div class="login-container">
    <h2 id="formTitle">Login</h2>
    <input type="email" id="email" placeholder="Email" required />
    <input type="password" id="password" placeholder="Password" required />
    <button id="submitBtn">Login</button>
    <div class="message" id="message"></div>
    <div class="switch-link" id="switchLink">Don't have an account? Sign up</div>
  </div>

  <!-- Firebase SDK -->
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>

  <script>
    // Your Firebase Config - Replace with your project's config
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      databaseURL: "YOUR_DATABASE_URL",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.database();

    // Elements
    const formTitle = document.getElementById('formTitle');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');
    const switchLink = document.getElementById('switchLink');

    let isLogin = true; // toggle between login and signup

    switchLink.onclick = () => {
      isLogin = !isLogin;
      if (isLogin) {
        formTitle.textContent = 'Login';
        submitBtn.textContent = 'Login';
        switchLink.textContent = "Don't have an account? Sign up";
      } else {
        formTitle.textContent = 'Sign Up';
        submitBtn.textContent = 'Sign Up';
        switchLink.textContent = 'Already have an account? Login';
      }
      messageDiv.textContent = '';
    };

    submitBtn.onclick = () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      if (!email || !password) {
        messageDiv.textContent = 'Email and password are required.';
        return;
      }
      messageDiv.textContent = 'Please wait...';
      if (isLogin) {
        auth.signInWithEmailAndPassword(email, password)
          .then(userCredential => {
            messageDiv.textContent = 'Login successful!';
            checkIfAdmin(userCredential.user.uid);
          })
          .catch(err => {
            messageDiv.textContent = 'Error: ' + err.message;
          });
      } else {
        auth.createUserWithEmailAndPassword(email, password)
          .then(userCredential => {
            messageDiv.textContent = 'Signup successful! Logging in...';
            // Add user to database with default role "user"
            db.ref('users/' + userCredential.user.uid).set({
              email: email,
              role: 'user'
            }).then(() => {
              checkIfAdmin(userCredential.user.uid);
            });
          })
          .catch(err => {
            messageDiv.textContent = 'Error: ' + err.message;
          });
      }
    };

    function checkIfAdmin(uid) {
      // Check user role in database
      db.ref('users/' + uid + '/role').once('value')
        .then(snapshot => {
          const role = snapshot.val();
          if (role === 'admin') {
            messageDiv.textContent = 'Welcome Admin! Redirecting to admin panel...';
            setTimeout(() => {
              window.location.href = 'admin.html';  // Admin panel page
            }, 1500);
          } else {
            messageDiv.textContent = 'Welcome Player! Redirecting to game...';
            setTimeout(() => {
              window.location.href = 'game.html';  // User game page
            }, 1500);
          }
        })
        .catch(() => {
          messageDiv.textContent = 'Error getting user role.';
        });
    }
  </script>

</body>
</html>
