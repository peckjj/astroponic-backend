git pull origin master
rm -rf node_modules/
npm install
sudo pm2 restart app
sudo systemctl restart nginx
