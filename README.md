# TinyURL

•	Developed a full stack web app using the MEAN stack (MongoDB, Express, Angular and Node.js) to deliver TinyURL-like URL shortening service with a REST API backend.

•	Designed a user management system to perform real-time data analysis and visualization by Angular-chart and web socket.

•	Used Redis and LRU Map as cache layer over MongoDB to improve performance and dockerize the app to scale up  as multiple instances.

•	Deployed server containers under Nginx for load balancing and reverse proxy to handle 10k qps and migrated from MongoDB to Apache Cassandra to create a distributed data store.



```
git clone https://github.com/gpldirk/TinyURL.git
```


start docker engine
cd into the folder that contains docker-compose.yml
```
docker-compose up --build
```

open http://localhost on brower to see webpage



The youtube demo address: 
https://youtu.be/Brhi6K_FBCc
