import { Database } from '../components/indexedDB.js';

// Initialize IndexedDB for storing user credentials
const db = new Database("appDB");
await db.openDB();

// DOM elements
const signinForm = document.getElementById("signinForm");
const signupForm = document.getElementById("signupForm");
const signupContainer = document.getElementById("signupContainer");
const showSignup = document.getElementById("showSignup");
const showSignin = document.getElementById("showSignin");

// Toggle forms
showSignup.addEventListener("click", () => {
  signinForm.parentElement.style.display = "none";
  signupContainer.style.display = "block";
});

showSignin.addEventListener("click", () => {
  signupContainer.style.display = "none";
  signinForm.parentElement.style.display = "block";
});

// Hashing function (for simplicity)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Sign-up logic
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const existingUser = await db.getAppByID(email);
    if (existingUser) {
      alert("User already exists. Please sign in.");
      return;
    }

    const hashedPassword = await hashPassword(password);

    await db.addApp({ id: email, password: hashedPassword });
    alert("Sign-up successful! Please sign in.");
    signupContainer.style.display = "none";
    signinForm.parentElement.style.display = "block";
  } catch (error) {
    console.error("Error signing up:", error);
  }
});

// Sign-in logic
signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  try {
    const user = await db.getAppByID(email);
    const hashedPassword = await hashPassword(password);

    if (user && user.password === hashedPassword) {
      alert("Login successful!");
      window.location.href = "./homepage.html"; // Redirect to homepage
    } else {
      alert("Invalid email or password.");
    }
  } catch (error) {
    console.error("Error signing in:", error);
  }
});
