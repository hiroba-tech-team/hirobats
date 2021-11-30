import React, { useState } from "react";

export default function Main() {
  const [messages, setMessages] = useState([
    {
      message: "こんにちは",
      time: "15:10",
    },
    { message: "はじめまして", time: "16:10" },
  ]);
  const [channels, setChannels] = useState([
    { name: "#サンプル", desc: "チャンネルの説明です" },
    { name: "打合せ", desc: "" },
    { name: "定例", desc: "" },
  ]);
  const [current, setCurrent] = useState(channels[0]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            boxSizing: "border-box",
            width: "230px",
            minWidth: "230px",
            background: "#3f0e40",
            fontSize: "15px",
            minHeight: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              padding: "10px 15px",
            }}
          >
            <img
              src="https://www.pinclipart.com/picdir/big/15-159747_onlinelabels-clip-art-free-female-avatar-icons-png.png"
              alt=""
              style={{ height: "40px", marginRight: "15px" }}
            />
            <div>ひろばくん</div>
          </div>
          <hr />
          <div>
            <div
              style={{
                fontWeight: "bold",
                color: "rgb(207, 195, 207)",
                fontSize: "18px",
                padding: "10px 15px",
              }}
            >
              チャンネル一覧
            </div>
            <ul
              style={{
                margin: "0",
                padding: "0",
                color: "rgb(207, 195, 207)",
              }}
            >
              {channels.map((channel) => {
                (
                  <li
                    style={{
                      padding: "7px 15px",
                      color: "rgb(207, 195, 207)",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    {channel.name}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <div
            style={{
              padding: "10px 20px",
              borderBottom: "1px solid #e2e2e2",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                fontSize: "21px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {current.name}
            </div>
            <div
              style={{
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              {current.desc}
            </div>
          </div>
          <div style={{ paddingBottom: "90px" }}>
            {messages.map((message) => {
              (
                <div
                  style={{
                    display: "flex",
                    marginBottom: "15px",
                    paddingLeft: "20px",
                  }}
                >
                  <img
                    src="https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72"
                    alt=""
                    style={{ height: "40px", marginRight: "10px" }}
                  />
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <span>{message.time}</span>
                    </div>
                    <div
                      style={{
                        color: "rgb(29, 28, 29)",
                        fontSize: "15px",
                      }}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              )
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
              background: "white",
              width: "100%",
            }}
          >
            <textarea
              placeholder="メッセージを入力してください"
              // onChange={null}
              // onKeyDown={null}
              // value={null}
              style={{
                width: "80%",
                marginLeft: "10px",
                height: "70px",
                padding: "5px",
                boxSizing: "border-box",
                marginBottom: "12px",
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
