# Kumpulan Script Siap Pakai untuk ScriptHub

Berikut adalah kumpulan script yang sudah siap untuk dimasukkan ke platform ScriptHub. Tinggal copy-paste ke Admin Panel!

---

## 📱 MOBILE SCRIPTS

### 1. Blox Fruits Auto Farm Script

**Informasi:**
- Judul: `Blox Fruits Auto Farm Script (No Key)`
- Slug: `blox-fruits-auto-farm-no-key`
- Kategori: `Mobile Scripts`
- Bahasa: `javascript`
- Deskripsi: Script otomatis untuk farming di Blox Fruits tanpa perlu key, dengan fitur auto quest, auto sell, dan magnet

**Kode:**
```javascript
-- Blox Fruits Auto Farm Script
-- No Key Required
-- Features: Auto Farm, Auto Quest, Auto Sell, Magnet

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoidRootPart = character:WaitForChild("HumanoidRootPart")

-- Settings
local settings = {
    autoFarm = true,
    autoQuest = true,
    autoSell = true,
    magnetRange = 100,
    farmSpeed = 50,
    teleportDistance = 50
}

-- Fungsi untuk teleport
local function teleportTo(position)
    if humanoidRootPart then
        humanoidRootPart.CFrame = CFrame.new(position + Vector3.new(0, 3, 0))
    end
end

-- Fungsi untuk auto farm
local function autoFarm()
    if not settings.autoFarm then return end
    
    local enemies = workspace:FindPartOfClass("Model")
    local nearestEnemy = nil
    local shortestDistance = math.huge
    
    for _, enemy in pairs(enemies) do
        if enemy:FindFirstChild("Humanoid") and enemy ~= character then
            local distance = (enemy.PrimaryPart.Position - humanoidRootPart.Position).Magnitude
            if distance < shortestDistance and distance < settings.teleportDistance then
                shortestDistance = distance
                nearestEnemy = enemy
            end
        end
    end
    
    if nearestEnemy then
        teleportTo(nearestEnemy.PrimaryPart.Position)
    end
end

-- Fungsi untuk auto quest
local function autoQuest()
    if not settings.autoQuest then return end
    
    local questGiver = workspace:FindFirstChild("QuestGiver")
    if questGiver then
        teleportTo(questGiver.Position)
        wait(1)
        -- Accept quest
        local questButton = player.PlayerGui:FindFirstChild("QuestButton")
        if questButton then
            questButton:FireServer()
        end
    end
end

-- Fungsi untuk auto sell
local function autoSell()
    if not settings.autoSell then return end
    
    local sellNPC = workspace:FindFirstChild("Merchant")
    if sellNPC then
        teleportTo(sellNPC.Position)
        wait(0.5)
        local sellButton = player.PlayerGui:FindFirstChild("SellButton")
        if sellButton then
            sellButton:FireServer()
        end
    end
end

-- Magnet function
local function magnetItems()
    if not settings.magnetRange then return end
    
    local items = workspace:FindPartOfClass("Part")
    for _, item in pairs(items) do
        if item.Name == "Fruit" or item.Name == "Money" then
            local distance = (item.Position - humanoidRootPart.Position).Magnitude
            if distance < settings.magnetRange then
                item.CFrame = humanoidRootPart.CFrame + Vector3.new(0, -2, 0)
            end
        end
    end
end

-- Main loop
RunService.Heartbeat:Connect(function()
    if character and humanoidRootPart then
        autoFarm()
        autoQuest()
        autoSell()
        magnetItems()
    end
end)

-- Toggle controls
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if input.KeyCode == Enum.KeyCode.F then
        settings.autoFarm = not settings.autoFarm
        print("Auto Farm: " .. (settings.autoFarm and "ON" or "OFF"))
    elseif input.KeyCode == Enum.KeyCode.Q then
        settings.autoQuest = not settings.autoQuest
        print("Auto Quest: " .. (settings.autoQuest and "ON" or "OFF"))
    elseif input.KeyCode == Enum.KeyCode.S then
        settings.autoSell = not settings.autoSell
        print("Auto Sell: " .. (settings.autoSell and "ON" or "OFF"))
    elseif input.KeyCode == Enum.KeyCode.M then
        settings.magnetRange = settings.magnetRange == 0 and 100 or 0
        print("Magnet: " .. (settings.magnetRange > 0 and "ON" or "OFF"))
    end
end)

print("✅ Blox Fruits Auto Farm Script Loaded!")
print("Controls: F=Farm, Q=Quest, S=Sell, M=Magnet")
```

