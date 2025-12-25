# Panduan Menambah Script ke ScriptHub

## Cara 1: Melalui Admin Panel (Recommended)

### Langkah-Langkah:

1. **Login ke Admin Panel**
   - Klik tombol "Admin Panel" di halaman utama (hanya muncul jika Anda login sebagai admin)
   - Atau akses langsung ke `/admin`

2. **Buka Tab "Script"**
   - Di Admin Panel, pilih tab "Script" (sebelah kanan tab "Kategori")

3. **Klik Tombol "Tambah Script"**
   - Tombol hijau "Tambah Script" akan muncul di bagian atas

4. **Isi Form Script**
   - **Judul**: Nama script (contoh: "Auto Farm Script")
   - **Slug**: URL-friendly name tanpa spasi (contoh: "auto-farm-script")
   - **Deskripsi**: Penjelasan singkat script
   - **Konten Script**: Paste kode script Anda di sini
   - **Bahasa**: Pilih bahasa pemrograman (JavaScript, Python, Java, dll)
   - **Kategori**: Pilih kategori yang sesuai

5. **Klik Tombol "Buat"**
   - Script akan tersimpan dan langsung muncul di halaman utama

---

## Contoh Script yang Bisa Ditambahkan

### Contoh 1: JavaScript - Auto Farm Script

**Judul:** Auto Farm Script Roblox
**Slug:** auto-farm-roblox
**Deskripsi:** Script otomatis untuk farming di game Roblox dengan fitur auto quest dan auto sell
**Bahasa:** javascript
**Kategori:** Mobile Scripts

```javascript
-- Auto Farm Script untuk Roblox
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoidRootPart = character:WaitForChild("HumanoidRootPart")

-- Konfigurasi
local AUTO_FARM_ENABLED = true
local AUTO_SELL_ENABLED = true
local FARM_SPEED = 50

-- Fungsi untuk farming
local function autoFarm()
    if not AUTO_FARM_ENABLED then return end
    
    -- Cari NPC terdekat
    local nearestNPC = nil
    local shortestDistance = math.huge
    
    for _, npc in pairs(workspace:FindPartOfClass("Model")) do
        if npc:FindFirstChild("Humanoid") and npc ~= character then
            local distance = (npc.PrimaryPart.Position - humanoidRootPart.Position).Magnitude
            if distance < shortestDistance then
                shortestDistance = distance
                nearestNPC = npc
            end
        end
    end
    
    -- Pergi ke NPC
    if nearestNPC then
        humanoidRootPart.CFrame = nearestNPC.PrimaryPart.CFrame + Vector3.new(0, 3, 0)
    end
end

-- Fungsi untuk auto sell
local function autoSell()
    if not AUTO_SELL_ENABLED then return end
    
    local sellButton = player.PlayerGui:FindFirstChild("SellButton")
    if sellButton then
        sellButton:FireServer()
    end
end

-- Loop utama
RunService.Heartbeat:Connect(function()
    autoFarm()
    autoSell()
end)

-- Toggle dengan tombol
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if input.KeyCode == Enum.KeyCode.F then
        AUTO_FARM_ENABLED = not AUTO_FARM_ENABLED
        print("Auto Farm: " .. (AUTO_FARM_ENABLED and "ON" or "OFF"))
    end
    
    if input.KeyCode == Enum.KeyCode.S then
        AUTO_SELL_ENABLED = not AUTO_SELL_ENABLED
        print("Auto Sell: " .. (AUTO_SELL_ENABLED and "ON" or "OFF"))
    end
end)
```

---

### Contoh 2: Python - Web Scraper

**Judul:** Simple Web Scraper dengan BeautifulSoup
**Slug:** web-scraper-beautifulsoup
**Deskripsi:** Script Python untuk scrape data dari website dengan BeautifulSoup
**Bahasa:** python
**Kategori:** Script

```python
import requests
from bs4 import BeautifulSoup
import csv
from datetime import datetime

class WebScraper:
    def __init__(self, url):
        self.url = url
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    
    def fetch_page(self):
        """Fetch halaman HTML"""
        try:
            response = requests.get(self.url, headers=self.headers, timeout=10)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            print(f"Error fetching page: {e}")
            return None
    
    def parse_data(self, html):
        """Parse HTML dan extract data"""
        soup = BeautifulSoup(html, 'html.parser')
        data = []
        
        # Contoh: Scrape semua artikel
        articles = soup.find_all('article', class_='post')
        
        for article in articles:
            title = article.find('h2', class_='title')
            author = article.find('span', class_='author')
            date = article.find('span', class_='date')
            
            if title and author:
                data.append({
                    'title': title.text.strip(),
                    'author': author.text.strip(),
                    'date': date.text.strip() if date else 'N/A'
                })
        
        return data
    
    def save_to_csv(self, data, filename=None):
        """Simpan data ke CSV"""
        if not filename:
            filename = f"scraped_data_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        
        if not data:
            print("No data to save")
            return
        
        try:
            with open(filename, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=data[0].keys())
                writer.writeheader()
                writer.writerows(data)
            print(f"Data saved to {filename}")
        except Exception as e:
            print(f"Error saving to CSV: {e}")
    
    def run(self):
        """Jalankan scraper"""
        print(f"Scraping {self.url}...")
        html = self.fetch_page()
        
        if html:
            data = self.parse_data(html)
            print(f"Found {len(data)} items")
            self.save_to_csv(data)
            return data
        return None

# Penggunaan
if __name__ == "__main__":
    scraper = WebScraper("https://example.com/blog")
    scraper.run()
```

---

### Contoh 3: JavaScript - Discord Bot Command

**Judul:** Discord Bot - Music Player Command
**Slug:** discord-bot-music-player
**Deskripsi:** Command untuk Discord bot yang bisa play musik dari YouTube
**Bahasa:** javascript
**Kategori:** Script

