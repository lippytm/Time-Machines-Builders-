# Deployment Guide

## 📦 Production Deployment

### Prerequisites

- Node.js v18+ installed on server
- PostgreSQL (optional)
- MongoDB (optional)
- OpenAI API key
- Domain name (for HTTPS)
- SSL certificate

---

## 🚀 Deployment Options

### Option 1: Traditional Server Deployment

#### 1. Prepare the Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install nginx
sudo apt install -y nginx
```

#### 2. Deploy Backend

```bash
# Clone repository
git clone https://github.com/lippytm/Time-Machines-Builders-.git
cd Time-Machines-Builders-/backend

# Install dependencies
npm install --production

# Create .env file
nano .env
# Add production environment variables

# Build TypeScript
npm run build

# Start with PM2
pm2 start dist/index.js --name timemachines-backend
pm2 save
pm2 startup
```

#### 3. Deploy Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create production .env
nano .env.production
# REACT_APP_API_URL=https://api.yourdomain.com/api

# Build for production
npm run build

# Copy build to nginx
sudo cp -r build/* /var/www/html/
```

#### 4. Configure Nginx

```nginx
# /etc/nginx/sites-available/timemachines

# Frontend
server {
    listen 80;
    server_name yourdomain.com;
    
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/timemachines /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. Set up SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

---

### Option 2: Docker Deployment

#### 1. Prepare Docker Environment

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 2. Update docker-compose.yml for Production

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - timemachines-network

  mongodb:
    image: mongo:7
    restart: always
    volumes:
      - mongodb_data:/data/db
    networks:
      - timemachines-network

  backend:
    build: ./backend
    restart: always
    environment:
      NODE_ENV: production
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      # ... other env vars
    depends_on:
      - postgres
      - mongodb
    networks:
      - timemachines-network

  frontend:
    build: ./frontend
    restart: always
    depends_on:
      - backend
    ports:
      - "80:80"
    networks:
      - timemachines-network

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - backend
      - frontend
    networks:
      - timemachines-network

volumes:
  postgres_data:
  mongodb_data:

networks:
  timemachines-network:
```

#### 3. Deploy with Docker

```bash
# Create .env file with production values
cp .env.example .env
nano .env

# Build and start
docker-compose up -d

# View logs
docker-compose logs -f
```

---

### Option 3: Cloud Platform Deployment

#### Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create apps
heroku create timemachines-backend
heroku create timemachines-frontend

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key -a timemachines-backend

# Deploy backend
git subtree push --prefix backend heroku main

# Deploy frontend
# (Use buildpack for create-react-app)
heroku buildpacks:set mars/create-react-app -a timemachines-frontend
git subtree push --prefix frontend heroku main
```

#### AWS (EC2)

1. Launch EC2 instance (Ubuntu 22.04)
2. Configure security groups (ports 80, 443, 22)
3. Follow "Traditional Server Deployment" steps
4. Use AWS RDS for PostgreSQL (optional)
5. Use MongoDB Atlas for MongoDB (optional)

#### Vercel (Frontend only)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

---

## 🔒 Production Security Checklist

- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Implement authentication/authorization
- [ ] Set up monitoring and logging
- [ ] Regular security updates
- [ ] Database encryption at rest
- [ ] Regular backups
- [ ] DDoS protection

---

## 📊 Monitoring

### PM2 Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs timemachines-backend

# Monitor resources
pm2 monit
```

### Application Logs

```bash
# Backend logs
tail -f /var/log/timemachines/backend.log

# Nginx access logs
tail -f /var/log/nginx/access.log

# Nginx error logs
tail -f /var/log/nginx/error.log
```

---

## 🔄 Updates and Maintenance

### Updating the Application

```bash
# Pull latest code
git pull origin main

# Update backend
cd backend
npm install
npm run build
pm2 restart timemachines-backend

# Update frontend
cd ../frontend
npm install
npm run build
sudo cp -r build/* /var/www/html/
```

### Database Backups

```bash
# PostgreSQL backup
pg_dump -U postgres timemachines > backup.sql

# MongoDB backup
mongodump --db timemachines --out /backup/mongodb
```

---

## 💰 Cost Optimization

1. **OpenAI API**: Monitor usage, set spending limits
2. **Database**: Use connection pooling
3. **Hosting**: Start with smaller instances, scale as needed
4. **CDN**: Use for frontend static assets
5. **Caching**: Implement Redis for frequent queries

---

## 🐛 Troubleshooting

### Backend not starting
- Check environment variables
- Verify Node.js version
- Review PM2 logs

### Frontend not loading
- Check nginx configuration
- Verify build process completed
- Check browser console for errors

### Database connection issues
- Verify connection strings
- Check firewall rules
- Ensure databases are running

### SSL certificate issues
- Renew with `certbot renew`
- Check certificate expiration
- Verify DNS settings

---

## 📞 Support

For deployment issues:
- GitHub Issues: https://github.com/lippytm/Time-Machines-Builders-/issues
- Documentation: See README.md and FULLSTACK_SETUP.md

---

**Remember:** Always test in a staging environment before deploying to production!
