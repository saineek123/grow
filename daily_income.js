<!DOCTYPE html>
<html>
<head>
  <title>Daily Income Run</title>
  <meta charset="UTF-8">
</head>
<body>
  <h2>🏦 Daily Income Distribution</h2>
  <button onclick="runDailyIncome()">▶️ Run Now</button>
  <p id="msg"></p>


  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>

  <script>
   const firebaseConfig = {
  apiKey: "AIzaSyD7mrPd_JFePxDLA4YifSaYfCsZHCZ7V-E",
  authDomain: "grow-3e3a1.firebaseapp.com",
  databaseURL: "https://grow-3e3a1-default-rtdb.firebaseio.com",
  projectId: "grow-3e3a1",
  storageBucket: "grow-3e3a1.firebasestorage.app",
  messagingSenderId: "285304522946",
  appId: "1:285304522946:web:c423e49a8e0968ce63535b",
  measurementId: "G-Q7DPY3BF6C"
};

    <!DOCTYPE html>
<html>
<head>
  <title>Daily Income Run</title>
  <meta charset="UTF-8">
</head>
<body>
  <h2>🏦 Daily Income Distribution</h2>
  <button onclick="runDailyIncome()">▶️ Run Now</button>
  <p id="msg"></p>

  <!-- Firebase -->
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>

  <script>
   const firebaseConfig = {
  apiKey: "AIzaSyD7mrPd_JFePxDLA4YifSaYfCsZHCZ7V-E",
  authDomain: "grow-3e3a1.firebaseapp.com",
  databaseURL: "https://grow-3e3a1-default-rtdb.firebaseio.com",
  projectId: "grow-3e3a1",
  storageBucket: "grow-3e3a1.firebasestorage.app",
  messagingSenderId: "285304522946",
  appId: "1:285304522946:web:c423e49a8e0968ce63535b",
  measurementId: "G-Q7DPY3BF6C"
};

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    function runDailyIncome() {
      db.ref("users").once("value", usersSnap => {
        usersSnap.forEach(userSnap => {
          const uid = userSnap.key;
          const investments = userSnap.child("investments").val();
          const wallet = userSnap.child("wallet").val() || {};

          let totalIncome = 0;
          const updates = {};

          if (investments) {
            Object.entries(investments).forEach(([invId, data]) => {
              if (data.daysLeft > 0) {
                totalIncome += data.dailyIncome;
                updates[`users/${uid}/investments/${invId}/daysLeft`] = data.daysLeft - 1;
              }
            });

            // Update wallet
            if (totalIncome > 0) {
              const newWinning = (wallet.winning || 0) + totalIncome;
              const newTotal = (wallet.recharge || 0) + (wallet.bonus || 0) + newWinning;

              updates[`users/${uid}/wallet/winning`] = newWinning;
              updates[`users/${uid}/wallet/total`] = newTotal;
            }

            firebase.database().ref().update(updates);
          }
        });

        document.getElementById("msg").innerText = "✅ Daily income credited to all active users.";
      });
    }
  </script>
</body>
</html>
