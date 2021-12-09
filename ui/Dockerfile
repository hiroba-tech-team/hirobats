FROM node:current-alpine
MAINTAINER srtkkou<srtkkou@outlook.jp>

# ロケールをja_JPに変更(Alpine)
RUN apk update \
  && apk add tzdata \
  && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
  && echo "Asia/Tokyo" > /etc/timezone

ENV TZ "Asia/Tokyo"
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP.UTF-8
ENV LC_ALL ja_JP.UTF-8

# アプリ配置ディレクトリの設定
ENV ROOT=/ui
RUN mkdir $ROOT
WORKDIR $ROOT

# ソースコードのコピー
COPY ./ $ROOT/

# 本番環境のビルド
RUN yarn install \
  && NODE_ENV=production yarn build

# サービス開始スクリプトの登録
CMD ["yarn", "next", "start"]
