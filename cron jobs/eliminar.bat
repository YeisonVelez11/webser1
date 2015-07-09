@echo off
CD C:\mongodb\bin
dir
mongo ds053320.mongolab.com:53320/mapamun_dengue -u yeison -p oncecaldas11 --eval db.municipio.drop()
exit

