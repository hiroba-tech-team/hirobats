import React, { useState, useEffect, createRef } from "react";
import Image from "next/image";
import {getChannelList} from "../src/provider/channel-provider";
import {getDialogList} from "../src/provider/dialog-provider";
import Channel from "../src/models/Channel";
import Dialog from "../src/models/Dialog";
import User from "../src/models/User";


export default function Main() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [users, setUsers] = useState<User>({
    id: 0,
    name: "ひろばくん",
    avatar: "https://www.pinclipart.com/picdir/big/155-1559316_male-avatar-clipart.png",
    channel: ["#サンプル", "打合せ", "定例"],
    login: true,
  });
  // const [dialog, setDialog] = useState<Dialog[]>([
  //   {
  //     channelId: 0,
  //     message: "こんにちは",
  //     time: "15:10",
  //     userId: "ひろばくん",
  //   },
  //   { channelId: 0, message: "はじめまして", time: "16:10", userId: "ひろばさん" },
  //   { channelId: 1, message: "ありがとう", time: "17:10", userId: "ひろばくん" },
  //   { channelId: 1, message: "どういたしまして", time: "18:10", userId: "ひろばくん" },
  //   { channelId: 2, message: "こんにちは", time: "19:10", userId: "ひろばくん" },
  //   { channelId: 2, message: "さようなら", time: "20:10", userId: "ひろばくん" },
  // ]);
  const [dialog, setDialog] = useState<Dialog[]>([]);
  const [current, setCurrent] = useState<number>(0); // 現在の選択されているチャンネル
  const [value, setValue] = useState<string>(""); // テキストボックスに入力されている値
  const ref = createRef<HTMLDivElement>(); // メッセージエリアを参照するためのマーカー


  const handleOnClick = (e: number) => {
    setCurrent(e);
  };

  const handleSubmit = () => {
    dialog.push({
      channelId: current,
      message: value,
      time: (new Date()).toString(),
      userId: users.id
    });
    setDialog(dialog);
    setValue("");
  };

  //ここでチャンネルのデータを取得する。
  if(channels.length==0){
    getChannelList().then(channel => {
      //データが取得できているか確認する時に使用する
      setChannels(channel);
    }).catch(e => {
      console.log("データがありませんでした。");
    });
    console.log(channels);
  }

  //ここでチャンネルに紐づくデータを取得する。
  getDialogList().then(dialog => {
    //データが取得できているか確認する時に使用する
    console.log(dialog);
    setDialog(dialog);
  }).catch(e => {
    console.log("データがありませんでした。")
  });

  useEffect(() => {
    ref!.current!.scrollIntoView({
      // ! 表記はundefinedやnullにはならないということ
      behavior: "smooth",
      block: "end",
    });
  }, [ref]);

  return (
    <>
      {/* マージンがデフォルトで8pxになるためグローバルに0を設定 */}
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>

      <div style={{ display: "flex" }}>
        {/* サイドバー */}
        <div
          style={{
            background: "purple",
            height: "100vh",
            width: "18em",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              padding: "10px 15px",
              marginRight: "15px",
            }}
          >
            <Image
              src="https://www.pinclipart.com/picdir/big/155-1559325_female-avatar-clipart.png"
              alt=""
              height={50}
              width={50}
            />
            <div
              style={{
                marginTop: "25px",
                marginLeft: "20px",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
            </div>
          </div>
          <hr />
          <div>
            <div
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: "18px",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              チャンネル一覧
            </div>
            {channels.map((channel) => {
              return (
                <div key={channel.id}>
                  <ul
                    style={{
                      margin: "0",
                      padding: "0",
                      color: "white",
                    }}
                  >
                    <li
                      style={{
                        paddingLeft: "20px",
                        paddingTop: "15px",
                        color: "white",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleOnClick(channel.id)}
                    >
                      {channel.name}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* タイトル */}
        <div style={{ width: "100vw", position: "relative" }}>
          <div
            style={{
              padding: "10px 20px",
              borderBottom: "1px solid black",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {channels.length != 0 ? channels[current].name : ""}
            </div>
            <div
              style={{
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              {channels.length != 0 ? channels[current].desc : ""}
            </div>
          </div>

          {/* メッセージエリア */}
          <div
            style={{
              bottom: "0",
              height: "70vh",
              display: "fixed",
              scrollBehavior: "auto",
              overflow: "auto",
            }}
          >
            <div ref={ref} style={{ paddingBottom: "90px" }}>
              {dialog.map((e, idx) => {
                if (e.channelId === current) {
                  return (
                    <div key={idx}>
                      {users.id === e.userId ? (
                        <div style={{ textAlign: "left" }}>
                          <div
                            style={{
                              marginBottom: "2px",
                              paddingLeft: "20px",
                              marginRight: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {e.userId}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              marginBottom: "20px",
                              paddingLeft: "20px",
                              marginRight: "10px",
                            }}
                          >
                            <div>
                              <Image
                                src="https://ca.slack-edge.com/T0266FRGM-U2Q173U05-g863c2a865d7-512"
                                alt=""
                                height={60}
                                width={60}
                                layout="fixed"
                              />
                            </div>
                            <div>
                              <div
                                style={{
                                  marginLeft: "20px",
                                  fontSize: "20px",
                                  display: "inline-block",
                                  margin: "10px 20px",
                                  padding: "10px 20px",
                                  background: "skyblue",
                                  textAlign: "left",
                                  borderRadius: "12px",
                                }}
                              >
                                {e.message}
                              </div>
                              <div
                                style={{
                                  marginLeft: "10px",
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "5px",
                                }}
                              >
                                <span>{e.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ textAlign: "left" }}>
                          <div
                            style={{
                              marginBottom: "2px",
                              paddingLeft: "20px",
                              marginRight: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {e.userId}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              marginBottom: "20px",
                              paddingLeft: "20px",
                              marginRight: "10px",
                            }}
                          >
                            <div>
                              <Image
                                src="https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72"
                                alt=""
                                height={60}
                                width={60}
                              />
                            </div>
                            <div>
                              <div
                                style={{
                                  marginLeft: "20px",
                                  fontSize: "20px",
                                  display: "inline-block",
                                  margin: "10px 20px",
                                  padding: "10px 20px",
                                  background: "orange",
                                  textAlign: "left",
                                  borderRadius: "12px",
                                }}
                              >
                                {e.message}
                              </div>
                              <div
                                style={{
                                  marginLeft: "10px",
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "5px",
                                }}
                              >
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
              {dialog.length === 0 && <div style={{ textAlign: "center", marginTop: 20 }}>メッセージがありません</div>}
            </div>
          </div>

          {/* テキストボックス */}
          <div
            style={{
              position: "fixed",
              bottom: "0",
              display: "column",
            }}
          >
            <textarea
              placeholder="メッセージを入力してください"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              style={{
                fontSize: "20px",
                width: "65vw",
                marginLeft: "10px",
                height: "100px",
                padding: "5px",
                marginBottom: "-50px",
              }}
            ></textarea>
            <button
              style={{
                fontSize: "15pt",
                width: "10vw",
                height: "100px",
                marginLeft: "20px",
                borderRadius: "40px",
                cursor: "pointer",
                padding: "12px 12px",
                color: "purple",
                background: "white",
                border: "1px solid black",
                marginBottom: "30px",
              }}
              onClick={handleSubmit}
            >
              送信する
            </button>
          </div>
        </div>
      </div>
    </>
  );
}