---

### 2. The Forge Auto Farm Script

**Informasi:**
- Judul: `The Forge Auto Farm Script 2025`
- Slug: `the-forge-auto-farm-2025`
- Kategori: `Mobile Scripts`
- Bahasa: `javascript`
- Deskripsi: Script untuk The Forge dengan auto farm, auto forge, dan ore skipper. Update 2025 dengan performa optimal.

**Kode:**
```javascript
-- The Forge Auto Farm Script 2025
-- Features: Auto Farm, Auto Forge, Ore Skipper, Kill Aura

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoidRootPart = character:WaitForChild("HumanoidRootPart")

-- Configuration
local config = {
    autoFarm = true,
    autoForge = true,
    oreSkipper = true,
    killAura = true,
    farmRadius = 80,
    forgeTime = 5,
    version = "2025.1"
}

-- Auto Farm Function
local function farmOre()
    if not config.autoFarm then return end
    
    local ores = workspace:FindPartOfClass("Part")
    local nearestOre = nil
    local shortestDist = math.huge
    
    for _, ore in pairs(ores) do
        if ore.Name:match("Ore") then
            local dist = (ore.Position - humanoidRootPart.Position).Magnitude
            if dist < shortestDist and dist < config.farmRadius then
                shortestDist = dist
                nearestOre = ore
            end
        end
    end
    
    if nearestOre then
        humanoidRootPart.CFrame = nearestOre.CFrame + Vector3.new(0, 3, 0)
        -- Mine ore
        local humanoid = character:FindFirstChild("Humanoid")
        if humanoid then
            humanoid:MoveTo(nearestOre.Position)
        end
    end
end

-- Auto Forge Function
local function autoForge()
    if not config.autoForge then return end
    
    local forgeNPC = workspace:FindFirstChild("Forge")
    if forgeNPC then
        humanoidRootPart.CFrame = forgeNPC.CFrame + Vector3.new(0, 3, 0)
        wait(config.forgeTime)
        -- Trigger forge
        local forgeEvent = player.PlayerGui:FindFirstChild("ForgeButton")
        if forgeEvent then
            forgeEvent:FireServer()
        end
    end
end

-- Ore Skipper Function
local function oreSkipper()
    if not config.oreSkipper then return end
    
    local ores = workspace:FindPartOfClass("Part")
    for _, ore in pairs(ores) do
        if ore.Name:match("LowOre") then
            ore:Destroy()
        end
    end
end

-- Kill Aura Function
local function killAura()
    if not config.killAura then return end
    
    local enemies = workspace:FindPartOfClass("Model")
    for _, enemy in pairs(enemies) do
        if enemy:FindFirstChild("Humanoid") and enemy ~= character then
            local dist = (enemy.PrimaryPart.Position - humanoidRootPart.Position).Magnitude
            if dist < 50 then
                -- Attack enemy
                local humanoid = enemy:FindFirstChild("Humanoid")
                if humanoid then
                    humanoid:TakeDamage(50)
                end
            end
        end
    end
end

-- Main Loop
RunService.Heartbeat:Connect(function()
    if character and humanoidRootPart then
        farmOre()
        autoForge()
        oreSkipper()
        killAura()
    end
end)

-- Keyboard Controls
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if input.KeyCode == Enum.KeyCode.F then
        config.autoFarm = not config.autoFarm
        print("Auto Farm: " .. (config.autoFarm and "✅ ON" or "❌ OFF"))
    elseif input.KeyCode == Enum.KeyCode.G then
        config.autoForge = not config.autoForge
        print("Auto Forge: " .. (config.autoForge and "✅ ON" or "❌ OFF"))
    elseif input.KeyCode == Enum.KeyCode.O then
        config.oreSkipper = not config.oreSkipper
        print("Ore Skipper: " .. (config.oreSkipper and "✅ ON" or "❌ OFF"))
    elseif input.KeyCode == Enum.KeyCode.K then
        config.killAura = not config.killAura
        print("Kill Aura: " .. (config.killAura and "✅ ON" or "❌ OFF"))
    end
end)

print("🔥 The Forge Auto Farm Script v" .. config.version .. " Loaded!")
print("Controls: F=Farm | G=Forge | O=Ore Skip | K=Kill Aura")
```

