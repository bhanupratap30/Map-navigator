/*
  LPU Campus Navigator - C++ Backend
  Compile: g++ -o server.exe server.cpp -lws2_32
  Run:     .\server.exe
  Then open: frontend\index.html in your browser
*/

#include <winsock2.h>
#include <windows.h>
#include <iostream>
#include <string>
#include <vector>
#include <queue>
#include <sstream>
#include <climits>
#include <algorithm>
#include <cmath>
#pragma comment(lib, "ws2_32.lib")
using namespace std;

// ── CAMPUS DATA 

const int N = 53; // total buildings

string NAMES[N] = {
  "Main Gate (NH-1)", "LIM", "Campus Cafe", "Auditorium S",
  "LIT Engineering",  "LIT Pharmacy", "LIT Architecture", "LIT Pharmacy 2",
  "BR Mittal Hospital", "Girls Hostel 1", "Girls Hostel 2", "Girls Hostel 3",
  "Girls Hostel 4", "LIT Polytechnic", "Business Block", "Lovely Mall",
  "Hotel Management", "Law Block", "Education Block", "Auditorium Mid",
  "LSB", "Girls Hostel 5", "Girls Hostel 6", "Block 23", "Block 24",
  "Engineering 25", "Engineering 26", "Engineering 27", "Engineering 28",
  "Engineering 29", "Chancellor Office", "Admin Block 31", "Admin Block 32",
  "Engineering 33", "Engineering 34", "Engineering 35", "Engineering 36",
  "Engineering 37", "Engineering 38", "Girls Hostel 7", "Sports Complex",
  "Apartment 41", "Staff Residence 42", "Boys Hostel 1", "Boys Hostel 2",
  "Boys Hostel 3", "Boys Hostel 4", "Boys Hostel 5", "Boys Hostel 6",
  "Agriculture Block 1", "Agriculture Block 2", "Polytechnic Block",
  "Boys Hostel 7"  // 52 — new node between Agriculture Block 1 and Boys Hostel 4
};

string NUMS[N] = {
  "MG","01","02","03","04","05","06","07","08","09","10","11","12","13",
  "14","15","16","17","18","19","20","21","22","23","24","25","26","27",
  "28","29","30","31","32","33","34","35","36","37","38","39","40","41",
  "42","43","44","45","46","47","48","49","50","51","52"
};

// ── GRAPH (Adjacency List) 

vector<pair<int,int> > adj[N]; // adj[u] = list of {neighbor, distance}

void addRoad(int a, int b, int dist) {
  adj[a].push_back(make_pair(b, dist));
  adj[b].push_back(make_pair(a, dist));
}

