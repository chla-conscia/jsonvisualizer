# How to Install and Host Conscia JSON Visualizer on Ubuntu Server

## Prerequisites
- Ubuntu Server (18.04 LTS or newer)
- Root or sudo access
- Basic knowledge of terminal commands

## Step 1: Update Your System
```bash
sudo apt update && sudo apt upgrade -y
```

## Step 2: Install Node.js and npm
Install the LTS version:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```
Verify the installation:
```bash
node -v
npm -v
```

## Step 3: Install Git
```bash
sudo apt install git -y
```

## Step 4: Clone the Repository
```bash
sudo mkdir -p /opt/conscia
sudo chown $USER:$USER /opt/conscia
cd /opt/conscia
git clone https://github.com/your-repo/conscia-json-visualizer.git .
```
Replace the repository URL with the actual one.

## Step 5: Install Dependencies
```bash
npm install
```

## Step 6: Build the Application
Since the application is configured with `output: 'export'` in Next.js, generate static files:
```bash
npm run build
```
This creates a static export in the `out` directory.

## Step 7: Set Up a Web Server

### Option 1: Using Nginx (Recommended for Production)
Install Nginx:
```bash
sudo apt install nginx -y
```
Create an Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/conscia-json-visualizer
```
Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or server IP

    root /opt/conscia/out;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```
Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/conscia-json-visualizer /etc/nginx/sites-enabled/
```
Test and restart Nginx:
```bash
sudo nginx -t && sudo systemctl restart nginx
```

### Option 2: Using a Simple HTTP Server (For Development/Testing)
For a quick setup:
```bash
sudo npm install -g serve
serve -s out -l 80
```
To keep it running:
```bash
sudo npm install -g pm2
pm2 serve out 80 --name "conscia-json-visualizer"
pm2 startup
pm2 save
```

## Step 8: Configure Firewall (Optional but Recommended)
If UFW is enabled:
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp  # If using HTTPS
```

## Step 9: Set Up SSL with Let's Encrypt (Optional but Recommended)
For HTTPS:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```
Follow the prompts to complete SSL setup.

## Step 10: Automate Updates (Optional)
Create an update script:
```bash
sudo nano /opt/conscia/update.sh
```
Add the following:
```bash
#!/bin/bash
cd /opt/conscia
git pull
npm install
npm run build
```
Make it executable:
```bash
sudo chmod +x /opt/conscia/update.sh
```
Schedule updates via cron:
```bash
crontab -e
```
Add:
```bash
0 2 * * * /opt/conscia/update.sh
```

## Troubleshooting
### If the application doesn't load:
Check Nginx logs:
```bash
sudo tail -f /var/log/nginx/error.log
```
Check file permissions:
```bash
sudo chown -R www-data:www-data /opt/conscia/out
```
Verify the build:
```bash
ls -la /opt/conscia/out
```

### If memory issues occur during build:
Increase Node.js memory limit:
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## Accessing the Application
- HTTP: `http://your-server-ip/`
- HTTPS: `https://your-domain.com/`

## Additional Notes
- Use HTTPS in production for security.
- Regularly update the system and application.
- Consider monitoring server performance.

This guide sets up the Conscia JSON Visualizer efficiently on Ubuntu Server. Adjust as needed for your environment.

