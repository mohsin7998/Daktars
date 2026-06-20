// ✅ Firebase Configuration (REPLACE THIS)
const firebaseConfig = {
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ Book Appointment
async function bookAppointment() {
  const doctor = document.getElementById("doctor").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const name = document.getElementById("name").value;

  if (!name || !date) {
    alert("Please fill all fields");
    return;
  }

  try {
    // ✅ Check if slot already exists
    const snapshot = await db.collection("appointments")
      .where("doctor", "==", doctor)
      .where("date", "==", date)
      .where("time", "==", time)
      .get();

    if (!snapshot.empty) {
      alert("❌ Slot already booked!");
      return;
    }

    // ✅ Save new appointment
    await db.collection("appointments").add({
      doctor: doctor,
      date: date,
      time: time,
      name: name,
      createdAt: new Date()
    });

    alert("✅ Appointment booked!");

    loadAppointments();

  } catch (error) {
    console.error(error);
    alert("Error booking appointment");
  }
}

// ✅ Load Appointments
async function loadAppointments() {
  const list = document.getElementById("appointmentsList");
  list.innerHTML = "";

  const snapshot = await db.collection("appointments").get();

  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");

    li.textContent =
      data.name + " - " +
      data.doctor + " (" +
      data.date + " " +
      data.time + ")";

    list.appendChild(li);
  });
}

// ✅ Load on start
loadAppointments();