void buildGraph() {
  // South Campus
  addRoad(0,1,60);  addRoad(0,2,105); addRoad(0,7,130);
  addRoad(1,2,100); addRoad(1,13,80);
  addRoad(2,3,100); addRoad(2,7,110); addRoad(2,13,120);
  addRoad(3,4,100); addRoad(3,8,90);
  addRoad(4,5,80);  addRoad(4,8,100);
  addRoad(5,6,75);  addRoad(5,14,120);
  addRoad(6,7,100); addRoad(7,13,110);
  // Hospital + Girls Hostels 1-4
  addRoad(8,9,100);  addRoad(8,15,130); addRoad(8,16,100);
  addRoad(9,10,80);  addRoad(9,13,80);
  addRoad(10,11,80); addRoad(10,13,90); addRoad(10,19,120);
  addRoad(11,12,80); addRoad(11,19,100);addRoad(11,20,120);
  addRoad(12,13,80); addRoad(13,16,110);
  // West Campus
  addRoad(14,15,75); addRoad(14,17,100);
  addRoad(15,16,85); addRoad(15,17,80);
  addRoad(16,17,85); addRoad(16,18,110);addRoad(16,30,140);
  addRoad(17,31,145);
  addRoad(18,19,170);addRoad(18,29,100);addRoad(18,30,100);
  // Mid Campus
  addRoad(19,20,95); addRoad(19,23,90); addRoad(19,29,110);
  addRoad(20,21,130);addRoad(20,22,140);addRoad(20,24,90);
  addRoad(21,22,80); addRoad(21,25,110);addRoad(22,25,100);
  addRoad(23,24,75); addRoad(23,29,90);
  addRoad(24,25,90); addRoad(24,26,85);
  // Engineering 25-29
  addRoad(25,26,75); addRoad(25,41,120);
  addRoad(26,27,75); addRoad(26,41,110);
  addRoad(27,28,75); addRoad(27,30,95);
  addRoad(28,29,80); addRoad(28,30,90); addRoad(29,30,80);
  // Admin + Engineering 30-38
  addRoad(30,31,80); addRoad(30,35,110);addRoad(30,36,100);
  addRoad(31,32,75); addRoad(31,34,110);
  addRoad(32,33,70); addRoad(32,34,100);addRoad(33,34,65);
  addRoad(34,35,100);addRoad(34,40,145);
  addRoad(35,36,75); addRoad(35,40,120);
  addRoad(36,37,75); addRoad(36,39,110);
  addRoad(37,38,75); addRoad(37,39,90); addRoad(37,41,110);addRoad(37,42,115);
  addRoad(38,39,85); addRoad(38,41,100);addRoad(38,42,100);
  // North Campus
  addRoad(39,40,85); addRoad(39,42,110);addRoad(39,49,145);
  addRoad(40,48,115);addRoad(40,49,120);addRoad(40,50,105);
  addRoad(41,42,75); addRoad(41,43,90);
  addRoad(42,43,100);addRoad(42,49,120);
  addRoad(43,44,75); addRoad(43,46,140);
  addRoad(44,45,70); addRoad(44,46,90); addRoad(45,46,100);addRoad(46,49,160);
  addRoad(47,48,90); addRoad(47,51,90);
  addRoad(48,49,115);addRoad(48,50,85); addRoad(48,51,80);
  addRoad(49,50,85); addRoad(50,51,90);

  // New: Sports Complex (40) connected to Boys Hostel 2 (44)
  addRoad(40, 44, 130);

  // New: Boys Hostel 7 (52) — between Agriculture Block 1 (49) and Boys Hostel 4 (46)
  addRoad(49, 52, 90);
  addRoad(52, 46, 85);
}

// ── DIJKSTRA'S ALGORITHM ─────────────────────────────────────────
// Finds shortest path from src to dst
// Returns distance (-1 if unreachable) and path as list of node IDs

struct Result { int dist; vector<int> path; };

Result dijkstra(int src, int dst) {
  vector<int> dist(N, INT_MAX), prev(N, -1);
  priority_queue<pair<int,int>, vector<pair<int,int> >, greater<pair<int,int> > > pq;

  dist[src] = 0;
  pq.push(make_pair(0, src));

  while (!pq.empty()) {
    int d = pq.top().first;
    int u = pq.top().second;
    pq.pop();

    if (d > dist[u]) continue; // skip outdated entry
    if (u == dst) break;       // reached destination

    for (int i = 0; i < (int)adj[u].size(); i++) {
      int v = adj[u][i].first;
      int w = adj[u][i].second;
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
        pq.push(make_pair(dist[v], v));
      }
    }
  }

  Result res;
  if (dist[dst] == INT_MAX) { res.dist = -1; return res; }

  // Rebuild path by walking backwards through prev[]
  for (int cur = dst; cur != -1; cur = prev[cur])
    res.path.push_back(cur);
  reverse(res.path.begin(), res.path.end());

  res.dist = dist[dst];
  return res;
}

// ── HTTP HELPERS ─────────────────────────────────────────────────

// Read a number from JSON body like {"src":5,"dst":10}
int jsonInt(const string& body, const string& key) {
  size_t p = body.find("\"" + key + "\"");
  if (p == string::npos) return -1;
  p = body.find(':', p) + 1;
  while (body[p] == ' ') p++;
  try { return stoi(body.substr(p)); } catch (...) { return -1; }
}

