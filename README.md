# hiroba.tech プロジェクト

[hiroba.tech](https://hiroba.tech/)用のリポジトリです。

## 機能
- 技術者の交流

## dockerの動かし方(開発環境)

### (注1) Ubuntu 20.04 LTSでの動作を想定しています。WindowsのWSL上のUbuntuや、macOSでの動作は検証しておりません。その場合、開発は[VirtualBox](https://www.virtualbox.org/)等の仮想環境にUbuntu 20.04 LTSをインストールして行うことを推奨します。

- 開発環境に[docker](https://www.docker.com/)がインストールされていることを確認し、ない場合は[URL](https://docs.docker.com/engine/install/ubuntu/)にしたがってインストールします。

- 開発環境の任意のディレクトリに[リポジトリ](https://github.com/hiroba-tech-team/hirobats.git)のファイルを`git clone`します。

- コマンド`git pull`でmainブランチの最新のファイルにアップデートしてください。

- 開発環境の`git clone`したディレクトリに[docker-compose](https://github.com/docker/compose/releases)が配置されていることを確認します。無ければ[URL](https://github.com/docker/compose/releases/download/v2.1.1/docker-compose-linux-x86_64)からlatestのdocker-composeをコピーします。

- docker-composeはdocker-compose-Linux-x86_64のような長い名前なので、docker-composeにリネームします。また、`chmod a+x docker-compose`で実行権限を与えます。

- 以下のコマンドでコンテナをビルド・起動します。
```
$ sudo ./docker-compose build ui
$ sudo ./docker-compose build nginx
$ sudo ./docker-compose up -d
```

- コンテナの内容が大きく変わったときはキャッシュファイルを消して再ビルドします。
```
$ sudo ./docker-compose build --no-cache ui
$ sudo ./docker-compose build --no-cache nginx
```

- 各コンテナの標準出力を確認するときは-d無しでupします。
```
$ sudo ./docker-compose up
```

- コンテナの状態は以下のコマンドで確認できます。
```
$ sudo ./docker-compose ps
$ sudo docker ps -a
```

- ブラウザから動作を確認する場合は、以下のURLを使います。

## http://開発環境サーバのIPアドレスまたはホスト名/

- dockerコンテナを停止する場合は以下のコマンドを実行します。
```
$ sudo ./docker-compose down
```

- 動作しているコンテナのシェルで何らかの操作をしたい場合、以下のコマンドを実行します。
```
$ sudo docker ps 
$ sudo docker exec -it コンテナ名またはハッシュ値 /bin/bash
```

- 使っていないコンテナは容量を消費するので定期的に以下のコマンドを実行します。
```
$ sudo docker system prune
```
