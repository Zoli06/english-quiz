cd frontend
npm run build
cd ..
rm -rf backend/public
cp -r frontend/dist backend/public
docker compose build
# to run the containers, use: docker compose up -d