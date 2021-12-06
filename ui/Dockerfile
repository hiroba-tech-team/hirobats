FROM node:latest
MAINTAINER srtkkou<srtkkou@outlook.jp>

# アプリ配置ディレクトリの設定
ENV ROOT=/ui
RUN mkdir $ROOT
WORKDIR $ROOT

# ソースコードのコピー
COPY ./ $ROOT/

# 本番環境のコンパイル
RUN yarn install && \
  yarn build

# サービス開始スクリプトの登録
CMD ["node_modules/.bin/next", "start"]
