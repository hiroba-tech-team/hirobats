import React, { useState, useEffect, createRef } from "react";
import Image from "next/image";
import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Button,
  Avatar,
  Tooltip,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

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
  const drawerWidth = 240; // サイドメニューの幅

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

  const pages = ["チャンネル", channels[current].name];
  const settings = ["アカウント", "チャンネル", "ログアウト"];

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // ブレークポイント　xs: 0px sm: 600px md: 900px lg: 1200px xl: 1536px
  return (
    <>
      {/* 大枠はContainerで包む、sxはcssにアクセスする maxのブレークポイントを設定 */}
      <Container sx={{ display: "flex" }} maxWidth="xl">
        {/* ブラウザーの差異を平均化 */}
        <CssBaseline />
        {/* ヘッダー AppBarが幅いっぱいになるzIndex*/}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          {/* disableGutters 左右の端の余白なし */}
          <Toolbar disableGutters>
            {/* varient 文字の大きさ  noWrap 文字の折り返しなし sx テーマへのアクセス mr マージンライト */}
            <Typography variant="h3" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
              hirobats
            </Typography>
            {/* md未満の幅になった場合に表示される*/}
            {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              hirobats
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                // my = マージントップ&マージンボトム
                <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {/* // Tooltip 吹き出し */}
              <Tooltip title="セッティング">
                {/* p パディング */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={users.name} src={users.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        {/* サイドメニュー */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box", // パディング、境界、マージンを含ない
            },
          }}
          variant="permanent" // 永続的に表示
          anchor="left" // 左に表示
        >
          <Toolbar />
          <List>
            <ListItem>
              {users.avatar ? (
                <Image className="responsive-img" src={users.avatar} alt="" height={70} width={70} />
              ) : null}
            </ListItem>
          </List>
          {/* 分離ライン */}
          <Divider />
          {/* リスト内にchannelsを展開する */}
          <List>
            {channels.map((channel: Channel) => (
              <ListItem button key={channel.id} onClick={() => handleOnClick(channel.id)}>
                <ListItemText primary={channel.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Toolbar />
        <div className="row">
          {/* サイドバー */}
          <div className="side-area col s12 m2 l2 purple darken-1 hide-on-med-and-down">
            <div className="user-container">
              <div className="user-avatar"></div>
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
              <button className="btn waves-effect col s12 purple darken-1 white-text" onClick={handleSubmit}>
                送信する
              </button>
            ) : (
              <button className="btn waves-effect col s12 purple darken-1 white-text" onClick={handleSubmit} disabled>
                送信する
              </button>
            )}
          </div>
        </div>
        {/* フッター */}
        <footer className="purple darken-2">
          <div className="copy-right">© 2021 hiroba.tech</div>
        </footer>
      </Container>
    </>
  );
}
