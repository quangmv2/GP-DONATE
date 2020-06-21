mkdir ../public/swagger 
php ../vendor/zircote/swagger-php/bin/swagger --bootstrap ./swagger-constants.php --output ../public/swagger ./swagger-v1.php ../app/Http/Controllers