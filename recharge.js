document.getElementById("rechargeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const upi = document.getElementById("upi").value;
  const screenshotInput = document.getElementById("screenshot");

  const reader = new FileReader();

  reader.onload = function () {
    const screenshotData = reader.result;

    const newRequest = {
      user: "user1", // 👉 यहां dynamic username future में लगाओ
      amount: parseInt(amount),
      upi: upi,
      screenshot: screenshotData,
      status: "pending",
      date: new Date().toLocaleString()
    };

    // पहले से existing requests लाओ
    const existing = JSON.parse(localStorage.getItem("rechargeRequests") || "[]");
    existing.push(newRequest);

    // localStorage में सेव करो
    localStorage.setItem("rechargeRequests", JSON.stringify(existing));

    alert("Recharge request submitted!");
    document.getElementById("rechargeForm").reset();
  };

  reader.readAsDataURL(screenshotInput.files[0]);
});
