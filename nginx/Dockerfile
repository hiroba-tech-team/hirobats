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
ENV CONFIG_PATH=/etc/nginx
COPY nginx.conf $CONFIG_PATH/nginx.conf
RUN rm $CONFIG_PATH/conf.d/default.conf

#----------------------------
# SSL認証の取得
#----------------------------
# 設定のコピー
#COPY sslcert.conf $CONFIG_PATH/conf.d/

# SSL認証ファイルの設定
#ENV ROOT=/usr/share/nginx/html
#RUN mkdir -p $ROOT/.well-known/pki-validation
#COPY index.html $ROOT/
#COPY fileauth.txt $ROOT/.well-known/pki-validation/

#----------------------------
# 本番用nginx設定
#----------------------------
# SSL用認証用フォルダの作成
RUN mkdir -p $CONFIG_PATH/ssl
COPY ssl $CONFIG_PATH/ssl
RUN chmod 700 $CONFIG_PATH/ssl && \
  chmod 600 $CONFIG_PATH/ssl/*

# 設定のコピー
COPY hiroba_tech.conf $CONFIG_PATH/conf.d/
