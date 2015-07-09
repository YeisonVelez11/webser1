@echo off
CD C:\mongodb\bin
dir
mongoexport.exe -h ds053320.mongolab.com:53320 -d mapamun_dengue -c municipio -u yeison -p oncecaldas11 --out E:\municipio.json
exit
