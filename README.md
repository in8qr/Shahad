# For Shahad

A small static love page (HTML, CSS, JS). No build step.

## Deploy on Linux

### 1. Clone on your server

```bash
git clone https://github.com/YOUR_USERNAME/for-shahad.git
cd for-shahad
```

### 2. Copy files to a web root

```bash
chmod +x deploy.sh
./deploy.sh
```

Or manually:

```bash
sudo mkdir -p /var/www/for-shahad
sudo cp index.html styles.css script.js /var/www/for-shahad/
```

### 3. Nginx example

Create `/etc/nginx/sites-available/for-shahad`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/for-shahad;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/for-shahad /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Use Certbot for HTTPS if you have a domain.

### Local preview

```bash
python3 -m http.server 8765
```

Open http://localhost:8765
