import React, { useState } from "react";

export default function App() {
  const [hotel, setHotel] = useState("");
  const [bill, setBill] = useState("");
  const [discount, setDiscount] = useState("");
  const [tip, setTip] = useState("");
  const [persons, setPersons] = useState(1);
  const [history, setHistory] = useState([]);

  const calculateBill = () => {
    if (!hotel || !bill || persons <= 0) {
      alert("Please enter valid details");
      return;
    }

    const discountAmount = bill * (discount / 100);
    const totalAfterDiscount = bill - discountAmount;
    const totalWithTip = totalAfterDiscount + Number(tip || 0);
    const perPerson = totalWithTip / persons;

    alert(
      `🏨 Hotel: ${hotel}
💰 Total Bill: ₹${totalWithTip.toFixed(2)}
👥 Per Person: ₹${perPerson.toFixed(2)}`
    );

    setHistory([
      {
        hotel,
        total: totalWithTip.toFixed(2),
        perPerson: perPerson.toFixed(2),
      },
      ...history,
    ]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hotel Bill Calculator</h1>

      <input
        style={styles.input}
        placeholder="Hotel Name"
        value={hotel}
        onChange={(e) => setHotel(e.target.value)}
      />

      <input
        style={styles.input}
        type="number"
        placeholder="Bill Amount (₹)"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <input
        style={styles.input}
        type="number"
        placeholder="Discount (%)"
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value))}
      />

      <input
        style={styles.input}
        type="number"
        placeholder="Tip Amount (₹)"
        value={tip}
        onChange={(e) => setTip(Number(e.target.value))}
      />

      <input
        style={styles.input}
        type="number"
        placeholder="Number of Persons"
        value={persons}
        onChange={(e) => setPersons(Number(e.target.value))}
      />

      <button style={styles.button} onClick={calculateBill}>
        Calculate & Split
      </button>

      <h2 style={styles.subtitle}>🧾 Bill History</h2>

      {history.length === 0 ? (
        <p style={styles.text}>No history yet</p>
      ) : (
        <ul style={styles.list}>
          {history.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <strong>{item.hotel}</strong>
              <br />
              Total: ₹{item.total}
              <br />
              Per Person: ₹{item.perPerson}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    marginBottom: "20px",
    fontSize: "32px",
    letterSpacing: "1px",
  },
  subtitle: {
    marginTop: "30px",
  },
  input: {
    width: "280px",
    padding: "10px",
    margin: "8px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },
  button: {
    marginTop: "15px",
    padding: "12px 25px",
    backgroundColor: "#f5c518",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  list: {
    listStyle: "none",
    padding: 0,
    width: "320px",
  },
  listItem: {
    background: "rgba(255,255,255,0.15)",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "6px",
  },
  text: {
    opacity: 0.8,
  },
};
