FROM node:latest
MAINTAINER srtkkou<srtkkou@outlook.jp>

# アプリ配置ディレクトリの設定
ENV ROOT=/ui
RUN mkdir $ROOT
WORKDIR $ROOT

# パッケージの取得
COPY package.json $ROOT/
COPY yarn.lock $ROOT/
RUN yarn install

# ソースコードのコピー
COPY pages/ $ROOT/pages/
COPY public/ $ROOT/public/
COPY styles/ $ROOT/styles/
COPY .eslintrc.json $ROOT/
COPY next-env.d.ts $ROOT/
COPY next.config.js $ROOT/
COPY tsconfig.json $ROOT/

# 本番環境のコンパイル
RUN yarn build

# サービス開始スクリプトの登録
CMD ["node_modules/.bin/next", "start"]
