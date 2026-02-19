# 🎓 LPU Campus Navigator

A smart campus navigation system for Lovely Professional University.
Find the **shortest walking path** between any two buildings using **Dijkstra's Algorithm**.

---

## 📁 Project Files

```
map-navigator/
├── backend/
│   └── server.cpp      ← C++ server (runs Dijkstra, sends results)
├── frontend/
│   ├── index.html      ← Web page (UI)
│   ├── style.css       ← Styling
│   └── script.js       ← Map drawing + calls backend
└── README.md
```

---

## ⚙️ How It Works

```
You click "Find Shortest Path"
        ↓
script.js sends request to C++ server
        ↓
server.cpp runs Dijkstra's Algorithm
        ↓
Returns shortest distance + path
        ↓
script.js draws the route on the map
```

---

## 🚀 How to Run

### Step 1 — Install MinGW (if not installed)
Download from: https://winlibs.com
After installing, add the `bin` folder to your Windows PATH.

---

### Step 2 — Compile the C++ Backend

Open **Command Prompt** inside the `backend` folder and run:

```
g++ -o server.exe server.cpp -lws2_32
```

No errors = success

---

### Step 3 — Start the Server

```
.\server.exe
```

You should see:
```
LPU Navigator backend running on http://localhost:8080
Open frontend\index.html in your browser.
Press Ctrl+C to stop.
```

If Windows Firewall asks — click Allow Access.

---

### Step 4 — Open the Website

Double-click `frontend\index.html` in File Explorer.

The green dot in the top-right corner means the C++ backend is connected.

---

## 🧠 Algorithm Used

**Dijkstra's Shortest Path Algorithm**

| Detail | Value |
|--------|-------|
| Graph type | Undirected, weighted |
| Data structure | Adjacency List |
| Priority Queue | Min-Heap (STL) |
| Time Complexity | O((V + E) log V) |
| Nodes (V) | 52 buildings |
| Edges (E) | 103 roads |

### How Dijkstra works (simple version):
1. Start at source building with distance = 0
2. Always pick the nearest unvisited building
3. Update distances to its neighbors if a shorter path is found
4. Repeat until the destination is reached
5. Trace back the full path using the prev[] array

---

## 🏫 Campus Buildings Covered

| Zone | Buildings |
|------|-----------|
| South Campus | Main Gate, LIM, Cafe, LIT Blocks, Hospital |
| West Campus | Lovely Mall, Law Block, Business Block |
| Mid Campus | LSB, Auditoriums, Girls Hostels 5-6 |
| Engineering | Blocks 25 to 38 |
| Admin | Chancellor Office, Admin Block 31-32 |
| Hostels | Girls Hostels 1-7, Boys Hostels 1-6 |
| North Campus | Agriculture Blocks, Polytechnic, Sports Complex |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| g++ not recognized | Install MinGW and add to PATH |
| Port 8080 already in use | Close other apps using that port |
| Red dot (backend offline) | Run server.exe before opening the HTML file |
| Windows Firewall popup | Click Allow Access |
| Multiple definition error | You ran the compile command twice — run it only once |