---

## 🎮 ROBLOX SCRIPTS

### 3. Simple Teleport Script

**Informasi:**
- Judul: `Simple Teleport Script`
- Slug: `simple-teleport-script`
- Kategori: `Roblox Scripts`
- Bahasa: `javascript`
- Deskripsi: Script sederhana untuk teleport ke lokasi tertentu dengan keyboard shortcut

**Kode:**
```javascript
-- Simple Teleport Script
-- Teleport ke lokasi dengan tombol

local UserInputService = game:GetService("UserInputService")
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoidRootPart = character:WaitForChild("HumanoidRootPart")

-- Teleport locations
local locations = {
    spawn = Vector3.new(0, 10, 0),
    shop = Vector3.new(50, 10, 0),
    farm = Vector3.new(100, 10, 0),
    boss = Vector3.new(200, 10, 0)
}

-- Teleport function
local function teleportTo(position)
    if humanoidRootPart then
        humanoidRootPart.CFrame = CFrame.new(position + Vector3.new(0, 3, 0))
        print("Teleported to " .. tostring(position))
    end
end

-- Keyboard input
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if input.KeyCode == Enum.KeyCode.One then
        teleportTo(locations.spawn)
    elseif input.KeyCode == Enum.KeyCode.Two then
        teleportTo(locations.shop)
    elseif input.KeyCode == Enum.KeyCode.Three then
        teleportTo(locations.farm)
    elseif input.KeyCode == Enum.KeyCode.Four then
        teleportTo(locations.boss)
    end
end)

print("✅ Teleport Script Loaded!")
print("1=Spawn | 2=Shop | 3=Farm | 4=Boss")
```

---

## 🤖 DISCORD BOTS

### 4. Discord Welcome Bot

**Informasi:**
- Judul: `Discord Welcome Bot Command`
- Slug: `discord-welcome-bot`
- Kategori: `Discord Bots`
- Bahasa: `javascript`
- Deskripsi: Command untuk Discord bot yang mengirim pesan welcome ke member baru dengan embed yang cantik

**Kode:**
```javascript
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('Send welcome message')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to welcome')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('🎉 Welcome to Our Server!')
            .setDescription(`Welcome ${user}, we're glad to have you here!`)
            .addFields(
                { name: '📖 Rules', value: 'Please read our rules in #rules channel', inline: false },
                { name: '🎮 Gaming', value: 'Join our gaming sessions in #gaming', inline: false },
                { name: '💬 Chat', value: 'Feel free to chat with us in #general', inline: false }
            )
            .setThumbnail(user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: 'Welcome!' });
        
        await interaction.reply({ embeds: [embed] });
    }
};
```

---

## 💾 DATABASE SCRIPTS

### 5. SQL - User Analytics Query

**Informasi:**
- Judul: `SQL User Analytics Query`
- Slug: `sql-user-analytics`
- Kategori: `Database`
- Bahasa: `sql`
- Deskripsi: Query SQL untuk mendapatkan analytics user dengan statistik lengkap

**Kode:**
```sql
-- User Analytics Query
-- Get comprehensive user statistics

