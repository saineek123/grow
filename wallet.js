// wallet.js
// ✅ Reusable Wallet Balance Sync


   const firebaseConfig = {
            apiKey: "AIzaSyD7mrPd_JFePxDLA4YifSaYfCsZHCZ7V-E",
            authDomain: "grow-3e3a1.firebaseapp.com",
            databaseURL: "https://grow-3e3a1-default-rtdb.firebaseio.com",
            projectId: "grow-3e3a1",
            storageBucket: "grow-3e3a1.appspot.com",
            messagingSenderId: "285304522946",
            appId: "1:285304522946:web:c423e49a8e0968ce63535b"
        };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();
const auth = firebase.auth();

// Listen when user logged in
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("✅ Logged in:", user.email);
    syncWallet(user.uid);
  } else {
    console.log("❌ Not logged in");
  }
});

// Function to sync wallet everywhere
function syncWallet(uid) {
  const ref = db.ref("users/" + uid + "/wallet");
  ref.on("value", snap => {
    const data = snap.val() || {};
    const recharge = data.recharge || 0;
    const bonus = data.bonus || 0;
    const winning = data.winning || 0;
    const total = recharge + bonus + winning;

    setEl("recharge", recharge);
    setEl("bonus", bonus);
    setEl("winning", winning);
    setEl("total", total);
    setEl("drawerBalance", total);
    setEl("totalBalance", total);

    console.log("💰 Wallet synced:", { recharge, bonus, winning, total });
  });
}

// Helper to safely update element
function setEl(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = "₹" + value.toFixed(2);
  }
}
