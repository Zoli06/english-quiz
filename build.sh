cd frontend
npm install
npm run build
cd ..
cd backend
npm install
cd ..
rm -rf backend/public
cp -r frontend/dist backend/public
sudo docker compose build
# to run the containers, use: docker compose up -d