```javascript
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play musik dari YouTube')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL YouTube')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const url = interaction.options.getString('url');
        
        // Validasi URL
        if (!ytdl.validateURL(url)) {
            return interaction.reply({
                content: '❌ URL tidak valid!',
                ephemeral: true
            });
        }
        
        // Check voice channel
        if (!interaction.member.voice.channel) {
            return interaction.reply({
                content: '❌ Anda harus berada di voice channel!',
                ephemeral: true
            });
        }
        
        try {
            await interaction.deferReply();
            
            // Get video info
            const info = await ytdl.getInfo(url);
            const title = info.videoDetails.title;
            const duration = info.videoDetails.lengthSeconds;
            
            // Join voice channel
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            
            // Create audio resource
            const stream = ytdl(url, { quality: 'highestaudio' });
            const resource = createAudioResource(stream);
            
            // Create player
            const player = createAudioPlayer();
            player.play(resource);
            connection.subscribe(player);
            
            // Reply
            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('🎵 Now Playing')
                .setDescription(title)
                .addFields(
                    { name: 'Duration', value: `${Math.floor(duration / 60)}:${duration % 60}`, inline: true }
                )
                .setTimestamp();
            
            await interaction.editReply({ embeds: [embed] });
            
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                content: '❌ Error saat memutar musik!',
            });
        }
    }
};
```

---

### Contoh 4: SQL - Database Query

**Judul:** SQL Query - Get Top Users
**Slug:** sql-top-users-query
**Deskripsi:** Query SQL untuk mendapatkan top 10 users berdasarkan points
**Bahasa:** sql
**Kategori:** Script

```sql
-- Get Top 10 Users by Points
SELECT 
    u.id,
    u.username,
    u.email,
    u.points,
    COUNT(p.id) as total_posts,
    AVG(p.likes) as avg_likes,
    MAX(p.created_at) as last_post_date
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.is_active = 1
    AND u.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY u.id
HAVING total_posts > 0
ORDER BY u.points DESC, total_posts DESC
LIMIT 10;

-- Get User Statistics
SELECT 
    DATE(created_at) as date,
    COUNT(*) as new_users,
    SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_users,
    AVG(points) as avg_points
FROM users
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## Cara Memasukkan Script Melalui Admin Panel

### Step-by-Step dengan Screenshot:

1. **Akses Admin Panel**
   ```
   URL: https://your-domain.com/admin
   ```

2. **Pilih Tab "Script"**
   - Klik tab "Script" di bagian atas

3. **Klik "Tambah Script"**
   - Tombol hijau akan muncul

4. **Isi Semua Field:**
   - Judul: Nama script
   - Slug: URL-friendly (gunakan huruf kecil dan dash)
   - Deskripsi: Penjelasan singkat
   - Konten Script: Paste kode di sini
   - Bahasa: Pilih dari dropdown
   - Kategori: Pilih kategori yang sesuai

5. **Klik "Buat"**
   - Script akan tersimpan otomatis

---

## Tips Memasukkan Script

### Naming Convention (Penamaan):
- **Judul**: Gunakan judul yang deskriptif dan menarik
  - ✅ Baik: "Auto Farm Script Roblox dengan Auto Sell"
  - ❌ Buruk: "script 123"

- **Slug**: Gunakan format URL-friendly
  - ✅ Baik: `auto-farm-roblox-with-sell`
  - ❌ Buruk: `Auto Farm Roblox!!!`

### Deskripsi:
- Jelaskan apa yang script lakukan
- Sebutkan fitur utama
- Contoh: "Script otomatis untuk farming dengan fitur auto quest, auto sell, dan kill aura. Cocok untuk pemula."

### Konten Script:
- Pastikan kode sudah tested dan berfungsi
- Tambahkan comments untuk bagian penting
- Gunakan formatting yang rapi

### Kategori:
- Pilih kategori yang paling sesuai
- Jika tidak ada, buat kategori baru di tab "Kategori"

---

## Membuat Kategori Baru

Jika Anda ingin membuat kategori baru:

1. **Buka Tab "Kategori"**
2. **Klik "Tambah Kategori"**
3. **Isi Form:**
   - **Nama**: Nama kategori (contoh: "Mobile Scripts")
   - **Slug**: URL-friendly (contoh: "mobile-scripts")
   - **Deskripsi**: Penjelasan kategori
   - **Warna**: Pilih warna (color picker)
   - **Icon**: Emoji atau icon (contoh: 📱)
4. **Klik "Buat"**

---

## Troubleshooting

### Script tidak muncul setelah dibuat?
- Pastikan Anda sudah login sebagai admin
- Refresh halaman (F5)
- Check browser console untuk error

### Slug sudah digunakan?
- Slug harus unik
- Tambahkan angka atau kata di akhir (contoh: `auto-farm-v2`)

### Kode tidak ditampilkan dengan benar?
- Pastikan format kode sudah benar
- Gunakan syntax yang sesuai dengan bahasa yang dipilih

---

## Contoh Kategori yang Bisa Dibuat

| Nama Kategori | Slug | Icon | Deskripsi |
|---|---|---|---|
| Mobile Scripts | mobile-scripts | 📱 | Script untuk game mobile |
| Roblox Scripts | roblox-scripts | 🎮 | Script khusus Roblox |
| Discord Bots | discord-bots | 🤖 | Bot dan command Discord |
| Web Tools | web-tools | 🌐 | Tool untuk web development |
| Automation | automation | ⚙️ | Script untuk automasi |
| Database | database | 💾 | Query dan script database |
| Utilities | utilities | 🛠️ | Utility dan helper scripts |

---

Selamat menambah script! 🚀
