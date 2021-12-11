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
  avatar: string;
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
      avatar: "https://www.pinclipart.com/picdir/big/155-1559316_male-avatar-clipart.png",
    },
    {
      id: 0,
      message: "はじめまして",
      time: "16:10",
      user: "ひろばさん",
      avatar: "https://www.pinclipart.com/picdir/big/155-1559325_female-avatar-clipart.png ",
    },
    {
      id: 1,
      message: "ありがとう",
      time: "17:10",
      user: "ひろばくん",
      avatar: "https://www.pinclipart.com/picdir/big/155-1559316_male-avatar-clipart.png",
    },
    {
      id: 1,
      message: "どういたしまして",
      time: "18:10",
      user: "ひろばくん",
      avatar: "https://www.pinclipart.com/picdir/big/155-1559316_male-avatar-clipart.png",
    },
    {
      id: 2,
      message: "こんにちは",
      time: "19:10",
      user: "ひろばくん",
      avatar: "https://www.pinclipart.com/picdir/big/155-1559316_male-avatar-clipart.png",
    },
    {
      id: 2,
      message: "さようなら",
      time: "20:10",
      user: "ひろばさん",
      avatar: "https://www.pinclipart.com/picdir/big/155-1559325_female-avatar-clipart.png",
    },
  ]);
  const [current, setCurrent] = useState<number>(0); // 現在の選択されているチャンネル
  const [value, setValue] = useState<string>(""); // テキストボックスに入力されている値
  const ref = createRef<HTMLDivElement>(); // メッセージエリアを参照するためのマーカー

  const handleOnClick = (e: number) => {
    setCurrent(e);
  };
  const handleSubmit = () => {
    dialog.push({ id: current, message: value, time: "21:20", user: users.name, avatar: users.avatar });
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
      <div className="">
        {/* ヘッダー */}
        <nav>
          <div className="nav-wrapper purple darken-2">
            <a href="#" className="logo">
              hirobats
            </a>
            <ul id="nav-mobile" className="right">
              <li>
                <a className="white-text" href="#">
                  ch: {channels[current].name}
                </a>
              </li>
              <li>
                <a className="white-text" href="#">
                  <i className="material-icons">settings</i>
                </a>
              </li>
              <li>
                <a className="white-text" href="#">
                  <i className="material-icons">logout</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* グリッド表示のためclassをrowに設定 */}
        <div className="row">
          {/* サイドバー */}
          <div className="side-area col s12 m2 l2 purple darken-1 hide-on-med-and-down">
            <div className="user-container">
              <div className="user-avatar">
                {users.avatar ? (
                  <Image className="responsive-img" src={users.avatar} alt="" height={70} width={70} />
                ) : null}
              </div>
              {/* ディスプレイ幅によって"hide-on-med-and-down" */}
              <div className="user-name white-text">{users.name}</div>
            </div>
            <div>
              <div className="white-text">
                ch追加
                <a className="btn-floating waves-effect modal-trigger" href="#modal1">
                  <i className="material-icons purple darken-2">add</i>
                </a>
              </div>
              {channels.map((channel: Channel) => {
                return (
                  <div className="channel-list hide-on-med-and-down" key={channel.id}>
                    <ul>
                      <li
                        className="channel-name purple darken-2 z-depth-2 white-text"
                        onClick={() => handleOnClick(channel.id)}
                      >
                        {channel.name}
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
            {/* ユーザー変更テストのため　ディスプレイ幅によって"hide-on-med-and-down" */}
            <div className="hide-on-med-and-down">
              <div className="user-change white-text">ユーザー変更</div>
              {testUser.map((testUser: User) => {
                return (
                  <div className="channel-list" key={testUser.id}>
                    <ul>
                      <li
                        className="channel-name purple darken-2 z-depth-2 white-text"
                        onClick={() => changeUser(testUser.id)}
                      >
                        {testUser.name}
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          {/* モーダル */}
          <div id="modal1" className="modal">
            <div className="modal-content">
              <a className="modal-text">追加したいチャンネルを選んでね</a>
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-close purple darken-2 z-depth-2 waves-effect btn white-text">
                決定
              </a>
            </div>
          </div>
          {/* メッセージエリア */}
          <div className="message-area col s12 m10 l10">
            <div className="message-room" ref={ref}>
              {dialog.map((e: Dialog, idx: number) => {
                if (e.id === current) {
                  return (
                    <div key={idx}>
                      {users.name === e.user ? (
                        <div className="message-container">
                          <div>
                            <Image className="e-image responsive-img" src={e.avatar} alt="" height={60} width={60} />
                            <div className="black-text">{e.user}</div>
                          </div>
                          <div>
                            <div className="e-message black-text balloon">{e.message}</div>
                            <div className="e-time black-text">{e.time}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="message-container">
                          <div>
                            <Image className="e-image responsive-img" src={e.avatar} alt="" height={60} width={60} />
                            <div className="black-text">{e.user}</div>
                          </div>
                          <div>
                            <div className="e-message black-text balloon">{e.message}</div>
                            <div className="e-time black-text">{e.time}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
              {dialog.length === 0 && <div className="white-text">メッセージがありません</div>}
            </div>
          </div>
          {/* テキストエリア */}
          <div className="text-area col s12 m8 l8">
            <div className="input-field col s11">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="textarea"
                className="materialize-textarea"
                placeholder="メッセージを入力してください"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              ></textarea>
            </div>
          </div>
          <div className="col s12 m2 l2">
            {value ? (
              <button
                className="btn waves-effect col s12 purple darken-1 white-text"
                onClick={handleSubmit}
              >
                送信する
              </button>
            ) : (
              <button
                className="btn waves-effect col s12 purple darken-1 white-text"
                onClick={handleSubmit}
                disabled
              >
                送信する
              </button>
            )}
          </div>
        </div>
        {/* フッター */}
        <footer className="purple darken-2">
          <div className="copy-right">© 2021 hiroba.tech</div>
        </footer>
      </div>
    </>
  );
}
