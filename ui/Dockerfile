FROM node:current-alpine
MAINTAINER srtkkou<srtkkou@outlook.jp>

# アプリ配置ディレクトリの設定
ENV ROOT=/ui
RUN mkdir $ROOT
WORKDIR $ROOT

# ソースコードのコピー
COPY ./ $ROOT/

# 本番環境のビルド
RUN yarn install && \
  NODE_ENV=production yarn build

# サービス開始スクリプトの登録
CMD ["yarn", "next", "start"]
