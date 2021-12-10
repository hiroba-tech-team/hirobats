import React, { useState, useEffect, createRef } from "react";
import Image from "next/image";

// 変数channel の型
interface Channel {
  id: number;
  name: string;
  desc: string;
}
// 変数dialog の型
interface Dialog {
  id: number;
  message: string;
  time: string;
  user: string;
}
// 変数user の型（未定）
interface User {
  id: number;
  name: string;
  avatar: string;
  channel: string[];
  login: boolean;
}

export default function Main() {
  const [channels, setChannels] = useState<Channel[]>([
    { id: 0, name: "#サンプル", desc: "チャンネルの説明です" },
    { id: 1, name: "打合せ", desc: "いつ始めましょうか" },
    { id: 2, name: "定例", desc: "いつもの時間で" },
  ]);
  // ユーザーの初期設定
  const [users, setUsers] = useState<User>({
    id: 0,
    name: "",
    avatar: "",
    channel: [],
    login: false,
  });
  const [dialog, setDialog] = useState<Dialog[]>([
    {
      id: 0,
      message: "こんにちは",
      time: "15:10",
      user: "ひろばくん",
    },
    { id: 0, message: "はじめまして", time: "16:10", user: "ひろばさん" },
    { id: 1, message: "ありがとう", time: "17:10", user: "ひろばくん" },
    { id: 1, message: "どういたしまして", time: "18:10", user: "ひろばくん" },
    { id: 2, message: "こんにちは", time: "19:10", user: "ひろばくん" },
    { id: 2, message: "さようなら", time: "20:10", user: "ひろばくん" },
  ]);
  const [current, setCurrent] = useState<number>(0); // 現在の選択されているチャンネル
  const [value, setValue] = useState<string>(""); // テキストボックスに入力されている値
  const ref = createRef<HTMLDivElement>(); // メッセージエリアを参照するためのマーカー

  const handleOnClick = (e: number) => {
    setCurrent(e);
  };
  const handleSubmit = () => {
    dialog.push({ id: current, message: value, time: "21:20", user: users.name });
    setDialog(dialog);
    setValue("");
  };
  const changeUser = (e: number) => {
    setUsers(testUser[e]);
  };
  // テスト用にユーザーデータを定義
  let testUser = [
    {
      id: 0,
      name: "ひろばくん",
      avatar: "https://www.pinclipart.com/picdir/big/155-1559316_male-avatar-clipart.png",
      channel: ["#サンプル", "打合せ", "定例"],
      login: true,
    },
    {
      id: 1,
      name: "ひろばさん",
      avatar: "https://www.pinclipart.com/picdir/big/155-1559325_female-avatar-clipart.png",
      channel: ["#サンプル", "打合せ", "定例"],
      login: true,
    },
  ];

  useEffect(() => {
    ref!.current!.scrollIntoView({
      // ! 表記はundefinedやnullにはならないということ
      behavior: "smooth",
      block: "end",
    });
  }, [ref]);

  // 読み込み時にユーザーを 変数users にセット
  useEffect(() => {
    setUsers(testUser[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Materialize導入によりマージンの再設定を削除 */}
      <div className="container">
        <nav>
          <div className="nav-wrapper purple darken-1">
            <a href="#" className="brand-logo">
              hirobats
            </a>
            <a href="#" data-target="mobile" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="#">設定</a>
              </li>
              <li>
                <a href="#">ログアウト</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="col s12 m3 l3 purple darken-1">
          チャンネル: {channels[current].name}
          説明: {channels[current].desc}
        </div>
        <ul className="sidenav" id="mobile">
          <li>
            <a href="#">設定</a>
          </li>
          <li>
            <a href="#">ログアウト</a>
          </li>
        </ul>
        {/* グリッド表示のためclassをrowに設定 */}
        <div className="row">
          {/* サイドバー */}
          <div className="col s12 m3 l3 purple darken-1">
            <div>
              {users.avatar ? (
                <Image className="responsive-img" src={users.avatar} alt="" height={50} width={50} />
              ) : null}
            </div>
            <div className="center-align">{users.name}</div>
            <div>
              <div className="white-text">
                チャンネル一覧{" "}
                <a className="btn-floating">
                  <i className="material-icons purple darken-2">add</i>
                </a>
              </div>
              {channels.map((channel: Channel) => {
                return (
                  <div key={channel.id}>
                    <ul className="collection">
                      <li className="collection-item" onClick={() => handleOnClick(channel.id)}>
                        {channel.name}
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
            {/* ユーザー変更テストのため */}
            <br />
            <div>
              <div className="white-text">ユーザー変更テスト</div>
              {testUser.map((testUser: User) => {
                return (
                  <div key={testUser.id}>
                    <ul className="collection">
                      <li className="collection-item" onClick={() => changeUser(testUser.id)}>
                        {testUser.name}
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* メッセージエリア */}
          <div className="col s12 m9 l9">
            <div ref={ref}>
              {dialog.map((e: Dialog, idx: number) => {
                if (e.id === current) {
                  return (
                    <div key={idx}>
                      {users.name === e.user ? (
                        <div>
                          <div>{e.user}</div>
                          <div>
                            <div>
                              <Image
                                className="responsive-img"
                                src="https://ca.slack-edge.com/T0266FRGM-U2Q173U05-g863c2a865d7-512"
                                alt=""
                                height={60}
                                width={60}
                              />
                            </div>
                            <div>
                              <div>{e.message}</div>
                              <div>
                                <span>{e.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div>{e.user}</div>
                          <div>
                            <div>
                              <Image
                                className="responsive-img"
                                src="https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72"
                                alt=""
                                height={60}
                                width={60}
                              />
                            </div>
                            <div>
                              <div>{e.message}</div>
                              <div>
                                <span>{e.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
              {dialog.length === 0 && <div>メッセージがありません</div>}
            </div>

            {/* テキストボックス */}
            <div className="row">
              <div className="input-field col s10">
                <i className="material-icons prefix">mode_edit</i>
                <textarea
                  id="textarea1"
                  className="materialize-textarea"
                  placeholder="メッセージを入力してください"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                ></textarea>
              </div>
              <button className="btn waves-effect waves-light col s2 right purple darken-1" onClick={handleSubmit}>
                送信する
              </button>
            </div>
          </div>
        </div>
        <footer className="page-footer purple darken-1">
          <div className="row">
            <div className="center">
              <div className="white-text">hirobats</div>
            </div>
          </div>
          <div className="footer-copyright purple darken-2">
            <div className="container center">© 2021 hiroba.tech</div>
          </div>
        </footer>
      </div>
    </>
  );
}
