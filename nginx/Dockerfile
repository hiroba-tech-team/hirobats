FROM nginx:stable
MAINTAINER srtkkou<srtkkou@outlook.jp>

# ロケールをja_JPに変更(Debian)
RUN apt-get update \
  && apt-get install -y \
    locales \
  && echo "ja_JP.UTF-8 UTF-8" >> /etc/locale.gen \
  && locale-gen \
  && update-locale LANG=ja_JP.UTF-8 \
  && ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
  && dpkg-reconfigure -f noninteractive tzdata \
  && apt-get autoclean -y \
  && apt-get autoremove -y

# 基本設定のコピー
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

#----------------------------
# SSL認証の取得
#----------------------------
## 設定のコピー
#COPY sslcert.conf /etc/nginx/conf.d/

## SSL認証ファイルの設定
#RUN mkdir -p /usr/share/nginx/html/.well-known/pki-validation
#COPY index.html /usr/share/nginx/html/
#COPY fileauth.txt /usr/share/nginx/html/.well-known/pki-validation/

#----------------------------
# 本番用nginx設定
#----------------------------
# SSL用認証用フォルダの作成
RUN mkdir /etc/nginx/ssl \
  && chmod 700 /etc/nginx/ssl

# SSL認証用ファイルのコピー
COPY www_hiroba_tech.cer /etc/nginx/ssl/
COPY www_hiroba_tech.key /etc/nginx/ssl/
COPY www_hiroba_tech.key.pass /etc/nginx/ssl/
RUN chmod 600 /etc/nginx/ssl/*

# 設定のコピー
COPY hiroba_tech.conf /etc/nginx/conf.d/