SELECT 
    u.id,
    u.username,
    u.email,
    u.created_at,
    COUNT(DISTINCT p.id) as total_posts,
    COUNT(DISTINCT c.id) as total_comments,
    SUM(CASE WHEN p.status = 'published' THEN 1 ELSE 0 END) as published_posts,
    AVG(p.views) as avg_post_views,
    MAX(p.created_at) as last_post_date,
    DATEDIFF(NOW(), u.created_at) as days_active,
    CASE 
        WHEN COUNT(DISTINCT p.id) > 50 THEN 'Power User'
        WHEN COUNT(DISTINCT p.id) > 20 THEN 'Active User'
        WHEN COUNT(DISTINCT p.id) > 5 THEN 'Regular User'
        ELSE 'New User'
    END as user_tier
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
LEFT JOIN comments c ON u.id = c.user_id
WHERE u.is_active = 1
GROUP BY u.id
ORDER BY total_posts DESC
LIMIT 100;
```

---

## 🛠️ UTILITY SCRIPTS

### 6. JavaScript - Password Generator

**Informasi:**
- Judul: `JavaScript Password Generator`
- Slug: `js-password-generator`
- Kategori: `Utilities`
- Bahasa: `javascript`
- Deskripsi: Utility untuk generate password yang aman dengan opsi panjang dan karakter

**Kode:**
```javascript
/**
 * Password Generator Utility
 * Generate secure passwords dengan berbagai opsi
 */

class PasswordGenerator {
    constructor(options = {}) {
        this.length = options.length || 16;
        this.useUppercase = options.useUppercase !== false;
        this.useLowercase = options.useLowercase !== false;
        this.useNumbers = options.useNumbers !== false;
        this.useSymbols = options.useSymbols !== false;
        
        this.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.lowercase = 'abcdefghijklmnopqrstuvwxyz';
        this.numbers = '0123456789';
        this.symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }
    
    getCharacterSet() {
        let chars = '';
        if (this.useUppercase) chars += this.uppercase;
        if (this.useLowercase) chars += this.lowercase;
        if (this.useNumbers) chars += this.numbers;
        if (this.useSymbols) chars += this.symbols;
        return chars;
    }
    
    generate() {
        const chars = this.getCharacterSet();
        if (!chars) {
            throw new Error('At least one character type must be selected');
        }
        
        let password = '';
        for (let i = 0; i < this.length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    }
    
    generateMultiple(count = 5) {
        const passwords = [];
        for (let i = 0; i < count; i++) {
            passwords.push(this.generate());
        }
        return passwords;
    }
    
    checkStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.length >= 12) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) strength += 1;
        
        const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        return levels[Math.min(strength, 5)];
    }
}

// Usage
const generator = new PasswordGenerator({
    length: 16,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: true
});

const password = generator.generate();
console.log('Generated Password:', password);
console.log('Strength:', generator.checkStrength(password));
console.log('Multiple Passwords:', generator.generateMultiple(5));
```

---

## 📝 CARA MENGGUNAKAN SCRIPT INI

### Langkah 1: Copy Script
- Pilih script yang ingin ditambahkan
- Copy kode dari section "Kode:"

### Langkah 2: Buka Admin Panel
- Login ke akun admin Anda
- Akses `/admin`

### Langkah 3: Tambah Script Baru
- Klik tab "Script"
- Klik tombol "Tambah Script"

### Langkah 4: Isi Form
- **Judul**: Copy dari "Judul:" di atas
- **Slug**: Copy dari "Slug:" di atas
- **Deskripsi**: Copy dari "Deskripsi:" di atas
- **Konten Script**: Paste kode di sini
- **Bahasa**: Pilih dari "Bahasa:" di atas
- **Kategori**: Pilih dari "Kategori:" di atas

### Langkah 5: Simpan
- Klik tombol "Buat"
- Script akan langsung muncul di halaman utama!

---

## 🎯 Tips Tambahan

1. **Jangan lupa kategori** - Pastikan kategori sudah ada sebelum membuat script
2. **Slug unik** - Setiap slug harus unik, tidak boleh sama
3. **Kode rapi** - Pastikan kode sudah di-format dengan baik
4. **Deskripsi jelas** - Jelaskan apa yang script lakukan
5. **Test dulu** - Test script sebelum upload ke platform

---

Happy scripting! 🚀
