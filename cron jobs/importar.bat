@echo off
CD C:\mongodb\bin
dir
mongoimport -h ds053320.mongolab.com:53320 -d mapamun_dengue -c municipio -u yeison -p oncecaldas11 --file E:\municipio.json
exit

