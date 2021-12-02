import React, { useState } from "react";
import Image from "next/image";

interface Channel {
  id: number;
  name: string;
  desc: string;
}

interface Dialog {
  id: number;
  message: string;
  time: string;
  user: string;
}

export default function Main() {
  const [channels, setChannels] = useState<Channel[]>([
    { id: 0, name: "#サンプル", desc: "チャンネルの説明です" },
    { id: 1, name: "打合せ", desc: "いつ始めましょうか" },
    { id: 2, name: "定例", desc: "いつもの時間で" },
  ]);
  const [current, setCurrent] = useState<number>(0);
  const [user, setUser] = useState<string>("ひろばくん");
  const [value, setValue] = useState<string>("");
  const [dialog, setDialog] = useState<Dialog[]>([
    {
      id: 0,
      message: "こんにちは",
      time: "15:10",
      user: "たなか",
    },
    { id: 0, message: "はじめまして", time: "16:10", user: "たなか" },
    { id: 1, message: "ありがとう", time: "17:10", user: "たなか" },
    { id: 1, message: "どういたしまして", time: "18:10", user: "たなか" },
    { id: 2, message: "こんにちは", time: "19:10", user: "たなか" },
    { id: 2, message: "さようなら", time: "20:10", user: "たなか" },
  ]);

  const handleOnClick = (e: number) => {
    setCurrent(e);
  };

  const handleSubmit = () => {
    dialog.push({ id: current, message: value, time: "21:20", user: user });
    setDialog(dialog);
    setValue("");
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <div style={{ display: "flex" }}>
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
              src="https://www.pinclipart.com/picdir/big/15-159747_onlinelabels-clip-art-free-female-avatar-icons-png.png"
              alt=""
              height={40}
              width={40}
            />
            <div
              style={{
                marginTop: "25px",
                marginLeft: "20px",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              {user}
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
              {channels[current].name}
            </div>
            <div
              style={{
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              {channels[current].desc}
            </div>
          </div>

          <div style={{ width: "70vw" }}>
            <div style={{ paddingBottom: "90px" }}>
              {dialog.map((e, idx) => {
                if (e.id === current) {
                  return (
                    <div key={idx}>
                      {user === e.user ? (
                        <div>
                          <div style={{ textAlign: "right" }}>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  right:"0"
                                }}
                              >
                                <div
                                  style={{
                                    position: "relative",
                                    display: "inline-block",
                                    padding: "10px 10px",
                                    minWidth: "120px",
                                    maxWidth: "50%",
                                    color: "black",
                                    fontSize: "20px",
                                    background: "skyblue",
                                    marginRight: "30px",
                                  }}
                                >
                                  {e.message}
                                </div>
                              </div>
                              <div>
                                <Image
                                  src="https://ca.slack-edge.com/T0266FRGM-U2Q173U05-g863c2a865d7-512"
                                  alt=""
                                  height={60}
                                  width={60}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              marginLeft: "10px",
                              display: "flex",
                              marginBottom: "5px",
                              right: "0",
                            }}
                          >
                            <span>{e.time}</span>
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
                            {e.user}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              marginBottom: "20px",
                              paddingLeft: "20px",
                              marginRight: "10px",
                            }}
                          >
                            <Image
                              src="https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72"
                              alt=""
                              height={60}
                              width={60}
                            />
                            <div>
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
                              <div
                                style={{
                                  marginLeft: "20px",
                                  color: "black",
                                  fontSize: "20px",
                                }}
                              >
                                {e.message}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
              {dialog.length === 0 && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  メッセージがありません
                </div>
              )}
            </div>
          </div>

          <div>
            <div
              style={{
                position: "absolute",
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
                  width: "70vw",
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
                  height: "70px",
                  marginLeft: "20px",
                  borderRadius: "50px",
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
      </div>
    </>
  );
}
