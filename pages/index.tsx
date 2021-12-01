import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Main() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "こんにちは",
      time: "15:10",
    },
    { id: 2, message: "はじめまして", time: "16:10" },
  ]);
  const [channels, setChannels] = useState([
    { id: 1, name: "#サンプル", desc: "チャンネルの説明です" },
    { id: 2, name: "打合せ", desc: "" },
    { id: 3, name: "定例", desc: "" },
  ]);
  const [current, setCurrent] = useState(channels[0]);
  const dummyImage =
    "https://www.pinclipart.com/picdir/big/15-159747_onlinelabels-clip-art-free-female-avatar-icons-png.png";

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
            width: "18vw",
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
            <Image src={dummyImage} alt="" height={40} width={40} />
            <div
              style={{
                marginTop: "25px",
                marginLeft: "20px",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              ひろばくん
            </div>
          </div>
          <hr />
          <div>
            <Link href={"/about"} passHref>
              <div
                style={{
                  fontWeight: "bold",
                  color: "rgb(207, 195, 207)",
                  fontSize: "18px",
                  padding: "10px 15px",
                  cursor: "pointer",
                }}
              >
                チャンネル一覧
              </div>
            </Link>
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
                    >
                      {channel.name}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ width: "100vw" }}>
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
              {current.name}
            </div>
            <div
              style={{
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              {current.desc}
            </div>
          </div>
          <div style={{ paddingBottom: "90px" }}>
            {messages.map((message) => {
              return (
                <div key={message.id}>
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
                      height={40}
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
                        <span>{message.time}</span>
                      </div>
                      <div
                        style={{
                          marginLeft: "20px",
                          color: "black",
                          fontSize: "20px",
                        }}
                      >
                        {message.message}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {messages.length === 0 && (
              <div style={{ textAlign: "center", marginTop: 20 }}>
                メッセージがありません
              </div>
            )}
          </div>

          <div
            style={{
              position: "fixed",
              bottom: "0",
            }}
          >
            <textarea
              placeholder="メッセージを入力してください"
              // onChange={null}
              // onKeyDown={null}
              // value={null}
              style={{
                fontSize: "20px",
                width: "80vw",
                marginLeft: "10px",
                height: "70px",
                padding: "5px",
                marginBottom: "10px",
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