// Build JSON response string
string makeJSON(int src, int dst, const Result& r) {
  if (r.dist == -1) return "{\"error\":\"No path found\"}";

  string nodes = "[";
  for (int i = 0; i < (int)r.path.size(); i++) {
    int id = r.path[i];
    ostringstream o;
    o << "{\"id\":" << id << ",\"num\":\"" << NUMS[id] << "\",\"name\":\"" << NAMES[id] << "\"}";
    nodes += o.str();
    if (i < (int)r.path.size()-1) nodes += ",";
  }
  nodes += "]";

  ostringstream o;
  o << "{\"distance\":" << r.dist
    << ",\"walkTime\":"  << (int)ceil(r.dist/80.0)
    << ",\"src\":"       << src
    << ",\"dst\":"       << dst
    << ",\"path\":"      << nodes << "}";
  return o.str();
}

const string CORS =
  "Access-Control-Allow-Origin: *\r\n"
  "Access-Control-Allow-Methods: POST,GET,OPTIONS\r\n"
  "Access-Control-Allow-Headers: Content-Type\r\n";

void sendHTTP(SOCKET s, const string& status, const string& body) {
  ostringstream r;
  r << "HTTP/1.1 " << status << "\r\n"
    << "Content-Type: application/json\r\n"
    << CORS
    << "Content-Length: " << body.size() << "\r\n"
    << "Connection: close\r\n\r\n"
    << body;
  string res = r.str();
  send(s, res.c_str(), (int)res.size(), 0);
}

// ── REQUEST HANDLER (one thread per connection) ──────────────────

DWORD WINAPI handleClient(LPVOID arg) {
  SOCKET sock = *(SOCKET*)arg;
  delete (SOCKET*)arg;

  char buf[4096] = {0};
  recv(sock, buf, sizeof(buf)-1, 0);
  string req(buf);

  string method, path;
  istringstream(req) >> method >> path;

  // CORS preflight
  if (method == "OPTIONS") { sendHTTP(sock, "204 No Content", ""); }

  // Find shortest path
  else if (method == "POST" && path == "/navigate") {
    size_t b = req.find("\r\n\r\n");
    string body = (b != string::npos) ? req.substr(b+4) : "";
    int src = jsonInt(body, "src");
    int dst = jsonInt(body, "dst");

    if (src<0 || dst<0 || src>=N || dst>=N)
      sendHTTP(sock, "400 Bad Request", "{\"error\":\"Invalid input\"}");
    else
      sendHTTP(sock, "200 OK", makeJSON(src, dst, dijkstra(src, dst)));
  }

  // Health check
  else if (method == "GET" && path == "/health") {
    sendHTTP(sock, "200 OK", "{\"status\":\"ok\"}");
  }

  else { sendHTTP(sock, "404 Not Found", "{\"error\":\"Not found\"}"); }

  closesocket(sock);
  return 0;
}

// ── MAIN ─────────────────────────────────────────────────────────

int main() {
  WSADATA w;
  WSAStartup(MAKEWORD(2,2), &w);
  buildGraph();

  SOCKET server = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
  int opt = 1;
  setsockopt(server, SOL_SOCKET, SO_REUSEADDR, (char*)&opt, sizeof(opt));

  sockaddr_in addr;
  addr.sin_family      = AF_INET;
  addr.sin_addr.s_addr = INADDR_ANY;
  addr.sin_port        = htons(8080);

  if (bind(server, (sockaddr*)&addr, sizeof(addr)) == SOCKET_ERROR) {
    cout << "ERROR: Port 8080 is already in use.\n";
    WSACleanup(); return 1;
  }
  listen(server, 10);

  cout << "LPU Navigator backend running on http://localhost:8080\n";
  cout << "Open frontend\\index.html in your browser.\n";
  cout << "Press Ctrl+C to stop.\n\n";

  while (true) {
    sockaddr_in clientAddr;
    int len = sizeof(clientAddr);
    SOCKET client = accept(server, (sockaddr*)&clientAddr, &len);
    if (client == INVALID_SOCKET) continue;
    SOCKET* p = new SOCKET(client);
    HANDLE t = CreateThread(NULL, 0, handleClient, p, 0, NULL);
    if (t) CloseHandle(t);
  }

  closesocket(server);
  WSACleanup();
  return 0;
}
