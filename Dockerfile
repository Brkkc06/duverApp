# 1. Adım: NGINX image'ını kullan
FROM nginx:alpine

# 2. Adım: Angular build dosyalarını NGINX dizinine kopyala
COPY frontend/angular-app/dist/angular-app/browser /usr/share/nginx/html

# 3. Adım: Varsayılan NGINX yapılandırmasını sil
RUN rm /etc/nginx/conf.d/default.conf

# 4. Adım: Kendi NGINX config dosyamızı ekleyelim
COPY nginx.conf /etc/nginx/conf.d
